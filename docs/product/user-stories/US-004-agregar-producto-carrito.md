# US-004 — Agregar producto al carrito

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero agregar un producto al carrito  
Para poder preparar mi pedido antes de enviarlo al restaurante.

---

## ✔ Criterios de aceptación

- [ ] Cada producto debe tener un botón o acción clara para “Agregar al carrito”.  
- [ ] Al hacer clic, el producto debe agregarse instantáneamente al carrito sin recargar la página.  
- [ ] Si el producto ya está agregado, debe incrementarse la cantidad en lugar de duplicarlo.  
- [ ] Debe existir una notificación visual (feedback) indicando que el producto fue agregado.  
- [ ] El estado del carrito debe mantenerse aunque el usuario navegue entre categorías.  
- [ ] El carrito debe persistir en el navegador aunque el cliente recargue la página.  
- [ ] El botón debe respetar los colores y tema visual configurado por el administrador.  

---

## 🔒 Restricciones
- Solo productos habilitados pueden agregarse.  
- El cliente no debe poder agregar productos con disponibilidad deshabilitada.  
- No hay límites de cantidad por producto salvo que el admin lo defina (futuro).

---

## 🔗 Dependencias
- Ver carta digital (US-001).  
- Ver productos por categoría (US-002).  
- Ver detalle de producto (US-003).

---

## 📝 Notas
- Debe funcionar igual desde la lista de productos o desde el detalle del producto.  
- Se recomienda mostrar un pequeño contador en el ícono del carrito.  
- La persistencia puede hacerse via `localStorage`.

---

## 🕒 Estimación
**Talle M**
