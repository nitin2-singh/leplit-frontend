"use client";

import { useProjectRoot } from "@/hooks/useProject";
import { useParams } from "next/navigation";
import { ProjectLayout } from "./_components/project-layout";

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading } = useProjectRoot(projectId);
  console.log(projectId);
  if (isLoading) {
    return <div className="p-6">Loading project...</div>;
  }

  if (!data) {
    return <div className="p-6">Project not found</div>;
  }

  return <ProjectLayout project={data} />;
}
