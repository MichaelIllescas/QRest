# US-026 — Subir imagen de producto

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero poder subir una imagen para un producto  
Para que los clientes puedan visualizarlo correctamente en la carta digital.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un campo para seleccionar una imagen desde el dispositivo.
- [ ] Debe permitir formatos JPG o PNG.
- [ ] La imagen debe previsualizarse antes de guardar los cambios.
- [ ] Al confirmar, la imagen debe enviarse al backend.
- [ ] La carta del cliente debe mostrar la nueva imagen inmediatamente (al recargar).
- [ ] Si ya existía una imagen previa, debe poder reemplazarse.
- [ ] Si el administrador cancela la carga, no debe guardarse nada.

---

## 🔒 Restricciones
- Tamaño máximo recomendado: 2 MB.
- Solo roles autorizados pueden subir imágenes.

---

## 🔗 Dependencias
- US-023 Crear producto.
- US-024 Editar producto.

---

## 📝 Notas
- Se recomienda comprimir o redimensionar automáticamente la imagen en el backend.

---

## 🕒 Estimación
**Talle M**
