# ADR-001: Selección del Framework Backend — Spring Boot
Fecha: 2025-11-15

## 1. Contexto
El sistema QRest requiere un backend local, robusto y fácil de desplegar, capaz de manejar:
- Gestión de productos
- Geetión de Categorías
- Gestión de Usuarios
- Pedidos en tiempo real
- Recaudaciones
- Roles y autenticación
- Generacion de QR 
- API REST para la interfaz QR y el panel administrativo

El backend debe funcionar en LAN sin internet, ejecutarse como servicio local y permitir futuras ampliaciones.

## 2. Decisión
Se define utilizar **Spring Boot (Java 21)** como framework backend principal.

## 3. Alternativas Consideradas
### Node.js + Express
- ✔️ Desarrollo más rápido  
- ❌ Menor robustez para proyectos modulares grandes  
- ❌ Control menos estricto sobre tipado y estructura  
- ❌ Más esfuerzo para modularidad avanzada  

### Quarkus
- ✔️ Excelente performance  
- ❌ Curva de aprendizaje más alta  
- ❌ Menor comunidad para proyectos instalables locales  

### PHP (Laravel)
- ✔️ Fácil despliegue web  
- ❌ No adecuado para aplicación local / instalable offline  
- ❌ Menos modular para lógica pesada  

## 4. Argumentos
### Pros
- Ecosistema completo: Spring Security, Data JPA, Validation  
- Ideal para arquitectura modular y hexagonal  
- Fácil integración con Electron y React vía API REST  
- Muy estable y de adopción industrial  
- Permite empaquetar JAR ejecutable y Docker  

### Contras
- Mayor consumo de recursos que Node  
- Configuración inicial más extensa  

## 5. Consecuencias
- El backend se vuelve altamente mantenible  
- Soporta futuros módulos (estadísticas, pagos, reportes) sin reescrituras  
- Facilita testing y cobertura  
- Requiere hardware mínimo moderado en la PC del restaurante  

## 6. Estado
Aprobado

## 7. Enlaces
- ADR-003: Metodología Arquitectónica  
- ADR-004: Base de Datos Local  
- ADR-007: Comunicación Front–Back  
