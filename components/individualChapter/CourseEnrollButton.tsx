"use client";
import React from "react";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton: React.FC<CourseEnrollButtonProps> = ({
  courseId,
  price,
}) => {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
