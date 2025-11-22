import { useState } from "react";
import { useUploadImage } from "./useUploadImage";
import type { Product } from "../types/product";
import { productService } from "../api/ProductService";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setProduct(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
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

    } catch (err: any) {
      setSaveError(err.message || "Error al guardar producto");
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
    setFiles,
    handleChange,
    handleSubmit,
  };
};
