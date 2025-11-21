# US-014 — Recibir pedido en tiempo real en el panel admin

## 🧑 Actor
Administrador / Usuario Operativo.

## 🎯 Descripción
Como administrador  
Quiero recibir los pedidos nuevos en tiempo real  
Para poder verlos inmediatamente sin necesidad de actualizar el panel.

---

## ✔ Criterios de aceptación

- [ ] Al enviar un pedido desde cualquier dispositivo, debe emitirse un evento WebSocket.
- [ ] El panel administrativo debe actualizarse instantáneamente mostrando el nuevo pedido.
- [ ] El pedido debe incluir: mesa, lista de productos, hora y estado inicial (Pendiente).
- [ ] El panel no debe necesitar recargar la página para ver nuevos pedidos.
- [ ] Si hay problemas de conexión con WebSocket, debe reintentar automáticamente.
- [ ] La llegada del pedido debe destacarse visualmente (sonido o resaltado opcional).

---

## 🔒 Restricciones
- El evento solo puede ser generado por el backend.
- Cada panel abierto debe recibir la actualización.
- No debe duplicarse la información del pedido.

---

## 🔗 Dependencias
- US-009 Enviar pedido.
- Backend configurado con WebSocket.

---

## 📝 Notas
- Motrar una notificación visual tipo “Nuevo pedido recibido”.


---

## 🕒 Estimación
**Talle L**
