# US-013 — Cancelar pedido pendiente

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero poder cancelar un pedido mientras aún está en estado Pendiente  
Para corregir errores o cambios de decisión antes de que el restaurante comience a prepararlo.

---

## ✔ Criterios de aceptación

- [ ] Solo se pueden cancelar pedidos cuyo estado actual sea **Pendiente**.
- [ ] Debe existir un botón o acción clara para “Cancelar pedido” dentro del historial o detalle del pedido.
- [ ] Al cancelar, debe solicitarse una confirmación para evitar cancelaciones accidentales.
- [ ] Una vez cancelado, el pedido debe actualizarse a estado **Cancelado por el cliente**.
- [ ] El cambio debe reflejarse instantáneamente en el panel administrativo (WebSocket).
- [ ] El pedido cancelado debe desaparecer de los pedidos activos pero mantenerse en el historial.
- [ ] El cliente no debe poder cancelar pedidos ya en proceso (“Preparando”, “Entregado”).
- [ ] Si el backend rechaza la cancelación (caso borde), mostrar mensaje adecuado.

---

## 🔒 Restricciones
- No se pueden cancelar pedidos enviados desde otros dispositivos de la misma mesa sin refrescar el historial.
- Un pedido cancelado no puede revertirse.
- Debe funcionar sin recargar la página (SPA).

---

## 🔗 Dependencias
- US-009 Enviar pedido.
- US-011 Ver historial de pedidos.
- US-014 Pedido en tiempo real (WebSocket).

---

## 📝 Notas
- La cancelación debe considerarse un evento importante para cocina/personal, debe notificarse claramente.


---

## 🕒 Estimación
**Talle L**
