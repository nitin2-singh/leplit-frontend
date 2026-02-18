"use client";

import { useEffect, useRef } from "react";
import { X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutputStore } from "@/store/output.store";

export function OutputPanel() {
  const { open, logs, closePanel, clear } = useOutputStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  if (!open) return null;

  return (
    <div className="h-48 border-t bg-black text-green-400 text-sm flex flex-col">
      {/* Header */}
      <div className="h-8 flex items-center px-2 border-b bg-muted/20">
        <span className="text-xs font-semibold">OUTPUT</span>

        <div className="ml-auto flex gap-1">
          <Button size="icon" variant="ghost" onClick={clear}>
            <Trash size={14} />
          </Button>

          <Button size="icon" variant="ghost" onClick={closePanel}>
            <X size={14} />
          </Button>
        </div>
      </div>

      {/* Logs */}
      <div className="flex-1 overflow-auto p-2 font-mono">
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
