import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOutputStore } from "@/store/output.store";
import { useFileStore } from "@/store/file.store";
import { useRunFile } from "@/hooks/useFiles";

export function TopBar({ projectName }: { projectName: string }) {
  const { openPanel, clear, append } = useOutputStore();
  const { activeFileId } = useFileStore();
  const { runFile } = useRunFile();

  const handleRun = () => {
    if (!activeFileId) return;
    runFile(activeFileId);
  };

  return (
    <header className="h-9 border-b flex items-center px-3 bg-muted/30">
      <span className="text-xs font-semibold truncate">{projectName}</span>

      <div className="ml-auto">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={handleRun}
        >
          <Play size={14} />
        </Button>
      </div>
    </header>
  );
}
