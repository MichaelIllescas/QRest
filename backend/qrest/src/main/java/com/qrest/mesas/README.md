# Módulo Mesas

## Descripción
Bounded context responsable de la gestión de mesas del restaurante y códigos QR.

## Responsabilidades del Dominio
- Registrar y gestionar mesas
- Generar códigos QR únicos por mesa
- Regenerar códigos QR
- Gestionar estados de mesas (libre, ocupada, reservada)
- Limpiar historial de pedidos por mesa
- Comunicación en tiempo real de cambios en mesas

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (Mesa, QRCode, MesaStatus, etc.)
├── service/        # Servicios de dominio (generación de QR, validaciones)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios, QR generator, notificaciones
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
├── websocket/      # Canales WebSocket para notificaciones de mesa
└── mapper/         # Mappers entre capas
```

## Casos de Uso Principales
- Registrar nueva mesa
- Generar código QR para mesa
- Regenerar código QR
- Cambiar estado de mesa
- Limpiar historial de mesa
- Obtener información de mesa por QR
- Notificar cambios en tiempo real

## Puertos OUT (Dependencias Externas)
- MesaRepository: Persistencia de mesas
- QRCodeGenerator: Generación de códigos QR
- OrderLookup: Verificación de pedidos asociados
- MesaNotificationPublisher: Notificaciones WebSocket
- FileStorage: Almacenamiento de imágenes QR