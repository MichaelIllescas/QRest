# Endpoints REST + Modelos DTO — QRest

Este documento define:
- Endpoints REST mínimos para comenzar el backend.
- Modelos DTO recomendados para cada operación.
- Organizado por módulos, alineado a las historias de usuario US-001 a US-051.

---

# 📌 1. Carta Digital (Público)

## Productos (público)

### `GET /api/products`
Devuelve lista de productos disponibles.

**Respuesta DTO: ProductDTO**
```json
{
  "id": 1,
  "name": "Milanesa con papas",
  "description": "Descripción",
  "price": 2500,
  "available": true,
  "imageUrl": "https://..."
}
```

---

### `GET /api/products/{productId}`

**Respuesta:** ProductDTO

---

### `GET /api/products/by-category/{categoryId}`

**Respuesta:** List<ProductDTO>

---

## Categorías (público)

### `GET /api/categories`

**Respuesta DTO: CategoryDTO**
```json
{
  "id": 1,
  "name": "Pastas"
}
```

---

# 📌 2. Carrito y Pedido (Cliente)

## Historial

### `GET /api/orders/history/{mesaId}`

**Respuesta DTO:** List<OrderSummaryDTO>
```json
{
  "id": 10,
  "total": 4500,
  "status": "ENTREGADO",
  "createdAt": "2025-01-05T20:15:00"
}
```

---

## Crear pedido

### `POST /api/orders`

**Request DTO: CreateOrderRequestDTO**
```json
{
  "mesaId": 5,
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 4, "quantity": 1 }
  ]
}
```

**Respuesta DTO: OrderCreatedDTO**
```json
{
  "orderId": 15,
  "status": "PENDIENTE"
}
```

---

## Cancelar pedido

### `PUT /api/orders/{orderId}/cancel`

**Respuesta DTO: OrderDTO**

---

# 📌 3. Pedidos (Panel Administrativo)

## Listado y Detalle

### `GET /api/admin/orders/pending`

**Respuesta DTO: List<OrderDTO>**
```json
{
  "id": 15,
  "mesaId": 5,
  "total": 3500,
  "status": "PENDIENTE",
  "createdAt": "2025-01-05T20:15:00",
  "items": [
    { "name": "Milanesa", "qty": 1, "subtotal": 2500 }
  ]
}
```

---

### `GET /api/admin/orders/{orderId}`

**Respuesta DTO:** OrderDTO

---

## Cambiar Estado

### `PUT /api/admin/orders/{orderId}/status`

**Request DTO: ChangeStatusRequestDTO**
```json
{
  "status": "PREPARANDO"
}
```

---

# 📌 4. WebSocket

Eventos enviados por backend:

### `pedido:nuevo` → OrderDTO  
### `pedido:actualizado` → OrderDTO  
### `mesa:historial_limpiado` → MesaHistorialDTO

---

# 📌 5. Gestión de Productos

### `GET /api/admin/products`

### `POST /api/admin/products`

**Request DTO: ProductCreateDTO**
```json
{
  "name": "Pizza",
  "description": "Mozzarella",
  "price": 3200,
  "categoryId": 1,
  "available": true
}
```

---

### `PUT /api/admin/products/{productId}`

**Request DTO: ProductUpdateDTO**

---

### `PUT /api/admin/products/{productId}/availability`

**Request DTO: ProductAvailabilityDTO**
```json
{ "available": false }
```

---

### `POST /api/admin/products/{productId}/image`
Multipart file upload.

---

# 📌 6. Categorías

### `GET /api/admin/categories`

### `POST /api/admin/categories`

**DTO: CategoryCreateDTO**
```json
{ "name": "Bebidas" }
```

### `PUT /api/admin/categories/{categoryId}`

### `DELETE /api/admin/categories/{categoryId}`

---

# 📌 7. Mesas + QR

### `GET /api/admin/mesas`
### `POST /api/admin/mesas`

**DTO: MesaCreateDTO**
```json
{ "numeroMesa": 5 }
```

### `POST /api/admin/mesas/{mesaId}/qr`
### `PUT /api/admin/mesas/{mesaId}/qr/regenerate`

**Respuesta DTO: MesaQRDTO**
```json
{
  "mesaId": 5,
  "qrUrl": "https://..."
}
```

---

# 📌 8. Reportes

### `GET /api/admin/reports/revenue/today`
→ RevenueDTO

### `GET /api/admin/reports/revenue?date=2025-11-20`
### `GET /api/admin/reports/top-products`
→ List<TopProductDTO>

### `GET /api/admin/reports/orders-per-day?date=YYYY-MM-DD`
→ OrdersPerDayDTO

---

# 📌 9. Configuración del Sistema

## Config general
### `GET /api/admin/config`
### `PUT /api/admin/config`

**DTO: ConfigUpdateDTO**
```json
{
  "name": "Restaurante Don Pepe",
  "telefono": "2923-555123",
  "direccion": "San Martín 123"
}
```

---

## Tema visual
### `PUT /api/admin/config/theme`

**DTO: ThemeConfigDTO**
```json
{
  "backgroundColor": "#fff",
  "textColor": "#000",
  "buttonColor": "#ff9900",
  "themeName": "orange-light"
}
```

---

## Logo
### `POST /api/admin/config/logo`
Multipart file upload.

---

## WiFi
### `PUT /api/admin/config/wifi`

**DTO: WiFiConfigDTO**
```json
{
  "ssid": "RestauranteWiFi",
  "password": "supersecreto",
  "securityType": "WPA2"
}
```

---

# 📌 10. Usuarios y Roles

## Autenticación
### `POST /api/auth/login`

**DTO: LoginRequestDTO**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**Respuesta: LoginResponseDTO**
```json
{
  "token": "jwt-token-here",
  "role": "ADMIN"
}
```

---

## CRUD de usuarios

### `GET /api/admin/users`
### `POST /api/admin/users`

**DTO: UserCreateDTO**
```json
{
  "username": "mozo1",
  "name": "Juan Perez",
  "password": "1234",
  "role": "OPERATIVO"
}
```

### `PUT /api/admin/users/{userId}`
### `PUT /api/admin/users/{userId}/disable`
### `PUT /api/admin/users/{userId}/role`

---

# 📌 Estado
✔ Completo  
✔ DTO incluidos  
✔ Listo para implementar controladores y servicios  

