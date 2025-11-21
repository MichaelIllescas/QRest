import React from "react";
import { NavBar } from "../Navbar";
import { UserMenu } from "../UserMenu";
import type { NavLink } from "../Navbar";

export const AdminNavbar: React.FC = () => {
  // Enlaces principales de navegación del admin panel
  const navigationLinks: NavLink[] = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Productos",
      href: "/products",
    },
    {
      label: "Categorías",
      href: "/categories",
    },

    {
      label: "Pedidos",
      href: "/orders",
    },
    {
      label: "Mesas",
      href: "/tables",
    },
    {
      label: "Reportes",
      href: "/reports",
    },
    {
      label: "Usuarios",
      href: "/users",
    }
  ];

  // Handlers para el menú de usuario (sin funcionalidad por ahora)
  const handleChangePassword = () => {
    console.log('Cambiar contraseña - funcionalidad por implementar');
  };

  const handleLogout = () => {
    console.log('Cerrar sesión - funcionalidad por implementar');
  };

  return (
    <NavBar
      brand="QRest Admin"
      brandTo="/"
      links={navigationLinks}
      fixed={true}
      transparent={true}
      shadow={true}
    >
      <UserMenu
        userInfo={{
          name: "Administrador",
          email: "admin@qrest.com"
        }}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />
    </NavBar>
  );
};
