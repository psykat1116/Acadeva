import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";

// const { video } = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID,
//   tokenSecret: process.env.MUX_TOKEN_SECRET,
// });

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = params;
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_UPDATE_ERROR]", error);
    return new NextResponse("Intenal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { courseId } = params;
    const isOwner = await db.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        // chapters: {
        //   include: {
        //     muxData: true,
        //   },
        // },
        chapters: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    // for (let chapter of course.chapters) {
    //   if (chapter.muxData?.assetId) {
    //     await video.assets.delete(chapter.muxData.assetId);
    //   }
    // }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_DELETE_ERROR]", error);
    return new NextResponse("Intenal Server Error", { status: 500 });
  }
}
