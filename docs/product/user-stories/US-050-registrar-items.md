# US-050 — Registrar items del pedido (Detalle)

## 🧑 Actor
Sistema (Backend).

## 🎯 Descripción
Como sistema  
Quiero registrar los items asociados a cada pedido  
Para mantener un detalle completo de los productos seleccionados por el cliente.

---

## ✔ Criterios de aceptación

- [ ] Cada pedido debe tener uno o más items en la tabla `pedido_items`.
- [ ] Cada item debe almacenar:
  - ID de producto
  - Nombre del producto (copia)
  - Precio unitario (copia)
  - Cantidad
  - Subtotal
- [ ] Los items deben registrarse **en la misma transacción** que el pedido.
- [ ] Debe fallar si algún producto no está disponible o fue deshabilitado.

---

## 🔒 Restricciones
- La operación debe ser atómica.
- No se permite editar items luego de creado el pedido.

---

## 🔗 Dependencias
- US-049 Registrar pedido.
- US-023 Crear producto.

---

## 🕒 Estimación
**Talle M**
