import React, { useEffect, useState } from "react";
import Container from "../shared/components/Container";
import "../shared/styles/PageLayout.css";
import { Table } from "../shared/components/Table/Table";
import type { TableColumn } from "../shared/components/Table/table.types";
import RegisterProductForm from "../features/products/components/RegisterProductForm";
import type { Product } from "../features/products/types/product";
import { useListProducts } from "../features/products/hooks/useListProducts";

const Products: React.FC = () => {
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);
  const { products, isLoading, error, fetchProducts } = useListProducts();

  const columns: TableColumn<Product>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "price", label: "Precio" },
    {
      key: "available",
      label: "Disponible",
      render: (value: boolean) => (value ? "Sí" : "No"),
    },
    { key: "categoryName", label: "Categoría" },
    { key: "imageUrl", label: "Imagen" },
  ];




  useEffect(() => {

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">Productos</h1>
        <p className="page-description">
          En esta seccion gestionara los productos que seran visibles en su menu
          digital
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
              {formRegisterOpen ? "Ver Listado" : "Registrar Nuevo Producto"}
            </button>
          </div>

          {!formRegisterOpen &&

            

            (isLoading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
             
              <Table
                columns={columns}
                data={products}
                mode="full"
                itemsPerPage={4}
                title="Listado de Productos"
                actions={(row: Product) => (
                  <>
                    <button className="btn btn-secondary">📝</button>
                    <button className="btn btn-danger">🗑️</button>
                  </>
                )}
              ></Table>
            ))}
          {formRegisterOpen && <RegisterProductForm  />}
        </div>
      </div>
    </Container>
  );
};

export default Products;
