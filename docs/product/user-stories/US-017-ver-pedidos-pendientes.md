# US-017 — Ver listado de pedidos pendientes

## 🧑 Actor
Administrador / Usuario Operativo.

## 🎯 Descripción
Como administrador  
Quiero ver un listado de todos los pedidos pendientes  
Para gestionar rápidamente los pedidos que aún no fueron atendidos.

---

## ✔ Criterios de aceptación

- [ ] El panel debe mostrar una lista de todos los pedidos en estado Pendiente.
- [ ] Cada pedido debe mostrar: mesa, productos, total, hora y estado.
- [ ] La lista debe actualizarse automáticamente con WebSocket.
- [ ] Debe poder ordenarse por hora (más reciente arriba).
- [ ] Debe poder abrirse el detalle desde esta lista.
- [ ] No debe requerir recargar la página.

---

## 🔒 Restricciones
- Solo se muestran pedidos activos (no cancelados ni entregados).
- Funciona solo dentro del panel administrativo.

---

## 🔗 Dependencias
- US-014 Pedido en tiempo real.
- US-018 Detalle del pedido.

---

## 📝 Notas
- Priorizar pedidos mas antiguos
---

## 🕒 Estimación
**Talle M**
