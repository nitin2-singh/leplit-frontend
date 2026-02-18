import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-2xl" />
      ))}
    </div>
  );
}

import { Button } from "@/components/ui/button";

export function EmptyState({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border text-center">
      <h3 className="text-xl font-semibold">No projects yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Create your first project and start coding.
      </p>

      <Button onClick={onClick} className="mt-6 rounded-full px-6">
        Create Project
      </Button>
    </div>
  );
}
