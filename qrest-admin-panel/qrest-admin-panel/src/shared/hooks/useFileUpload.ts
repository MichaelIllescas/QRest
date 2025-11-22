import { useState } from "react";
import type { FileUploadItem, FileType, UseFileUploadOptions } from "./types";

export const useFileUpload = (
  {
    accept = "*/*",
    multiple = false,
    maxSize = 10485760,
    maxFiles = 5,
    showPreview = true,
    onChange,
    onError,
    onRemove,
  }: UseFileUploadOptions
) => {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      const sizeMB = (maxSize / 1024 / 1024).toFixed(2);
      return `El archivo "${file.name}" excede el máximo de ${sizeMB}MB`;
    }

    if (accept !== "*/*") {
      const accepted = accept.split(",").map((t) => t.trim());
      const fileExt = `.${file.name.split(".").pop()}`;
      const fileMime = file.type;

      const ok = accepted.some((type) => {
        if (type.startsWith(".")) return type.toLowerCase() === fileExt.toLowerCase();
        if (type.endsWith("/*")) return fileMime.startsWith(type.replace("/*", ""));
        return fileMime === type;
      });

      if (!ok) return `El archivo "${file.name}" no es un tipo permitido`;
    }

    return null;
  };

  const getFileType = (file: File): FileType => {
    const m = file.type;

    if (m.startsWith("image/")) return "image";
    if (m.startsWith("video/")) return "video";
    if (m.startsWith("audio/")) return "audio";
    if (m === "application/pdf") return "pdf";
    if (m.includes("word") || m.includes("document")) return "document";
    if (m.includes("sheet") || m.includes("excel")) return "spreadsheet";
    if (m.includes("zip") || m.includes("rar")) return "archive";

    return "file";
  };

  const processFiles = (list: FileList) => {
    const incoming = Array.from(list);

    if (!multiple && incoming.length > 1) {
      const msg = "Solo se permite un archivo";
      setErrorMessage(msg);
      onError?.(msg);
      return;
    }

    const total = files.length + incoming.length;
    if (multiple && total > maxFiles) {
      const msg = `Máximo ${maxFiles} archivos permitidos`;
      setErrorMessage(msg);
      onError?.(msg);
      return;
    }

    const newFiles: FileUploadItem[] = [];

    for (const file of incoming) {
      const v = validateFile(file);
      if (v) {
        setErrorMessage(v);
        onError?.(v);
        return;
      }

      const type = getFileType(file);
      const preview = showPreview && type === "image" ? URL.createObjectURL(file) : null;

      newFiles.push({
        file,
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type,
        preview,
      });
    }

    const updated = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updated);
    setErrorMessage("");
    onChange?.(updated.map((f) => f.file));
  };

  const removeFile = (id: string) => {
    const removed = files.find((f) => f.id === id);
    if (removed?.preview) URL.revokeObjectURL(removed.preview);

    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    setErrorMessage("");

    onChange?.(updated.map((f) => f.file));
    if (removed) onRemove?.(removed.file);
  };

  return {
    files,
    errorMessage,
    setErrorMessage,
    processFiles,
    removeFile,
  };
};
