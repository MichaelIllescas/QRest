import React from "react";
import styles from "../../styles/ActionButtons.module.css";

interface ActionButtonsProps {
    children: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    children,
    align = 'center',
}) => {
    return (
        <div className={`${styles.actionButtons} ${styles[align]}`}>
            {children}
        </div>
    );
};
