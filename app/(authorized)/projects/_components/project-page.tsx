"use client";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProject";
import { ProjectsGrid } from "./project-grid";
import { EmptyState, ProjectsSkeleton } from "./project-state";
import { CreateProjectDialog } from "./create-project";
import { useState } from "react";

export default function ProjectsPage() {
  const { data, isLoading } = useProjects();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen px-6 mt-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
            <p className="mt-2 text-muted-foreground">
              All your coding workspaces in one place.
            </p>
          </div>

          <Button onClick={() => setOpen(true)} className="rounded-full px-6">
            + New Project
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <ProjectsSkeleton />
        ) : data && data.length > 0 ? (
          <ProjectsGrid projects={data} />
        ) : (
          <EmptyState onClick={() => setOpen(true)} />
        )}

        <CreateProjectDialog open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
}
