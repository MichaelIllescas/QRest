import { renderHook, act } from '@testing-library/react';
import { useFileUpload } from './useFileUpload';
import type { UseFileUploadOptions } from './types';

// Helper para crear archivos mock
const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const blob = new Blob(['a'.repeat(size)], { type });
  return new File([blob], name, { type });
};

// Helper para crear FileList
const createMockFileList = (files: File[]): FileList => {
  const fileList: any = files;
  fileList.item = (index: number) => files[index];
  return fileList as FileList;
};

describe('useFileUpload', () => {
  
  // ========================================
  // TEST 1: Inicialización del hook
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useFileUpload({}));

      expect(result.current.files).toEqual([]);
      expect(result.current.errorMessage).toBe('');
    });
  });

  // ========================================
  // TEST 2: Validación de tamaño de archivo
  // ========================================
  describe('Validación de tamaño', () => {
    it('debe rechazar archivos que excedan el tamaño máximo', () => {
      const onError = jest.fn();
      const maxSize = 1024 * 1024; // 1MB
      
      const { result } = renderHook(() =>
        useFileUpload({ maxSize, onError })
      );

      // Crear archivo de 2MB
      const bigFile = createMockFile('big.jpg', 2 * 1024 * 1024, 'image/jpeg');
      const fileList = createMockFileList([bigFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(0);
      expect(result.current.errorMessage).toContain('excede el máximo de 1.00MB');
      expect(onError).toHaveBeenCalledWith(expect.stringContaining('excede el máximo'));
    });

    it('debe aceptar archivos dentro del límite de tamaño', () => {
      const onChange = jest.fn();
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      const { result } = renderHook(() =>
        useFileUpload({ maxSize, onChange })
      );

      const smallFile = createMockFile('small.jpg', 1024 * 1024, 'image/jpeg');
      const fileList = createMockFileList([smallFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(1);
      expect(result.current.errorMessage).toBe('');
      expect(onChange).toHaveBeenCalledWith([smallFile]);
    });
  });

  // ========================================
  // TEST 3: Validación de tipo de archivo
  // ========================================
  describe('Validación de tipo', () => {
    it('debe rechazar archivos que no coincidan con accept', () => {
      const onError = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ accept: 'image/*', onError })
      );

      const pdfFile = createMockFile('document.pdf', 1024, 'application/pdf');
      const fileList = createMockFileList([pdfFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(0);
      expect(result.current.errorMessage).toContain('no es un tipo permitido');
      expect(onError).toHaveBeenCalled();
    });

    it('debe aceptar archivos que coincidan con accept por extensión', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: '.jpg,.png' })
      );

      const jpgFile = createMockFile('photo.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([jpgFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(1);
      expect(result.current.errorMessage).toBe('');
    });

    it('debe aceptar archivos que coincidan con accept por MIME type', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: 'image/jpeg,image/png' })
      );

      const jpegFile = createMockFile('image.jpeg', 1024, 'image/jpeg');
      const fileList = createMockFileList([jpegFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(1);
    });

    it('debe aceptar archivos con wildcard (image/*)', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: 'image/*', multiple: true })
      );

      const jpgFile = createMockFile('photo.jpg', 1024, 'image/jpeg');
      const pngFile = createMockFile('graphic.png', 1024, 'image/png');
      const fileList = createMockFileList([jpgFile, pngFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(2);
    });
  });

  // ========================================
  // TEST 4: Modo múltiple vs simple
  // ========================================
  describe('Modo multiple', () => {
    it('debe rechazar múltiples archivos cuando multiple=false', () => {
      const onError = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ multiple: false, onError })
      );

      const file1 = createMockFile('file1.jpg', 1024, 'image/jpeg');
      const file2 = createMockFile('file2.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([file1, file2]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(0);
      expect(result.current.errorMessage).toBe('Solo se permite un archivo');
      expect(onError).toHaveBeenCalledWith('Solo se permite un archivo');
    });

    it('debe aceptar múltiples archivos cuando multiple=true', () => {
      const { result } = renderHook(() =>
        useFileUpload({ multiple: true })
      );

      const file1 = createMockFile('file1.jpg', 1024, 'image/jpeg');
      const file2 = createMockFile('file2.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([file1, file2]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(2);
      expect(result.current.errorMessage).toBe('');
    });

    it('debe respetar el límite maxFiles', () => {
      const onError = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ multiple: true, maxFiles: 2, onError })
      );

      const files = [
        createMockFile('file1.jpg', 1024, 'image/jpeg'),
        createMockFile('file2.jpg', 1024, 'image/jpeg'),
        createMockFile('file3.jpg', 1024, 'image/jpeg'),
      ];
      const fileList = createMockFileList(files);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(0);
      expect(result.current.errorMessage).toContain('Máximo 2 archivos permitidos');
      expect(onError).toHaveBeenCalled();
    });
  });

  // ========================================
  // TEST 5: Detección de tipo de archivo
  // ========================================
  describe('Detección de tipo de archivo', () => {
    it('debe detectar archivos de imagen', () => {
      const { result } = renderHook(() =>
        useFileUpload({ multiple: true })
      );

      const imageFile = createMockFile('image.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([imageFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].type).toBe('image');
    });

    it('debe detectar archivos PDF', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: '*/*' })
      );

      const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf');
      const fileList = createMockFileList([pdfFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].type).toBe('pdf');
    });

    it('debe detectar archivos de video', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: '*/*' })
      );

      const videoFile = createMockFile('video.mp4', 1024, 'video/mp4');
      const fileList = createMockFileList([videoFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].type).toBe('video');
    });

    it('debe clasificar como "file" tipos desconocidos', () => {
      const { result } = renderHook(() =>
        useFileUpload({ accept: '*/*' })
      );

      const unknownFile = createMockFile('data.xyz', 1024, 'application/octet-stream');
      const fileList = createMockFileList([unknownFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].type).toBe('file');
    });
  });

  // ========================================
  // TEST 6: Eliminación de archivos
  // ========================================
  describe('Eliminación de archivos', () => {
    it('debe eliminar un archivo por ID', () => {
      const onChange = jest.fn();
      const onRemove = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ multiple: true, onChange, onRemove })
      );

      const file1 = createMockFile('file1.jpg', 1024, 'image/jpeg');
      const file2 = createMockFile('file2.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([file1, file2]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files).toHaveLength(2);

      const idToRemove = result.current.files[0].id;

      act(() => {
        result.current.removeFile(idToRemove);
      });

      expect(result.current.files).toHaveLength(1);
      expect(result.current.files[0].name).toBe('file2.jpg');
      expect(onRemove).toHaveBeenCalledWith(file1);
      expect(onChange).toHaveBeenLastCalledWith([file2]);
    });

    it('debe limpiar el mensaje de error al eliminar archivos', () => {
      const { result } = renderHook(() =>
        useFileUpload({ multiple: false })
      );

      // Provocar error
      const files = [
        createMockFile('file1.jpg', 1024, 'image/jpeg'),
        createMockFile('file2.jpg', 1024, 'image/jpeg'),
      ];
      const fileList = createMockFileList(files);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.errorMessage).toBe('Solo se permite un archivo');

      // Agregar archivo válido
      const validFile = createMockFile('valid.jpg', 1024, 'image/jpeg');
      const validFileList = createMockFileList([validFile]);

      act(() => {
        result.current.processFiles(validFileList);
      });

      expect(result.current.files).toHaveLength(1);

      const idToRemove = result.current.files[0].id;

      act(() => {
        result.current.removeFile(idToRemove);
      });

      expect(result.current.errorMessage).toBe('');
    });
  });

  // ========================================
  // TEST 7: Preview de imágenes
  // ========================================
  describe('Preview de imágenes', () => {
    it('debe generar preview para imágenes cuando showPreview=true', () => {
      const { result } = renderHook(() =>
        useFileUpload({ showPreview: true })
      );

      const imageFile = createMockFile('image.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([imageFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].preview).toBe('mock-url');
    });

    it('NO debe generar preview cuando showPreview=false', () => {
      const { result } = renderHook(() =>
        useFileUpload({ showPreview: false })
      );

      const imageFile = createMockFile('image.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([imageFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].preview).toBeNull();
    });

    it('NO debe generar preview para archivos no-imagen', () => {
      const { result } = renderHook(() =>
        useFileUpload({ showPreview: true, accept: '*/*' })
      );

      const pdfFile = createMockFile('doc.pdf', 1024, 'application/pdf');
      const fileList = createMockFileList([pdfFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(result.current.files[0].preview).toBeNull();
    });
  });

  // ========================================
  // TEST 8: Callbacks
  // ========================================
  describe('Callbacks', () => {
    it('debe llamar a onChange con los archivos procesados', () => {
      const onChange = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ onChange })
      );

      const file = createMockFile('file.jpg', 1024, 'image/jpeg');
      const fileList = createMockFileList([file]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith([file]);
    });

    it('debe llamar a onError cuando hay un error de validación', () => {
      const onError = jest.fn();
      
      const { result } = renderHook(() =>
        useFileUpload({ maxSize: 1024, onError })
      );

      const bigFile = createMockFile('big.jpg', 2048, 'image/jpeg');
      const fileList = createMockFileList([bigFile]);

      act(() => {
        result.current.processFiles(fileList);
      });

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(expect.stringContaining('excede el máximo'));
    });
  });

  // ========================================
  // TEST 9: Estructura de FileUploadItem
  // ========================================
  describe('Estructura de datos', () => {
    it('debe crear FileUploadItem con todos los campos requeridos', () => {
      const { result } = renderHook(() =>
        useFileUpload({})
      );

      const file = createMockFile('test.jpg', 2048, 'image/jpeg');
      const fileList = createMockFileList([file]);

      act(() => {
        result.current.processFiles(fileList);
      });

      const uploadedItem = result.current.files[0];

      expect(uploadedItem).toHaveProperty('file');
      expect(uploadedItem).toHaveProperty('id');
      expect(uploadedItem).toHaveProperty('name', 'test.jpg');
      expect(uploadedItem).toHaveProperty('size', 2048);
      expect(uploadedItem).toHaveProperty('type', 'image');
      expect(uploadedItem).toHaveProperty('preview');
      expect(uploadedItem.id).toBeTruthy();
    });
  });
});
