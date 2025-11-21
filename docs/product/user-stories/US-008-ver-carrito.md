# US-008 — Ver carrito completo

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver el carrito completo  
Para revisar mi pedido antes de enviarlo al restaurante.

---

## ✔ Criterios de aceptación

- [ ] Debe existir una vista clara donde ver todos los productos agregados al carrito.
- [ ] Cada producto debe mostrar: nombre, precio unitario, cantidad y subtotal.
- [ ] Debe mostrarse el total general del pedido.
- [ ] Debe permitir acceder nuevamente a la carta para seguir agregando productos.
- [ ] Debe permitir modificar cantidades desde esta vista (US-005 y US-006).
- [ ] Debe permitir eliminar productos desde esta vista (US-007).
- [ ] La vista debe mantenerse actualizada aunque el cliente recargue la página (persistencia).
- [ ] La navegación debe ser fluida sin recargar páginas completas (SPA).

---

## 🔒 Restricciones
- No muestra productos deshabilitados (si el administrador los quitó, deben desaparecer).
- No requiere autenticación.
- Debe funcionar correctamente en móvil como prioridad.

---

## 🔗 Dependencias
- US-004 Agregar producto al carrito
- US-005 Incrementar cantidad
- US-006 Disminuir cantidad
- US-007 Eliminar producto del carrito

---

## 📝 Notas
- Se recomienda mostrar un ícono del carrito con contador accesible desde cualquier pantalla.
- El diseño debe ser claro y simple, orientado a decisión rápida del cliente.

---

## 🕒 Estimación
**Talle M**
