# Ejemplos de Validación del Formulario

## 🎬 Flujos de Usuario

### ✅ Ejemplo 1: Registro Exitoso

**Paso 1:** Usuario completa el formulario
```
Nombre: "Pizza Margarita" ✓
Descripción: "Pizza clásica con tomate y queso" ✓
Precio: 12.99 ✓
Disponible: [x] ✓
Categoría: "Pastas" ✓
Imagen: pizza.jpg ✓
```

**Resultado:**
- Sin errores de validación
- Botón "Guardar Producto" habilitado
- Al hacer clic → "✓ Producto guardado con éxito"
- Formulario se limpia automáticamente

---

### ❌ Ejemplo 2: Nombre Vacío

**Usuario intenta enviar sin nombre:**
```
Nombre: "" ❌
Precio: 10 ✓
Categoría: "Bebidas" ✓
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ Nombre del producto *               │  ← Borde rojo
│  ⚠ El nombre del producto es       │  ← Mensaje error
│     obligatorio                     │
└─────────────────────────────────────┘

Por favor, corrija los errores antes de guardar
```

---

### ❌ Ejemplo 3: Nombre Muy Corto

**Usuario escribe solo 2 caracteres:**
```
Nombre: "Ab" ❌
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ Ab                                  │  ← Borde rojo
│  ⚠ El nombre debe tener al menos   │
│     3 caracteres                    │
└─────────────────────────────────────┘
```

---

### ❌ Ejemplo 4: Precio Negativo

**Usuario ingresa precio negativo:**
```
Precio: -5 ❌
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ -5                                  │  ← Borde rojo
│  ⚠ El precio no puede ser negativo │
└─────────────────────────────────────┘
```

---

### ❌ Ejemplo 5: Sin Categoría

**Usuario no selecciona categoría:**
```
Categoría: "Seleccione una categoría" ❌
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ Seleccione una categoría *         ▼│  ← Borde rojo
│  ⚠ Debe seleccionar una categoría  │
└─────────────────────────────────────┘
```

---

### ⚠️ Ejemplo 6: Descripción Muy Larga

**Usuario escribe más de 500 caracteres:**
```
Descripción: "Lorem ipsum dolor sit amet..." (501 caracteres) ❌
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ Lorem ipsum dolor sit amet...       │  ← Borde rojo
│                                     │
│  ⚠ La descripción no puede exceder │
│     500 caracteres                  │
└─────────────────────────────────────┘
```

---

### 🔄 Ejemplo 7: Validación en Tiempo Real

**Secuencia del usuario:**

1️⃣ **Hace clic en el campo Nombre** (sin escribir)
   - Campo normal (sin error)

2️⃣ **Hace clic fuera** (onBlur)
   ```
   ⚠ El nombre del producto es obligatorio
   ```

3️⃣ **Escribe "Ju"**
   ```
   ⚠ El nombre debe tener al menos 3 caracteres
   ```

4️⃣ **Escribe "Jug"**
   - ✅ Error desaparece
   - Campo vuelve a color normal

5️⃣ **Continúa escribiendo "Jugo de Naranja"**
   - ✅ Campo válido

---

### 🎯 Ejemplo 8: Múltiples Errores

**Usuario intenta enviar con varios errores:**
```
Nombre: "" ❌
Descripción: "..." (válida)
Precio: -10 ❌
Categoría: "" ❌
```

**Resultado:**
```
┌─────────────────────────────────────┐
│ Nombre del producto *               │  ← Rojo
│  ⚠ El nombre del producto es       │
│     obligatorio                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ...                                 │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ -10                                 │  ← Rojo
│  ⚠ El precio no puede ser negativo │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Seleccione una categoría *         ▼│  ← Rojo
│  ⚠ Debe seleccionar una categoría  │
└─────────────────────────────────────┘

[!] Por favor, corrija los errores antes de guardar
```

---

## 📱 Estados Visuales de los Campos

### Estado Normal
```css
background: #fafafa
border: 1px solid #d6d6d6
```

### Estado Focus
```css
background: #ffffff
border: 1px solid #3b82f6
```

### Estado Error
```css
background: #fef2f2
border: 1px solid #ef4444
```

---

## 🎨 Colores Utilizados

| Estado | Fondo | Borde | Texto |
|--------|-------|-------|-------|
| Normal | `#fafafa` | `#d6d6d6` | `#000` |
| Focus | `#ffffff` | `#3b82f6` | `#000` |
| Error | `#fef2f2` | `#ef4444` | `#dc2626` |
| Success | `#dcfce7` | `#16a34a` | `#166534` |

---

## 🧪 Pruebas Manuales Recomendadas

### ✅ Checklist de Validación

- [ ] Nombre vacío muestra error
- [ ] Nombre con 2 caracteres muestra error
- [ ] Nombre con 3+ caracteres es válido
- [ ] Nombre con 101 caracteres muestra error
- [ ] Precio vacío muestra error
- [ ] Precio negativo muestra error
- [ ] Precio 0 es válido (ofertas)
- [ ] Precio con decimales funciona
- [ ] Categoría vacía muestra error
- [ ] Descripción vacía es válida (opcional)
- [ ] Descripción con 500 caracteres es válida
- [ ] Descripción con 501 caracteres muestra error
- [ ] Error desaparece al corregir el campo
- [ ] Submit bloqueado si hay errores
- [ ] Submit exitoso limpia el formulario
- [ ] Mensajes tienen animación suave

---

## 🚀 Próximos Pasos

1. **Ejecutar la aplicación:**
   ```powershell
   cd qrest-admin-panel/qrest-admin-panel
   npm run dev
   ```

2. **Navegar a:** `http://localhost:5173/products`

3. **Probar todas las validaciones** según el checklist

4. **Verificar que los errores se muestren correctamente**

5. **Confirmar que el formulario se limpia después de guardar**

---

## 💡 Tips de Uso

- Los campos obligatorios tienen un `*` en el placeholder
- Los errores solo aparecen después de tocar el campo
- Puedes corregir errores en cualquier orden
- El formulario recuerda qué campos ya validaste
- Después de guardar, todo vuelve al estado inicial
