import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Project, ProjectRoot } from "@/types/project";
import { axiosInstance } from "@/lib/axios";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosInstance.get("/projects");
      return res.data;
    },
    staleTime: 5 * 60 * 60,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const res = await axiosInstance.post("/projects", { name });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useProjectRoot(projectId?: string) {
  return useQuery<ProjectRoot>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/projects/${projectId}`);
      return res.data;
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 60,
  });
}
