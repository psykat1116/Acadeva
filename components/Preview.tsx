"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { cn } from "@/lib/utils";

interface PreviewProps {
  value: string;
  isViewing?: boolean;
}

const Preview: React.FC<PreviewProps> = ({ value, isViewing }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div
      className={cn(
        "bg-transparent",
        isViewing && "max-h-[385px] overflow-y-scroll"
      )}
    >
      <ReactQuill theme="bubble" value={value} readOnly className="h-full" />
    </div>
  );
};

export default Preview;
