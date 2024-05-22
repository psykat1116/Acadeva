"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfetti } from "@/hook/useConfetti";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

const CourseProgressButton: React.FC<CourseProgressButtonProps> = ({
  chapterId,
  nextChapterId,
  courseId,
  isCompleted,
}) => {
  const router = useRouter();
  const confetti = useConfetti();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update progress");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not Completed" : "Mark as Completed"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default CourseProgressButton;
