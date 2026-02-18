/**
 * File metadata
 */
export interface File {
  id: string;
  name: string;
  updatedAt: string;
}

/**
 * Full file content (editor)
 */
export interface FileContent {
  id: string;
  name: string;
  content: string;
}

/**
 * Create file payload
 */
export interface CreateFilePayload {
  name: string;
  projectId: string;
  folderId?: string | null;
}

/**
 * Save file payload
 */
export interface SaveFilePayload {
  content: string;
}
