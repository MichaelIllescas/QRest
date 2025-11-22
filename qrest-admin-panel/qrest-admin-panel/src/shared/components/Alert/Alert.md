# 📌 Componente `Alert`

El componente **Alert** muestra mensajes informativos, de éxito, advertencia o error dentro de la interfaz.  
Es completamente reutilizable, accesible y compatible con CSS Modules.

---

## 🎨 Variantes disponibles

- `success` — Operación realizada exitosamente.
- `error` — Algo salió mal.
- `warning` — Advertencias o acciones a revisar.
- `info` — Información general o mensajes neutros.

Cada variante incluye su icono correspondiente.

---

## ⚙️ Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"success" \| "error" \| "warning" \| "info"` | `"info"` | Tipo de alerta visual |
| `title` | `string` | — | Título del mensaje |
| `children` | `ReactNode` | — | Contenido del mensaje |
| `closable` | `boolean` | `false` | Muestra un botón para cerrar la alerta |
| `onClose` | `() => void` | — | Callback al cerrar la alerta |
| `icon` | `boolean` | `true` | Muestra el icono de la variante |
| `className` | `string` | `""` | Clases adicionales opcionales |

---

## 📌 Ejemplo de uso básico

```tsx
<Alert variant="success" title="Guardado correctamente">
  El producto fue actualizado con éxito.
</Alert>
```

---

## 📌 Ejemplo con cierre manual

```tsx
<Alert
  variant="error"
  title="Error al guardar"
  closable
  onClose={() => console.log("cerrado")}
>
  No se pudo procesar la acción.
</Alert>
```

---

## 🔧 Accesibilidad

- Usa el atributo `role="alert"` para lectores de pantalla.
- El botón de cierre incluye `aria-label="Cerrar alerta"`.

---

## 🧩 Notas de implementación

- Maneja su visibilidad mediante estado interno.
- Al cerrarse, renderiza `null` para sacarlo del DOM.
- Los estilos están aislados mediante `Alert.module.css`.

---
