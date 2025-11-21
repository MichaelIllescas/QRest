# US-025 — Cambiar disponibilidad del producto

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero habilitar o deshabilitar un producto del menú  
Para controlar qué productos pueden pedir los clientes en un momento dado.

---

## ✔ Criterios de aceptación

- [ ] Debe haber un interruptor o toggle para habilitar/deshabilitar productos.
- [ ] Si un producto está deshabilitado, no debe aparecer en la carta del cliente.
- [ ] Los cambios deben aplicarse inmediatamente.
- [ ] Si un producto deshabilitado está en el carrito del cliente, debe mostrarse un aviso y eliminarse.
- [ ] La disponibilidad debe guardarse en el backend.

---

## 🔒 Restricciones
- No debe permitir deshabilitar productos que estén en medio de un pedido en preparación.

---

## 🔗 Dependencias
- US-023 Crear producto.
- US-024 Editar producto.

---

## 📝 Notas
- Se recomienda un indicador de color para los productos deshabilitados en el panel.

---

## 🕒 Estimación
**Talle S**
