#  Documentación del Proyecto — QRest (Carta Interactiva QR)

> Este documento actúa como índice maestro de toda la documentación ubicada en la carpeta `docs/`.  


---

#  Índice

- [1. Documentación de Producto](#1-documentación-de-producto)
  - [1.1 Archivos principales](#11-archivos-principales)
  - [1.2 Historias de Usuario](#12-historias-de-usuario)
- [2. Documentación Técnica](#2-documentación-técnica)
  - [2.1 ADR — Architecture Decision Records](#21-adr--architecture-decision-records)
  - [2.2 Arquitectura General](#22-arquitectura-general)
    - [2.2.1 Data Model](#221-data-model)
    - [2.2.2 Diagrams](#222-diagrams)
    - [2.2.3 API](#223-api)
    - [2.2.4 Domain](#224-domain)
    - [2.2.5 Frontend Architecture](#225-frontend-architecture)
    - [2.2.6 Backend Modules](#226-backend-modules)
- [3. Convenciones y Buenas Prácticas](#3-convenciones-y-buenas-prácticas)
- [4. Cómo navegar la documentación](#4-cómo-navegar-la-documentación)
- [5. Estado actual](#5-estado-actual)

---

# 1. Documentación de Producto (`docs/product/`)

## 1.1 Archivos principales

- [`product-vision.md`](./product/product-vision.md)
- [`epics.md`](./product/epics.md)
- [`actors.md`](./product/actors.md)
- [`backlog.md`](./product/backlog.md)

## 1.2 Historias de Usuario

Carpeta con todas las historias:

➡ [`/product/user-stories/`](./product/user-stories/)

---

# 2. Documentación Técnica (`docs/tech/`)

## 2.1 ADR — Architecture Decision Records

- [`ADR-001-backend-framework.md`](./tech/adr/ADR-001-backend-framework.md)
- [`ADR-002-frontend-framework.md`](./tech/adr/ADR-002-frontend-framework.md)
- [`ADR-003-arquitectura-backend.md`](./tech/adr/ADR-003-arquitectura-backend.md)
- [`ADR-004-base-de-datos-sqlite.md`](./tech/adr/ADR-004-base-de-datos-sqlite.md)
- [`ADR-005-comunicacion-rest.md`](./tech/adr/ADR-005-comunicacion-rest.md)
- [`ADR-006-seguridad-basic-auth.md`](./tech/adr/ADR-006-seguridad-basic-auth.md)
- [`ADR-007-despliegue-local.md`](./tech/adr/ADR-007-despliegue-local.md)

---

# 2.2 Arquitectura General (`docs/tech/architecture/`)

## 2.2.1 Data Model
- [`data-model.md`](./tech/architecture/data-model/data-model.md)
- [`data-model.dbml`](./tech/architecture/data-model/data-model.dbml)
- [`data-model-mermaid.md`](./tech/architecture/data-model/data-model-mermaid.md)
- [`DER.pdf`](./tech/architecture/data-model/DER.pdf)
- [`DER.png`](./tech/architecture/data-model/DER.png)

## 2.2.2 Diagrams
- [`system-architecture.md`](./tech/architecture/diagrams/system-architecture.md)

## 2.2.3 API
- [`endpoints-with-dtos.md`](./tech/architecture/api/endpoints-with-dtos.md)

## 2.2.4 Domain
- [`entities-dtos-required.md`](./tech/architecture/domain/entities-dtos-required.md)

## 2.2.5 Frontend Architecture
- [`admin-panel.md`](./tech/architecture/frontend/admin-panel.md) - Arquitectura del Panel Administrativo (React + Electron + TypeScript)
- [`carta-digital.md`](./tech/architecture/frontend/carta-digital.md) - Arquitectura de la Carta Digital (React + TypeScript)

## 2.2.6 Backend Modules
- [`backend-architecture-modules.md`](./tech/architecture/modules/backend-architecture-modules.md) - Arquitectura Hexagonal + DDD + Módulos

---

# 3. Convenciones y Buenas Prácticas (`docs/conventions/`)

- [`CONVENCIONES_QREST.md`](./conventions/CONVENCIONES_QREST.md) - Reglas obligatorias para desarrollo consistente y profesional
  - Estructura del proyecto (monolito modular)
  - Reglas de Arquitectura Hexagonal
  - Principios SOLID
  - Convenciones de endpoints REST
  - Reglas de Backend (Spring Boot)
  - Reglas de Frontend (React + TypeScript + CSS Modules)
  - Estrategias de testing
  - Seguridad y sanitización
  - Convenciones de Git y commits

---

# 4. Cómo navegar la documentación

### Para entender el sistema funcional:
1. [`product-vision.md`](./product/product-vision.md)  
2. [`epics.md`](./product/epics.md)  
3. [`backlog.md`](./product/backlog.md)

### Para desarrollar el backend:
1. [`backend-architecture-modules.md`](./tech/architecture/modules/backend-architecture-modules.md) - Arquitectura completa del backend
2. [`endpoints-with-dtos.md`](./tech/architecture/api/endpoints-with-dtos.md)  
3. [`entities-dtos-required.md`](./tech/architecture/domain/entities-dtos-required.md)  
4. [`data-model.md`](./tech/architecture/data-model/data-model.md)

### Para desarrollar el frontend:
1. [`admin-panel.md`](./tech/architecture/frontend/admin-panel.md) - Panel administrativo (React + Electron)
2. [`carta-digital.md`](./tech/architecture/frontend/carta-digital.md) - Carta digital (React SPA)

### Para mantener código consistente:
1. [`CONVENCIONES_QREST.md`](./conventions/CONVENCIONES_QREST.md) - **OBLIGATORIO**: Reglas y buenas prácticas

### Para revisar decisiones técnicas:
➡ Carpeta `tech/adr/`

### Para ver la arquitectura general:
➡ [`system-architecture.md`](./tech/architecture/diagrams/system-architecture.md)

---

# 5. Estado actual

✔ **Documentación completa y actualizada**  
✔ **Navegación funcional**  
✔ **Convenciones y buenas prácticas definidas**  
✔ **Arquitectura frontend y backend documentada**  
✔ **Lista para desarrollo y onboarding**

---

## 📋 Resumen de documentación disponible

- **51 Historias de Usuario** completamente detalladas
- **7 ADR** (Architecture Decision Records) con decisiones técnicas
- **Arquitectura completa** frontend y backend documentada
- **Convenciones obligatorias** para desarrollo consistente
- **Modelo de datos** con diagramas y especificaciones
- **API completa** con endpoints y DTOs definidos

---
