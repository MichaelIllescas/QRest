# Módulo Products

## Descripción
Bounded context responsable de la gestión de productos del restaurante.

## Responsabilidades del Dominio
- Crear, modificar y eliminar productos
- Gestionar disponibilidad de productos
- Validar reglas de negocio de productos
- Manejar imágenes de productos

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (Product, ProductImage, etc.)
├── service/        # Servicios de dominio (reglas complejas de negocio)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios y servicios externos
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
- Crear producto
- Editar producto
- Cambiar disponibilidad de producto
- Subir imagen de producto
- Obtener productos por categoría
- Buscar productos

## Puertos OUT (Dependencias Externas)
- ProductRepository: Persistencia de productos
- FileStorage: Almacenamiento de imágenes
- CategoryLookup: Verificación de categorías existentes