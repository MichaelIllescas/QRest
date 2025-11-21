# US-030 — Generar código QR para mesa

## 🧑 Actor
Administrador / Operador.

## 🎯 Descripción
Como administrador/Operador  
Quiero generar un código QR único para cada mesa  
Para que los clientes puedan conectarse al WiFi local y acceder a la carta digital de la mesa correcta.

---

## ✔ Criterios de aceptación

- [ ] El sistema debe generar un QR por cada mesa registrada.
- [ ] El QR debe contener **dos informaciones combinadas**:  
  - Credenciales del WiFi local  
  - URL específica de la mesa  
- [ ] El QR debe seguir el formato estándar de conexión WiFi:  
  `WIFI:T:<TIPO>;S:<SSID>;P:<PASSWORD>;;`
- [ ] Debe permitir descargar o imprimir el QR.
- [ ] Si se actualizan las credenciales WiFi, debe poder regenerarse.
- [ ] Si cambia la URL base del sistema (IP o dominio), debe poder regenerarse.
- [ ] El QR debe ser escaneable desde cualquier móvil moderno.
- [ ] Al escanear el QR, el dispositivo debe conectarse al WiFi y luego abrir la carta correcta.

---

## 🔒 Restricciones
- No se debe generar QR para mesas no registradas.
- Las credenciales no deben ser visibles de forma legible, solo embebidas en el QR.


---

## 🔗 Dependencias
- US-029 Registrar mesa  
- US-042 Configurar credenciales WiFi  

---

## 📝 Notas
- Se recomienda almacenar la imagen del QR para uso futuro (PDF, impresión).  
- En iOS, el usuario puede necesitar presionar “Unirse a red”.

---

## 🕒 Estimación
**Talle M**
