# US-043 — Iniciar sesión en el panel administrativo

## 🧑 Actor
Usuario interno (Administrador / Operativo).

## 🎯 Descripción
Como usuario interno  
Quiero iniciar sesión en el panel administrativo  
Para acceder a las funciones internas del sistema.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un formulario de login con usuario y contraseña.
- [ ] Debe validar credenciales contra el backend.
- [ ] Si las credenciales son correctas, debe redirigir al panel.
- [ ] Si son incorrectas, debe mostrar mensaje claro.
- [ ] Debe iniciar sesión sin recargar la página completa.
- [ ] Debe manejar expiración de sesión.

---

## 🔒 Restricciones

- No debe permitir acceso sin autenticación.

---

## 🔗 Dependencias
- Backend de autenticación.

---

## 🕒 Estimación
**Talle M**
