# US-031 — Regenerar QR si cambia la configuración

## 🧑 Actor
Administrador/Operario.

## 🎯 Descripción
Como administrador/Operario  
Quiero poder regenerar el código QR de una mesa  
Para actualizarlo cuando cambien las credenciales WiFi o la URL base del sistema.

---

## ✔ Criterios de aceptación

- [ ] Debe existir una acción para regenerar el QR de una mesa específica.
- [ ] El QR regenerado debe incluir las nuevas credenciales WiFi configuradas.
- [ ] El QR regenerado debe incluir la URL actualizada de la mesa.
- [ ] El cambio debe ser inmediato y visible para el administrador.
- [ ] Al regenerar, debe poder descargarse o imprimirse nuevamente.
- [ ] Todos los QR deben quedar sincronizados según la última configuración.

---

## 🔒 Restricciones
- Solo roles autorizados pueden regenerar QR.
- No se debe regenerar QR si la mesa no existe.

---

## 🔗 Dependencias
- US-030 Generar QR.
- US-042 Configurar credenciales WiFi.

---

## 🕒 Estimación
**Talle S**
