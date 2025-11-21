# Modelo de Datos — QRest (Carta Interactiva para Restaurantes)

Este documento define el modelo de datos completo del sistema QRest.  
Incluye el ERD (conceptual), entidades principales, relaciones y el diccionario de datos.  
Es la base técnica del backend para comenzar a desarrollar.

---

# 📌 1. Visión General del Modelo de Datos

El sistema se compone de 10 grandes módulos:

1. **Pedidos**
2. **Items de pedido**
3. **Historial de estados**
4. **Productos**
5. **Categorías**
6. **Mesas y QR**
7. **Configuración del sistema (incluye WiFi y personalización)**
8. **Usuarios**
9. **Roles**
10. **Asignación de roles**

---

# 📌 2. ERD — Diagrama Conceptual (Texto estructurado)

```
Categoria (1) --- (N) Producto

Mesa (1) --- (N) Pedido
Pedido (1) --- (N) Pedido_Item
Pedido (1) --- (N) Pedido_Estado_Historial

Usuario (N) --- (N) Rol (via Usuario_Rol)

Configuracion_Sistema (1 registro)
```

---

# 📌 3. Entidades y Campos

## 🟦 Tabla: categoria
- id_categoria (PK)
- nombre
- activa

## 🟦 Tabla: producto
- id_producto (PK)
- id_categoria (FK)
- nombre
- descripcion
- precio
- disponible
- imagen_url

## 🟦 Tabla: mesa
- id_mesa (PK)
- numero_mesa
- codigo_qr_url
- fecha_ultima_regeneracion

## 🟦 Tabla: pedido
- id_pedido (PK)
- id_mesa (FK)
- monto_total
- estado_actual
- fecha_creacion
- fecha_ultima_actualizacion

## 🟦 Tabla: pedido_item
- id_item (PK)
- id_pedido (FK)
- id_producto (FK)
- nombre_producto
- precio_unitario
- cantidad
- subtotal

## 🟦 Tabla: pedido_estado_historial
- id_historial (PK)
- id_pedido (FK)
- estado_anterior
- estado_nuevo
- fecha_cambio
- usuario_responsable

## 🟦 Tabla: configuracion_sistema
- id_config (PK)
- nombre_restaurante
- logo_url
- telefono
- direccion
- horarios
- color_fondo
- color_texto
- color_botones
- tema
- wifi_ssid
- wifi_password_encriptado
- wifi_tipo_seguridad

## 🟦 Tabla: usuario
- id_usuario (PK)
- username
- password_encriptado
- nombre
- activo

## 🟦 Tabla: rol
- id_rol (PK)
- nombre_rol

## 🟦 Tabla: usuario_rol
- id_usuario (FK)
- id_rol (FK)

---

# 📌 4. Diccionario de Datos (resumen por tablas)

A continuación se describen los campos esenciales para el desarrollo.

---

## Tabla: pedido

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| id_pedido | BIGINT | Sí | Identificador único |
| id_mesa | BIGINT | Sí | Mesa asociada |
| monto_total | DECIMAL | Sí | Total del pedido |
| estado_actual | VARCHAR | Sí | pendiente/preparando/entregado/cancelado |
| fecha_creacion | DATETIME | Sí | Fecha creación |
| fecha_ultima_actualizacion | DATETIME | Sí | Última modificación |

---

## Tabla: pedido_item

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| id_item | BIGINT | Sí | ID del item |
| id_pedido | BIGINT | Sí | Pedido asociado |
| id_producto | BIGINT | Sí | Producto asociado |
| nombre_producto | VARCHAR | Sí | Copia histórica |
| precio_unitario | DECIMAL | Sí | Copia histórica |
| cantidad | INT | Sí | Cantidad del producto |
| subtotal | DECIMAL | Sí | Subtotal |

---

## Tabla: pedido_estado_historial

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| id_historial | BIGINT | Sí | ID del historial |
| id_pedido | BIGINT | Sí | Pedido asociado |
| estado_anterior | VARCHAR | Sí | Estado previo |
| estado_nuevo | VARCHAR | Sí | Estado nuevo |
| fecha_cambio | DATETIME | Sí | Timestamp |
| usuario_responsable | VARCHAR | No | Operador del cambio |

---

## Tabla: producto

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_producto | BIGINT | Sí |
| id_categoria | BIGINT | Sí |
| nombre | VARCHAR | Sí |
| descripcion | VARCHAR | No |
| precio | DECIMAL | Sí |
| disponible | BOOLEAN | Sí |
| imagen_url | VARCHAR | No |

---

## Tabla: categoria

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_categoria | BIGINT | Sí |
| nombre | VARCHAR | Sí |
| activa | BOOLEAN | Sí |

---

## Tabla: mesa

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_mesa | BIGINT | Sí |
| numero_mesa | INT | Sí |
| codigo_qr_url | VARCHAR | Sí |
| fecha_ultima_regeneracion | DATETIME | Sí |

---

## Tabla: configuracion_sistema

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_config | BIGINT | Sí |
| nombre_restaurante | VARCHAR | Sí |
| logo_url | VARCHAR | No |
| telefono | VARCHAR | No |
| direccion | VARCHAR | No |
| horarios | VARCHAR | No |
| color_fondo | VARCHAR | No |
| color_texto | VARCHAR | No |
| color_botones | VARCHAR | No |
| tema | VARCHAR | No |
| wifi_ssid | VARCHAR | No |
| wifi_password_encriptado | VARCHAR | No |
| wifi_tipo_seguridad | VARCHAR | No |

---

## Tabla: usuario

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_usuario | BIGINT | Sí |
| username | VARCHAR | Sí |
| password_encriptado | VARCHAR | Sí |
| nombre | VARCHAR | Sí |
| activo | BOOLEAN | Sí |

---

## Tabla: rol

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_rol | BIGINT | Sí |
| nombre_rol | VARCHAR | Sí |

---

## Tabla: usuario_rol

| Campo | Tipo | Obligatorio |
|-------|------|-------------|
| id_usuario | BIGINT | Sí |
| id_rol | BIGINT | Sí |

---

# 📌 5. Notas Técnicas

- Todas las contraseñas deben ser almacenadas con hashing fuerte (BCrypt).
- Las credenciales WiFi deben guardarse encriptadas (AES-256).
- Las imágenes deben almacenarse como URLs (no en la BD).
- `Configuracion_Sistema` es tabla con un solo registro.
- Los estados de pedido deben ser válidos:  
  `pendiente`, `preparando`, `entregado`, `cancelado`.

---

# 📌 6. Estado

✔ Aprobado  
✔ Completo  
✔ Listo para desarrollo  
