export type FileType =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "document"
  | "spreadsheet"
  | "archive"
  | "file";

export interface FileUploadItem {
  file: File;
  id: string;
  name: string;
  size: number;
  type: FileType;
  preview: string | null;
}

export interface UseFileUploadOptions {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  showPreview?: boolean;
  externalFiles?: File[];
  onChange?: (files: File[]) => void;
  onError?: (message: string) => void;
  onRemove?: (file: File) => void;
}
