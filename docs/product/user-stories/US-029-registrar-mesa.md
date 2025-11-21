# US-029 — Registrar mesa

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero registrar las mesas del restaurante en el sistema  
Para vincular pedidos y QR correctamente según la mesa del cliente.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un formulario para registrar una mesa.
- [ ] Debe permitir asignar un número o identificador único.
- [ ] No debe permitir números duplicados.
- [ ] Al guardar, la mesa debe quedar disponible inmediatamente.
- [ ] Debe mostrarse en la lista de mesas registradas.
- [ ] La carta debe mostrar pedidos asociados correctamente según mesa.

---

## 🔒 Restricciones
- No se permite eliminar mesas si tienen pedidos activos.

---

## 🔗 Dependencias
- US-030 Generar QR para mesa.

---

## 📝 Notas
- Se recomienda permitir nombres personalizados para mesas especiales (“Patio”, “Terraza”).

---

## 🕒 Estimación
**Talle S**
