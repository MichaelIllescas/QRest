import { useState } from "react";
import { productService } from "../api/ProductService";
import type { Product } from "../types/product";

export const useListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.list();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    products,
    isLoading,
    error,
    fetchProducts,
  };
};
