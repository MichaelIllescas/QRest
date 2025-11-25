import React, { useEffect, useState } from "react";
import Container from "../shared/components/Container";
import "../shared/styles/PageLayout.css";
import RegisterCategoryForm from "../features/categories/components/RegisterCategoryForm";
import { Table } from "../shared/components/Table/Table";
import type { TableColumn } from "../shared/components/Table/table.types";
import type { Category } from "../features/categories/types/category";
import { useListCategory } from "../features/categories/hooks/useListCategory";
import { AlertModal } from "../shared/components/Alert/AlertModal";
import { useDeleteCategory } from "../features/categories/hooks/useDeleteCategory";
import { Alert } from "../shared/components/Alert/Alert";
import EditCategoryForm from "../features/categories/components/EditCategoryForm";
const Categories: React.FC = () => {
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const [updateSuccessMessage, setUpdateSuccessMessage] = useState<string | null>(null);
  
  const { categories, loading, error, setError, listCategory } = useListCategory();
  const { 
    deleteCategory, 
    loading: deleteLoading, 
    error: deleteError, 
    deleted,
    setError: setDeleteError 
  } = useDeleteCategory();

  const columns: TableColumn<Category>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    {
      key: "active",
      label: "Activa",
      render: (value) => (value ? "Sí" : "No"),
    },
  ];
  const mockCategories: Category[] = [
    { id: 1, name: "Entrantes",  active: true },
    { id: 2, name: "Platos Principales", active: true },
    { id: 3, name: "Postres", active: false },
  ];

  useEffect(() => {
    listCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseAllForms = () => {
    setFormRegisterOpen(false);
    setCategoryToEdit(null);
    setError(null);
  };

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

          {/* Mostrar error de listado */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error.message}
            </div>
          )}

          {/* Mostrar error de eliminación */}
          {deleteError && (
            <Alert
              variant="error"
              title="Error al Eliminar la categoría"
              closable
              onClose={() => setDeleteError(null)}
            >
              {deleteError.message}
            </Alert>
          )}

          {/* Mostrar éxito de eliminación */}
          {deleted && (
            <Alert
              variant="success"
              title="Categoría Eliminada"
              closable
              onClose={() => listCategory()}
            >
              La categoría ha sido eliminada exitosamente.
            </Alert>
          )}

           {/* 👇 NUEVO: Mostrar éxito de actualización */}
           {updateSuccessMessage && (
            <Alert
              variant="success" 
              title="Categoría Actualizada"
              closable
              onClose={() => setUpdateSuccessMessage(null)}
            >
              {updateSuccessMessage}
            </Alert>
          )}

          {/* Mostrar loading */}
          {loading && (
            <div className="loading-message">
              <p>Cargando categorías...</p>
            </div>
          )}

          {/* Mostrar tabla siempre que no esté el formulario abierto */}
          {!formRegisterOpen && !loading && (
            <Table<Category>
              columns={columns}
              data={categories}
              mode="full"
              variant="compact"
              itemsPerPage={4}
              title="Listado de Categorías"
              actions={(row: Category) => (
                <>
                {/* 👇 BOTÓN DE EDITAR FUNCIONAL */}
                  <button className="btn btn-secondary"
                  onClick={() => {
                    setCategoryToEdit(row);
                    setFormRegisterOpen(false);
                  }}
                  >
                    📝
                    </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setCategoryToDelete(row.id!)}
                    disabled={deleteLoading}
                  >
                    🗑️
                  </button>
                </>
              )}
            ></Table>
          )}
          {formRegisterOpen && <RegisterCategoryForm />}

          {/* 👇 Mostrar formulario de edición */}
          {categoryToEdit !== null && (
            <EditCategoryForm
              category={categoryToEdit}
              onSuccess={() => {
                handleCloseAllForms();
                listCategory();
                setUpdateSuccessMessage("La categoría ha sido actualizada correctamente.");
              }}
              onCancel={handleCloseAllForms}
            />
          )}

        </div>
      </div>

      <AlertModal
        title="Eliminar Categoría"
        variant="error"
        isOpen={categoryToDelete !== null}
        onClose={() => {
          setCategoryToDelete(null);
          setDeleteError(null);
        }}
        onConfirm={async () => {
          if (categoryToDelete !== null) {
            await deleteCategory(categoryToDelete);
            setCategoryToDelete(null);
            listCategory();
          }
        }}
        showCancelButton
        confirmText={deleteLoading ? "Eliminando..." : "Eliminar"}
      >
        ¿Estás seguro de que deseas eliminar esta categoría?
      </AlertModal>
    </Container>
  );
};

export default Categories;
