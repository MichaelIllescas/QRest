/**
 * hook para eliminar categorías
 */
import { useState } from "react";
import { categoryService } from "../api/categoryService";

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleted, setDeleted] = useState(false);

  const deleteCategory = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      setDeleted(false);
      
      await categoryService.deleteCategory(id);
      
      setDeleted(true);
    } catch (err: any) {
      setError({ message: err.response?.data?.message || "Error desconocido" } as Error);
      setDeleted(false);
    } finally {
      setLoading(false);
    }
  };

  return { 
    deleteCategory, 
    loading, 
    error, 
    deleted, 
    setError 
  };
};
