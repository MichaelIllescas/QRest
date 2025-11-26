import { renderHook, act, waitFor } from '@testing-library/react';
import { useListProducts } from './useListProducts';
import { productService } from '../api/ProductService';
import type { Product } from '../types/product';


// Mock del apiClient para evitar problemas con import.meta.env
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// Mock del ProductService
jest.mock('../api/ProductService');

// Helper para crear productos mock
const createMockProduct = (overrides?: Partial<Product>): Product => ({
  id: 1,
  name: 'Producto Test',
  description: 'Descripción del producto',
  price: 100.50,
  available: true,
  imageUrl: 'https://example.com/image.jpg',
  categoryId: 1,
  categoryName: 'Categoría Test',
  ...overrides,
});

// Limpiar mocks antes de cada test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('useListProducts', () => {
  
  // ========================================
  // TEST 1: Inicialización del hook
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useListProducts());

      expect(result.current.products).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(typeof result.current.fetchProducts).toBe('function');
    });

    it('debe tener productos vacíos al inicio', () => {
      const { result } = renderHook(() => useListProducts());

      expect(result.current.products).toHaveLength(0);
    });
  });

  // ========================================
  // TEST 2: Carga exitosa de productos
  // ========================================
  describe('Carga exitosa de productos', () => {
    it('debe cargar productos correctamente', async () => {
      const mockProducts: Product[] = [
        createMockProduct({ id: 1, name: 'Producto 1' }),
        createMockProduct({ id: 2, name: 'Producto 2' }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.products).toEqual(mockProducts);
      expect(result.current.products).toHaveLength(2);
      expect(result.current.error).toBeNull();
      expect(productService.list).toHaveBeenCalledTimes(1);
    });

    it('debe actualizar isLoading correctamente durante la carga', async () => {
      const mockProducts: Product[] = [createMockProduct()];
      
      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      expect(result.current.isLoading).toBe(false);

      act(() => {
        result.current.fetchProducts();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('debe manejar lista vacía de productos', async () => {
      (productService.list as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.products).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('debe cargar una lista grande de productos', async () => {
      const mockProducts: Product[] = Array.from({ length: 100 }, (_, i) =>
        createMockProduct({ id: i + 1, name: `Producto ${i + 1}` })
      );

      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.products).toHaveLength(100);
      expect(result.current.products[0].name).toBe('Producto 1');
      expect(result.current.products[99].name).toBe('Producto 100');
    });

    it('debe mantener los datos anteriores durante la recarga', async () => {
      const initialProducts: Product[] = [
        createMockProduct({ id: 1, name: 'Producto Inicial' }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(initialProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      expect(result.current.products[0].name).toBe('Producto Inicial');

      // Recargar con nuevos datos
      const updatedProducts: Product[] = [
        createMockProduct({ id: 1, name: 'Producto Actualizado' }),
        createMockProduct({ id: 2, name: 'Producto Nuevo' }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(updatedProducts);

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(2);
      });

      expect(result.current.products[0].name).toBe('Producto Actualizado');
      expect(result.current.products[1].name).toBe('Producto Nuevo');
    });
  });

  // ========================================
  // TEST 3: Manejo de errores
  // ========================================
  describe('Manejo de errores', () => {
    it('debe manejar errores de la API', async () => {
      const mockError = new Error('Network error');
      (productService.list as jest.Mock).mockRejectedValue(mockError);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('Error al cargar los productos');
      expect(result.current.products).toEqual([]);
    });

    it('debe limpiar error al volver a cargar con éxito', async () => {
      // Primera llamada con error
      (productService.list as jest.Mock).mockRejectedValue(new Error('Error'));

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Error al cargar los productos');
      });

      // Segunda llamada exitosa
      const mockProducts: Product[] = [createMockProduct()];
      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeNull();
      expect(result.current.products).toEqual(mockProducts);
    });

    it('debe establecer isLoading en false incluso después de error', async () => {
      (productService.list as jest.Mock).mockRejectedValue(new Error('Error'));

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('Error al cargar los productos');
    });

    it('debe mantener productos previos al fallar una recarga', async () => {
      // Primera carga exitosa
      const initialProducts: Product[] = [createMockProduct({ id: 1 })];
      (productService.list as jest.Mock).mockResolvedValue(initialProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      // Segunda carga con error
      (productService.list as jest.Mock).mockRejectedValue(new Error('Error'));

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.error).toBe('Error al cargar los productos');
      });

      // Los productos previos deben mantenerse
      expect(result.current.products).toEqual(initialProducts);
    });
  });

  // ========================================
  // TEST 4: Múltiples llamadas
  // ========================================
  describe('Múltiples llamadas', () => {
    it('debe permitir múltiples llamadas a fetchProducts', async () => {
      const mockProducts: Product[] = [createMockProduct()];
      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      // Primera llamada
      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(productService.list).toHaveBeenCalledTimes(1);

      // Segunda llamada
      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(productService.list).toHaveBeenCalledTimes(2);
    });

    it('debe manejar llamadas concurrentes', async () => {
      const mockProducts: Product[] = [createMockProduct()];
      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      // Llamadas concurrentes
      act(() => {
        result.current.fetchProducts();
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.products).toEqual(mockProducts);
      expect(productService.list).toHaveBeenCalledTimes(2);
    });
  });

  // ========================================
  // TEST 5: Estado de productos
  // ========================================
  describe('Estado de productos', () => {
    it('debe manejar productos con diferentes estados de disponibilidad', async () => {
      const mockProducts: Product[] = [
        createMockProduct({ id: 1, name: 'Disponible', available: true }),
        createMockProduct({ id: 2, name: 'No disponible', available: false }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(2);
      });

      expect(result.current.products[0].available).toBe(true);
      expect(result.current.products[1].available).toBe(false);
    });

    it('debe manejar productos sin imagen', async () => {
      const mockProducts: Product[] = [
        createMockProduct({ id: 1, imageUrl: undefined }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      expect(result.current.products[0].imageUrl).toBeUndefined();
    });

    it('debe manejar productos sin descripción', async () => {
      const mockProducts: Product[] = [
        createMockProduct({ id: 1, description: undefined }),
      ];

      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      expect(result.current.products[0].description).toBeUndefined();
    });

    it('debe preservar todos los campos del producto', async () => {
      const mockProduct = createMockProduct({
        id: 123,
        name: 'Producto Completo',
        description: 'Una descripción detallada',
        price: 99.99,
        available: true,
        imageUrl: 'https://example.com/product.jpg',
        categoryId: 5,
        categoryName: 'Categoría Premium',
      });

      (productService.list as jest.Mock).mockResolvedValue([mockProduct]);

      const { result } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      const product = result.current.products[0];
      expect(product.id).toBe(123);
      expect(product.name).toBe('Producto Completo');
      expect(product.description).toBe('Una descripción detallada');
      expect(product.price).toBe(99.99);
      expect(product.available).toBe(true);
      expect(product.imageUrl).toBe('https://example.com/product.jpg');
      expect(product.categoryId).toBe(5);
      expect(product.categoryName).toBe('Categoría Premium');
    });
  });

  // ========================================
  // TEST 6: Limpieza y ciclo de vida
  // ========================================
  describe('Limpieza y ciclo de vida', () => {
    it('no debe llamar a la API automáticamente al montar', () => {
      renderHook(() => useListProducts());

      expect(productService.list).not.toHaveBeenCalled();
    });

    it('debe mantener el estado al remontar el hook', async () => {
      const mockProducts: Product[] = [createMockProduct()];
      (productService.list as jest.Mock).mockResolvedValue(mockProducts);

      const { result, unmount } = renderHook(() => useListProducts());

      act(() => {
        result.current.fetchProducts();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(1);
      });

      unmount();

      // Montar de nuevo el hook para reiniciar el estado
      const { result: result2 } = renderHook(() => useListProducts());
      expect(result2.current.products).toEqual([]);
      expect(result2.current.isLoading).toBe(false);
      expect(result2.current.error).toBeNull();
    });
  });
});
