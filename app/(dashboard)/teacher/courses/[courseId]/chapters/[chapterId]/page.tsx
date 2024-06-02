import Banner from "@/components/Banner";
import IconBadge from "@/components/IconBadge";
import ChapterAccessForm from "@/components/chapter/ChapterAccessForm";
import ChapterAction from "@/components/chapter/ChapterAction";
import ChapterDescriptionForm from "@/components/chapter/ChapterDescriptionForm";
import ChapterTitleForm from "@/components/chapter/ChapterTitleForm";
import VideoForm from "@/components/chapter/VideoForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { courseId, chapterId } = params;
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requireFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requireFields.length;
  const completedFields = requireFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requireFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          label="This chapter is not published. It will not be vidible in the course"
          variant={"warning"}
        />
      )}
      <div className="p-6">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course Setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span>Complete all fields {completionText}</span>
              </div>
              <ChapterAction
                disabled={!isCompleted}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customise Your Chapter</h2>
            </div>
            <ChapterTitleForm
              courseId={courseId}
              chapterId={chapterId}
              initialData={chapter}
            />
            <ChapterDescriptionForm
              courseId={courseId}
              chapterId={chapterId}
              initialData={chapter}
            />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-2xl">Add a Video</h2>
              </div>
              <VideoForm
                chapterId={chapterId}
                courseId={courseId}
                initialData={chapter}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
