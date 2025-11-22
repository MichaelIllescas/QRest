import { useEffect, ReactNode, MouseEvent } from "react";
import styles from "./AlertModal.module.css";

type AlertVariant = "success" | "error" | "warning" | "info" | "question";

export interface AlertModalProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  icon?: boolean;
}

export function AlertModal({
  variant = "info",
  title,
  children,
  isOpen = false,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showCancelButton = false,
  icon = true,
}: AlertModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose?.();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const icons: Record<AlertVariant, JSX.Element> = {
    success: (<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12.5L10.5 15L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
    error: (<svg width="64" height="64" viewBox="0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
    warning: (<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
    info: (<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
    question: (<svg width="64" height="64" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>)
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles[`modal--${variant}`]}`}>
        {icon && (
          <div className={`${styles.modal__icon} ${styles[`modal__icon--${variant}`]}`}>
            {icons[variant]}
          </div>
        )}
        {title && <h2 className={styles.modal__title}>{title}</h2>}
        <div className={styles.modal__content}>{children}</div>
        <div className={styles.modal__actions}>
          {showCancelButton && (
            <button className={`${styles.modal__button} ${styles["modal__button--cancel"]}`} onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button
            className={`${styles.modal__button} ${styles["modal__button--confirm"]} ${styles[`modal__button--${variant}`]}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
