import React, { useState } from "react";
import Container from "../shared/components/Container";
import "../shared/styles/PageLayout.css";
import RegisterCategoryForm from "../features/categories/components/RegisterCategoryForm";
import { Table } from "../shared/components/Table/Table";
import type { Category } from "../features/categories/types/category";

const Categories: React.FC = () => {
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);

  const columns: TableColumn<Category>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    {
      key: "active",
      label: "Activa",
      render: (value: boolean) => (value ? "Sí" : "No"),
    },
  ];
  const data: Category[] = [
    { id: 1, name: "Categoría 1", active: true },
    { id: 2, name: "Categoría 2", active: true },
    { id: 3, name: "Categoría 3", active: false },
    { id: 4, name: "Categoría 4", active: true },
    { id: 5, name: "Categoría 5", active: true },
    { id: 5, name: "Categoría 6", active: true },
    { id: 7, name: "Categoría 7", active: true },
  ];

  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">Categorías</h1>
        <p className="page-description">
          Aquí va el título principal de la sección Categorías
        </p>
      </div>

      {/* Área de contenido estandarizada */}
      <div className="page-content">
        <div>
          <div className="container-button-manager">
            <button
              className="btn btn-primary mb-4"
              onClick={() => setFormRegisterOpen(!formRegisterOpen)}
            >
              {formRegisterOpen ? "Ver Listado" : "Registrar Nueva Categoría  "}
            </button>
          </div>

          {!formRegisterOpen && (
            <Table
              columns={columns}
              data={data}
              mode="full"
              variant="compact"
              itemsPerPage={4}
              title="Listado de Categorías"
              actions={(row: Category) => (
                <>
                  <button className="btn btn-secondary">📝</button>
                  <button className="btn btn-danger">🗑️</button>
                </>
              )}
            ></Table>
          )}
          {formRegisterOpen && <RegisterCategoryForm />}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
