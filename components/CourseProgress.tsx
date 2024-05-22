import React from "react";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  variant?: "default" | "success";
  size?: "sm" | "default";
  value: number;
}

const colorByVariant = { default: "text-sky-700", success: "text-emerald-700" };
const sizeByVariant = { sm: "text-xs", default: "text-sm" };

const CourseProgress: React.FC<CourseProgressProps> = ({ value, variant, size }) => {
  return (
    <div>
      <Progress value={value} className="h-2" variant={variant} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

export default CourseProgress;
