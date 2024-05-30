"use client";
import React, { useState } from "react";
import { Chapter, MuxData } from "@prisma/client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/course/FileUpload";
import MuxPlayer from "@mux/mux-player-react";

interface VideoFormProps {
  courseId: string;
  chapterId: string;
  // initialData: Chapter & { muxData?: MuxData | null };
  initialData: Chapter;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const VideoForm: React.FC<VideoFormProps> = ({
  courseId,
  initialData,
  chapterId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((curr) => !curr);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            {/* <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} /> */}
            <video
              src={initialData.videoUrl}
              controls
              className="h-full w-full"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload This Chapter&apos;s Video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video
          doea not appear after a few minutes.
        </div>
      )}
    </div>
  );
};

export default VideoForm;
