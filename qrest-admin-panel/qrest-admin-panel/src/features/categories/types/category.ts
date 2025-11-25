/**
import { name } from './../../../../node_modules/ci-info/index.d';
 * Representa una categoría visible en la carta.
 * Coincide con el CategoryDTO del backend.
 */

export interface Category {
  /** ID único de la categoría */
  id?: number;
  /** Nombre de la categoría (obligatorio) */
  name: string;
  /** Indica si la categoría está activa (obligatorio) */
  active?: boolean;
}

export interface CategoryUpdateDTO {
  name  : string; 
  active: boolean;
}
