# Módulo Shared

## Descripción
Módulo transversal que contiene la infraestructura técnica global del sistema QRest.

## Responsabilidades
- Configuración global de la aplicación
- Configuración de seguridad
- Configuración de base de datos (SQLite)
- Configuración de WebSocket global
- Configuración de CORS
- Configuración de Jackson
- Excepciones globales del sistema
- Utilidades comunes
- Mappers genéricos

## Estructura
```
shared/
├── config/
│   ├── security/     # Configuración de Spring Security
│   ├── datasource/   # Configuración de SQLite y JPA
│   ├── websocket/    # Configuración global de WebSocket
│   ├── cors/         # Configuración de CORS
│   └── jackson/      # Configuración de JSON
├── exception/        # Excepciones globales y handlers
├── util/            # Utilidades comunes
└── mapper/          # Mappers genéricos reutilizables
```

## Principios
- **Transversalidad**: No contiene lógica de negocio específica
- **Infraestructura técnica**: Solo configuración y utilidades
- **Independencia**: Los módulos de dominio no deben depender de shared
- **Globalidad**: Configuraciones que afectan a toda la aplicación