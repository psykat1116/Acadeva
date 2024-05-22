"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/format";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({
  courseId,
  price,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Failed to enroll in course");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
