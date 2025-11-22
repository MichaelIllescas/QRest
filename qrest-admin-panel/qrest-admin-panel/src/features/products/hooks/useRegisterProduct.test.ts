import { renderHook, act } from '@testing-library/react';
import { useRegisterProduct } from './useRegisterProduct';
import { useUploadImage } from './useUploadImage';
import { productService } from '../api/ProductService';
import type { Product } from '../types/product';
import type { UploadImageResponse } from '../api/uploadImageService';

// Mock del apiClient para evitar problemas con import.meta.env
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// Mocks
jest.mock('./useUploadImage');
jest.mock('../api/ProductService');

const mockedUseUploadImage = useUploadImage as jest.MockedFunction<typeof useUploadImage>;
const mockedProductService = productService as jest.Mocked<typeof productService>;

// Helper para crear archivos mock
const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
};

describe('useRegisterProduct', () => {
  
  // Mock del hook useUploadImage por defecto
  const mockUpload = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mock de useUploadImage con valores por defecto
    mockedUseUploadImage.mockReturnValue({
      upload: mockUpload,
      isUploading: false,
      uploaded: null,
      error: null,
      reset: mockReset,
    });
  });

  // ========================================
  // TEST 1: Inicialización
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useRegisterProduct());

      expect(result.current.product).toEqual({
        name: '',
        description: '',
        price: 0,
        available: true,
        categoryId: undefined,
        imageUrl: undefined,
      });
      expect(result.current.files).toEqual([]);
      expect(result.current.isSaving).toBe(false);
      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBeNull();
      expect(result.current.uploadError).toBeNull();
      expect(result.current.isUploading).toBe(false);
    });
  });

  // ========================================
  // TEST 2: Manejo de cambios en inputs
  // ========================================
  describe('handleChange', () => {
    it('debe actualizar campos de texto correctamente', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'name',
            value: 'Pizza Napolitana',
            type: 'text',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.product.name).toBe('Pizza Napolitana');
    });

    it('debe actualizar el campo description', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'description',
            value: 'Deliciosa pizza con mozzarella',
            type: 'text',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.product.description).toBe('Deliciosa pizza con mozzarella');
    });

    it('debe actualizar el campo price', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'price',
            value: '15.99',
            type: 'number',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.product.price).toBe('15.99');
    });

    it('debe actualizar checkbox available', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'available',
            checked: false,
            type: 'checkbox',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.product.available).toBe(false);
    });

    it('debe actualizar el categoryId desde un select', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'categoryId',
            value: '3',
            type: 'select-one',
          },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      expect(result.current.product.categoryId).toBe('3');
    });

    it('debe actualizar múltiples campos secuencialmente', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Hamburguesa', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleChange({
          target: { name: 'price', value: '12.50', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleChange({
          target: { name: 'categoryId', value: '2', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      expect(result.current.product.name).toBe('Hamburguesa');
      expect(result.current.product.price).toBe('12.50');
      expect(result.current.product.categoryId).toBe('2');
    });
  });

  // ========================================
  // TEST 3: Manejo de archivos
  // ========================================
  describe('setFiles', () => {
    it('debe actualizar la lista de archivos', () => {
      const { result } = renderHook(() => useRegisterProduct());

      const files = [
        createMockFile('product.jpg', 1024, 'image/jpeg'),
      ];

      act(() => {
        result.current.setFiles(files);
      });

      expect(result.current.files).toEqual(files);
      expect(result.current.files).toHaveLength(1);
    });

    it('debe permitir actualizar con múltiples archivos', () => {
      const { result } = renderHook(() => useRegisterProduct());

      const files = [
        createMockFile('image1.jpg', 1024, 'image/jpeg'),
        createMockFile('image2.jpg', 2048, 'image/jpeg'),
      ];

      act(() => {
        result.current.setFiles(files);
      });

      expect(result.current.files).toHaveLength(2);
    });

    it('debe permitir limpiar archivos', () => {
      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('product.jpg', 1024, 'image/jpeg')];

      act(() => {
        result.current.setFiles(files);
      });

      expect(result.current.files).toHaveLength(1);

      act(() => {
        result.current.setFiles([]);
      });

      expect(result.current.files).toHaveLength(0);
    });
  });

  // ========================================
  // TEST 4: Submit exitoso
  // ========================================
  describe('handleSubmit - Casos exitosos', () => {
    it('debe registrar un producto exitosamente', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/product.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce({
        id: 1,
        name: 'Pizza',
        description: 'Deliciosa',
        price: 15.99,
        available: true,
        categoryId: 1,
        imageUrl: 'https://example.com/product.jpg',
      });

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar producto
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      const files = [createMockFile('pizza.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Ejecutar submit
      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificar estados
      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
      expect(result.current.isSaving).toBe(false);

      // Verificar llamadas
      expect(mockUpload).toHaveBeenCalledWith(files);
      expect(mockedProductService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Pizza',
          imageUrl: 'https://example.com/product.jpg',
        })
      );
    });

    it('debe incluir todos los campos del producto al guardar', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/burger.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar producto completo
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Hamburguesa Premium', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'description', value: 'Con queso cheddar', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '18.50', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '2', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
        result.current.handleChange({
          target: { name: 'available', checked: true, type: 'checkbox' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      const files = [createMockFile('burger.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockedProductService.create).toHaveBeenCalledWith({
        name: 'Hamburguesa Premium',
        description: 'Con queso cheddar',
        price: '18.50',
        categoryId: '2',
        available: true,
        imageUrl: 'https://example.com/burger.jpg',
      });
    });

    it('debe resetear saved y saveError al inicio del submit', async () => {
      mockUpload.mockResolvedValue({ imageUrl: 'url' });
      mockedProductService.create.mockResolvedValue({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Primer submit exitoso
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(true);

      // Segundo submit
      await act(async () => {
        await result.current.handleSubmit();
      });

      // saved debe mantenerse true después del segundo submit exitoso
      expect(result.current.saved).toBe(true);
    });
  });

  // ========================================
  // TEST 5: Manejo de errores
  // ========================================
  describe('handleSubmit - Manejo de errores', () => {
    it('debe manejar error al subir imagen', async () => {
      const uploadError = new Error('Error al subir imagen');
      mockUpload.mockRejectedValueOnce(uploadError);

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Error al subir imagen');
      expect(result.current.isSaving).toBe(false);

      // No debe llamar a productService si falla el upload
      expect(mockedProductService.create).not.toHaveBeenCalled();
    });

    it('debe manejar error al crear producto', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockRejectedValueOnce(
        new Error('Producto duplicado')
      );

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Producto duplicado');
      expect(result.current.isSaving).toBe(false);
    });

    it('debe usar mensaje genérico si no hay error.message', async () => {
      mockUpload.mockRejectedValueOnce('Error genérico');

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saveError).toBe('Error al guardar producto');
    });
  });

  // ========================================
  // TEST 6: Estados durante el proceso
  // ========================================
  describe('Estados durante el proceso', () => {
    it('debe establecer isSaving=true durante el proceso', async () => {
      let resolveUpload: (value: UploadImageResponse) => void;
      const uploadPromise = new Promise<UploadImageResponse>((resolve) => {
        resolveUpload = resolve;
      });

      mockUpload.mockReturnValueOnce(uploadPromise);

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Iniciar submit
      act(() => {
        result.current.handleSubmit();
      });

      // Verificar que está guardando
      expect(result.current.isSaving).toBe(true);
      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBeNull();

      // Completar upload
      await act(async () => {
        resolveUpload!({ imageUrl: 'url' });
        mockedProductService.create.mockResolvedValueOnce({} as Product);
        await uploadPromise;
      });
    });

    it('debe mantener estados correctos después de completar', async () => {
      mockUpload.mockResolvedValueOnce({ imageUrl: 'url' });
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSaving).toBe(false);
      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
    });
  });

  // ========================================
  // TEST 7: Integración con useUploadImage
  // ========================================
  describe('Integración con useUploadImage', () => {
    it('debe exponer estados de useUploadImage', () => {
      mockedUseUploadImage.mockReturnValueOnce({
        upload: mockUpload,
        isUploading: true,
        uploaded: { imageUrl: 'test-url' },
        error: 'test-error',
        reset: mockReset,
      });

      const { result } = renderHook(() => useRegisterProduct());

      expect(result.current.isUploading).toBe(true);
      expect(result.current.uploadError).toBe('test-error');
    });

    it('debe usar la función upload del hook', async () => {
      mockUpload.mockResolvedValueOnce({ imageUrl: 'url' });
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockUpload).toHaveBeenCalledWith(files);
    });
  });

  // ========================================
  // TEST 8: Flujo completo
  // ========================================
  describe('Flujo completo de registro', () => {
    it('debe completar todo el flujo: configurar -> subir -> guardar', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://cdn.example.com/products/pizza-123.jpg',
      };

      const mockCreatedProduct: Product = {
        id: 42,
        name: 'Pizza Margarita',
        description: 'Pizza clásica italiana',
        price: 12.99,
        categoryId: 1,
        available: true,
        imageUrl: 'https://cdn.example.com/products/pizza-123.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce(mockCreatedProduct);

      const { result } = renderHook(() => useRegisterProduct());

      // Paso 1: Configurar producto
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza Margarita', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'description', value: 'Pizza clásica italiana', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '12.99', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      // Paso 2: Agregar imagen
      const files = [createMockFile('pizza.jpg', 2048, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Paso 3: Enviar
      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificaciones finales
      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
      expect(mockUpload).toHaveBeenCalledWith(files);
      expect(mockedProductService.create).toHaveBeenCalledWith({
        name: 'Pizza Margarita',
        description: 'Pizza clásica italiana',
        price: '12.99',
        categoryId: '1',
        available: true,
        imageUrl: 'https://cdn.example.com/products/pizza-123.jpg',
      });
    });
  });
});
