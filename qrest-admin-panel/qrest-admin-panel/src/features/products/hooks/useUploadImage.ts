import { useState } from "react";
import { uploadImageService } from "../api/uploadImageService";
import type { UploadImageResponse } from "../api/uploadImageService";

/**
 * Custom hook para subir imágenes con feedback de UI.
 *
 * ✅ Maneja loading, éxito y error
 * ✅ No recibe endpoint — responsabilidad del servicio
 * ✅ Ideal para formularios con upload
 */
export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadImageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sube uno o varios archivos al backend.
   */
  const upload = async (files: File | File[]): Promise<UploadImageResponse> => {
    try {
      setIsUploading(true);
      setError(null);

      const response = await uploadImageService(files);

      setUploaded(response);
      return response;

    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Error al subir la imagen";

      setError(message);
      throw err;

    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Limpia resultado y error — útil después de mostrar notificaciones.
   */
  const reset = () => {
    setUploaded(null);
    setError(null);
  };

  return {
    upload,
    isUploading,
    uploaded,
    error,
    reset,
  };
};
