"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";

import { FolderNode } from "@/types/project";
import { useFolder, useCreateFolder } from "@/hooks/useFolder";
import { useCreateFile } from "@/hooks/useFiles";
import { useFileStore } from "@/store/file.store";

import { FileItem } from "./file";

interface Props {
  folder: FolderNode;
  projectId: string;
}

export function FolderItem({ folder, projectId }: Props) {
  const [open, setOpen] = useState(false);
  const { data } = useFolder(open ? folder.id : undefined);

  const createFile = useCreateFile();
  const createFolder = useCreateFolder();

  const { selectedFolderId, creatingType, setCreating, selectFolder } =
    useFileStore();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Auto expand when creating inside this folder
  useEffect(() => {
    if (selectedFolderId === folder.id && creatingType) {
      setOpen(true);
    }
  }, [creatingType, selectedFolderId]);

  // Validation inside folder
  const validate = (n: string) => {
    if (!n.trim()) return "Name required";
    if (!data) return "";

    const fileExists = data.files?.some((f) => f.name === n);
    const folderExists = data.children?.some((f) => f.name === n);

    if (fileExists || folderExists) {
      return "Already exists in this folder";
    }

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
        folderId: folder.id,
      });
    }

    if (creatingType === "folder") {
      createFolder.mutate({
        name,
        projectId,
        parentId: folder.id,
      });
    }

    setCreating(null);
    setName("");
    setError("");
  };

  return (
    <div>
      {/* Folder Row */}
      <div
        className={`
          h-7 flex items-center gap-1 px-2
          cursor-pointer rounded-sm
          hover:bg-accent
          ${selectedFolderId === folder.id ? "bg-accent" : ""}
        `}
        onClick={() => {
          setOpen(!open);
          selectFolder(folder.id);
        }}
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Folder size={14} />
        <span className="truncate">{folder.name}</span>
      </div>

      {/* Inline Create Input */}
      {selectedFolderId === folder.id && creatingType && (
        <div className="ml-6 mt-1">
          <input
            autoFocus
            value={name}
            onBlur={() => {
              setCreating(null);
              setName("");
              setError("");
            }}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              setError(validate(value));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit();
              }

              if (e.key === "Escape") {
                setCreating(null);
                setName("");
                setError("");
              }
            }}
            className={`
              w-full h-7 px-2 rounded-sm outline-none text-sm
              border ${error ? "border-red-500" : "border-input"}
            `}
            placeholder={creatingType === "file" ? "File name" : "Folder name"}
          />

          {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
        </div>
      )}

      {/* Children */}
      {open && data && (
        <div className="ml-4">
          {data.children.map((child) => (
            <FolderItem key={child.id} folder={child} projectId={projectId} />
          ))}

          {data.files.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
