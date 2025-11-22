# Validación del Formulario de Registro de Productos

## 📋 Resumen

Implementación completa de validación para el formulario de registro de productos siguiendo las mejores prácticas y alineado con **US-023 (Crear producto)**.

---

## ✅ Validaciones Implementadas

### 1. **Campo Nombre** (Obligatorio)
- ✓ No puede estar vacío
- ✓ Mínimo 3 caracteres
- ✓ Máximo 100 caracteres
- ✓ Se valida al escribir y al perder foco

**Mensajes de error:**
- "El nombre del producto es obligatorio"
- "El nombre debe tener al menos 3 caracteres"
- "El nombre no puede exceder 100 caracteres"

---

### 2. **Campo Precio** (Obligatorio)
- ✓ No puede estar vacío
- ✓ Debe ser un número válido
- ✓ No puede ser negativo
- ✓ Máximo 999,999

**Mensajes de error:**
- "El precio es obligatorio"
- "El precio debe ser un número válido"
- "El precio no puede ser negativo"
- "El precio no puede exceder 999,999"

---

### 3. **Campo Categoría** (Obligatorio)
- ✓ Debe seleccionarse una opción válida
- ✓ No puede quedar en "Seleccione una categoría"

**Mensaje de error:**
- "Debe seleccionar una categoría"

---

### 4. **Campo Descripción** (Opcional)
- ✓ Máximo 500 caracteres

**Mensaje de error:**
- "La descripción no puede exceder 500 caracteres"

---

### 5. **Campo Disponible**
- ✓ Sin validación (checkbox)
- ✓ Valor por defecto: `true`

---

### 6. **Campo Imagen**
- ✓ Opcional
- ✓ Validación manejada por `FileUpload` component

---

## 🎯 Estrategia de Validación

### **1. Validación en tiempo real**
Los campos se validan mientras el usuario escribe **solo si ya han sido tocados** (touched).

```typescript
if (touched[name]) {
  const error = validateField(name, newValue);
  setValidationErrors(prev => ({
    ...prev,
    [name]: error,
  }));
}
```

### **2. Validación al perder foco (onBlur)**
Marca el campo como "tocado" y valida su valor:

```typescript
const handleBlur = (fieldName: string) => {
  setTouched(prev => ({ ...prev, [fieldName]: true }));
  const error = validateField(fieldName, product[fieldName]);
  setValidationErrors(prev => ({
    ...prev,
    [fieldName]: error,
  }));
};
```

### **3. Validación antes del submit**
Antes de enviar el formulario, se validan **todos los campos obligatorios**:

```typescript
const validateForm = (): boolean => {
  const errors: ValidationErrors = {};
  
  const nameError = validateField("name", product.name);
  if (nameError) errors.name = nameError;
  
  const priceError = validateField("price", product.price);
  if (priceError) errors.price = priceError;
  
  const categoryError = validateField("categoryId", product.categoryId);
  if (categoryError) errors.categoryId = categoryError;
  
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
```

Si hay errores, se muestra el mensaje:
> "Por favor, corrija los errores antes de guardar"

---

## 🎨 Feedback Visual

### **Estados de los campos:**

1. **Normal:** Fondo gris claro `#fafafa`, borde gris `#d6d6d6`
2. **Con foco:** Borde azul `#3b82f6`, fondo blanco
3. **Con error:** 
   - Borde rojo `#ef4444`
   - Fondo rojo claro `#fef2f2`
   - Mensaje de error debajo con icono ⚠

### **Mensaje de error por campo:**
```css
.errorText {
  font-size: 0.85rem;
  color: #dc2626;
  animation: slideDown 0.2s ease-out;
}
```

### **Animaciones:**
- Los errores aparecen con una animación suave `slideDown`
- El formulario completo tiene animación `fadeIn` al montarse

---

## 🧪 Casos de Uso

### ✅ **Flujo exitoso**
1. Usuario completa todos los campos obligatorios
2. No hay errores de validación
3. Se envía el formulario
4. Se muestra mensaje: "✓ Producto guardado con éxito"
5. Formulario se limpia automáticamente

### ❌ **Flujo con errores**
1. Usuario intenta enviar sin completar campos
2. Todos los campos se marcan como "tocados"
3. Se muestran mensajes de error específicos
4. El usuario corrige los errores
5. Los mensajes desaparecen cuando el campo es válido
6. Submit se habilita cuando todo es válido

---

## 📦 Estructura de Archivos Modificados

```
src/features/products/
├── hooks/
│   └── useRegisterProduct.ts          ← Lógica de validación
├── components/
│   └── RegisterProductForm.tsx        ← UI con validaciones
├── styles/
│   └── RegisterProductForm.module.css ← Estilos de validación
└── docs/
    └── VALIDACION-FORMULARIO.md       ← Este documento
```

---

## 🔧 API del Hook

```typescript
const {
  product,              // Datos del producto
  files,                // Archivos de imagen
  isSaving,             // Estado de guardado
  saved,                // Guardado exitoso
  saveError,            // Error al guardar
  uploadError,          // Error al subir imagen
  isUploading,          // Estado de carga de imagen
  validationErrors,     // ⭐ Errores por campo
  touched,              // ⭐ Campos tocados
  setFiles,             // Setter de archivos
  handleChange,         // ⭐ Handler con validación
  handleBlur,           // ⭐ Handler de blur
  handleSubmit,         // ⭐ Submit con validación
} = useRegisterProduct();
```

---

## 🧪 Testing

Los tests existentes deben actualizarse para incluir:

- ✓ Validación de campos vacíos
- ✓ Validación de longitudes mínimas/máximas
- ✓ Validación de precios negativos
- ✓ Validación antes del submit
- ✓ Estados de "touched"
- ✓ Mensajes de error específicos

---

## 🎯 Cumplimiento US-023

| Criterio de Aceptación | Estado |
|-------------------------|--------|
| Validar campos obligatorios (nombre, precio, categoría) | ✅ |
| Nombre no debe estar vacío | ✅ |
| Precio puede ser cero (ofertas) | ✅ |
| Categoría debe existir | ✅ |
| Feedback visual de errores | ✅ |
| Validación antes del submit | ✅ |

---

## 🚀 Mejoras Futuras

1. **Validación asíncrona:** Verificar nombres duplicados con el backend
2. **Validación de imágenes:** Tamaño y formato en el formulario
3. **Autocompletado:** Sugerencias de nombres basadas en categoría
4. **i18n:** Mensajes de error en múltiples idiomas
5. **Validación de URLs:** Si se permite ingresar URL de imagen manualmente

---

## 📖 Recursos

- **User Story:** `docs/product/user-stories/US-023-crear-producto.md`
- **Convenciones:** `docs/conventions/CONVENCIONES_QREST.md`
- **DTOs Backend:** `docs/tech/architecture/domain/entities-dtos-required.md`
