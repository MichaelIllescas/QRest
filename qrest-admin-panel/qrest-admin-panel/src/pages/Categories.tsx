import React, { useEffect, useState } from "react";
import Container from "../shared/components/Container";
import "../shared/styles/PageLayout.css";
import RegisterCategoryForm from "../features/categories/components/RegisterCategoryForm";
import { Table } from "../shared/components/Table/Table";
import type { Category } from "../features/categories/types/category";
import { useListCategory } from "../features/categories/hooks/useListCategory";

const Categories: React.FC = () => {
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);
  const { categories, loading, error, setError, listCategory } = useListCategory();

  const columns: TableColumn<Category>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    {
      key: "active",
      label: "Activa",
      render: (value: boolean) => (value ? "Sí" : "No"),
    },
  ];

  useEffect(() => {
    listCategory();
  }, []);

  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">Categorías</h1>
        <p className="page-description">
          Gestiona las categorías de tu carta digital
        </p>
      </div>

      {/* Área de contenido estandarizada */}
      <div className="page-content">
        <div>
          <div className="container-button-manager">
            <button
              className="btn btn-primary mb-4"
              onClick={() => {
                setFormRegisterOpen(!formRegisterOpen);
                setError(null);
                if (formRegisterOpen) {
                  listCategory();
                }
              }}
            >
              {formRegisterOpen ? "Ver Listado" : "Registrar Nueva Categoría"}
            </button>
          </div>

          {/* Mostrar error */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error.message}
            </div>
          )}

          {/* Mostrar loading */}
          {loading && (
            <div className="loading-message">
              <p>Cargando categorías...</p>
            </div>
          )}

          {/* Mostrar tabla siempre que no esté el formulario abierto */}
          {!formRegisterOpen && !loading && (
            <Table
              columns={columns}
              data={categories}
              mode="full"
              variant="compact"
              itemsPerPage={4}
              title="Listado de Categorías"
              actions={(_row: Category) => (
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
