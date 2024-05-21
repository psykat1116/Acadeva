"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

const Editor: React.FC<EditorProps> = ({ onChange, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
