# US-005 — Incrementar cantidad de un producto

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero poder incrementar la cantidad de un producto que ya está en mi carrito  
Para ajustar el pedido sin tener que agregarlo desde cero cada vez.

---

## ✔ Criterios de aceptación

- [ ] Cada producto dentro del carrito debe tener un botón o control para aumentar la cantidad.  
- [ ] Al incrementar la cantidad, el cambio debe verse reflejado inmediatamente.  
- [ ] El precio total del producto debe actualizarse automáticamente según la cantidad.  
- [ ] El total general del carrito debe recalcularse en el momento.  
- [ ] No debe recargarse la página al actualizar la cantidad.  
- [ ] La cantidad debe mantenerse aunque se recargue la página (persistencia local).  
- [ ] Debe respetarse el estilo visual configurado por el administrador.  

---

## 🔒 Restricciones
- No debe permitirse poner cantidades negativas.   
- Solo productos habilitados pueden modificarse.

---

## 🔗 Dependencias
- Agregar producto al carrito (US-004).  
- Ver carrito (US-008).

---

## 📝 Notas
- Ideal mostrar un control tipo “+” cerca de la cantidad actual.  

---

## 🕒 Estimación
**Talle S**
