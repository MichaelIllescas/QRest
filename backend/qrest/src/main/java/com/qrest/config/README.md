# Módulo Config

## Descripción
Bounded context responsable de la configuración del restaurante y personalización de la aplicación.

## Responsabilidades del Dominio
- Configurar nombre y datos del local
- Subir y gestionar logo del restaurante
- Configurar datos de contacto
- Personalizar temas y apariencia
- Gestionar configuraciones de fondo, texto y botones
- Previsualizar temas antes de aplicarlos

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (RestaurantConfig, Theme, ContactInfo, etc.)
├── service/        # Servicios de dominio (validaciones de configuración)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios, file storage
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
- Configurar nombre del local
- Subir logo del restaurante
- Configurar datos de contacto (teléfono, dirección, etc.)
- Personalizar tema (colores, fonts)
- Configurar fondo de la aplicación
- Personalizar texto y botones
- Aplicar tema completo
- Previsualizar tema antes de aplicar
- Obtener configuración actual

## Puertos OUT (Dependencias Externas)
- ConfigRepository: Persistencia de configuraciones
- FileStorage: Almacenamiento de imágenes (logo, fondos)
- ThemeValidator: Validación de temas
- ImageProcessor: Procesamiento de imágenes