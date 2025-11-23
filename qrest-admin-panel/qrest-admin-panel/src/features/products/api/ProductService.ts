import { apiClient } from "../../../app/config/api/apiClient";
import type { Product } from "../types/product";

/**
 * Servicios relacionados con productos.
 *
 * Aquí definimos funciones que llaman a los endpoints de la API relacionados con productos.
 * Cada función corresponde a una operación específica (CRUD, búsquedas, etc.).
 *
 * ✅ Centraliza las llamadas a la API en un solo lugar.
 * ✅ Facilita el mantenimiento y las pruebas.
 * ✅ Separa la lógica de negocio de la lógica de presentación.
 */


const PRODUCT_REGISTER_ENDPOINT = "/api/admin/products/create";
const PRODUCT_LIST_ENDPOINT = "/api/admin/products/list";

//servicio para registrar productos
const registerProduct = async (product: Product): Promise<Product> => {
  const { data } = await apiClient.post<Product>(
    PRODUCT_REGISTER_ENDPOINT,
    product
  );
  return data;
};

const listProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>(PRODUCT_LIST_ENDPOINT);
  return data;
};

export const productService = {
  create: registerProduct,
  list: listProducts,
};