import { ProjectRoot } from "@/types/project";
import { TopBar } from "./ide/topbar";
import { FileTree } from "./ide/file-tree";
import { EditorPane } from "./ide/edit-pane";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { OutputPanel } from "./ide/output-panel";

interface Props {
  project: ProjectRoot;
}

export function ProjectLayout({ project }: Props) {
  return (
    <div className="h-screen flex flex-col bg-background mt-14">
      {/* Top bar */}
      <TopBar projectName={project.name} />

      {/* Body */}
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex-1 overflow-hidden"
      >
        {/* Sidebar */}
        <ResizablePanel defaultSize={18} minSize={150} maxSize={200}>
          <aside className="h-full flex flex-col border-r bg-muted/40">
            <FileTree
              projectId={project.id}
              rootFolders={project.folders}
              rootFiles={project.files}
            />
          </aside>
        </ResizablePanel>

        <ResizableHandle className="w-px bg-border" />

        {/* Editor */}
        <ResizablePanel className="overflow-hidden">
          <div className="h-full flex flex-col">
            <EditorPane />
            <OutputPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
