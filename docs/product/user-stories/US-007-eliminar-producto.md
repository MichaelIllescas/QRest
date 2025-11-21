# US-007 — Eliminar un producto del carrito

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero poder eliminar un producto de mi carrito  
Para limpiar mi pedido de los productos que ya no deseo consumir.

---

## ✔ Criterios de aceptación

- [ ] Cada producto en el carrito debe tener un botón o acción clara para “Eliminar”.  
- [ ] Al eliminar un producto, debe desaparecer inmediatamente del carrito.  
- [ ] El total general del carrito debe recalcularse en el momento.  
- [ ] La eliminación debe funcionar sin recargar la página (SPA).  
- [ ] Debe mostrarse feedback visual para confirmar que el producto fue eliminado.  
- [ ] Si el cliente recarga la página, el producto eliminado no debe volver a aparecer (persistencia local).  
- [ ] Debe manejarse el caso en que un producto haya sido deshabilitado o eliminado por el administrador (mostrar advertencia y removerlo del carrito).  

---

## 🔒 Restricciones
- No debe permitir eliminar un producto que ya fue enviado en un pedido (solo afecta al carrito).  
- Productos no disponibles deben removerse automáticamente al entrar al carrito.  
- No requiere conexión al backend (persistencia local).

---

## 🔗 Dependencias
- Ver carrito (US-008).  
- Disminuir cantidad (US-006).  
- Gestión de productos (US-023 / US-025).

---

## 📝 Notas
- Puede incluir confirmación (“¿Estás seguro?”) según UX final.  
- Es buena práctica mostrar un mensaje del tipo: “Producto eliminado del carrito”.  

---

## 🕒 Estimación
**Talle S**
