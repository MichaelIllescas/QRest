# US-012 — Consultar historial al abrir la vista

## 🧑 Actor
Cliente del restaurante.

## 🎯 Descripción
Como cliente  
Quiero que el historial se consulte automáticamente desde el backend cada vez que abra la vista  
Para ver siempre los pedidos actualizados de mi mesa sin depender del dispositivo.

---

## ✔ Criterios de aceptación

- [ ] El historial debe obtenerse del backend mediante un endpoint dedicado.  
- [ ] La consulta debe realizarse **cada vez que el cliente abra la vista**.  
- [ ] Si el administrador ha limpiado el historial, debe mostrarse vacío.  
- [ ] No debe almacenarse en localStorage ni en el navegador.  
- [ ] Si hay cambios recientes (ej. pedido entregado), deben reflejarse al consultar.  
- [ ] La consulta debe ser rápida y no bloquear la interfaz.  
- [ ] Debe manejar errores de backend con mensajes claros.  

---

## 🔒 Restricciones
- El historial pertenece a la mesa, no al teléfono.  
- La URL del QR debe incluir o resolver el identificador de la mesa.  

---

## 🔗 Dependencias
- US-011 Ver historial de pedidos  
- US-022 Limpiar historial desde admin  

---

## 📝 Notas
-Implementar un pequeño loading mientras se consulta.  


---

## 🕒 Estimación
**Talle S**
