import { useState } from "react";
import { categoryService } from "../api/categoryService";   
import type { CategoryUpdateDTO } from "../types/category";

export const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [updated, setUpdated] = useState(false);  

    const updateCategory = async (id: number, data: CategoryUpdateDTO) => {
        setError(null);
        setUpdated(false);

        try {
            setLoading(true);
            await categoryService.Updatecategory(id, data);
            setUpdated(true);
        } catch (err: any) {
            const backendMessage =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Error  al actualizar la categoría";

            setError(new Error(backendMessage));
            } finally {
                setLoading(false);
            }
    };
    return {updateCategory, loading, error, updated, setError};
};