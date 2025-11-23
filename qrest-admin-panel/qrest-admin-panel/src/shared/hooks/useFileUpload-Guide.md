# 📘 useFileUpload — Guía de Uso Completa

Este documento explica **cómo usar el hook `useFileUpload`**, qué hace y cómo integrarlo correctamente con tu componente `FileUpload.tsx`.

---

# 🎯 ¿Qué es `useFileUpload`?

Es un hook que encapsula **toda la lógica compleja** del sistema de carga de archivos:

- Validación de tamaño
- Validación de tipo
- Validación de cantidad máxima
- Manejo de errores
- Previews de imágenes
- Eliminación de archivos
- Notificación al componente padre
- IDs únicos por archivo
- Limpieza automática de URLs

Tu componente UI queda simple y limpio, porque toda la lógica vive acá.

---

# 🧩 ¿Qué exporta el hook?

```ts
const {
  files,
  errorMessage,
  setErrorMessage,
  processFiles,
  removeFile,
} = useFileUpload(options);
```

### ✔ `files`
Lista de archivos procesados con preview y metadata.

### ✔ `errorMessage`
Mensaje de error generado por el hook.

### ✔ `setErrorMessage`
Permite limpiar o asignar manualmente un error.

### ✔ `processFiles(FileList)`
Convierte el FileList del input o dropzone en archivos válidos.

### ✔ `removeFile(id)`
Elimina un archivo y limpia su preview.

---

# ⚙️ Opciones disponibles

```ts
useFileUpload({
  accept: "*/*",
  multiple: false,
  maxSize: 10485760,
  maxFiles: 5,
  showPreview: true,
  onChange: (files) => {},
  onError: (msg) => {},
  onRemove: (file) => {},
});
```

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| accept | string | "*/*" | Extensiones permitidas |
| multiple | boolean | false | Permitir varios archivos |
| maxSize | number | 10485760 | Tamaño máximo (bytes) |
| maxFiles | number | 5 | Máximo de archivos |
| showPreview | boolean | true | Previews para imágenes |
| onChange | function | – | Archivos válidos |
| onError | function | – | Cuando hay error |
| onRemove | function | – | Cuando se elimina un archivo |

---

# 🚀 Ejemplo básico

```tsx
import { useFileUpload } from "./useFileUpload";

export function MyUploader() {
  const {
    files,
    errorMessage,
    processFiles,
    removeFile
  } = useFileUpload({
    accept: "image/*",
    multiple: true,
    maxSize: 5 * 1024 * 1024,
    onChange: (files) => console.log("Valid files:", files),
  });

  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      {files.map((f) => (
        <div key={f.id}>
          {f.preview && <img src={f.preview} width={80} />}
          <p>{f.name}</p>
          <button onClick={() => removeFile(f.id)}>Eliminar</button>
        </div>
      ))}
    </>
  );
}
```

---

# 🖱️ Cómo usarlo con Dropzone

```tsx
<div
  onDragOver={(e) => e.preventDefault()}
  onDrop={(e) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  }}
>
  Arrastra aquí tus archivos
</div>
```

---

# 🧱 Integración con `FileUpload.tsx`

En tu componente principal:

```tsx
const {
  files,
  errorMessage,
  processFiles,
  removeFile
} = useFileUpload({
  accept,
  multiple,
  maxSize,
  maxFiles,
  showPreview,
  onChange,
  onError,
  onRemove,
});
```

- `processFiles` se llama cuando el usuario selecciona o suelta archivos.  
- `files` se usa para mostrar previews, lista, iconos, etc.  
- `removeFile` se usa en el botón ✕.  
- `errorMessage` se muestra con animación.  

Toda la UI usa esos datos, pero sin manejar validaciones.

---

# 📂 Estructura de cada archivo procesado

```ts
interface FileUploadItem {
  file: File;
  id: string;
  name: string;
  size: number;
  type: FileType;
  preview: string | null;
}
```

---

# ❤️ Conclusión

`useFileUpload` permite crear un componente de carga:

- Profesional  
- Mantenible  
- Escalable  
- Limpio  
- Fácil de integrar  
- Totalmente reutilizable  

Y separa correctamente **UI vs lógica**, como debe ser en un proyecto grande.

---

# ✅ Autor: Jonathan – Imperial Net
