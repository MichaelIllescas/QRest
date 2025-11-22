import { renderHook, act, waitFor } from '@testing-library/react';
import { useUploadImage } from './useUploadImage';
import { uploadImageService } from '../api/uploadImageService';
import type { UploadImageResponse } from '../api/uploadImageService';

// Mock del apiClient para evitar problemas con import.meta.env
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
  },
}));

// Mock del servicio de upload
jest.mock('../api/uploadImageService');

const mockedUploadService = uploadImageService as jest.MockedFunction<typeof uploadImageService>;

// Helper para crear archivos mock
const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
};

describe('useUploadImage', () => {

  // Limpiar mocks antes de cada test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // TEST 1: Inicialización
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useUploadImage());

      expect(result.current.isUploading).toBe(false);
      expect(result.current.uploaded).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  // ========================================
  // TEST 2: Upload exitoso de un archivo
  // ========================================
  describe('Upload exitoso', () => {
    it('debe subir un archivo correctamente', async () => {
      const mockResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockedUploadService.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Estado inicial
      expect(result.current.isUploading).toBe(false);

      // Ejecutar upload
      let uploadPromise: Promise<UploadImageResponse>;
      act(() => {
        uploadPromise = result.current.upload(file);
      });

      // Durante el upload debe estar en loading
      expect(result.current.isUploading).toBe(true);
      expect(result.current.error).toBeNull();

      // Esperar a que termine
      await act(async () => {
        const response = await uploadPromise;
        expect(response).toEqual(mockResponse);
      });

      // Después del upload exitoso
      expect(result.current.isUploading).toBe(false);
      expect(result.current.uploaded).toEqual(mockResponse);
      expect(result.current.error).toBeNull();

      // Verificar que se llamó al servicio
      expect(mockedUploadService).toHaveBeenCalledTimes(1);
      expect(mockedUploadService).toHaveBeenCalledWith(file);
    });

    it('debe subir múltiples archivos correctamente', async () => {
      const mockResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/images.jpg',
      };

      mockedUploadService.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useUploadImage());

      const files = [
        createMockFile('photo1.jpg', 1024, 'image/jpeg'),
        createMockFile('photo2.jpg', 2048, 'image/jpeg'),
      ];

      let uploadPromise: Promise<UploadImageResponse>;
      act(() => {
        uploadPromise = result.current.upload(files);
      });

      await act(async () => {
        await uploadPromise;
      });

      expect(result.current.isUploading).toBe(false);
      expect(result.current.uploaded).toEqual(mockResponse);
      expect(result.current.error).toBeNull();

      expect(mockedUploadService).toHaveBeenCalledWith(files);
    });
  });

  // ========================================
  // TEST 3: Manejo de errores
  // ========================================
  describe('Manejo de errores', () => {
    it('debe manejar error con mensaje del backend', async () => {
      const errorMessage = 'Formato de imagen no válido';
      const mockError = {
        response: {
          data: {
            message: errorMessage,
          },
        },
      };

      mockedUploadService.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('invalid.txt', 1024, 'text/plain');

      let uploadPromise: Promise<UploadImageResponse>;
      act(() => {
        uploadPromise = result.current.upload(file);
      });

      expect(result.current.isUploading).toBe(true);

      // Esperar y capturar el error
      await act(async () => {
        try {
          await uploadPromise;
        } catch (err) {
          // El error debe ser lanzado
          expect(err).toBeDefined();
        }
      });

      // Después del error
      expect(result.current.isUploading).toBe(false);
      expect(result.current.uploaded).toBeNull();
      expect(result.current.error).toBe(errorMessage);
    });

    it('debe manejar error sin mensaje específico del backend', async () => {
      const mockError = new Error('Network error');

      mockedUploadService.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      let uploadPromise: Promise<UploadImageResponse>;
      act(() => {
        uploadPromise = result.current.upload(file);
      });

      await act(async () => {
        try {
          await uploadPromise;
        } catch (err) {
          expect(err).toBeDefined();
        }
      });

      expect(result.current.isUploading).toBe(false);
      expect(result.current.error).toBe('Error al subir la imagen');
    });

    it('debe manejar error de tamaño excedido', async () => {
      const errorMessage = 'Archivo muy grande';
      const mockError = {
        response: {
          data: {
            message: errorMessage,
          },
        },
      };

      mockedUploadService.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUploadImage());

      const bigFile = createMockFile('big.jpg', 10 * 1024 * 1024, 'image/jpeg');

      act(() => {
        result.current.upload(bigFile).catch(() => {});
      });

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });
    });
  });

  // ========================================
  // TEST 4: Reset de estado
  // ========================================
  describe('Reset de estado', () => {
    it('debe limpiar el estado después de reset', async () => {
      const mockResponse: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockedUploadService.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Upload exitoso
      await act(async () => {
        await result.current.upload(file);
      });

      expect(result.current.uploaded).toEqual(mockResponse);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.uploaded).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.isUploading).toBe(false);
    });

    it('debe limpiar error después de reset', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error de prueba',
          },
        },
      };

      mockedUploadService.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Upload con error
      await act(async () => {
        try {
          await result.current.upload(file);
        } catch (err) {
          // Error esperado
        }
      });

      expect(result.current.error).toBe('Error de prueba');

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.uploaded).toBeNull();
    });
  });

  // ========================================
  // TEST 5: Uploads múltiples secuenciales
  // ========================================
  describe('Uploads secuenciales', () => {
    it('debe manejar múltiples uploads consecutivos', async () => {
      const response1: UploadImageResponse = {
        imageUrl: 'https://example.com/image1.jpg',
      };
      const response2: UploadImageResponse = {
        imageUrl: 'https://example.com/image2.jpg',
      };

      mockedUploadService
        .mockResolvedValueOnce(response1)
        .mockResolvedValueOnce(response2);

      const { result } = renderHook(() => useUploadImage());

      const file1 = createMockFile('photo1.jpg', 1024, 'image/jpeg');
      const file2 = createMockFile('photo2.jpg', 2048, 'image/jpeg');

      // Primer upload
      await act(async () => {
        await result.current.upload(file1);
      });

      expect(result.current.uploaded).toEqual(response1);

      // Segundo upload
      await act(async () => {
        await result.current.upload(file2);
      });

      expect(result.current.uploaded).toEqual(response2);
      expect(mockedUploadService).toHaveBeenCalledTimes(2);
    });

    it('debe permitir upload después de un error', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error temporal',
          },
        },
      };

      const mockSuccess: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockedUploadService
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockSuccess);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Primer intento con error
      await act(async () => {
        try {
          await result.current.upload(file);
        } catch (err) {
          // Error esperado
        }
      });

      expect(result.current.error).toBe('Error temporal');

      // Segundo intento exitoso
      await act(async () => {
        await result.current.upload(file);
      });

      expect(result.current.uploaded).toEqual(mockSuccess);
      expect(result.current.error).toBeNull();
    });
  });

  // ========================================
  // TEST 6: Estados durante el upload
  // ========================================
  describe('Estados durante el upload', () => {
    it('debe mantener isUploading=true durante la operación', async () => {
      let resolveUpload: (value: UploadImageResponse) => void;
      const uploadPromise = new Promise<UploadImageResponse>((resolve) => {
        resolveUpload = resolve;
      });

      mockedUploadService.mockReturnValueOnce(uploadPromise);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Iniciar upload
      act(() => {
        result.current.upload(file);
      });

      // Verificar que está en estado de carga
      expect(result.current.isUploading).toBe(true);
      expect(result.current.uploaded).toBeNull();
      expect(result.current.error).toBeNull();

      // Resolver el upload
      await act(async () => {
        resolveUpload!({ imageUrl: 'https://example.com/image.jpg' });
        await uploadPromise;
      });

      expect(result.current.isUploading).toBe(false);
    });

    it('debe limpiar error anterior al hacer nuevo upload', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error previo',
          },
        },
      };

      const mockSuccess: UploadImageResponse = {
        imageUrl: 'https://example.com/image.jpg',
      };

      mockedUploadService
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockSuccess);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      // Upload con error
      await act(async () => {
        try {
          await result.current.upload(file);
        } catch (err) {
          // Error esperado
        }
      });

      expect(result.current.error).toBe('Error previo');

      // Nuevo upload (debe limpiar el error anterior)
      act(() => {
        result.current.upload(file);
      });

      // El error debe limpiarse al iniciar nuevo upload
      expect(result.current.error).toBeNull();

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });
    });
  });

  // ========================================
  // TEST 7: Integración con tipos
  // ========================================
  describe('Tipos de respuesta', () => {
    it('debe retornar la respuesta tipada correctamente', async () => {
      const mockResponse: UploadImageResponse = {
        imageUrl: 'https://cdn.example.com/products/image-123.jpg',
      };

      mockedUploadService.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useUploadImage());

      const file = createMockFile('product.jpg', 1024, 'image/jpeg');

      let response: UploadImageResponse | undefined;
      await act(async () => {
        response = await result.current.upload(file);
      });

      expect(response).toEqual(mockResponse);
      expect(response?.imageUrl).toBe('https://cdn.example.com/products/image-123.jpg');
    });
  });
});
