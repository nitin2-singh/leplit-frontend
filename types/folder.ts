import { FileNode, FolderNode } from "./project";

/**
 * Lazy-loaded folder content
 */
export interface Folder {
  id: string;
  name: string;
  children: FolderNode[];
  files: FileNode[];
}

/**
 * Create folder payload
 */
export interface CreateFolderPayload {
  name: string;
  projectId: string;
  parentId?: string | null;
}
