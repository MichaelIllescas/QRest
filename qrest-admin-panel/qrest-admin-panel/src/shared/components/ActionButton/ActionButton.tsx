import React from "react";
import styles from "../../styles/ActionButton.module.css";

export type ActionButtonVariant = 'edit' | 'delete' | 'add' | 'view' | 'succes' | 'warning';

interface ActionButtonProps {
    variant: ActionButtonVariant;
    onClick: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    label?: string;
    size?: 'small' | 'medium' | 'large';

}

export const ActionButton: React.FC<ActionButtonProps> = ({
    variant,
    onClick,
    disabled = false,
    icon,
    label,
    size = 'medium',

}) => {
    return (
        <button
        className={`${styles.actionButton} ${styles[variant]} ${styles[size]}`}
        onClick={onClick}
        disabled={disabled}
        title={label}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {label && <span className={styles.label}>{label}</span>}    
        </button>
    );
};
