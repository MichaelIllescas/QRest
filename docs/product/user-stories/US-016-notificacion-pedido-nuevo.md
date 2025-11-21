# US-016 — Notificar llegada de nuevos pedidos al panel

## 🧑 Actor
Administrador / Usuario Operativo.

## 🎯 Descripción
Como administrador  
Quiero recibir una notificación clara cuando llegue un nuevo pedido  
Para poder atenderlo rápidamente sin perderlo de vista.

---

## ✔ Criterios de aceptación

- [ ] Debe mostrarse una notificación visual cuando llegue un pedido nuevo.
- [ ] La notificación debe activarse solo por eventos WebSocket del backend.
- [ ] Debe destacar el pedido nuevo (color, ícono, animación breve).
- [ ] La notificación debe desaparecer automáticamente luego de unos segundos.
- [ ] Debe funcionar aun si el panel está filtrando pedidos.
- [ ] No debe duplicar notificaciones si el pedido ya está en la lista.

---

## 🔒 Restricciones
- No deben generarse notificaciones por pedidos editados.
- Solo aplica a pedidos en estado inicial “Pendiente”.

---

## 🔗 Dependencias
- US-014 Pedido en tiempo real.
- Backend con WebSocket.

---

## 🕒 Estimación
**Talle S**
