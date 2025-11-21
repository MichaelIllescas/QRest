# Actores del Sistema – QRest (Carta Interactiva para Restaurantes)

Este documento describe a los actores que interactúan con el sistema, sus objetivos y el alcance de sus responsabilidades.  
Es la base para construir las historias de usuario del backlog.

---

## 👤 Cliente (Usuario final)
**Descripción:**  
Persona que se sienta en una mesa del restaurante y escanea el código QR.

**Objetivos:**  
- Ver la carta digital del restaurante.  
- Agregar productos al carrito.  
- Realizar pedidos desde el teléfono.  
- Visualizar el detalle de su pedido mientras está en proceso.
- Visualizar resumen de sus comsumos

**Acciones clave:**  
- Escanear QR.  
- Navegar la carta.  
- Agregar/eliminar productos del carrito.  
- Enviar pedido asociado automáticamente a la mesa.
- Visualziar consumos y estado de pedidos realizados

---

## 👤 Administrador
**Descripción:**  
Usuario interno del restaurante que administra productos, pedidos y recaudación desde el panel de control (Electron).

**Objetivos:**  
- Ver todos los pedidos en tiempo real.  
- Cambiar el estado de los pedidos (pendiente → preparando → entregado).  
- Gestionar productos y categorías.  
- Visualizar reportes de ventas y recaudación.  
- Configurar mesas y códigos QR.

**Acciones clave:**  
- Gestionar catálogo (crear, editar, deshabilitar productos).  
- Supervisar pedidos entrantes.  
- Cambio de estados de pedidos de pendiente a preparando
- Confirmar entregas.  
- Acceder a reportes de ventas.  
- Generar códigos QR por mesa.
- Administrar usuarios del sistema

---

## 👤 Usuario Operativo 
**Descripción:**  
Empleado del restaurante (p.ej., encargado o mozo) que utiliza el panel administrativo con permisos reducidos.

**Objetivos:**  
- Operar únicamente las tareas diarias sin acceso a configuraciones avanzadas.

**Acciones clave:**  
- Ver pedidos.  
- Cambiar estado del pedido.  
- Consultar recaudación del día.  
- Generar QR con numero de mesa.

---

## 🔧 Actores del Sistema (técnicos)

### 🖥 Backend (Spring Boot)
**Responsabilidad:**  
Procesar pedidos, exponer API REST, manejar WebSocket y administrar la persistencia local.

### 📱 Frontend – Carta QR (React web)
**Responsabilidad:**  
Interfaz pública para clientes: carta + carrito + pedidos.

### 🖥 Frontend – Panel Administrativo (React/Electron)
**Responsabilidad:**  
Aplicación de escritorio donde se gestionan usuarios, productos, pedidos, reportes, se general Qr.

---

## 🧩 Resumen General

| Actor | Usa | Funciones principales |
|-------|-----|------------------------|
| Cliente | Carta QR | Ver carta, carrito, enviar pedido |
| Administrador | Panel Admin | Productos, pedidos, reportes, QR |
| Usuario Operativo | Panel Admin | Operación diaria |
| Backend | API REST + WebSocket | Procesar y sincronizar pedidos |
| Frontend Carta | Navegador móvil | UI pública |
| Frontend Admin | Electron | UI de gestión |

---

Este documento define claramente los roles del sistema.
