import { renderHook, act, waitFor } from '@testing-library/react';
import { useListCategory } from './useListCategory';
import { categoryService } from '../api/categoryService';
import type { Category } from '../types/category';

// Mock del apiClient para evitar problemas con import.meta.env
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// Mock del categoryService
jest.mock('../api/categoryService');

const mockedCategoryService = categoryService as jest.Mocked<typeof categoryService>;

describe('useListCategory', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // TEST 1: Inicialización
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useListCategory());

      expect(result.current.categories).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.listCategory).toBe('function');
    });
  });

  // ========================================
  // TEST 2: Carga exitosa de categorías
  // ========================================
  describe('listCategory - Caso exitoso', () => {
    it('debe cargar las categorías correctamente', async () => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Bebidas', active: true },
        { id: 2, name: 'Comidas', active: true },
        { id: 3, name: 'Postres', active: false },
      ];

      mockedCategoryService.getCategories.mockResolvedValue(mockCategories);

      const { result } = renderHook(() => useListCategory());

      // Verificar estado inicial
      expect(result.current.categories).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

      // Ejecutar listCategory
      await act(async () => {
        await result.current.listCategory();
      });

      // Verificar que se llamó al servicio
      expect(mockedCategoryService.getCategories).toHaveBeenCalledTimes(1);

      // Verificar estado final
      expect(result.current.categories).toEqual(mockCategories);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('debe actualizar el estado loading durante la carga', async () => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Bebidas', active: true },
      ];

      mockedCategoryService.getCategories.mockImplementation(() =>
        new Promise((resolve) => setTimeout(() => resolve(mockCategories), 100))
      );

      const { result } = renderHook(() => useListCategory());

      expect(result.current.loading).toBe(false);

      // Iniciar la carga
      act(() => {
        result.current.listCategory();
      });

      // Verificar que loading está en true durante la carga
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      // Esperar a que termine
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.categories).toEqual(mockCategories);
    });

    it('debe cargar una lista vacía correctamente', async () => {
      mockedCategoryService.getCategories.mockResolvedValue([]);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockedCategoryService.getCategories).toHaveBeenCalledTimes(1);
    });
  });

  // ========================================
  // TEST 3: Manejo de errores
  // ========================================
  describe('listCategory - Manejo de errores', () => {
    it('debe manejar errores al cargar las categorías', async () => {
      const mockError = new Error('Error al cargar categorías');
      mockedCategoryService.getCategories.mockRejectedValue(mockError);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(mockError);
      expect(mockedCategoryService.getCategories).toHaveBeenCalledTimes(1);
    });

    it('debe manejar errores de red', async () => {
      const networkError = new Error('Network Error');
      mockedCategoryService.getCategories.mockRejectedValue(networkError);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.error).toEqual(networkError);
      expect(result.current.loading).toBe(false);
      expect(result.current.categories).toEqual([]);
    });

    it('debe establecer loading en false incluso si hay error', async () => {
      const mockError = new Error('Error de servidor');
      mockedCategoryService.getCategories.mockRejectedValue(mockError);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });

  // ========================================
  // TEST 4: Múltiples llamadas
  // ========================================
  describe('listCategory - Múltiples llamadas', () => {
    it('debe poder llamar listCategory múltiples veces', async () => {
      const firstCategories: Category[] = [
        { id: 1, name: 'Bebidas', active: true },
      ];
      const secondCategories: Category[] = [
        { id: 1, name: 'Bebidas', active: true },
        { id: 2, name: 'Comidas', active: true },
      ];

      mockedCategoryService.getCategories
        .mockResolvedValueOnce(firstCategories)
        .mockResolvedValueOnce(secondCategories);

      const { result } = renderHook(() => useListCategory());

      // Primera llamada
      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual(firstCategories);
      expect(mockedCategoryService.getCategories).toHaveBeenCalledTimes(1);

      // Segunda llamada
      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual(secondCategories);
      expect(mockedCategoryService.getCategories).toHaveBeenCalledTimes(2);
    });

    it('debe mantener el último error si falla una segunda llamada', async () => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Bebidas', active: true },
      ];
      const mockError = new Error('Error en segunda llamada');

      mockedCategoryService.getCategories
        .mockResolvedValueOnce(mockCategories)
        .mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useListCategory());

      // Primera llamada exitosa
      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual(mockCategories);
      expect(result.current.error).toBeNull();

      // Segunda llamada con error
      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBe(false);
    });
  });

  // ========================================
  // TEST 5: Casos edge
  // ========================================
  describe('Casos edge', () => {
    it('debe manejar categorías con valores undefined en campos opcionales', async () => {
      const mockCategories: Category[] = [
        { id: undefined, name: 'Sin ID', active: undefined },
      ];

      mockedCategoryService.getCategories.mockResolvedValue(mockCategories);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual(mockCategories);
      expect(result.current.error).toBeNull();
    });

    it('debe manejar una categoría con solo el campo name', async () => {
      const mockCategories: Category[] = [
        { name: 'Solo nombre' },
      ];

      mockedCategoryService.getCategories.mockResolvedValue(mockCategories);

      const { result } = renderHook(() => useListCategory());

      await act(async () => {
        await result.current.listCategory();
      });

      expect(result.current.categories).toEqual(mockCategories);
    });
  });
});
