# US-051 — Registrar cambios de estado del pedido con timestamp

## 🧑 Actor
Sistema / Administrador.

## 🎯 Descripción
Como sistema  
Quiero registrar cada cambio de estado del pedido  
Para mantener trazabilidad completa y permitir reportes posteriores.

---

## ✔ Criterios de aceptación

- [ ] Cada cambio de estado debe agregarse a la tabla `pedido_estado_historial`.
- [ ] Debe registrar:
  - Estado anterior
  - Estado nuevo
  - Fecha y hora del cambio
- [ ] El registro debe generarse automáticamente cuando se modifique el estado.
- [ ] El historial debe quedar disponible para analíticas.

---

## 🔒 Restricciones
- Solo se permiten estados válidos (Pendiente → Preparando → Entregado).
- Cancelaciones solo aplican en estado Pendiente.

---

## 🔗 Dependencias
- US-019 Cambiar estado del pedido.
- US-015 Actualizaciones en tiempo real.

---

## 🕒 Estimación
**Talle S**
