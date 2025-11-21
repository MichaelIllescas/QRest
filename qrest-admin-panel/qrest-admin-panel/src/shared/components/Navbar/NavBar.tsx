import React, {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export type NavIcon = ReactNode | string;

export interface NavDropdownLink {
  label: string;
  href: string;
  icon?: NavIcon;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: NavIcon;
  /**
   * Si se define `dropdown`, este link se renderiza como menú desplegable
   * tanto en escritorio como en mobile.
   */
  dropdown?: NavDropdownLink[];
}

export interface NavBarProps {
  logo?: string;
  logoAlt?: string;
  brand?: string;
  brandTo?: string;
  links?: NavLink[];
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
  activeColor?: string;
  fixed?: boolean;
  transparent?: boolean;
  shadow?: boolean;
  mobileBreakpoint?: string;
  className?: string;
  customStyles?: CSSProperties;
  onLinkClick?: (
    link: NavLink | NavDropdownLink,
    event: ReactMouseEvent<HTMLAnchorElement>
  ) => void;
  children?: ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({
  logo,
  logoAlt = "Logo",
  brand,
  brandTo = "/",
  links = [],
  backgroundColor = "#ffffff",
  textColor = "#333333",
  hoverColor = "#007bff",
  activeColor = "#0056b3",
  fixed = false,
  transparent = false,
  shadow = true,
  mobileBreakpoint = "768px",
  className = "",
  customStyles,
  onLinkClick,
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const location = useLocation();
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const isActiveLink = (href: string): boolean => {
    return location.pathname === href;
  };

  const handleLinkClick = (
    link: NavLink | NavDropdownLink,
    event: ReactMouseEvent<HTMLAnchorElement>
  ) => {
    if (onLinkClick) {
      onLinkClick(link, event);
    }
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (
    index: number,
    event: ReactMouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenDropdown((current) => (current === index ? null : index));
  };

  const renderIcon = (icon?: NavIcon) => {
    if (!icon) return null;

    if (typeof icon === "string") {
      const emojiRegex =
        /^[\u{1F000}-\u{1F9FF}]|^[\u{2600}-\u{26FF}]|^[\u{2700}-\u{27BF}]/u;

      if (icon.length <= 4 && emojiRegex.test(icon)) {
        return <span className={styles.iconEmoji}>{icon}</span>;
      }

      if (icon.includes("<svg")) {
        return (
          <span
            className={styles.iconSvg}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        );
      }

      return <span className={styles.iconText}>{icon}</span>;
    }

    return <span className={styles.iconComponent}>{icon}</span>;
  };

  const renderLink = (link: NavLink, index: number, isMobile = false) => {
    const active = isActiveLink(link.href);
    const linkClasses = [
      isMobile ? styles.mobileNavLink : styles.navLink,
      active ? styles.active : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Link
        key={index}
        to={link.href}
        className={linkClasses}
        onClick={(e) => handleLinkClick(link, e)}
      >
        {renderIcon(link.icon)}
        <span className={styles.linkText}>{link.label}</span>
      </Link>
    );
  };

  const renderDropdown = (link: NavLink, index: number, isMobile = false) => {
    const isOpen = openDropdown === index;

    const containerClass = [
      isMobile ? styles.mobileDropdown : styles.dropdown,
      isOpen ? styles.open : "",
    ]
      .filter(Boolean)
      .join(" ");

    const toggleClass = isMobile
      ? styles.mobileDropdownToggle
      : styles.dropdownToggle;

    const menuClass = isMobile
      ? styles.mobileDropdownMenu
      : styles.dropdownMenu;

    const itemClass = isMobile
      ? styles.mobileDropdownLink
      : styles.dropdownLink;

    return (
      <div key={index} className={containerClass}>
        <button
          className={toggleClass}
          onClick={(e) => handleDropdownToggle(index, e)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          type="button"
        >
          {renderIcon(link.icon)}
          <span className={styles.linkText}>{link.label}</span>
          <span
            className={[
              styles.dropdownArrow,
              isOpen ? styles.open : "",
            ].join(" ")}
          >
            ▼
          </span>
        </button>

        {isOpen && link.dropdown && (
          <div className={menuClass}>
            {link.dropdown.map((dropdownLink, dropdownIndex) => {
              const active = isActiveLink(dropdownLink.href);

              const dropdownClasses = [
                itemClass,
                active ? styles.active : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <Link
                  key={dropdownIndex}
                  to={dropdownLink.href}
                  className={dropdownClasses}
                  onClick={(e) => handleLinkClick(dropdownLink, e)}
                >
                  {renderIcon(dropdownLink.icon)}
                  <span className={styles.linkText}>
                    {dropdownLink.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const navStyles: CSSProperties = {
    backgroundColor: transparent ? "transparent" : backgroundColor,
    color: textColor,
    position: fixed ? "fixed" : "relative",
    boxShadow: shadow && !transparent ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
    "--text-color": textColor,
    "--hover-color": hoverColor,
    "--active-color": activeColor,
    "--background-color": backgroundColor,
    "--mobile-breakpoint": mobileBreakpoint,
    ...customStyles,
  } as CSSProperties;

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        className={[
          styles.navbar,
          className,
          fixed ? styles.fixed : "",
          transparent ? styles.transparent : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={navStyles}
      >
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>
            <Link to={brandTo} className={styles.brandLink}>
              {logo && (
                <img src={logo} alt={logoAlt} className={styles.logo} />
              )}
              {brand && <span className={styles.brandText}>{brand}</span>}
            </Link>
          </div>

          <div className={styles.navLinks}>
            {links.map((link, index) =>
              link.dropdown && link.dropdown.length > 0
                ? renderDropdown(link, index, false)
                : renderLink(link, index, false)
            )}
          </div>

          {children && <div className={styles.navExtra}>{children}</div>}

          <button
            className={[
              styles.mobileMenuButton,
              isMobileMenuOpen ? styles.open : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={styles.mobileNav}>
            {links.map((link, index) =>
              link.dropdown && link.dropdown.length > 0
                ? renderDropdown(link, index, true)
                : renderLink(link, index, true)
            )}
          </div>
        )}
      </nav>
    </>
  );
};
