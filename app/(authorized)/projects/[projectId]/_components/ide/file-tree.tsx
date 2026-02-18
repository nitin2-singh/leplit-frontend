"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FolderPlus, FilePlus } from "lucide-react";

import { FolderNode, FileNode } from "@/types/project";
import { useCreateFolder } from "@/hooks/useFolder";
import { useCreateFile } from "@/hooks/useFiles";

import { FolderItem } from "./folder";
import { FileItem } from "./file";
import { useFileStore } from "@/store/file.store";

interface Props {
  projectId: string;
  rootFolders: FolderNode[];
  rootFiles: FileNode[];
}

export function FileTree({ rootFolders, rootFiles, projectId }: Props) {
  const createFile = useCreateFile();
  const createFolder = useCreateFolder();

  const { selectedFolderId, creatingType, setCreating } = useFileStore();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const existsInRoot = (n: string) =>
    rootFiles.some((f) => f.name === n) ||
    rootFolders.some((f) => f.name === n);

  const validate = (n: string) => {
    if (!n.trim()) return "Name required";
    if (!selectedFolderId && existsInRoot(n)) return "Already exists";
    return "";
  };

  const submit = () => {
    const err = validate(name);
    if (err) {
      setError(err);
      return;
    }

    if (creatingType === "file") {
      createFile.mutate({
        name,
        projectId,
        folderId: selectedFolderId,
      });
    }

    if (creatingType === "folder") {
      createFolder.mutate({
        name,
        projectId,
        parentId: selectedFolderId,
      });
    }

    setCreating(null);
    setName("");
    setError("");
  };

  return (
    <div className="h-full flex flex-col text-sm select-none">
      {/* Header */}
      <div className="h-8 flex items-center px-2 border-b">
        <span className="text-xs font-semibold text-muted-foreground">
          EXPLORER
        </span>

        <div className="ml-auto flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCreating("file")}
          >
            <FilePlus size={14} />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCreating("folder")}
          >
            <FolderPlus size={14} />
          </Button>
        </div>
      </div>

      {/* Tree */}
      <ScrollArea className="flex-1 py-1">
        {/* Inline create */}
        {!selectedFolderId && creatingType && (
          <div className="px-2 py-1">
            <input
              autoFocus
              onBlur={() => {
                setCreating(null);
                setName("");
                setError("");
              }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(validate(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
                if (e.key === "Escape") {
                  setCreating(null);
                  setName("");
                  setError("");
                }
              }}
              className={`w-full h-7 px-2 rounded-sm outline-none text-sm
                border ${error ? "border-red-500" : "border-input"}`}
              placeholder={
                creatingType === "file" ? "File name" : "Folder name"
              }
            />

            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
          </div>
        )}

        {rootFolders.map((folder) => (
          <FolderItem projectId={projectId} key={folder.id} folder={folder} />
        ))}

        {rootFiles.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </ScrollArea>
    </div>
  );
}
