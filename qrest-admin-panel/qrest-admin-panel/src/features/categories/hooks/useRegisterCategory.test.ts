import { renderHook, act } from '@testing-library/react';
import { useRegisterCategory } from './useRegisterCategory';
import { categoryService } from '../api/categoryService';
import type { Category } from '../types/category';

// Mock del apiClient para evitar problemas con import.meta.env
jest.mock('../../../app/config/api/apiClient', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

// Mocks
jest.mock('../api/categoryService');

const mockedCategoryService = categoryService as jest.Mocked<typeof categoryService>;

describe('useRegisterCategory', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // TEST 1: Inicialización
  // ========================================
  describe('Inicialización', () => {
    it('debe inicializar con valores por defecto', () => {
      const { result } = renderHook(() => useRegisterCategory());

      expect(result.current.category).toEqual({
        id: undefined,
        name: '',
        active: true,
      });
      expect(result.current.isSaving).toBe(false);
      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBeNull();
      expect(result.current.validationErrors).toEqual({});
      expect(result.current.touched).toEqual({});
    });
  });

  // ========================================
  // TEST 2: Manejo de cambios en inputs
  // ========================================
  describe('handleChange', () => {
    it('debe actualizar el campo name correctamente', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: {
            name: 'name',
            value: 'Bebidas',
            type: 'text',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.category.name).toBe('Bebidas');
    });

    it('debe actualizar múltiples veces el campo name', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.category.name).toBe('Bebidas');

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Comidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.category.name).toBe('Comidas');
    });

    it('debe validar en tiempo real si el campo ya fue tocado', () => {
      const { result } = renderHook(() => useRegisterCategory());

      // Marcar campo como tocado
      act(() => {
        result.current.handleBlur('name');
      });

      // Cambiar a valor inválido
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'AB', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');

      // Cambiar a valor válido
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.validationErrors.name).toBeUndefined();
    });
  });

  // ========================================
  // TEST 3: Validación de campos
  // ========================================
  describe('Validación de campos', () => {
    it('debe validar que el nombre es obligatorio', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBe('El nombre de la categoría es obligatorio');
    });

    it('debe validar que el nombre tenga al menos 3 caracteres', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'AB', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');
    });

    it('debe validar que el nombre no exceda 100 caracteres', () => {
      const { result } = renderHook(() => useRegisterCategory());

      const longName = 'A'.repeat(101);

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

    it('debe aceptar un nombre válido', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBeUndefined();
    });

    it('debe validar espacios en blanco como nombre vacío', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: '   ', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleBlur('name');
      });

      expect(result.current.validationErrors.name).toBe('El nombre de la categoría es obligatorio');
    });
  });

  // ========================================
  // TEST 4: handleBlur
  // ========================================
  describe('handleBlur', () => {
    it('debe marcar un campo como tocado', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.touched.name).toBe(true);
    });

    it('debe validar el campo al hacer blur', () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'AB', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBlur('name');
      });

      expect(result.current.touched.name).toBe(true);
      expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');
    });
  });

  // ========================================
  // TEST 5: Submit exitoso
  // ========================================
  describe('handleSubmit - Casos exitosos', () => {
    it('debe registrar una categoría exitosamente', async () => {
      mockedCategoryService.createCategory.mockResolvedValueOnce({
        id: 1,
        name: 'Bebidas',
        active: true,
      });

      const { result } = renderHook(() => useRegisterCategory());

      // Configurar categoría
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Ejecutar submit
      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificar estados
      expect(result.current.saved).toBe(true);
      expect(result.current.saveError).toBeNull();
      expect(result.current.isSaving).toBe(false);

      // Verificar llamada
      expect(mockedCategoryService.createCategory).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Bebidas',
        })
      );
    });

    it('debe limpiar el formulario después de guardar exitosamente', async () => {
      mockedCategoryService.createCategory.mockResolvedValueOnce({
        id: 1,
        name: 'Postres',
        active: true,
      });

      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Postres', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      // Verificar que el formulario se limpió
      expect(result.current.category).toEqual({
        id: undefined,
        name: '',
      });
      expect(result.current.touched).toEqual({});
      expect(result.current.validationErrors).toEqual({});
    });

    it('debe resetear saved y saveError al inicio del submit', async () => {
      mockedCategoryService.createCategory.mockResolvedValue({
        id: 1,
        name: 'Test',
        active: true,
      });

      const { result } = renderHook(() => useRegisterCategory());

      // Configurar categoría válida
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Primer submit exitoso
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(true);

      // Configurar de nuevo para segundo submit
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Comidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Segundo submit
      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(true);
    });
  });

  // ========================================
  // TEST 6: Submit con errores de validación
  // ========================================
  describe('handleSubmit - Errores de validación', () => {
    it('debe fallar si el nombre está vacío', async () => {
      const { result } = renderHook(() => useRegisterCategory());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Por favor, corrija los errores antes de guardar');
      expect(result.current.validationErrors.name).toBe('El nombre de la categoría es obligatorio');
      expect(result.current.touched.name).toBe(true);
      expect(mockedCategoryService.createCategory).not.toHaveBeenCalled();
    });

    it('debe fallar si el nombre es muy corto', async () => {
      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'AB', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Por favor, corrija los errores antes de guardar');
      expect(result.current.validationErrors.name).toBe('El nombre debe tener al menos 3 caracteres');
      expect(mockedCategoryService.createCategory).not.toHaveBeenCalled();
    });

    it('debe fallar si el nombre es muy largo', async () => {
      const { result } = renderHook(() => useRegisterCategory());

      const longName = 'A'.repeat(101);

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: longName, type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Por favor, corrija los errores antes de guardar');
      expect(result.current.validationErrors.name).toBe('El nombre no puede exceder 100 caracteres');
      expect(mockedCategoryService.createCategory).not.toHaveBeenCalled();
    });
  });

  // ========================================
  // TEST 7: Submit con errores del servidor
  // ========================================
  describe('handleSubmit - Errores del servidor', () => {
    it('debe manejar errores de red o del servidor', async () => {
      const errorMessage = 'Error de conexión';
      mockedCategoryService.createCategory.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe(errorMessage);
      expect(result.current.isSaving).toBe(false);
    });

    it('debe manejar errores sin mensaje específico', async () => {
      mockedCategoryService.createCategory.mockRejectedValueOnce('Error desconocido');

      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Comidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.saved).toBe(false);
      expect(result.current.saveError).toBe('Error desconocido');
      expect(result.current.isSaving).toBe(false);
    });

    it('debe establecer isSaving en false después de un error', async () => {
      mockedCategoryService.createCategory.mockRejectedValueOnce(new Error('Error'));

      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Postres', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(result.current.isSaving).toBe(false);
    });
  });

  // ========================================
  // TEST 8: Estados durante el proceso de guardado
  // ========================================
  describe('Estados durante el guardado', () => {
    it('debe establecer isSaving en true durante el guardado', async () => {
      let resolveFn: (value: Category) => void;
      const promise = new Promise<Category>((resolve) => {
        resolveFn = resolve;
      });

      mockedCategoryService.createCategory.mockReturnValueOnce(promise);

      const { result } = renderHook(() => useRegisterCategory());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'Bebidas', type: 'text' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Iniciar submit sin await
      act(() => {
        result.current.handleSubmit();
      });

      // Verificar que isSaving es true mientras está en proceso
      expect(result.current.isSaving).toBe(true);

      // Resolver la promesa
      await act(async () => {
        resolveFn!({ id: 1, name: 'Bebidas', active: true });
        await promise;
      });

      expect(result.current.isSaving).toBe(false);
    });
  });
});
