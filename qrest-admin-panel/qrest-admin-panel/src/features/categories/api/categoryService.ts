/**
 * servicio para llamar las api de categorias
 */

import { apiClient } from '../../../app/config/api/apiClient';
import type { Category } from '../types/category';

//URL DE LOS ENPOINTS
const CREATE_CATEGORY_URL = '/api/admin/categories/create';
const GET_CATEGORIES_URL = '/api/admin/categories/list';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get(GET_CATEGORIES_URL);
    return response.data;
  },
  createCategory: async (categoryData: { name: string; description?: string }): Promise<Category> => {
    const response = await apiClient.post(CREATE_CATEGORY_URL, categoryData);
    return response.data;
  },
};