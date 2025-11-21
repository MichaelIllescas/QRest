# US-023 — Crear producto

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero crear un nuevo producto en la carta  
Para ofrecerlo a los clientes en el menú digital.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un formulario para crear un producto.
- [ ] El formulario debe incluir: nombre, precio, categoría, imagen opcional, descripción.
- [ ] Debe validar campos obligatorios (nombre, precio, categoría).
- [ ] Al guardar, el producto debe quedar habilitado por defecto.
- [ ] Debe aparecer inmediatamente en la carta del cliente.
- [ ] Debe almacenarse en el backend mediante una API.

---

## 🔒 Restricciones
- El nombre no debe estar vacío.
- El precio puede ser cero en caso de ofertas.
- La categoría debe existir previamente.

---

## 🔗 Dependencias
- US-027 Crear categoría.

---

## 📝 Notas
- La carga de imágenes puede ser opcional en el MVP.

---

## 🕒 Estimación
**Talle M**
