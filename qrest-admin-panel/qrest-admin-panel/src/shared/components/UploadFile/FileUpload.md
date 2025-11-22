# 📦 FileUpload Component (React + TypeScript)

Componente profesional, accesible y completamente configurable para carga de archivos.  
Cuenta con arrastrar y soltar, vista previa, validación, múltiples variantes visuales, tamaños y lógica desacoplada mediante hook.

Este componente está listo para usarse en aplicaciones profesionales como QRest, Inventiory, Coblan, sistemas administrativos y paneles de control.

---

# 🧩 Características principales

- ✔ Arrastrar y soltar archivos (Drag & Drop)
- ✔ Vista previa automática de imágenes
- ✔ Validación de tamaño, tipo y cantidad
- ✔ Lista de archivos con animación
- ✔ Eliminar archivos individualmente
- ✔ Variantes visuales: default, primary, success, warning, danger
- ✔ Tamaños: small, medium, large
- ✔ Hook `useFileUpload` para separar la lógica
- ✔ Componente UI limpio y desacoplado
- ✔ 100% TypeScript (tipado fuerte)
- ✔ Accesibilidad completa (focus, aria-label, teclado, alt)
- ✔ Animaciones profesionales (float, pulse, fade, shake)
- ✔ CSS Modules escalables
- ✔ Compatible con formularios y FormData

---

# 📁 Estructura recomendada del módulo

```
FileUpload/
 ├── FileUpload.tsx
 ├── useFileUpload.ts
 ├── types.ts
 ├── FileUpload.module.css
 └── index.ts
```

---

# 🚀 Instalación

```tsx
import { FileUpload } from "@/components/FileUpload";
```

---

# ⚙️ Props del componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| id | string | – | ID del input |
| name | string | – | Nombre del input |
| label | string | "Subir Archivos" | Texto visible |
| accept | string | "*/*" | Tipos permitidos |
| multiple | boolean | false | Permitir múltiples archivos |
| maxSize | number | 10485760 | Tamaño máximo |
| maxFiles | number | 5 | Máximo de archivos |
| disabled | boolean | false | Deshabilitar |
| required | boolean | false | Campo requerido |
| variant | string | default | default, primary, success, warning, danger |
| size | string | medium | small, medium, large |
| showPreview | boolean | true | Vista previa |
| showFileList | boolean | true | Mostrar lista |
| dragAndDrop | boolean | true | Arrastrar y soltar |
| helperText | string | "" | Texto de ayuda |
| error | string | "" | Error inicial |
| onChange | (files: File[]) => void | – | Callback archivos |
| onError | (message: string) => void | – | Callback error |
| onRemove | (file: File) => void | – | Callback remoción |
| className | string | "" | Clases extra |

---

# 🎨 Variantes visuales

```tsx
<FileUpload variant="primary" />
```

**Variantes disponibles:**
- default
- primary
- success
- warning
- danger

---

# 📐 Tamaños disponibles

```tsx
<FileUpload size="large" />
```

Tamaños:
- small
- medium
- large

---

# 🖱️ Uso con Drag & Drop

```tsx
<FileUpload dragAndDrop />
```

---

# 🖼️ Vista previa de imágenes

```tsx
<FileUpload showPreview />
```

---

# ❌ Manejo de errores

```tsx
<FileUpload onError={(msg) => alert(msg)} />
```

---

# 📤 Ejemplo básico

```tsx
<FileUpload
  label="Subir fotos"
  accept="image/*"
  multiple
  onChange={(files) => console.log(files)}
/>
```

---

# 📤 Ejemplo con FormData

```tsx
const formData = new FormData();
files.forEach((f, i) => formData.append("file" + i, f));
```

---

# 🧠 Uso del hook useFileUpload

```tsx
const {
  files,
  errorMessage,
  processFiles,
  removeFile
} = useFileUpload({
  accept: "image/*",
  multiple: true,
  maxSize: 5 * 1024 * 1024,
});
```

---

# 🔒 Accesibilidad

- Navegación por teclado  
- Focus visible  
- aria-label en botones  
- alt en imágenes  

---

# 🧱 Buenas prácticas

- Usar accept específico  
- Validar tamaño y cantidad  
- Mantener lógica en el hook  
- Revocar URLs de imágenes  

---

# 🏁 Conclusión

`FileUpload` es un componente profesional, modular, accesible y altamente reutilizable en aplicaciones modernas.
