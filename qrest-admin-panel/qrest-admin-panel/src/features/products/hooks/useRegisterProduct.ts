import { useState } from "react";
import { useUploadImage } from "./useUploadImage";
import type { Product } from "../types/product";
import { productService } from "../api/ProductService";

interface ValidationErrors {
  name?: string;
  price?: string;
  categoryId?: string;
  description?: string;
}

export const useRegisterProduct = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    available: true,
    categoryId: undefined,
    imageUrl: undefined,
  });

  const { upload, isUploading, error: uploadError } = useUploadImage();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: unknown): string | undefined => {
    switch (name) {
      case "name": {
        const strValue = String(value || "");
        const trimmedValue = strValue.trim();
        
        if (!strValue || trimmedValue === "") {
          return "El nombre del producto es obligatorio";
        }
        if (trimmedValue.length < 3) {
          return "El nombre debe tener al menos 3 caracteres";
        }
        if (trimmedValue.length > 100) {
          return "El nombre no puede exceder 100 caracteres";
        }
        break;
      }

      case "price": {
        const priceNum = Number(value);
        if (value === "" || value === null || value === undefined) {
          return "El precio es obligatorio";
        }
        if (isNaN(priceNum)) {
          return "El precio debe ser un número válido";
        }
        if (priceNum < 0) {
          return "El precio no puede ser negativo";
        }
        if (priceNum > 999999) {
          return "El precio no puede exceder 999,999";
        }
        break;
      }

      case "categoryId": {
        if (!value || value === "") {
          return "Debe seleccionar una categoría";
        }
        break;
      }

      case "description": {
        const strValue = String(value || "");
        if (strValue && strValue.trim().length > 500) {
          return "La descripción no puede exceder 500 caracteres";
        }
        break;
      }
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    const nameError = validateField("name", product.name);
    if (nameError) errors.name = nameError;

    const priceError = validateField("price", product.price);
    if (priceError) errors.price = priceError;

    const categoryError = validateField("categoryId", product.categoryId);
    if (categoryError) errors.categoryId = categoryError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    const newValue = type === "checkbox" ? checked : value;

    setProduct(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, newValue);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, product[fieldName as keyof Product]);
    setValidationErrors(prev => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async () => {
    // Marcar todos los campos como tocados
    setTouched({
      name: true,
      price: true,
      categoryId: true,
      description: true,
    });

    // Validar formulario completo
    if (!validateForm()) {
      setSaveError("Por favor, corrija los errores antes de guardar");
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);
      setSaved(false);

      // 1) Subir imagen
      const img = await upload(files);

      // 2) Crear producto final
      const finalProduct: Product = {
        ...product,
        imageUrl: img.imageUrl,
      };

      // 3) Enviar al backend
      await productService.create(finalProduct);

      setSaved(true);
      // Limpiar formulario después de guardar exitosamente
      setProduct({
        name: "",
        description: "",
        price: 0,
        available: true,
        categoryId: undefined,
        imageUrl: undefined,
      });
      setFiles([]);
      setTouched({});
      setValidationErrors({});

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al guardar producto";
      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    product,
    files,
    isSaving,
    saved,
    saveError,
    uploadError,
    isUploading,
    validationErrors,
    touched,
    setFiles,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
