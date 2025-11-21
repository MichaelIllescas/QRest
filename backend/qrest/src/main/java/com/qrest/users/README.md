# Módulo Users

## Descripción
Bounded context responsable de la gestión de usuarios y autenticación del sistema.

## Responsabilidades del Dominio
- Gestión de usuarios del sistema (admin, staff)
- Autenticación y autorización
- Gestión de roles y permisos
- Seguridad de acceso
- Gestión de sesiones

## Estructura Clean Architecture + Hexagonal

### Domain Layer
```
domain/
├── model/          # Entidades de dominio (User, Role, Permission, etc.)
├── service/        # Servicios de dominio (validaciones de seguridad)
└── exception/      # Excepciones específicas del dominio
```

### Application Layer  
```
application/
├── ports/
│   ├── in/         # Use cases / Interfaces de entrada
│   └── out/        # Interfaces para repositorios, authentication
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
- Registrar usuario
- Autenticar usuario
- Asignar roles
- Cambiar contraseña
- Gestionar permisos
- Listar usuarios
- Desactivar/activar usuarios
- Validar sesiones

## Puertos OUT (Dependencias Externas)
- UserRepository: Persistencia de usuarios
- PasswordEncoder: Encriptación de contraseñas
- TokenGenerator: Generación de tokens JWT
- AuthenticationProvider: Proveedor de autenticación
- PermissionValidator: Validación de permisos

## Nota
Este módulo trabaja estrechamente con la configuración global de Spring Security ubicada en `shared/config/security`.