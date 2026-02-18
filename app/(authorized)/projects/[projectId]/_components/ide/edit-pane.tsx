"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { useEffect } from "react";

import { useFileStore } from "@/store/file.store";
import { useFile, useSaveFile } from "@/hooks/useFiles";

export function EditorPane() {
  const {
    activeFileId,
    openFiles,
    contents,
    dirtyFiles,
    setActiveFile,
    closeFile,
    setFileContent,
    setInitialContent, // ✅ ADD
    markSaved,
  } = useFileStore();

  const fileQuery = useFile(activeFileId ?? undefined);
  const saveFile = useSaveFile(activeFileId ?? "");

  // Load backend content -> baseline
  useEffect(() => {
    if (!fileQuery.data) return;

    setInitialContent(fileQuery.data.id, fileQuery.data.content);
  }, [fileQuery.data]);

  // Ctrl / Cmd + S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();

        if (!activeFileId) return;

        const content = contents[activeFileId];
        if (content == null) return;

        saveFile.mutate(
          { content },
          {
            onSuccess: () => markSaved(activeFileId),
          },
        );
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeFileId, contents]);

  if (!activeFileId) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a file to start coding
      </div>
    );
  }

  const handleClose = (id: string) => {
    if (dirtyFiles.has(id)) {
      const ok = window.confirm("You have unsaved changes. Close anyway?");
      if (!ok) return;
    }

    closeFile(id);
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs
        value={activeFileId}
        onValueChange={setActiveFile}
        className="flex flex-col h-full"
      >
        <TabsList className="rounded-none border-b justify-start">
          {openFiles.map((file) => (
            <div
              key={file.id}
              className={`
    relative group
    flex items-center
    border-b
    ${activeFileId === file.id ? "bg-muted" : ""}
  `}
            >
              {/* Tab Button */}
              <TabsTrigger value={file.id} className="rounded-none pr-6">
                {file.name}
                {dirtyFiles.has(file.id) && " ●"}
              </TabsTrigger>

              {/* Close Button */}
              <X
                size={12}
                className="
      absolute right-1
      opacity-0 group-hover:opacity-100
      cursor-pointer
    "
                onClick={() => handleClose(file.id)}
              />
            </div>
          ))}
        </TabsList>

        {openFiles.map((file) => (
          <TabsContent key={file.id} value={file.id} className="flex-1">
            <textarea
              className="w-full h-full p-4 bg-background outline-none resize-none font-mono text-sm"
              value={contents[file.id] ?? ""}
              onChange={(e) => setFileContent(file.id, e.target.value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
