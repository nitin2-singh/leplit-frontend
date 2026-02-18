import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Folder, CreateFolderPayload } from "@/types/folder";
import { axiosInstance } from "@/lib/axios";

export function useFolder(folderId?: string) {
  return useQuery<Folder>({
    queryKey: ["folder", folderId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/folders/${folderId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 60,
    enabled: !!folderId,
  });
}

export function useCreateFolder() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateFolderPayload) => {
      const res = await axiosInstance.post("/folders", payload);
      return res.data;
    },
    onSuccess: (_, payload) => {
      // refresh parent folder OR project root
      if (payload.parentId) {
        qc.invalidateQueries({ queryKey: ["folder", payload.parentId] });
      } else {
        qc.invalidateQueries({ queryKey: ["project", payload.projectId] });
      }
    },
  });
}
