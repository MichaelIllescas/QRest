# US-047 — Asignar rol a usuario interno

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero asignar un rol a cada usuario interno  
Para controlar los permisos y el acceso a funcionalidades dentro del panel administrativo.

---

## ✔ Criterios de aceptación

- [ ] Debe existir un selector de rol al crear o editar un usuario.
- [ ] Los roles disponibles deben ser: Administrador y Operativo (mínimo).
- [ ] El cambio de rol debe aplicarse inmediatamente.
- [ ] El backend debe validar el rol seleccionado.
- [ ] El usuario debe ver solamente las funcionalidades permitidas por su rol.
- [ ] Debe impedirse que un Operativo asigne roles.

---

## 🔒 Restricciones
- Solo administradores pueden asignar o modificar roles.
- Los roles no deben poder manipularse desde el frontend sin autorización del backend.

---

## 🔗 Dependencias
- US-044 Crear usuario.
- US-045 Editar usuario.
- US-043 Login.

---

## 🕒 Estimación
**Talle S**
