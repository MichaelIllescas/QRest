# Módulo Categories

## Descripción
Bounded context responsable de la gestión de categorías de productos.

## Responsabilidades del Dominio
- Crear, modificar y eliminar categorías
- Organizar productos por categorías
- Validar reglas de negocio de categorías
- Gestionar jerarquías de categorías (si aplica)

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (Category, etc.)
├── service/        # Servicios de dominio (reglas complejas de negocio)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios
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
└── mapper/         # Mappers entre capas
```

## Casos de Uso Principales
- Crear categoría
- Editar categoría
- Eliminar categoría
- Listar categorías
- Obtener productos por categoría

## Puertos OUT (Dependencias Externas)
- CategoryRepository: Persistencia de categorías
- ProductLookup: Verificación de productos asociados