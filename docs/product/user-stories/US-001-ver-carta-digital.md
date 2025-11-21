# US-001 — Ver carta digital

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver la carta digital al escanear el código QR de mi mesa  
Para poder conocer los productos disponibles antes de realizar un pedido.

---

## ✔ Criterios de aceptación

- [ ] Al escanear el QR se debe abrir la carta digital correspondiente a la mesa.  
- [ ] La carta debe mostrar solo productos habilitados por el administrador.  
- [ ] Cada producto debe mostrar: nombre, precio, imagen y categoría.  
- [ ] La interfaz debe cargar en menos de 2 segundos en dispositivos móviles.  
- [ ] La navegación entre categorías debe ser instantánea (SPA).  
- [ ] Si el administrador modifica un producto, la carta debe reflejar el cambio al recargar.  
- [ ] El diseño debe ser completamente responsive.  
- [ ] La carta debe respetar el tema visual configurado en settings (colores, fuente).  

---

## 🔒 Restricciones
- No requiere autenticación.  
- Funciona dentro de la red local del restaurante.  
- Solo se muestran productos activos.

---

## 🔗 Dependencias
- Productos creados (US-023).  
- Categorías creadas (US-027).  
- QR generado para la mesa (US-030).

---

## 📝 Notas
- Esta es la primera pantalla del flujo del cliente.  
- Debe ser clara, minimalista y orientada a conversión (pedido rápido).

---

## 🕒 Estimación
Talle M.
