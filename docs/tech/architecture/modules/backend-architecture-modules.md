
# Arquitectura Backend QRest — Clean Architecture + Hexagonal + DDD  
## Documento Oficial Inicial

---

# Índice

1. [Introducción](#introducción)  
2. [Principios Arquitectónicos](#principios-arquitectónicos)  
3. [Dominio y DDD](#dominio-y-ddd)  
4. [Módulos del Backend](#módulos-del-backend)  
5. [Capas de la Arquitectura](#capas-de-la-arquitectura)  
   - 5.1 [Domain](#51-domain)  
   - 5.2 [Application](#52-application)  
   - 5.3 [Infrastructure](#53-infrastructure)  
6. [Estructura de Carpetas por Módulo](#estructura-de-carpetas-por-módulo)  
7. [Módulo Shared](#módulo-shared)  
8. [WebSocket y Comunicación en Tiempo Real](#websocket-y-comunicación-en-tiempo-real)  
9. [Reglas de Dependencias](#reglas-de-dependencias)  
10. [Consideraciones Finales](#consideraciones-finales)

---

# Introducción

El backend de **QRest** se implementa como un **Monolito Modular**, siguiendo tres pilares fundamentales:

- **Clean Architecture**  
- **Arquitectura Hexagonal (Ports & Adapters)**  
- **Domain‑Driven Design (DDD)**  

Con este enfoque, cada módulo representa un **bounded context** independiente, con su propio dominio, casos de uso y adaptadores.

---

# Principios Arquitectónicos

- **Independencia del dominio**: no depende de frameworks ni tecnología.
- **Separación clara de responsabilidades**: domain → application → infrastructure.
- **DTO y mappers solo en infrastructure**.
- **Controllers ubicados en `in/` dentro de infrastructure**(estilo propio).
- **Casos de uso implementados como `services` en application**.
- **Infraestructura global ubicada en `shared/config`**.
- **Soporte nativo para REST + WebSocket**.
- **Módulos completamente aislados** según DDD.

---

# Dominio y DDD

En QRest se aplica **Domain‑Driven Design** para modelar el negocio:

- Cada módulo representa un **bounded context**.
- El dominio contiene:
  - Entidades
  - Agregados
  - Value Objects
  - Servicios de dominio (si los requiere)
  - Excepciones específicas del módulo
- Las reglas del negocio residen únicamente en el dominio.
- La comunicación entre módulos se realiza vía **ports OUT**, nunca por referencias directas.

---

# Módulos del Backend

- `products`  
- `categories`  
- `orders`  
- `mesas`  
- `reports`  
- `config`  
- `users`  
- `shared` (transversal)

Cada uno con su propio dominio, application e infraestructura.

---

# Capas de la Arquitectura

## 5.1 Domain
- Modelo de dominio completamente puro.
- No usa DTOs ni entidades JPA.
- No conoce Spring.
- Contiene la lógica del negocio y las reglas del sistema.

## 5.2 Application
- Capa de casos de uso.
- Contiene:
  - Ports IN (interfaces de casos de uso)
  - Ports OUT (interfaces para repositorios, lookup, emisores de eventos)
  - Services (implementaciones de los casos de uso)
- Es la capa que orquesta el flujo entre dominio e infraestructura.

## 5.3 Infrastructure
- Implementación de adaptadores externos:
  - **web/in** → controllers REST  
  - **web/dto** → DTO de request/response  
  - **persistence/entity** → entidades JPA  
  - **persistence/repository** → implementaciones de puertos OUT  
  - **websocket** → canales y publicadores  
  - **mapper** → conversiones  


---

# Estructura de Carpetas por Módulo

Ejemplo estándar:

```
módulo/
 ├── domain/
 │    ├── model/
 │    ├── service/
 │    └── exception/
 │
 ├── application/
 │    ├── ports/
 │    │    ├── in/
 │    │    └── out/
 │    └── service/         # implementaciones de casos de uso
 │
 └── infrastructure/
      ├── web/
      │    ├── in/         # controllers
      │    └── dto/
      ├── persistence/
      │    ├── entity/
      │    └── repository/
      ├── websocket/       # solo módulos que lo necesitan
      ├── mapper/
      └── config/          # si es configuración específica del módulo
```

---

# Módulo Shared

Infraestructura transversal totalmente independiente de los módulos de negocio:

```
shared/
 ├── config/
 │     ├── security/
 │     ├── datasource/
 │     ├── websocket/
 │     ├── cors/
 │     └── jackson/
 ├── exception/
 ├── util/
 └── mapper/
```

Aquí se ubican configuraciones globales como:
- Seguridad
- CORS
- WebSocket global
- Conexión a SQLite
- Configuración global de Jackson

---

# WebSocket y Comunicación en Tiempo Real

- Utilizado principalmente en `orders` y `mesas`.
- Expone canales para:
  - pedidos nuevos
  - cambios de estado
  - limpieza de historial de mesas
- Implementaciones en `infrastructure/websocket`.
- La capa de application desconoce WebSocket y solo llama a puertos OUT.

---

# Reglas de Dependencias

- **Domain** → no depende de nada.  
- **Application** → depende solo de domain.  
- **Infrastructure** → depende de application y domain.  
- **Shared/config** → contiene infraestructura técnica global.  
- **Los módulos nunca se llaman entre sí directamente**: la comunicación es vía **ports OUT**.

---

# Consideraciones Finales

Esta arquitectura representa el estándar base de QRest, unificando Clean Architecture, Hexagonal y DDD en un diseño modular, escalable y orientado al dominio.  
Cada módulo es autónomo, mantiene su propio ciclo de evolución y permite extender el sistema sin comprometer la estabilidad del backend.
