# Módulo Orders

## Descripción
Bounded context responsable de la gestión de pedidos del restaurante.

## Responsabilidades del Dominio
- Crear, modificar y cancelar pedidos
- Gestionar estados de pedidos (pendiente, preparando, listo, entregado, cancelado)
- Calcular totales de pedidos
- Validar reglas de negocio de pedidos
- Comunicación en tiempo real sobre estados de pedidos

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (Order, OrderItem, OrderStatus, etc.)
├── service/        # Servicios de dominio (cálculo de totales, validaciones)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios, notificaciones WebSocket
└── service/        # Implementación de los casos de uso
```

### Infrastructure Layer
```
infrastructure/
├── web/
│   ├── in/         # Controllers REST
│   └── dto/        # DTOs de request/response
├── persistence/
│   ├── entity/     # Entidades JPA
│   └── repository/ # Implementaciones de repositorios
├── websocket/      # Canales WebSocket para notificaciones en tiempo real
└── mapper/         # Mappers entre capas
```

## Casos de Uso Principales
- Crear pedido
- Agregar productos al carrito
- Modificar cantidad de productos
- Eliminar productos del carrito
- Enviar pedido
- Cambiar estado del pedido
- Cancelar pedido
- Ver historial de pedidos
- Notificar cambios en tiempo real

## Puertos OUT (Dependencias Externas)
- OrderRepository: Persistencia de pedidos
- ProductLookup: Verificación y obtención de productos
- MesaLookup: Verificación de mesas
- OrderNotificationPublisher: Notificaciones WebSocket
- PaymentCalculator: Cálculos de totales