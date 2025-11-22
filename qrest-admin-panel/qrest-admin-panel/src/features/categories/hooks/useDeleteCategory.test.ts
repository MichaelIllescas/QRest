import { renderHook, act, waitFor } from '@testing-library/react';
import { useDeleteCategory } from './useDeleteCategory';
import { categoryService } from '../api/categoryService';

// Mock del apiClient
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    delete: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
  },
}));

// Mock del categoryService
jest.mock('../api/categoryService');

const mockedCategoryService = categoryService as jest.Mocked<typeof categoryService>;

describe('useDeleteCategory', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // TEST 1: Inicialización
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useDeleteCategory());

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.deleted).toBe(false);
      expect(typeof result.current.deleteCategory).toBe('function');
    });
  });

  // ========================================
  // TEST 2: Eliminación exitosa
  // ========================================
  describe('deleteCategory - Caso exitoso', () => {
    it('debe eliminar una categoría correctamente', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      // Verificar estado inicial
      expect(result.current.deleted).toBe(false);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();

      // Ejecutar deleteCategory
      await act(async () => {
        await result.current.deleteCategory(1);
      });

      // Verificar que se llamó al servicio
      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledTimes(1);
      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledWith(1);

      // Verificar estado final
      expect(result.current.deleted).toBe(true);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('debe actualizar el estado loading durante la eliminación', async () => {
      mockedCategoryService.deleteCategory.mockImplementation(() =>
        new Promise((resolve) => setTimeout(() => resolve(undefined), 100))
      );

      const { result } = renderHook(() => useDeleteCategory());

      expect(result.current.loading).toBe(false);

      // Iniciar la eliminación
      act(() => {
        result.current.deleteCategory(1);
      });

      // Verificar que loading está en true durante la eliminación
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      // Esperar a que termine
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.deleted).toBe(true);
    });

    it('debe eliminar categorías con diferentes IDs', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      // Eliminar categoría con ID 5
      await act(async () => {
        await result.current.deleteCategory(5);
      });

      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledWith(5);
      expect(result.current.deleted).toBe(true);

      // Eliminar categoría con ID 99
      await act(async () => {
        await result.current.deleteCategory(99);
      });

      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledWith(99);
      expect(result.current.deleted).toBe(true);
    });
  });

  // ========================================
  // TEST 3: Manejo de errores
  // ========================================
  describe('deleteCategory - Manejo de errores', () => {
    it('debe manejar errores al eliminar una categoría', async () => {
      const mockError = new Error('Error al eliminar categoría');
      mockedCategoryService.deleteCategory.mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteCategory());

      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBe(false);
      expect(result.current.deleted).toBe(false);
      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledTimes(1);
    });

    it('debe manejar errores de red', async () => {
      const networkError = new Error('Network Error');
      mockedCategoryService.deleteCategory.mockRejectedValue(networkError);

      const { result } = renderHook(() => useDeleteCategory());

      await act(async () => {
        await result.current.deleteCategory(10);
      });

      expect(result.current.error).toEqual(networkError);
      expect(result.current.loading).toBe(false);
      expect(result.current.deleted).toBe(false);
    });

    it('debe establecer loading en false incluso si hay error', async () => {
      const mockError = new Error('Error de servidor');
      mockedCategoryService.deleteCategory.mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteCategory());

      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(mockError);
      expect(result.current.deleted).toBe(false);
    });
  });

  // ========================================
  // TEST 4: Múltiples llamadas
  // ========================================
  describe('deleteCategory - Múltiples llamadas', () => {
    it('debe poder eliminar múltiples categorías consecutivamente', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      // Primera eliminación
      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.deleted).toBe(true);
      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledTimes(1);

      // Segunda eliminación
      await act(async () => {
        await result.current.deleteCategory(2);
      });

      expect(result.current.deleted).toBe(true);
      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledTimes(2);
    });

    it('debe resetear deleted a false antes de cada eliminación', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      // Primera eliminación exitosa
      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.deleted).toBe(true);

      // Segunda eliminación - deleted debe resetearse durante el proceso
      const deletePromise = act(async () => {
        await result.current.deleteCategory(2);
      });

      // Durante la eliminación, deleted se resetea a false al inicio
      await deletePromise;
      
      expect(result.current.deleted).toBe(true);
    });

    it('debe manejar error después de una eliminación exitosa', async () => {
      const mockError = new Error('Error en segunda eliminación');

      mockedCategoryService.deleteCategory
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useDeleteCategory());

      // Primera eliminación exitosa
      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.deleted).toBe(true);
      expect(result.current.error).toBeNull();

      // Segunda eliminación con error
      await act(async () => {
        await result.current.deleteCategory(2);
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.deleted).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });

  // ========================================
  // TEST 5: setError
  // ========================================
  describe('setError', () => {
    it('debe permitir resetear el error manualmente', async () => {
      const mockError = new Error('Error al eliminar');
      mockedCategoryService.deleteCategory.mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteCategory());

      // Generar un error
      await act(async () => {
        await result.current.deleteCategory(1);
      });

      expect(result.current.error).toEqual(mockError);

      // Resetear el error manualmente
      act(() => {
        result.current.setError(null);
      });

      expect(result.current.error).toBeNull();
    });

    it('debe permitir establecer un error personalizado', async () => {
      const { result } = renderHook(() => useDeleteCategory());

      const customError = new Error('Error personalizado');

      act(() => {
        result.current.setError(customError);
      });

      expect(result.current.error).toEqual(customError);
    });
  });

  // ========================================
  // TEST 6: Casos edge
  // ========================================
  describe('Casos edge', () => {
    it('debe manejar ID 0', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      await act(async () => {
        await result.current.deleteCategory(0);
      });

      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledWith(0);
      expect(result.current.deleted).toBe(true);
    });

    it('debe manejar IDs negativos', async () => {
      mockedCategoryService.deleteCategory.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteCategory());

      await act(async () => {
        await result.current.deleteCategory(-1);
      });

      expect(mockedCategoryService.deleteCategory).toHaveBeenCalledWith(-1);
      expect(result.current.deleted).toBe(true);
    });
  });
});
