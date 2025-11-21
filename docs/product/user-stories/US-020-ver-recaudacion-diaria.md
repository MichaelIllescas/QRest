# US-020 — Ver recaudación del día

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero ver la recaudación total del día  
Para conocer cuánto se vendió sin tener que revisar cada pedido manualmente.

---

## ✔ Criterios de aceptación

- [ ] Debe mostrarse el total recaudado acumulado del día.
- [ ] El cálculo debe considerar solo pedidos entregados.
- [ ] Debe actualizarse automáticamente cuando un pedido cambia a Entregado.
- [ ] Debe mostrar la lista de pedidos incluidos en la recaudación.
- [ ] Debe funcionar sin recargar la página.

---

## 🔒 Restricciones
- No deben incluirse pedidos cancelados.
- No incluye filtrado por fechas (eso es US-021).

---

## 🔗 Dependencias
- US-019 Cambiar estado.
- Backend de reportes.

---

## 📝 Notas
- Puede mostrarse como widget en el panel.

---

## 🕒 Estimación
**Talle M**
