import React, { useState } from "react";
import styles from "./ImagePreview.module.css";

export interface ImagePreviewProps {
  imageUrl?: string | null;
  size?: "small" | "medium" | "large" | "full";
  alt?: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  size = "medium",
  alt = "Preview",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasImage = Boolean(imageUrl && imageUrl.trim() !== "");

  const handleOpen = () => {
    if (hasImage) setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Preview */}
      <div
        className={`${styles.container} ${styles[size]} ${className}`}
        onClick={handleOpen}
      >
        {hasImage ? (
          <img src={imageUrl!} alt={alt} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🖼️</span>
            <p className={styles.placeholderText}>Sin imagen</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className={styles.lightboxOverlay} onClick={handleClose}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={imageUrl!} alt={alt} className={styles.lightboxImage} />

            <button className={styles.closeButton} onClick={handleClose}>
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
