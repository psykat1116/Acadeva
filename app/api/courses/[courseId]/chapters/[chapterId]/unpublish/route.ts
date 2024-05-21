import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId, chapterId } = params;
    const isOwner = await db.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const unpublishChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishChapter = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (publishChapter.length === 0) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unpublishChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
