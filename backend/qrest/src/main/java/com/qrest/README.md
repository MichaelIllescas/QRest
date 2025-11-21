# Backend QRest - Estructura Refactorizada

## Arquitectura Implementada

El backend de **QRest** implementa un **Monolito Modular** siguiendo los principios de:
- **Clean Architecture**
- **Arquitectura Hexagonal (Ports & Adapters)**  
- **Domain-Driven Design (DDD)**

## Estructura Completa

```
src/main/java/com/qrest/
├── QrestApplication.java
│
├── shared/                    # Infraestructura transversal
│   ├── config/
│   │   ├── security/         # Configuración Spring Security
│   │   ├── datasource/       # Configuración SQLite y JPA
│   │   ├── websocket/        # Configuración WebSocket global
│   │   ├── cors/             # Configuración CORS
│   │   └── jackson/          # Configuración JSON
│   ├── exception/            # Excepciones y handlers globales
│   ├── util/                 # Utilidades comunes
│   └── mapper/               # Mappers genéricos
│
├── products/                  # Gestión de productos
│   ├── domain/
│   │   ├── model/            # Product, ProductImage, etc.
│   │   ├── service/          # Servicios de dominio
│   │   └── exception/        # Excepciones del dominio
│   ├── application/
│   │   ├── ports/
│   │   │   ├── in/           # Use cases interfaces
│   │   │   └── out/          # Repository interfaces
│   │   └── service/          # Implementación casos de uso
│   └── infrastructure/
│       ├── web/
│       │   ├── in/           # ProductController
│       │   └── dto/          # Request/Response DTOs
│       ├── persistence/
│       │   ├── entity/       # Entidades JPA
│       │   └── repository/   # Implementaciones repos
│       └── mapper/           # Mappers entre capas
│
├── categories/               # Gestión de categorías
│   └── [misma estructura que products]
│
├── orders/                   # Gestión de pedidos
│   ├── domain/
│   ├── application/
│   └── infrastructure/
│       ├── web/
│       ├── persistence/
│       ├── websocket/        # ← Comunicación tiempo real
│       └── mapper/
│
├── mesas/                    # Gestión de mesas y QR
│   ├── domain/
│   ├── application/
│   └── infrastructure/
│       ├── web/
│       ├── persistence/
│       ├── websocket/        # ← Notificaciones mesa
│       └── mapper/
│
├── reports/                  # Reportes y analytics
│   └── [estructura estándar]
│
├── config/                   # Configuración del restaurante
│   └── [estructura estándar]
│
└── users/                    # Gestión de usuarios
    └── [estructura estándar]
```

## Principios de Dependencias

### Reglas de Oro
1. **Domain** → No depende de nada
2. **Application** → Solo depende de Domain
3. **Infrastructure** → Depende de Application y Domain
4. **Shared** → Infraestructura técnica global independiente
5. **Módulos** → Nunca se llaman directamente entre sí

### Comunicación Entre Módulos
- Solo vía **Ports OUT** definidos en Application layer
- Interfaces definidas en `application/ports/out/`
- Implementaciones en `infrastructure/`

## Módulos y Sus Responsabilidades

| Módulo | Bounded Context | WebSocket | Descripción |
|--------|-----------------|-----------|-------------|
| **products** | Productos | ❌ | CRUD productos, imágenes, disponibilidad |
| **categories** | Categorías | ❌ | CRUD categorías, organización |
| **orders** | Pedidos | ✅ | Pedidos, carrito, estados, notificaciones |
| **mesas** | Mesas y QR | ✅ | Mesas, códigos QR, estados |
| **reports** | Reportes | ❌ | Analytics, estadísticas, TOP5 |
| **config** | Configuración | ❌ | Configuración restaurante, temas |
| **users** | Usuarios | ❌ | Autenticación, autorización |
| **shared** | Transversal | ❌ | Configuración técnica global |

## Convenciones Arquitectónicas

### Domain Layer
- **Puro**: Sin dependencias externas
- **Entidades**: Modelos de negocio puros
- **Value Objects**: Objetos inmutables
- **Servicios de Dominio**: Lógica compleja de negocio
- **Excepciones**: Específicas del bounded context

### Application Layer  
- **Ports IN**: Interfaces de casos de uso (Use Cases)
- **Ports OUT**: Interfaces para dependencias externas
- **Services**: Implementaciones de casos de uso (orquestación)

### Infrastructure Layer
- **Web/IN**: Controllers REST (adaptadores de entrada)
- **Web/DTO**: DTOs de request/response
- **Persistence**: Adaptadores de salida para datos
- **WebSocket**: Comunicación tiempo real (solo orders/mesas)
- **Mapper**: Conversiones entre capas

## WebSocket y Tiempo Real

### Módulos con WebSocket
- **orders**: Notificaciones de pedidos nuevos, cambios de estado
- **mesas**: Notificaciones de cambios en mesas, limpieza historial

### Configuración Global
- WebSocket config en `shared/config/websocket/`
- Cada módulo implementa sus propios canales en `infrastructure/websocket/`

## Próximos Pasos

1. **Implementar entidades de dominio** en cada módulo
2. **Definir interfaces de puertos** (IN y OUT)
3. **Implementar casos de uso** en application services
4. **Crear controllers** y DTOs en infrastructure
5. **Configurar persistencia** con Spring Data JPA
6. **Implementar WebSocket** en orders y mesas
7. **Configurar seguridad** en shared/config

Esta estructura refactorizada garantiza:
- ✅ **Separación clara** de responsabilidades
- ✅ **Independencia** entre módulos  
- ✅ **Escalabilidad** y mantenibilidad
- ✅ **Testabilidad** por capas
- ✅ **Flexibilidad** para cambios futuros