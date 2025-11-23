
/**
 * Representa un producto visible en la carta.
 * Coincide con el ProductDTO del backend.
 */
export interface Product {
  /** ID único del producto */
  id?: number;

  /** Nombre del producto (obligatorio) */
  name: string;

  /** Descripción opcional del producto */
  description?: string;

  /** Precio actual del producto */
  price: number;

  /** Indica si está disponible para el público */
  available?: boolean;

  /** URL de la imagen del producto (opcional) */
  imageUrl?: string;

  /** Categoría del producto, si deseas incluirla */
  categoryId?: number;
}
