# Módulo Reports

## Descripción
Bounded context responsable de la generación de reportes y analytics del restaurante.

## Responsabilidades del Dominio
- Generar reportes de recaudación diaria
- Calcular estadísticas de productos más vendidos (TOP 5)
- Generar reportes de pedidos por día
- Filtrar y analizar datos de ventas
- Crear dashboards de analytics

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (Report, SalesData, ProductStats, etc.)
├── service/        # Servicios de dominio (cálculos de estadísticas)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para acceso a datos de otros módulos
└── service/        # Implementación de los casos de uso
```

### Infrastructure Layer
```
infrastructure/
├── web/
│   ├── in/         # Controllers REST
│   └── dto/        # DTOs de request/response
├── persistence/
│   ├── entity/     # Entidades JPA (si necesita persistir reportes)
│   └── repository/ # Implementaciones de repositorios
└── mapper/         # Mappers entre capas
```

## Casos de Uso Principales
- Generar reporte de recaudación diaria
- Obtener TOP 5 productos más vendidos
- Generar reporte de pedidos por día
- Filtrar recaudación por fechas
- Calcular estadísticas de ventas
- Exportar reportes

## Puertos OUT (Dependencias Externas)
- OrderDataLookup: Acceso a datos de pedidos
- ProductDataLookup: Acceso a datos de productos
- SalesDataRepository: Persistencia de datos de ventas
- ReportGenerator: Generación de reportes en diferentes formatos