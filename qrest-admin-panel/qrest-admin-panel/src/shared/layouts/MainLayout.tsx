import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/Navigation/AdminNavbar";
import "./MainLayout.css";
import { Footer } from "../components/Footer/index";
import Container from "../components/Container";

const MainLayout: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <Container fluid={true} className="main-layout navbar-fixed">
        <main className="main-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </Container>

      <Footer
        size="medium"
        copyrightText="© Todos los derechos reservados"
        showDivider={false}
        copyrightNode={
          <span>
            © 2025{" "}
            <a
              href="https://imperial-net.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#f97316", textDecoration: "none" }}
            >
              Imperial Net
            </a>{" "}
            — Todos los derechos reservados.
          </span>
        }
      ></Footer>
    </>
  );
};

export default MainLayout;
