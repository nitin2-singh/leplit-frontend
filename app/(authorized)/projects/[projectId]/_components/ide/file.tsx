"use client";

import { FileText } from "lucide-react";
import { FileNode } from "@/types/project";
import { useFileStore } from "@/store/file.store";
import clsx from "clsx";

export function FileItem({ file }: { file: FileNode }) {
  const { openFile, activeFileId } = useFileStore();

  return (
    <div
      onClick={() => openFile(file)}
      className={clsx(
        "flex items-center gap-2 px-2 py-1 text-sm rounded cursor-pointer",
        "hover:bg-accent",
        activeFileId === file.id && "bg-accent",
      )}
    >
      <FileText size={14} />
      <span className="truncate">{file.name}</span>
    </div>
  );
}
