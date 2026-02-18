import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateFilePayload, FileContent, SaveFilePayload } from "@/types/file";
import { axiosInstance } from "@/lib/axios";
import { useOutputStore } from "@/store/output.store";
import { getAuthToken } from "@/lib/cookie";

export function useFile(fileId?: string) {
  return useQuery<FileContent>({
    queryKey: ["file", fileId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/files/${fileId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 60,
    enabled: !!fileId,
  });
}

export function useCreateFile() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateFilePayload) => {
      const res = await axiosInstance.post("/files", payload);
      return res.data;
    },
    onSuccess: (_, payload) => {
      if (payload.folderId) {
        qc.invalidateQueries({ queryKey: ["folder", payload.folderId] });
      } else {
        qc.invalidateQueries({ queryKey: ["project", payload.projectId] });
      }
    },
  });
}

export function useSaveFile(fileId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveFilePayload) => {
      await axiosInstance.patch(`/files/${fileId}`, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["file", fileId] });
    },
  });
}

export function useRunFile() {
  const { openPanel, clear, append } = useOutputStore();

  const runFile = async (fileId: string) => {
    openPanel();
    clear();
    append("▶ Running...\n");

    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const token = getAuthToken();

    const res = await fetch(`${url}/files/${fileId}/run`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.body) {
      append("Failed to start process\n");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      append(decoder.decode(value));
    }
  };

  return { runFile };
}
