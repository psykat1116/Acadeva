import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Banner from "@/components/Banner";
import Preview from "@/components/Preview";
import CourseEnrollButton from "@/components/individualChapter/CourseEnrollButton";
import CourseProgressButton from "@/components/individualChapter/CourseProgressButton";
import VideoPlayer from "@/components/individualChapter/VideoPlayer";
import { Separator } from "@/components/ui/separator";
import { getChapter } from "@/actions/getChapter";
import { File } from "lucide-react";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { courseId, chapterId } = params;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
  });
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
      course: {
        userId,
      },
    },
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  return {
    title: `${chapter?.title} ` || `${course?.title}` || "Chapter",
  };
}

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { courseId, chapterId } = params;

  const {
    chapter,
    course,
    // muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isBlocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter" variant="success" />
      )}
      {isBlocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            // playbackId={muxData?.playbackId!}
            playbackId={chapter.videoUrl!}
            isBlocked={isBlocked}
            completeOnEnd={completeOnEnd}
            backupId={chapter.videoUrl!}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-start justify-between gap-3">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div>
                <CourseProgressButton
                  chapterId={chapterId}
                  courseId={courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </div>
            ) : (
              <CourseEnrollButton courseId={courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File className="w-6 h-6 mr-2" />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
