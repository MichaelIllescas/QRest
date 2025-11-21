# US-049 — Registrar pedido en la base de datos

## 🧑 Actor
Sistema (proceso automático).

## 🎯 Descripción
Como sistema  
Quiero registrar cada pedido entrante en la base de datos  
Para conservar el historial completo y permitir su gestión desde el panel administrativo.

---

## ✔ Criterios de aceptación

- [ ] Al recibir un pedido desde el frontend, debe crearse un registro en la tabla `pedidos`.
- [ ] El pedido debe incluir:
  - ID único
  - ID de mesa
  - Monto total
  - Fecha y hora de creación
  - Estado inicial “Pendiente”
- [ ] El registro debe persistirse **antes** de emitir el evento WebSocket.
- [ ] Si la creación falla, debe devolverse un error al cliente.
- [ ] Debe impedirse crear pedidos sin items.

---

## 🔒 Restricciones
- El ID debe generarse desde el backend.
- La fecha debe registrarse con timezone local del restaurante.

---

## 🔗 Dependencias
- US-009 Enviar pedido.
- US-014 Notificación por WebSocket.

---

## 🕒 Estimación
**Talle M**
