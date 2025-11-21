# US-009 — Enviar pedido al restaurante

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero poder enviar mi pedido al restaurante desde mi carrito  
Para que el personal pueda recibirlo y comenzar a prepararlo.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un botón visible y claro para “Enviar pedido”.  
- [ ] Al presionar el botón, se debe enviar toda la información del carrito al backend.  
- [ ] El pedido debe quedar asociado automáticamente al número de mesa del QR.  
- [ ] El cliente debe recibir un mensaje claro indicando que el pedido fue enviado correctamente.  
- [ ] Si el backend está desconectado o falla, se debe mostrar un mensaje de error claro.  
- [ ] Una vez enviado el pedido, el carrito debe quedar vacío.  
- [ ] El pedido debe aparecer instantáneamente en el panel administrativo gracias al WebSocket.  
- [ ] No se debe permitir enviar un carrito vacío.  
- [ ] No se debe permitir enviar productos que ya no estén disponibles (validación final).  
- [ ] El total del pedido debe coincidir entre frontend y backend.  

---

## 🔒 Restricciones
- No requiere autenticación.  
- Solo se puede enviar un pedido por vez; evitar duplicados (botón con “loading”).  
- El carrito debe persistir hasta el envío.  
- Debe funcionar sin recargar la página (SPA).

---

## 🔗 Dependencias
- US-004 Agregar producto al carrito  
- US-008 Ver carrito  
- US-014 Pedido en tiempo real (WebSocket)  
- US-029 / US-030 Mesa vinculada vía QR  

---

## 📝 Notas
- El mensaje de confirmación puede desplegarse como modal o toast.  
- El pedido debe quedar inicialmente con estado **Pendiente**.  
  

---

## 🕒 Estimación
**Talle L**
