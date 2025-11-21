# `<NavBar />` — Componente de navegación (React + TypeScript)

Componente de barra de navegación reutilizable, pensado para funcionar con
**React Router** y **CSS Modules**, soportando:

- Links simples
- Dropdowns (desktop y mobile)
- Menú mobile con overlay
- Personalización de colores vía props y CSS custom properties
- Slot para contenido extra (por ejemplo, menú de usuario o botones)

---

## Importación

```tsx
import { NavBar, type NavLink } from "@/components/navbar";
```

> Asumiendo que el `index.ts` está en `src/components/navbar`.

---

## Tipos

```ts
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
  dropdown?: NavDropdownLink[];
}
```

---

## Props

```ts
interface NavBarProps {
  logo?: string;
  logoAlt?: string;          // por defecto "Logo"
  brand?: string;
  brandTo?: string;          // por defecto "/"
  links?: NavLink[];         // por defecto []
  backgroundColor?: string;  // por defecto "#ffffff"
  textColor?: string;        // por defecto "#333333"
  hoverColor?: string;       // por defecto "#007bff"
  activeColor?: string;      // por defecto "#0056b3"
  fixed?: boolean;           // por defecto false
  transparent?: boolean;     // por defecto false
  shadow?: boolean;          // por defecto true
  mobileBreakpoint?: string; // por defecto "768px"
  className?: string;
  customStyles?: React.CSSProperties;
  onLinkClick?: (
    link: NavLink | NavDropdownLink,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => void;
  children?: React.ReactNode; // Contenido extra a la derecha
}
```

---

## Ejemplo básico

```tsx
const links: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Carta", href: "/menu" },
  {
    label: "Reportes",
    href: "#",
    dropdown: [
      { label: "Recaudación diaria", href: "/reports/daily" },
      { label: "Top productos", href: "/reports/top-products" },
    ],
  },
];

export function Layout() {
  return (
    <NavBar
      logo="/assets/logo-qrest.png"
      brand="QRest"
      brandTo="/"
      links={links}
      backgroundColor="#ffffff"
      textColor="#111827"
      hoverColor="#0ea5e9"
      activeColor="#0369a1"
      fixed
    >
      <div>
        <span>Hola, Admin</span>
      </div>
    </NavBar>
  );
}
```

---

## Ejemplo con íconos

```tsx
import { FiHome, FiSettings } from "react-icons/fi";

const links: NavLink[] = [
  {
    label: "Inicio",
    href: "/",
    icon: <FiHome />,
  },
  {
    label: "Configuración",
    href: "#",
    icon: <FiSettings />,
    dropdown: [
      { label: "Restaurante", href: "/settings/restaurant" },
      { label: "Usuarios", href: "/settings/users" },
    ],
  },
];
```

---

## Notas de uso

- El componente está pensado para usarse dentro de un `BrowserRouter` de React Router.
- Los estilos se manejan con `Navbar.module.css` y se apoyan en CSS variables:
  - `--text-color`
  - `--hover-color`
  - `--active-color`
  - `--background-color`
  - `--mobile-breakpoint`
- Para cambiar el breakpoint de mobile, usá la prop `mobileBreakpoint` y manejalo en tu CSS module.
- `onLinkClick` te permite enganchar analíticas o side effects cada vez que se hace click en un enlace.
