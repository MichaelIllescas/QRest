import React, { useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import type { FileUploadProps } from "./types";
import { useFileUpload } from "./index";

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  label = "Subir Archivos",
  accept = "*/*",
  multiple = false,
  maxSize = 10485760,
  maxFiles = 5,
  disabled = false,
  required = false,
  variant = "default",
  size = "medium",
  showPreview = true,
  showFileList = true,
  dragAndDrop = true,
  helperText = "",
  error = "",
  className = "",
  onChange,
  onError,
  onRemove,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    files,
    errorMessage,
    processFiles,
    removeFile,
  } = useFileUpload({
    accept,
    multiple,
    maxSize,
    maxFiles,
    showPreview,
    onChange,
    onError,
    onRemove,
  });

  const dropzoneClass = [
    styles.dropzone,
    isDragging ? styles["dropzone--dragging"] : "",
    disabled ? styles["dropzone--disabled"] : "",
    errorMessage ? styles["dropzone--error"] : "",
    files.length > 0 ? styles["dropzone--hasFiles"] : "",
  ].join(" ");

  return (
    <div className={`${styles.fileUpload} ${styles[`fileUpload--${variant}`]} ${styles[`fileUpload--${size}`]} ${className}`}>
      
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {helperText && !errorMessage && (
        <p className={styles.helperText}>{helperText}</p>
      )}

      <div
        className={dropzoneClass}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          if (dragAndDrop && !disabled) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (dragAndDrop && !disabled) setIsDragging(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (dragAndDrop && !disabled && e.dataTransfer.files) {
            setIsDragging(false);
            processFiles(e.dataTransfer.files);
          }
        }}
      >
        <input
          ref={fileInputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          onChange={(e) => e.target.files && processFiles(e.target.files)}
          className={styles.input}
          {...props}
        />

        <div className={styles.dropzoneContent}>
          <div className={styles.uploadIcon}>📁</div>
          <p className={styles.dropzoneText}>
            {isDragging
              ? "Suelta los archivos aquí"
              : dragAndDrop
              ? "Arrastra archivos o haz clic"
              : "Haz clic para cargar"}
          </p>
        </div>
      </div>

      {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}

      {showFileList && files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((f) => (
            <div key={f.id} className={styles.fileItem}>
              {showPreview && f.preview ? (
                <div className={styles.filePreview}>
                  <img src={f.preview} alt={f.name} className={styles.previewImage} />
                </div>
              ) : (
                <div className={styles.fileIcon}>📎</div>
              )}

              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{f.name}</p>
                <p className={styles.fileSize}>{(f.size / 1024).toFixed(1)} KB</p>
              </div>

              <button
                type="button"
                className={styles.removeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(f.id);
                }}
                disabled={disabled}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
