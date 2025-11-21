# US-011 — Ver historial de pedidos realizados

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero ver el historial de pedidos realizados en mi mesa  
Para recordar qué pedí y consultar el estado de cada pedido mientras permanezco en el restaurante.

---

## ✔ Criterios de aceptación

- [ ] El historial debe obtenerse desde el backend, no desde el dispositivo.  
- [ ] El historial debe mostrar todos los pedidos realizados por **la mesa actual**, no por el dispositivo.  
- [ ] Cada pedido debe incluir: fecha/hora, lista de productos, total y estado.  
- [ ] El historial debe actualizarse cada vez que el cliente lo abra.  
- [ ] Si no hay pedidos, debe mostrarse un mensaje claro.  
- [ ] Los estados deben visualizarse claramente (Pendiente, Preparando, Entregado, Cancelado).  
- [ ] El historial debe respetar los colores y el tema visual configurado.  

---

## 🔒 Restricciones
- La mesa se determina por el QR escaneado.  
- No se almacena historial en el dispositivo.  
- Si el administrador limpia el historial, el cliente debe verlo vacío al actualizar.  

---

## 🔗 Dependencias
- US-009 Enviar pedido al restaurante  
- US-022 Limpiar historial desde el panel administrativo  

---

## 📝 Notas
- El historial nunca debe mezclarse entre mesas distintas.  

---

## 🕒 Estimación
**Talle M**
