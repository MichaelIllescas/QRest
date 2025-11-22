/**
 * hook para listar las categorías, maneja los loadings y los errores
 */
import { useState } from "react";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/category";

export const useListCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
 
    const listCategory = async () => {
    
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }   
    };
    return { categories, loading, error, setError, listCategory };
}
    
