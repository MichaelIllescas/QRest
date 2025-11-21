# US-021 — Filtrar recaudación por fecha

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero filtrar la recaudación por un rango de fechas  
Para poder analizar los ingresos en períodos específicos.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un selector de rango de fechas.
- [ ] Al seleccionar un rango, debe recalcularse la recaudación de pedidos entregados dentro del período.
- [ ] Debe mostrar el total filtrado y la lista de pedidos correspondientes.
- [ ] El filtrado debe hacerse desde el backend.
- [ ] El panel no debe recargar la página completa.
- [ ] Si no hay resultados, debe mostrarse un mensaje claro.

---

## 🔒 Restricciones
- No deben incluirse pedidos cancelados.
- No debe permitir rangos inválidos (fecha inicio > fecha fin).

---

## 🔗 Dependencias
- US-020 Ver recaudación diaria.

---

## 📝 Notas
- Futuro: permitir exportar a CSV/PDF.

---

## 🕒 Estimación
**Talle M**
