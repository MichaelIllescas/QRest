# US-022 — Limpiar historial de pedidos de la mesa (CORREGIDA — versión final)

## 🧑 Actor
Administrador / Usuario Operativo.

## 🎯 Descripción
Como administrador  
Quiero limpiar completamente la mesa, incluyendo todos sus pedidos  
Para que quede lista para un nuevo grupo de clientes sin información residual.

---

## ✔ Criterios de aceptación

- [ ] Debe existir una acción clara para “Limpiar mesa” o “Reiniciar historial”.  
- [ ] Al ejecutar la acción, **todos** los pedidos asociados a la mesa deben pasar a estado **Archivado**.  
- [ ] Pedidos en estado Pendiente o Preparando también deben archivarse (sin excepción).  
- [ ] Después de la limpieza, la mesa debe quedar sin pedidos activos ni historial visible.  
- [ ] Los clientes que están viendo la carta deben recibir historial vacío al consultar.  
- [ ] El panel administrativo debe dejar de mostrar pedidos de esa mesa inmediatamente.  
- [ ] La acción debe requerir confirmación para evitar errores.  
- [ ] Debe enviarse un evento WebSocket notificando que la mesa fue limpiada.  

---

## 🔒 Restricciones
- Solo usuarios con permisos (Administrador u Operativo) pueden ejecutar la acción.  
- Debe afectar exclusivamente a la mesa seleccionada.  

---

## 🔗 Dependencias
- US-011 Ver historial de pedidos  
- US-012 Consultar historial desde backend  
- US-014 / US-015 WebSocket de actualizaciones  

---

## 📝 Notas


---

## 🕒 Estimación
**Talle M**
