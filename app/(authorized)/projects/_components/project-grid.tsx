import Link from "next/link";
import { Project } from "@/types/project";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="group"
        >
          <div className="relative rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-xl">
            {/* Glow */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 blur-xl transition group-hover:opacity-100" />

            <h3 className="text-lg font-semibold">{project.name}</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Created on {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
