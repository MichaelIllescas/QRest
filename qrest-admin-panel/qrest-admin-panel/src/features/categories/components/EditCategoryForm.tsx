import React, {useState, useEffect} from "react";
import {useUpdateCategory} from "../hooks/useUpdateCategory";
import type {Category} from "../types/category";
import { Alert } from "../../../shared/components/Alert/Alert";

interface EditCategoryFormProps {
    category: Category;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ 
    category, 
    onSuccess,
     onCancel
     }) => {
        const [name, setName] = useState(category.name);
        const [active, setActive] = useState(category.active);

        const {updateCategory, loading, error, updated, setError} = useUpdateCategory();

        useEffect(() => {
            if (updated) {
                onSuccess();
            }
        }, [updated, onSuccess]);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (!name.trim()) {
                setError({message: "El nombre de la categoría es obligatorio"});
                return;
            }
            await updateCategory(category.id!, {name: name.trim(), active});
        };

            return (
                <div className="form-container">
                    <h2>Editar Categoría</h2>

                    {error && (
                        <Alert 
                        variant="error"
                    title="Error"
                closable
                 onClose={() => setError(null)}
                >
                    {error.message}
                </Alert>
            )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre De La Categoria:</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}  
                                required
                            />  
                        </div>
                        <div className="form-group">
                            <label htmlFor="active">
                                <input 
                                id="active"
                                type="checkbox"
                                checked={active}
                                onChange={(e) => setActive(e.target.checked)}
                                disabled={loading}  
                                 />
                                 {" "}Categoria activa
                                 
                            </label>
                </div>
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Guardando..." : "Guardar Cambios"}
                            </button>
                            </div>
                            </form>
                            </div>
            );
    };
export default EditCategoryForm;
