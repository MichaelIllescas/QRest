# US-042 — Configurar credenciales del WiFi del restaurante

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero configurar las credenciales del WiFi local del restaurante  
Para que los clientes puedan conectarse automáticamente al escanear el código QR y así acceder correctamente a la carta digital.

---

## ✔ Criterios de aceptación

- [ ] Debe existir en el panel una sección para configurar:  
  - SSID de la red WiFi  
  - Contraseña  
  - Tipo de seguridad (WPA/WPA2)  
- [ ] Las credenciales deben almacenarse en el backend de forma segura y encriptada.  
- [ ] Las credenciales deben integrarse automáticamente al código QR generado para cada mesa.  
- [ ] Al regenerar un QR, debe incluir las credenciales actualizadas.  
- [ ] El cliente debe poder conectarse automáticamente al WiFi al escanear el QR.  
- [ ] Si las credenciales cambian, el administrador debe poder regenerar todos los QR.

---

## 🔒 Restricciones
- Solo usuarios autorizados pueden modificar las credenciales.  
- Las credenciales no deben enviarse nunca al frontend por API (solo embebidas en el QR).  
- Las credenciales deben estar cifradas en la base de datos.

---

## 🔗 Dependencias
- US-030 Generar código QR  
- US-029 Registrar mesa

---

## 📝 Notas
- Formato QR recomendado:  
  `WIFI:T:WPA;S:<SSID>;P:<PASSWORD>;;`  
- iOS puede requerir confirmación manual, Android se conecta automáticamente.

---

## 🕒 Estimación
**Talle M**
