import React, { useState, useRef, useEffect } from "react";
import styles from "./UserMenu.module.css";

export interface UserMenuProps {
  userInfo?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  userInfo,
  onChangePassword,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú cuando se hace click fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword();
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  // Avatar por defecto si no se proporciona uno
  const getInitials = () => {
    if (userInfo?.name) {
      return userInfo.name
        .split(" ")
        .map((word) => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    return "AD"; // Admin por defecto
  };

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.userButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <div className={styles.userAvatar}>
          {userInfo?.avatar ? (
            <img src={userInfo.avatar} alt="Avatar del usuario" />
          ) : (
            <span className={styles.avatarInitials}>{getInitials()}</span>
          )}
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {userInfo?.name || "Administrador"}
          </span>
          {userInfo?.email && (
            <span className={styles.userEmail}>{userInfo.email}</span>
          )}
        </div>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button
            className={styles.menuItem}
            onClick={handleChangePassword}
            type="button"
          >
            <svg
              className={styles.menuIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <span>Cambiar Contraseña</span>
          </button>
          
          <hr className={styles.separator} />
          
          <button
            className={`${styles.menuItem} ${styles.logoutItem}`}
            onClick={handleLogout}
            type="button"
          >
            <svg
              className={styles.menuIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};