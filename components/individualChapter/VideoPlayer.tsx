"use client";
import React, { useState } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfetti } from "@/hook/useConfetti";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string;
  playbackId: string;
  isBlocked: boolean;
  completeOnEnd: boolean;
  backupId?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  chapterId,
  nextChapterId,
  title,
  completeOnEnd,
  courseId,
  isBlocked,
  playbackId,
  backupId,
}) => {
  const confetti = useConfetti();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Chapter completed successfully");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
        </div>
      )}
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="w-8 h-8" />
          <p className="text-sm">This Chapter Is Locked</p>
        </div>
      )}
      {!isBlocked && (
        // <MuxPlayer
        //   title={title}
        //   className={cn(!isReady && "hidden")}
        //   onCanPlay={() => setIsReady(true)}
        //   onEnded={onEnd}
        //   autoPlay
        //   playbackId={playbackId}
        // />
        <video
          src={playbackId}
          autoPlay
          onEnded={onEnd}
          onCanPlay={() => setIsReady(true)}
          title={title}
          className={cn("h-full w-full", !isReady && "hidden")}
          controls
        />
      )}
    </div>
  );
};

export default VideoPlayer;
