/**
 * hook para registrar una nueva categoria
 * debe ser tipada con category, validar los campos necesarios
 */

import { useState } from "react";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/category";

interface ValidationErrors {
  name?: string;
}

export const useRegisterCategory = () => {
  const [category, setCategory] = useState<Category>({
    id: undefined,
    name: "",
    active: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: unknown): string | undefined => {
    switch (name) {
      case "name": {
        const strValue = String(value || "");
        const trimmedValue = strValue.trim();

        if (trimmedValue === "") {
          return "El nombre de la categoría es obligatorio";
        }
        if (trimmedValue.length < 3) {
          return "El nombre debe tener al menos 3 caracteres";
        }
        if (trimmedValue.length > 100) {
          return "El nombre no puede exceder 100 caracteres";
        }
        break;
      }
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    const nameError = validateField("name", category.name);
    if (nameError) errors.name = nameError;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(
      fieldName,
      category[fieldName as keyof Category]
    );
    setValidationErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async () => {
    // Marcar todos los campos como tocados
    setTouched({
      name: true,
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

      await categoryService.createCategory(category);

      setSaved(true);
      // Limpiar formulario después de guardar exitosamente
      setCategory({
        id: undefined,
        name: "",
      });
      setTouched({});
      setValidationErrors({});
    } catch (err: any) {
      const backendMessage =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err.message ??
        "Error desconocido";

      setSaveError(backendMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    category,
    isSaving,
    saved,
    saveError,
    validationErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
