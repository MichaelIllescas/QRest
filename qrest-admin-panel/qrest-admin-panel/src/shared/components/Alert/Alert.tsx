import { useState, ReactNode } from "react";
import styles from "./Alert.module.css";

type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  icon?: boolean;
  className?: string;
}

export function Alert({
  variant = "info",
  title,
  children,
  closable = false,
  onClose,
  icon = true,
  className = "",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const icons: Record<AlertVariant, JSX.Element> = {
    success: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>),
    error: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/></svg>),
    warning: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/></svg>),
    info: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/></svg>),
  };

  const alertClassName = `${styles.alert} ${styles[`alert--${variant}`]} ${className}`;

  return (
    <div className={alertClassName} role="alert">
      {icon && <div className={styles.alert__icon}>{icons[variant]}</div>}
      <div className={styles.alert__content}>
        {title && <div className={styles.alert__title}>{title}</div>}
        <div className={styles.alert__message}>{children}</div>
      </div>
      {closable && (
        <button className={styles.alert__close} onClick={handleClose} aria-label="Cerrar alerta">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  );
}
