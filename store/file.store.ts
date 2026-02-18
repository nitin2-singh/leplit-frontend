import { FileNode } from "@/types/project";
import { create } from "zustand";

interface FileState {
  activeFileId: string | null;

  selectedFolderId: string | null;

  openFiles: FileNode[];

  creatingType: "file" | "folder" | null;

  contents: Record<string, string>;
  originalContents: Record<string, string>;

  dirtyFiles: Set<string>;

  selectFolder: (id: string | null) => void;
  setCreating: (type: "file" | "folder" | null) => void;

  openFile: (file: FileNode) => void;
  closeFile: (id: string) => void;
  setActiveFile: (id: string) => void;

  setInitialContent: (id: string, content: string) => void;
  setFileContent: (id: string, content: string) => void;
  markSaved: (id: string) => void;
}

export const useFileStore = create<FileState>((set) => ({
  activeFileId: null,

  selectedFolderId: null,
  selectFolder: (id) => set({ selectedFolderId: id }),

  creatingType: null,
  setCreating: (type) => set({ creatingType: type }),

  openFiles: [],

  contents: {},
  originalContents: {},

  dirtyFiles: new Set(),

  openFile: (file) =>
    set((state) => {
      const exists = state.openFiles.some((f) => f.id === file.id);

      return {
        openFiles: exists ? state.openFiles : [...state.openFiles, file],
        activeFileId: file.id,
      };
    }),

  closeFile: (id) =>
    set((state) => {
      const files = state.openFiles.filter((f) => f.id !== id);

      const { [id]: _, ...rest } = state.contents;
      const { [id]: __, ...orig } = state.originalContents;

      const dirty = new Set(state.dirtyFiles);
      dirty.delete(id);

      return {
        openFiles: files,
        contents: rest,
        originalContents: orig,
        dirtyFiles: dirty,
        activeFileId:
          state.activeFileId === id
            ? (files[0]?.id ?? null)
            : state.activeFileId,
      };
    }),

  setActiveFile: (id) => set({ activeFileId: id }),

  setInitialContent: (id, content) =>
    set((state) => ({
      contents: { ...state.contents, [id]: content },
      originalContents: { ...state.originalContents, [id]: content },
    })),

  setFileContent: (id, content) =>
    set((state) => {
      const dirty = new Set(state.dirtyFiles);

      if (state.originalContents[id] !== content) {
        dirty.add(id);
      } else {
        dirty.delete(id);
      }

      return {
        contents: { ...state.contents, [id]: content },
        dirtyFiles: dirty,
      };
    }),

  markSaved: (id) =>
    set((state) => {
      const dirty = new Set(state.dirtyFiles);
      dirty.delete(id);

      return {
        dirtyFiles: dirty,
        originalContents: {
          ...state.originalContents,
          [id]: state.contents[id],
        },
      };
    }),
}));
