export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

/**
 * Project root response
 * (initial tree load)
 */
export interface ProjectRoot {
  id: string;
  name: string;
  folders: FolderNode[];
  files: FileNode[];
}

export interface FolderNode {
  id: string;
  name: string;
}

export interface FileNode {
  id: string;
  name: string;
}
