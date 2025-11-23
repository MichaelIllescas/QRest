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

export interface FileUploadProps {
  id?: string;
  name?: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  required?: boolean;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  size?: "small" | "medium" | "large";
  showPreview?: boolean;
  showFileList?: boolean;
  dragAndDrop?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  files?: File[];

  onChange?: (files: File[]) => void;
  onError?: (message: string) => void;
  onRemove?: (file: File) => void;
}
