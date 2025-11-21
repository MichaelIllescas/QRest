# US-019 — Cambiar estado del pedido

## 🧑 Actor
Administrador / Usuario Operativo.

## 🎯 Descripción
Como administrador  
Quiero cambiar el estado de un pedido  
Para indicar el avance en la preparación y entrega.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un control para cambiar el estado del pedido.
- [ ] Deben estar disponibles los estados: Pendiente, Preparando, Entregado, Cancelado.
- [ ] El cambio debe enviarse al backend.
- [ ] El cliente debe recibir el cambio en tiempo real (WebSocket).
- [ ] El panel debe actualizar la lista automáticamente después del cambio.
- [ ] No debe permitirse retroceder estados (ej. Entregado → Preparando).

---

## 🔒 Restricciones
- Pedidos cancelados no pueden modificarse.
- El backend es el origen de la verdad del estado.

---

## 🔗 Dependencias
- US-014 Pedido en tiempo real.
- US-018 Detalle del pedido.
- US-015 Actualización en tiempo real para el cliente.

---

## 📝 Notas
- Se recomienda un selector tipo "workflow" para evitar errores.

---

## 🕒 Estimación
**Talle M**
