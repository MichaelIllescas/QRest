# US-048 — Eliminar categoría

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero eliminar una categoría del sistema  
Para mantener la carta organizada y remover categorías que ya no se utilizan.

---

## ✔ Criterios de aceptación

- [ ] Debe existir una acción clara para eliminar una categoría.
- [ ] Debe pedir confirmación antes de eliminar.
- [ ] Si la categoría tiene productos asociados, debe impedirse su eliminación.
- [ ] Una vez eliminada, no debe aparecer en la carta ni en el panel.
- [ ] Debe reflejarse inmediatamente después de eliminarla.
- [ ] Debe guardarse la acción en el backend.

---

## 🔒 Restricciones
- Solo usuarios con permiso de administrador pueden eliminar categorías.
- No debe permitir eliminar categorías utilizadas en pedidos activos.

---

## 🔗 Dependencias
- US-027 Crear categoría.
- US-028 Editar categoría.
- US-023 Crear producto (relación productos-categorías).

---

## 📝 Notas
- Perspectiva futura: permitir “archivar” categorías en lugar de eliminarlas definitivamente.

---

## 🕒 Estimación
**Talle M**
