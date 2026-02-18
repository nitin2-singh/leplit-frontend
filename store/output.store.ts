import { create } from "zustand";

interface OutputState {
  open: boolean;
  logs: string[];

  openPanel: () => void;
  closePanel: () => void;
  clear: () => void;
  append: (line: string) => void;
}

export const useOutputStore = create<OutputState>((set) => ({
  open: false,
  logs: [],

  openPanel: () => set({ open: true }),
  closePanel: () => set({ open: false }),
  clear: () => set({ logs: [] }),

  append: (line) =>
    set((state) => ({
      logs: [...state.logs, line],
    })),
}));
