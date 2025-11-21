# Convenciones y Buenas Prácticas — Proyecto QRest / Carta Interactiva

Este documento establece **pautas y reglas obligatorias** para mantener un desarrollo consistente, profesional y escalable en todos los módulos del proyecto.

---

#  1. Estructura General del Proyecto (Reglas)

- El proyecto se organiza como **monolito modular**.
- Cada módulo debe tener: `domain`, `dto`, `usecase`, `service`, `controller`, `persistence`, `mapper`, `config`.
- Ningún módulo accede directamente a la base interna de otro.
- Los casos de uso **siempre retornan DTO**, nunca entidades.

---

#  2. Reglas de Arquitectura

- Cumplimiento estricto del estilo **Hexagonal (Ports & Adapters)**.
- Controladores → puertos de entrada.
- Servicios y repositorios → puertos de salida.
- Todo componente debe tener **una sola responsabilidad** (SRP).

---

#  3. Reglas SOLID

- **S — SRP:** Una clase, función, hook o componente debe hacer solo una cosa.
- **O — Open/Closed:** Nuevas funcionalidades se agregan extendiendo, no modificando.
- **L — Liskov:** Las interfaces deben permitir uso intercambiable.
- **I — ISP:** Interfaces pequeñas y específicas.
- **D — DIP:** Casos de uso dependen de interfaces, no implementaciones.

---

#  4. Reglas de Endpoints REST

### Naming obligatorio:
- `POST /resource`
- `GET /resource`
- `GET /resource/{id}`
- `PUT /resource/{id}`
- `DELETE /resource/{id}`
- Acciones: `/resource/{id}/action`

### Ejemplos:
- `POST /orders`
- `PUT /orders/{id}/deliver`
- `GET /recaudation/daily?date=2025-01-01`

---

#  5. Reglas del Backend (Spring Boot)

- No se exponen entidades al frontend.
- Todos los controladores usan **DTO + @Valid**.
- Sanitización obligatoria:
  - `.trim()`
  - Validación de rangos/números
  - Validación de tipos MIME en imágenes
- Excepciones controladas desde **GlobalExceptionHandler**.
- Usar MapStruct para mappers.

---

#  6. Reglas del Frontend (React + TS + CSS Modules)

- Todo archivo de CSS debe ser `*.module.css`.
- Hooks → lógica. Componentes → UI.
- Los servicios HTTP se ubican en `/services`.
- Nada de lógica dentro de componentes.
- No usar estados globales innecesarios.
- Navegación sin recargar página (SPA).

---

#  7. Reglas de Testing

### Backend (JUnit + Mockito)
- Cada caso de uso debe tener tests unitarios.
- Controllers deben tener tests de integración.
- Repositorios deben tener tests con `@DataJpaTest`.

### Frontend (Jest + RTL)
- Testear hooks personalizados.
- Testear componentes críticos.
- Prohibido hacer tests de snapshots (no aportan valor).

---

#  8. Reglas de Seguridad y Sanitización

- Sanitizar todos los inputs del cliente antes de procesar.
- Validar tipos de archivos (solo imágenes permitidas).
- Nunca loguear datos sensibles.
- Validar UUID/ID en backend siempre.
- En React: sanitize mediante funciones centralizadas.

---

#  9. Reglas de Git & Commits

### Estrategia:
- `main` → producción estable.
- `dev` → integración.
- `feature/*` → nuevas funcionalidades.
- `fix/*` → correcciones.

### Commits (Conventional Commits):
- `feat:` nueva funcionalidad
- `fix:` bugfix
- `refactor:` sin cambio de comportamiento
- `docs:` documentación
- `test:` tests
- `style:` estilo (CSS)

---

# 🧩 10. Reglas del Módulo Shared

Debe contener solamente:
- Exceptions
- Utils
- Validadores
- Formateadores de fechas
- Seguridad

---
