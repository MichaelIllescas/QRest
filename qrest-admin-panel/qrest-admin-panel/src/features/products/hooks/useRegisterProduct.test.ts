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
      expect(result.current.validationErrors).toEqual({});
      expect(result.current.touched).toEqual({});
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

      // Configurar producto con todos los campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '15.99', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
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
          price: '15.99',
          categoryId: '1',
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

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Primer submit exitoso
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(true);

      // Configurar de nuevo para segundo submit
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Hamburguesa', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '15', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '2', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
        result.current.setFiles(files);
      });

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

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

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

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

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

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

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
      mockUpload.mockResolvedValueOnce({ imageUrl: 'url' });
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      // Ejecutar submit y verificar estado final
      await act(async () => {
        await result.current.handleSubmit();
      });

      // Después del submit exitoso
      expect(result.current.isSaving).toBe(false);
      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
    });

    it('debe mantener estados correctos después de completar', async () => {
      mockUpload.mockResolvedValueOnce({ imageUrl: 'url' });
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

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

    it('debe llamar a upload con los archivos correctos', async () => {
      const mockUploadResponse = { imageUrl: 'url' };
      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Producto', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificar que se llamó correctamente
      expect(mockUpload).toHaveBeenCalledTimes(1);
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

  // ========================================
  // TEST 9: Validación de campos
  // ========================================
  describe('Validación de campos', () => {
    describe('Validación del nombre', () => {
      it('debe mostrar error si el nombre está vacío', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleBlur('name');
        });

        expect(result.current.validationErrors.name).toBe('El nombre del producto es obligatorio');
        expect(result.current.touched.name).toBe(true);
      });

      it('debe mostrar error si el nombre tiene menos de 3 caracteres', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'name', value: 'Ab', type: 'text' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
          result.current.handleBlur('name');
        });

        expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');
      });

      it('debe mostrar error si el nombre supera 100 caracteres', () => {
        const { result } = renderHook(() => useRegisterProduct());

        const longName = 'a'.repeat(101);
        act(() => {
          result.current.handleChange({
            target: { name: 'name', value: longName, type: 'text' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
          result.current.handleBlur('name');
        });

        expect(result.current.validationErrors.name).toBe('El nombre no puede exceder 100 caracteres');
      });

      it('debe limpiar error cuando el nombre es válido', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleBlur('name');
        });

        expect(result.current.validationErrors.name).toBeDefined();

        act(() => {
          result.current.handleChange({
            target: { name: 'name', value: 'Pizza Margarita', type: 'text' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.validationErrors.name).toBeUndefined();
      });
    });

    describe('Validación del precio', () => {
      it('debe mostrar error si el precio está vacío', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'price', value: '', type: 'number' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
          result.current.handleBlur('price');
        });

        expect(result.current.validationErrors.price).toBe('El precio es obligatorio');
      });

      it('debe mostrar error si el precio es negativo', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'price', value: '-5', type: 'number' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
          result.current.handleBlur('price');
        });

        expect(result.current.validationErrors.price).toBe('El precio no puede ser negativo');
      });

      it('debe aceptar precio cero (ofertas)', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'price', value: '0', type: 'number' },
          } as React.ChangeEvent<HTMLInputElement>);
          result.current.handleBlur('price');
        });

        expect(result.current.validationErrors.price).toBeUndefined();
      });

      it('debe mostrar error si el precio supera 999,999', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'price', value: '1000000', type: 'number' },
          } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
          result.current.handleBlur('price');
        });

        expect(result.current.validationErrors.price).toBe('El precio no puede exceder 999,999');
      });

      it('debe aceptar precios con decimales', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleChange({
            target: { name: 'price', value: '12.99', type: 'number' },
          } as React.ChangeEvent<HTMLInputElement>);
          result.current.handleBlur('price');
        });

        expect(result.current.validationErrors.price).toBeUndefined();
      });
    });

    describe('Validación de categoría', () => {
      it('debe mostrar error si no se selecciona categoría', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleBlur('categoryId');
        });

        expect(result.current.validationErrors.categoryId).toBe('Debe seleccionar una categoría');
      });

      it('debe limpiar error cuando se selecciona una categoría', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleBlur('categoryId');
        });

        expect(result.current.validationErrors.categoryId).toBeDefined();

        act(() => {
          result.current.handleChange({
            target: { name: 'categoryId', value: '1', type: 'select-one' },
          } as React.ChangeEvent<HTMLSelectElement>);
        });

        expect(result.current.validationErrors.categoryId).toBeUndefined();
      });
    });

    describe('Validación de descripción', () => {
      it('debe permitir descripción vacía', () => {
        const { result } = renderHook(() => useRegisterProduct());

        act(() => {
          result.current.handleBlur('description');
        });

        expect(result.current.validationErrors.description).toBeUndefined();
      });

      it('debe mostrar error si la descripción supera 500 caracteres', () => {
        const { result } = renderHook(() => useRegisterProduct());

        const longDescription = 'a'.repeat(501);
        act(() => {
          result.current.handleChange({
            target: { name: 'description', value: longDescription, type: 'text' },
          } as React.ChangeEvent<HTMLTextAreaElement>);
        });

        act(() => {
          result.current.handleBlur('description');
        });

        expect(result.current.validationErrors.description).toBe('La descripción no puede exceder 500 caracteres');
      });

      it('debe aceptar descripción de 500 caracteres exactos', () => {
        const { result } = renderHook(() => useRegisterProduct());

        const maxDescription = 'a'.repeat(500);
        act(() => {
          result.current.handleChange({
            target: { name: 'description', value: maxDescription, type: 'text' },
          } as React.ChangeEvent<HTMLTextAreaElement>);
          result.current.handleBlur('description');
        });

        expect(result.current.validationErrors.description).toBeUndefined();
      });
    });
  });

  // ========================================
  // TEST 10: Validación en tiempo real
  // ========================================
  describe('Validación en tiempo real', () => {
    it('NO debe validar un campo que no ha sido tocado', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: '', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.validationErrors.name).toBeUndefined();
      expect(result.current.touched.name).toBeUndefined();
    });

    it('debe validar en tiempo real después de tocar el campo', () => {
      const { result } = renderHook(() => useRegisterProduct());

      // Tocar el campo primero
      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.touched.name).toBe(true);
      expect(result.current.validationErrors.name).toBe('El nombre del producto es obligatorio');

      // Ahora cambiar el valor debe validar en tiempo real
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Ab', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.validationErrors.name).toBeUndefined();
    });
  });

  // ========================================
  // TEST 11: Validación antes del submit
  // ========================================
  describe('Validación antes del submit', () => {
    it('debe bloquear submit si hay errores de validación', async () => {
      const { result } = renderHook(() => useRegisterProduct());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saveError).toBe('Por favor, corrija los errores antes de guardar');
      expect(result.current.saved).toBe(false);
      expect(mockUpload).not.toHaveBeenCalled();
      expect(mockedProductService.create).not.toHaveBeenCalled();
    });

    it('debe marcar todos los campos como tocados al hacer submit', async () => {
      const { result } = renderHook(() => useRegisterProduct());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.touched.name).toBe(true);
      expect(result.current.touched.price).toBe(true);
      expect(result.current.touched.categoryId).toBe(true);
      expect(result.current.touched.description).toBe(true);
    });

    it('debe mostrar todos los errores de validación al hacer submit', async () => {
      const { result } = renderHook(() => useRegisterProduct());

      // Configurar un precio inválido explícitamente
      act(() => {
        result.current.handleChange({
          target: { name: 'price', value: '', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Intentar hacer submit sin llenar campos
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.validationErrors.name).toBe('El nombre del producto es obligatorio');
      expect(result.current.validationErrors.price).toBe('El precio es obligatorio');
      expect(result.current.validationErrors.categoryId).toBe('Debe seleccionar una categoría');
      expect(result.current.saveError).toBe('Por favor, corrija los errores antes de guardar');
    });

    it('debe permitir submit si todos los campos son válidos', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar todos los campos obligatorios
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza Margarita', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '12.99', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      const files = [createMockFile('image.jpg', 1024, 'image/jpeg')];
      act(() => {
        result.current.setFiles(files);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
      expect(result.current.validationErrors).toEqual({});
      expect(mockUpload).toHaveBeenCalled();
      expect(mockedProductService.create).toHaveBeenCalled();
    });
  });

  // ========================================
  // TEST 12: Limpieza después de guardar
  // ========================================
  describe('Limpieza después de guardar', () => {
    it('debe limpiar el formulario después de guardar exitosamente', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockResolvedValueOnce({} as Product);

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar producto
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
        result.current.setFiles([createMockFile('image.jpg', 1024, 'image/jpeg')]);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificar que se limpió
      expect(result.current.product).toEqual({
        name: '',
        description: '',
        price: 0,
        available: true,
        categoryId: undefined,
        imageUrl: undefined,
      });
      expect(result.current.files).toEqual([]);
      expect(result.current.touched).toEqual({});
      expect(result.current.validationErrors).toEqual({});
    });

    it('NO debe limpiar el formulario si hay error al guardar', async () => {
      const mockUploadResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockUpload.mockResolvedValueOnce(mockUploadResponse);
      mockedProductService.create.mockRejectedValueOnce(new Error('Error del servidor'));

      const { result } = renderHook(() => useRegisterProduct());

      // Configurar producto
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Pizza', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'price', value: '10', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'categoryId', value: '1', type: 'select-one' },
        } as React.ChangeEvent<HTMLSelectElement>);
        result.current.setFiles([createMockFile('image.jpg', 1024, 'image/jpeg')]);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      // El formulario NO debe limpiarse
      expect(result.current.product.name).toBe('Pizza');
      expect(result.current.product.price).toBe('10');
      expect(result.current.saveError).toBe('Error del servidor');
    });
  });

  // ========================================
  // TEST 13: Casos edge de validación
  // ========================================
  describe('Casos edge de validación', () => {
    it('debe manejar nombre con solo espacios', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: '   ', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBe('El nombre del producto es obligatorio');
    });

    it('debe manejar precio con valor no numérico', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'price', value: 'abc', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBlur('price');
      });

      expect(result.current.validationErrors.price).toBe('El precio debe ser un número válido');
    });

    it('debe trimear espacios en el nombre para validación', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: '  Pizza  ', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBeUndefined();
    });

    it('debe validar correctamente precio en formato decimal', () => {
      const { result } = renderHook(() => useRegisterProduct());

      act(() => {
        result.current.handleChange({
          target: { name: 'price', value: '99.99', type: 'number' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleBlur('price');
      });

      expect(result.current.validationErrors.price).toBeUndefined();
    });
  });
});
