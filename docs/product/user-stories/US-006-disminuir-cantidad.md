# US-006 — Disminuir cantidad de un producto

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero disminuir la cantidad de un producto dentro de mi carrito  
Para ajustar el pedido sin eliminar todo el producto completo.

---

## ✔ Criterios de aceptación

- [ ] Cada producto en el carrito debe tener un control para disminuir la cantidad.  
- [ ] Al disminuir la cantidad, los cambios deben reflejarse inmediatamente.  
- [ ] El precio total del producto debe actualizarse acorde a la nueva cantidad.  
- [ ] El total del carrito debe recalcularse en el momento.  
- [ ] Si la cantidad llega a 1 y el usuario intenta disminuir de nuevo, debe:  
  - [ ] Mostrar un mensaje “¿Eliminar producto?” 
- [ ] La cantidad actualizada debe persistir incluso después de recargar la página.  
- [ ] La acción debe funcionar sin refrescar la página (SPA).  

---

## 🔒 Restricciones
- No se puede disminuir por debajo de 0.  
- Si el producto fue removido del catálogo por el administrador, el cliente no debería poder modificarlo (manejar caso en US-008).

---

## 🔗 Dependencias
- Incrementar cantidad (US-005).  
- Eliminar producto del carrito (US-007).  
- Ver carrito (US-008).

---

## 📝 Notas
  
- Se recomienda un control “–” junto al “+” para una UX clara.  

---

## 🕒 Estimación
**Talle S**
