# US-010 — Ver mensaje de confirmación del pedido

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver un mensaje claro de confirmación después de enviar mi pedido  
Para saber que el restaurante recibió correctamente mi solicitud.

---

## ✔ Criterios de aceptación

- [ ] Debe mostrarse un mensaje visual indicando que el pedido fue enviado con éxito.
- [ ] El mensaje debe ser claro, corto y visible.
- [ ] Debe indicar que el personal del restaurante está preparando el pedido.
- [ ] El mensaje debe cerrarse automáticamente o permitir que el usuario lo cierre.
- [ ] Debe respetar los colores y el estilo visual configurado por el administrador.
- [ ] Si el pedido no pudo enviarse, debe mostrarse un mensaje de error específico.

---

## 🔒 Restricciones
- El mensaje solo se muestra después de un envío exitoso.
- No debe confundirse con el estado posterior del pedido (que se maneja en US-015).

---

## 🔗 Dependencias
- US-009 Enviar pedido al restaurante.

---

## 📝 Notas
- Puede implementarse como modal, toast o banner.
- Recomendación: mostrar también el número de pedido.

---

## 🕒 Estimación
**Talle XS**
