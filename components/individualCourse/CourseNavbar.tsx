import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import NavbarRoutes from "../navbar/NavbarRoutes";
import CourseMobileSidebar from "./CourseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar: React.FC<CourseNavbarProps> = ({
  course,
  progressCount,
}) => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
