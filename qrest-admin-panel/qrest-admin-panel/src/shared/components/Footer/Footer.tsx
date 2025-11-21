import React from "react";
import styles from "./Footer.module.css";

export type FooterSize = "small" | "medium" | "large";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title?: string;
  links?: FooterLink[];
  content?: React.ReactNode;
}

export interface FooterProps {
  /** Tamaño del footer */
  size?: FooterSize;

  /** Secciones (opcional) */
  sections?: FooterSection[];

  /** Contenido libre debajo de las secciones */
  children?: React.ReactNode;

  /** Clase externa opcional */
  className?: string;

  /** Copyright como texto plano */
  copyrightText?: string;

  /** Copyright como JSX (reemplaza al texto si está presente) */
  copyrightNode?: React.ReactNode;

  /** Mostrar o no línea divisoria inferior */
  showDivider?: boolean;

  /** Estilos inline opcionales */
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({
  size = "medium",
  sections = [],
  children,
  className = "",
  copyrightText,
  copyrightNode,
  showDivider = true,
  style
}) => {
  return (
    <footer
      className={`${styles.footer} ${styles[size]} ${className}`}
      style={style}
    >
      <div className={styles.inner}>
        {/* Secciones dinámicas */}
        {sections.length > 0 && (
          <div className={styles.sections}>
            {sections.map((section, i) => (
              <div key={i} className={styles.section}>
                {section.title && (
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                )}

                {/* Links */}
                {section.links && (
                  <div className={styles.linksList}>
                    {section.links.map((link, j) =>
                      link.external ? (
                        <a
                          key={j}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a key={j} href={link.href} className={styles.link}>
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                )}

                {/* Contenido personalizado */}
                {section.content && (
                  <div className={styles.customContent}>{section.content}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Children libres */}
        {children && <div className={styles.childrenArea}>{children}</div>}
      </div>

      {/* Divider */}
      {showDivider && <div className={styles.divider} />}

      {/* Copyright (texto o node) */}
      {(copyrightNode || copyrightText) && (
        <div className={styles.bottomBar}>
          {copyrightNode ?? copyrightText}
        </div>
      )}
    </footer>
  );
};
