# 📌 Componente `AlertModal`

`AlertModal` es un componente de modal genérico diseñado para mostrar confirmaciones, advertencias, mensajes críticos o información estructurada.

El modal cubre la pantalla completa, bloquea el scroll del cuerpo y permite interacción mediante botones.

---

## 🎨 Variantes disponibles

- `success`
- `error`
- `warning`
- `info`
- `question`

Cada variante posee un icono SVG representativo con sus colores y estilo propio.

---

## ⚙️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"success" \| "error" \| "warning" \| "info" \| "question"` | `"info"` | Tipo visual del modal |
| `title` | `string` | — | Título principal del modal |
| `children` | `ReactNode` | — | Cuerpo del modal |
| `isOpen` | `boolean` | `false` | Controla la visibilidad |
| `onClose` | `() => void` | — | Cierra el modal |
| `onConfirm` | `() => void` | — | Acción al confirmar |
| `confirmText` | `string` | `"Confirmar"` | Texto del botón confirmar |
| `cancelText` | `string` | `"Cancelar"` | Texto del botón cancelar |
| `showCancelButton` | `boolean` | `false` | Muestra el botón cancelar |
| `icon` | `boolean` | `true` | Muestra el icono |

---

## 📌 Ejemplo básico

```tsx
<AlertModal
  title="Producto creado"
  variant="success"
  isOpen={isOpen}
  onClose={() => setOpen(false)}
>
  El producto se ha guardado correctamente.
</AlertModal>
```

---

## 📌 Ejemplo como confirmación crítica

```tsx
<AlertModal
  title="Eliminar producto"
  variant="error"
  isOpen={isDeleteOpen}
  onClose={closeDelete}
  onConfirm={handleDelete}
  showCancelButton
  confirmText="Eliminar"
>
  ¿Estás seguro de que deseas eliminar este producto?
</AlertModal>
```

---

## 🎯 Comportamientos del modal

- Cierra con tecla **ESC**.
- Cierra al hacer click en el overlay.
- Bloquea el scroll del body al abrirse.
- Mantiene estructura semántica: título, contenido, acciones.

---

## 🧩 Notas de implementación

- Tipado completo en TypeScript.
- Íconos SVG embebidos.
- Estilos encapsulados mediante `AlertModal.module.css`.
- Compatible con navegación por teclado.

---
