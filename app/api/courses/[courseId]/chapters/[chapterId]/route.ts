import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

// const { video } = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID,
//   tokenSecret: process.env.MUX_TOKEN_SECRET,
// });

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
    const { isPublished, ...values } = await req.json();

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    // if (values.videoUrl) {
    //   const existingMuxData = await db.muxData.findFirst({
    //     where: {
    //       chapterId,
    //     },
    //   });
    //   if (existingMuxData) {
    //     await video.assets.delete(existingMuxData.assetId);
    //     await db.muxData.delete({
    //       where: {
    //         id: existingMuxData.id,
    //       },
    //     });
    //   }
    //   const asset = await video.assets.create({
    //     input: values.videoUrl,
    //     playback_policy: ["public"],
    //     test: false,
    //   });

    //   await db.muxData.create({
    //     data: {
    //       chapterId: chapterId,
    //       assetId: asset.id,
    //       playbackId: asset.playback_ids?.[0].id,
    //     },
    //   });
    // }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTER_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
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
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // if (chapter.videoUrl) {
    //   const muxData = await db.muxData.findFirst({
    //     where: {
    //       chapterId,
    //     },
    //   });
    //   if (muxData) {
    //     await video.assets.delete(muxData.assetId);
    //   }
    // }
    
    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
        courseId,
      },
    });

    const publishChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (publishChapters.length === 0) {
      await db.course.update({
        where: {
          id: courseId,
          userId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
