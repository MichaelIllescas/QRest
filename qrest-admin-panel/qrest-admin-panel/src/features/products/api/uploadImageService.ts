import { apiClient } from "../../../app/config/api/apiClient";

/**
 * Representa la respuesta que esperamos del backend
 * después de subir una imagen.
 *
 * Ajustá este tipo si tu backend devuelve más campos
 * (por ejemplo: id, nombre original, tamaño, etc.).
 */
export interface UploadImageResponse {
  imageUrl: string; // URL pública o relativa de la imagen subida
}

/**
 * Endpoint fijo del backend para subir imágenes.
 *
 * 👉 Si algún día cambia la ruta, solo la modificás acá.
 * 👉 Así evitamos "strings mágicos" repartidos por el código.
 */
const UPLOAD_IMAGE_ENDPOINT = "/api/admin/product-images/upload";

/**
 * Servicio responsable de subir una o varias imágenes al backend.
 *
 * ✅ Recibe un File o un array de File
 * ✅ Construye un FormData compatible con multipart/form-data
 * ✅ Llama al backend usando apiClient (ej: Axios configurado)
 * ✅ Devuelve la respuesta tipada que viene del backend
 *
 * No maneja estados de UI (loading, error, etc.).
 * Eso queda para el hook o el componente que lo use.
 *
 * @param files Archivo único o lista de archivos a subir
 * @returns Promesa con la respuesta del backend
 */
export const uploadImageService = async (
  files: File | File[]
): Promise<UploadImageResponse> => {
  // 🔹 Normalizamos la entrada:
  // Si `files` es un solo File, lo convertimos en array.
  // De esta forma, el resto del código siempre trabaja con un array.
  const normalizedFiles = Array.isArray(files) ? files : [files];

  // 🔹 FormData es el formato estándar para enviar archivos por HTTP
  // con el tipo `multipart/form-data`.
  const formData = new FormData();

  // 🔹 Recorremos todos los archivos y los agregamos al FormData.
  // El nombre del campo ("file") debe coincidir con lo que espera el backend.
  normalizedFiles.forEach((file) => {
    formData.append("file", file);
  });

  // 🔹 Enviamos la petición HTTP al backend.
  // - `UPLOAD_IMAGE_ENDPOINT`: ruta fija definida arriba.
  // - `formData`: cuerpo de la petición con los archivos.
  // - `headers`: indicamos que es multipart/form-data
  //   (muchas veces Axios lo infiere, pero dejarlo explícito es más claro).
  const { data } = await apiClient.post<UploadImageResponse>(
    UPLOAD_IMAGE_ENDPOINT,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  // 🔹 Devolvemos solo la data de interés (la respuesta del backend).
  // En este caso, algo como: { imageUrl: "https://..." }
  return data;
};
