# Épicos del Sistema – QRest (Carta Interactiva para Restaurantes)

Este documento define los grandes bloques funcionales del sistema.  
Cada épico agrupa historias de usuario relacionadas y sirve como guía para la planificación de sprints.

---

# 📌 ÉPICO 1 — Carta Digital QR

## Descripción
Interfaz pública accesible al escanear el QR de la mesa.  
Permite navegar la carta y consultar productos.

## Objetivos
- Mostrar la carta actualizada.
- Navegar por categorías.
- Ver detalles de productos.

## Incluye
- Ver carta.
- Ver productos por categoría.
- Ver detalle de producto.

---

# 📌 ÉPICO 2 — Carrito y Pedido

## Descripción
Permite a los clientes armar un carrito y enviar pedidos al restaurante.

## Objetivos
- Flujo simple de selección de productos.
- Enviar pedidos vinculados a la mesa.
- Consultar historial de pedidos.

## Incluye
- Agregar productos al carrito.
- Ver carrito y modificarlo.
- Enviar pedido.
- Ver confirmación.
- Historial de pedidos.
- Cancelar pedidos pendientes.

---

# 📌 ÉPICO 3 — Pedidos en Tiempo Real (WebSocket)

## Descripción
Sincronización bidireccional e instantánea entre cliente y panel administrativo.

## Objetivos
- Notificar pedidos entrantes.
- Actualizar estado del pedido en vivo.

## Incluye
- Canal WebSocket.
- Pedido entrante en tiempo real.
- Cambios de estado reflejados en cliente y panel.

---

# 📌 ÉPICO 4 — Panel Administrativo (UI y Operación)

## Descripción
Panel de escritorio (Electron) para gestión diaria del restaurante.

## Objetivos
- Ver y gestionar pedidos.
- Controlar estado de mesas.
- Consultar recaudación.

## Incluye
- Listado de pedidos pendientes.
- Detalle del pedido.
- Cambiar estado del pedido.
- Ver recaudación diaria.
- Filtro por fecha.
- Limpiar historial de mesas.

**No incluye** login, roles o usuarios (están en el épico 9).

---

# 📌 ÉPICO 5 — Gestión de Productos y Categorías

## Descripción
CRUD completo de productos y categorías que forman la carta.

## Objetivos
- Mantener catálogo actualizado.
- Modificar fácilmente la oferta.

## Incluye
- Crear producto.
- Editar producto.
- Cambiar disponibilidad.
- Cargar imágenes.
- Crear categoría.
- Editar categoría.
- Eliminar categoría.

---

# 📌 ÉPICO 6 — Mesas y Códigos QR

## Descripción
Asociación entre mesas físicas y acceso digital a la carta.

## Objetivos
- Registrar mesas.
- Generar códigos QR correctamente configurados.
- Conectar al cliente al WiFi local.

## Incluye
- Registrar mesa.
- Generar QR (incluye URL + datos WiFi).
- Regenerar QR al cambiar configuración.

---

# 📌 ÉPICO 7 — Recaudación y Reportes Básicos

## Descripción
Información centralizada para operación diaria.

## Objetivos
- Analizar consumo.
- Ver ventas.

## Incluye
- Recaudación del día.
- Filtro por fecha.
- Top 5 productos más vendidos.
- Cantidad de pedidos por día.

---

# 📌 ÉPICO 8 — Configuración del Sistema  
*(Incluye personalización visual + datos del local + WiFi)*

## Descripción
Permite ajustar parámetros generales del sistema sin editar código.

## Objetivos
- Configurar información del restaurante.
- Personalizar la apariencia de la carta.
- Ajustar conectividad del sistema.

## Incluye
- Configurar nombre del local.
- Subir logo.
- Cambiar datos de contacto.
- Personalización visual (fondo, texto, botones).
- Previsualizar tema.
- Elegir paleta o tema completo.
- **Configurar WiFi del restaurante** (SSID, password; integrado al QR).

---

# 📌 ÉPICO 9 — Gestión de Usuarios y Acceso (Autenticación + Roles)

## Descripción
Controla quién puede acceder al panel y con qué permisos.

## Objetivos
- Controlar acceso.
- Definir permisos por rol.

## Incluye
- Login del panel.
- Crear usuario interno.
- Editar usuario.
- Deshabilitar usuario.
- Asignar rol.
- Control por permisos.

---

# 📌 ÉPICO 10 — Persistencia del Módulo de Pedidos (BACKEND CORE)

## Descripción
Capa central de backend que registra pedidos, items y su evolución.

## Objetivos
- Guardar pedidos de forma segura.
- Registrar su estructura e historial.

## Incluye
- Registrar pedido.
- Registrar items del pedido.
- Registrar cambios de estado con timestamp.

---

# 🧩 Resumen General

| Nº | Épico | Área | Descripción |
|----|-------|------|-------------|
| 1 | Carta digital | Cliente | Ver menú |
| 2 | Carrito y pedido | Cliente | Enviar pedidos |
| 3 | Tiempo real | Infraestructura | WebSocket |
| 4 | Panel admin | Operación | Gestión diaria |
| 5 | Productos | Catálogo | CRUD de productos y categorías |
| 6 | Mesas + QR | Identificación | Acceso mediante QR |
| 7 | Reportes | Análisis | Recaudación básica |
| 8 | Configuración | Sistema | Tema, info del local, WiFi |
| 9 | Usuarios | Seguridad | Login, roles y permisos |
| 10 | Persistencia de pedidos | Backend | Registro de pedidos y estados |

---
