import React, { useState } from "react";
import Container from "../shared/components/Container";
import "../shared/styles/PageLayout.css";
import { Table } from "../shared/components/Table/Table";
import RegisterProductForm from "../features/products/components/RegisterProductForm";
import type { Product } from "../features/products/types/product";

const Products: React.FC = () => {
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);

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
    { key: "categoryId", label: "Categoría" },
    { key: "imageUrl", label: "Imagen" },
  ];

  const data: Product[] = [
    {
      id: 1,
      name: "Juan",
      description: "Producto 1",
      price: 10,
      available: true,
      categoryId: 1,
      imageUrl: "url1",
    },
    {
      id: 2,
      name: "María",
      description: "Producto 2",
      price: 20,
      available: false,
      categoryId: 2,
      imageUrl: "url2",
    },
    {
      id: 2,
      name: "María",
      description: "Producto 2",
      price: 20,
      available: false,
      categoryId: 2,
      imageUrl: "url2",
    },
    {
      id: 2,
      name: "María",
      description: "Producto 2",
      price: 20,
      available: false,
      categoryId: 2,
      imageUrl: "url2",
    },
    {
      id: 2,
      name: "María",
      description: "Producto 2",
      price: 20,
      available: false,
      categoryId: 2,
      imageUrl: "url2",
    },
    {
      id: 2,
      name: "María",
      description: "Producto 2",
      price: 20,
      available: false,
      categoryId: 2,
      imageUrl: "url2",
    },
  ];

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

          {!formRegisterOpen && (
            <Table
              columns={columns}
              data={data}
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
          )}
          {formRegisterOpen && <RegisterProductForm />}
        </div>
      </div>
    </Container>
  );
};

export default Products;
