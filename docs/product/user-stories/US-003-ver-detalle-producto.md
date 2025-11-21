# US-003 — Ver detalle de producto

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver el detalle completo de un producto  
Para conocer mejor lo que voy a pedir antes de agregarlo al carrito.

---

## ✔ Criterios de aceptación

- [ ] Al seleccionar un producto, debe abrirse una vista o modal con su información detallada.  
- [ ] El detalle debe mostrar como mínimo:  
  - nombre  
  - precio  
  - imagen principal  
  - descripción completa  
  - categoría  
- [ ] Debe incluir un botón para “Agregar al carrito”.  
  
- [ ] La vista debe cerrar fácilmente mediante botón.
- [ ] Si el administrador actualiza el producto, el detalle debe mostrar los datos correctos al recargar.  
- [ ] Debe respetar los colores y tema visual configurado.  

---

## 🔒 Restricciones
- Solo se muestran productos habilitados.  
- No requiere autenticación.  
- Debe cargarse rápido en dispositivos móviles.

---

## 🔗 Dependencias
- Visualización de carta (US-001).  
- Visualización por categoría (US-002).  
- Gestión de productos (US-023 / US-024).  

---

## 📝 Notas
- La imagen debe adaptarse al ancho de pantalla.  
- Se recomienda animación ligera para apertura/cierre del modal para mejor UX.  

---

## 🕒 Estimación
**Talle S**
