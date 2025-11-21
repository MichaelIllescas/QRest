# US-052 — Ver categorías

## 🧑 Actor
Administrador.

## 🎯 Descripción
Como administrador  
Quiero visualizar un listado de todas las categorías creadas  
Para poder gestionarlas fácilmente (editar, eliminar o cambiar su estado).

## ✔ Criterios de aceptación
- [ ] Debe existir una pantalla donde se muestren todas las categorías.  
- [ ] El listado debe mostrar: **nombre**, **estado** (activa/inactiva) y **acciones**.  
- [ ] Debe permitir acceder a editar y eliminar.  
- [ ] Debe incluir un botón “Crear categoría”.  
- [ ] Los cambios deben reflejarse inmediatamente.  
- [ ] Debe manejar estados de carga y error.

## 🔒 Restricciones
- Solo usuarios con rol administrador u operador autorizado pueden acceder.  
- No debe permitir acciones si no tiene permisos.

## 🔗 Dependencias
- US-027 — Crear categoría  
- US-028 — Editar categoría  
- US-048 — Eliminar categoría  
- US-023 — Crear producto

## 📝 Notas
- Es la pantalla principal del módulo de categorías.  
- Debe integrarse al navbar del panel administrativo.

## 🕒 Estimación
Talle S
