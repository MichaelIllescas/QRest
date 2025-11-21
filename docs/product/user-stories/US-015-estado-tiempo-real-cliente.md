# US-015 — Actualizar estado del pedido en tiempo real para el cliente

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver el estado de mi pedido actualizarse en tiempo real  
Para saber si está siendo preparado o si ya fue entregado sin tener que recargar la página.

---

## ✔ Criterios de aceptación

- [ ] Cada cambio de estado del pedido debe enviar un evento WebSocket al cliente.
- [ ] El estado debe actualizarse instantáneamente en la vista del historial del cliente.
- [ ] Deben mostrarse los siguientes estados como mínimo: Pendiente, Preparando, Entregado, Cancelado.
- [ ] La actualización no debe requerir recargar la página.
- [ ] Si el WebSocket falla, debe reintentarse la conexión automáticamente.
- [ ] Si el administrador cancela un pedido (futuro), el cliente debe verlo inmediatamente.

---

## 🔒 Restricciones
- Solo se reciben actualizaciones para los pedidos de la mesa del cliente.
- No debe mostrarse información de otras mesas.
- No requiere autenticación.

---

## 🔗 Dependencias
- US-011 Ver historial de pedidos.
- US-014 Pedido en tiempo real en panel admin.

---

## 📝 Notas

- Diferenciar los estados con colores para mejor UX.

---

## 🕒 Estimación
**Talle M**
