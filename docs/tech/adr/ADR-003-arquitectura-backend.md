# ADR-003: Arquitectura del Backend — Monolito Modular con Arquitectura Hexagonal
Fecha: 2025-11-15

## 1. Contexto
El sistema QRest debe ejecutarse en una PC local dentro del restaurante, sin internet, y debe permitir:
- Escalabilidad futura mediante módulos (estadísticas, pagos, reportes).
- Separación clara entre dominio, lógica de aplicación e infraestructura.
- Mantenibilidad a largo plazo sin generar un proyecto monolítico rígido.
- Testeo sencillo, especialmente de la lógica de negocio.
- Actualizaciones sin romper el funcionamiento existente.

El enfoque arquitectónico debe permitir crecimiento sin complejidad innecesaria.

## 2. Decisión
Se adopta un **Monolito Modular** basado en **Arquitectura Hexagonal (Ports & Adapters)**.

## 3. Alternativas Consideradas

### Monolito tradicional en capas
✔️ Fácil de implementar  
❌ Acoplamiento alto entre capas  
❌ Difícil de expandir modularmente  
❌ Riesgo de convertir el proyecto en un "big ball of mud"

### Microservicios
✔️ Máxima escalabilidad  
❌ Totalmente innecesario para un sistema local  
❌ Mayor complejidad de despliegue  
❌ Requiere infraestructura externa (no compatible con QRest)

### Clean Architecture
✔️ Similar a hexagonal  
❌ Mayor complejidad conceptual  
❌ No aporta beneficios adicionales claros en este proyecto

## 4. Argumentos
### Pros
- Separación estricta entre dominio, aplicación e infraestructura.
- Los módulos pueden crecer sin impactar en otros.
- Ideal para ejecutar lógica sin depender del framework o la base de datos.
- Facilita testing unitario profundo.
- Permite reemplazar componentes (DB, controladores, servicios) sin romper el dominio.
- Entrega una base sólida para versiones comerciales.

### Contras
- Mayor esfuerzo inicial de estructura.
- Requiere disciplina arquitectónica para cumplir con los límites del dominio.

## 5. Consecuencias
- El código será más mantenible y fácil de extender.
- Se podrá integrar Electron, nuevos módulos de reportes, o bases de datos sin reescrituras.
- El backend queda preparado para funcionar sin problemas como ejecutable local.
- El onboarding de nuevos desarrolladores será más ordenado gracias a la modularidad.

## 6. Estado
Aprobado

## 7. Enlaces
- ADR-001: Framework Backend  
- ADR-004: Base de Datos Local  
