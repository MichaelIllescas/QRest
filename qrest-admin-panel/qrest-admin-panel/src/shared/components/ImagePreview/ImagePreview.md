
# 🖼️ ImagePreview Component — Documentación Completa (Lightbox + Placeholder)

El componente **ImagePreview** es un componente modular, reutilizable y completamente autónomo diseñado para mostrar imágenes en miniatura ("previews") con la capacidad de ampliarlas mediante un **lightbox integrado**, además de manejar automáticamente casos donde la imagen no exista.

---

# 📌 Objetivo del componente

Este componente fue creado para resolver 3 necesidades muy comunes en sistemas modernos como cartas digitales, paneles administrativos, e‑commerce y aplicaciones monolíticas o SPA:

1. **Mostrar imágenes en formato preview**, con tamaños configurables.
2. **Evitar errores cuando falta la imagen** (mediante placeholder seguro).
3. **Permitir ampliación profesional de imágenes** sin usar librerías externas.

Está desarrollado con:

- React + TypeScript  
- CSS Modules  
- Animaciones declarativas con CSS  
- Buenas prácticas (SRP, código limpio, accesibilidad básica)

---

# ✨ Características principales

✔ Soporta imágenes con URL real  
✔ Placeholder elegante cuando no existe URL  
✔ Totalmente clickeable (si hay imagen válida)  
✔ Lightbox integrado:  
   - Fondo oscurecido  
   - Blur  
   - Animación Fade + Zoom  
   - Botón ✖ para cerrar  
   - Cierre al hacer click afuera  
✔ 4 tamaños disponibles  
✔ Código extensible  
✔ Seguro: nunca rompe si falta la imagen  
✔ Funciona en cualquier layout

---

# 📁 Estructura de archivos recomendada

```
components/
  ImagePreview/
    ImagePreview.tsx
    ImagePreview.module.css
    ImagePreview.md
```

---

# 🧩 API del Componente

## Props

| Prop        | Tipo                                             | Descripción |
|-------------|---------------------------------------------------|-------------|
| `imageUrl`  | `string | null | undefined`                       | URL de la imagen. Si no existe, aparece placeholder. |
| `size`      | `"small" | "medium" | "large" | "full"`          | Tamaño del preview. |
| `alt`       | `string`                                          | Texto accesible. |
| `className` | `string`                                          | Clases adicionales para ampliar estilos. |

---

# 🔍 Reglas de renderizado

### ✔ Si `imageUrl` es válida:
- Se renderiza la miniatura
- Se aplica hover
- Se habilita el lightbox

### ✔ Si `imageUrl` NO existe o es cadena vacía:
- Se muestra placeholder
- NO se abre lightbox
- Mantiene dimensiones, sin romper diseño

Placeholder incluye:
- Ícono 🖼️  
- Texto “Sin imagen”  
- Fondo gris suave

---

# 🖼️ Tamaños disponibles

### `small`
- 80×80 px  
Para listas compactas, tablas o formularios.

### `medium`
- 150×150 px  
Tamaño equilibrado (default).

### `large`
- 250×250 px  
Ideal para fichas de producto.

### `full`
- Ocupa 100% del ancho disponible  
Perfecto para móviles o tarjetas grandes.

---

# 📘 Ejemplos de uso

---

## 1. Uso básico

```tsx
<ImagePreview imageUrl="https://picsum.photos/300" />
```

---

## 2. Placeholder automático

```tsx
<ImagePreview imageUrl={null} />
<ImagePreview imageUrl="" />
<ImagePreview imageUrl={undefined} />
```

Resultado:  
🖼️  
**Sin imagen**

---

## 3. Con tamaño específico

```tsx
<ImagePreview 
  imageUrl="/assets/menu/pizza.jpg"
  size="large"
/>
```

---

## 4. Con className personalizada

```tsx
<ImagePreview
  imageUrl="/img/producto.png"
  className="rounded-xl shadow-lg"
/>
```

---

## 5. En una grilla / listado (cartas, galerías)

```tsx
const images = [
  "/menu/pizza.jpg",
  "/menu/empanada.jpg",
  "/menu/milanesa.jpg",
  null,
];

export const MenuGallery = () => (
  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
    {images.map((url, i) => (
      <ImagePreview key={i} imageUrl={url} size="medium" />
    ))}
  </div>
);
```

---

## 6. Integrado con API (ejemplo real QRest)

```tsx
const { data: product } = useQuery(["product", id], fetchProduct);

return (
  <ImagePreview 
    imageUrl={product?.imageUrl}
    size="large"
  />
);
```

Si la imagen llega después → se actualiza automáticamente.

---

# 🔥 Lightbox: comportamiento completo

El lightbox aparece cuando:

- Se clickea la imagen
- La URL existe y es válida

### Características:

✔ Ocupa la pantalla completa  
✔ Fondo negro con opacidad  
✔ Blur opcional  
✔ Imagen maximizada proporcionalmente  
✔ Animación fade + zoom  
✔ Botón de cierre  
✔ Click afuera para cerrar  

### Ejemplo interno del componente:

```tsx
{isOpen && (
  <div className={styles.lightboxOverlay} onClick={handleClose}>
    <div
      className={styles.lightboxContent}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={imageUrl!} alt={alt} className={styles.lightboxImage} />

      <button className={styles.closeButton} onClick={handleClose}>
        ✖
      </button>
    </div>
  </div>
)}
```

---

# 🎨 Personalización extendida

El componente puede ampliarse con poco esfuerzo para:

### ✔ Lightbox con zoom via scroll  
### ✔ Navegación entre imágenes (next/prev)  
### ✔ Soporte para teclado (ESC, flechas)  
### ✔ Transiciones más avanzadas (Framer Motion)  
### ✔ Portales React para overlay global  
### ✔ Mostrar “Subir imagen” si `editable=true`  
### ✔ Skeleton loader mientras carga  

Si necesitás cualquiera de estas variantes, puedo generarlas.

---

# ♿ Accesibilidad

- `alt` configurado para lectura de pantalla  
- Placeholder evita imágenes rotas o iconos inaccesibles  
- Botón de cierre visible  
- Interacción simple (click para abrir/cerrar)  

Próximas mejoras sugeridas:
- Cerrar lightbox con tecla ESC  
- Focus trap en el modal  

---

# 🛠 Buenas prácticas aplicadas

- Principio de responsabilidad única  
- Código desacoplado  
- Tipado estático  
- CSS Modules para evitar colisiones  
- Control interno del estado (lightbox)  
- Comportamiento seguro ante errores  

---

# 📚 Conclusión

El componente **ImagePreview** es una solución robusta, moderna y profesional para mostrar imágenes en interfaces dinámicas. Es ideal para:

- Cartas digitales (QRest)  
- Sistemas administrativos  
- Formularios con imágenes  
- Catálogos  
- Listas de productos  
- Dashboards modernos  

Su diseño lo hace muy fácil de extender y totalmente seguro ante valores nulos.

---

¿Querés que ahora lo convierta en una galería completa con flechas tipo Instagram?  
¿O querés un modo “zoom con lupa” al estilo e‑commerce?
