# ADR-004: Base de Datos Local — SQLite embebida
Fecha: 2025-11-15

## 1. Contexto
El sistema QRest debe funcionar:
- En una PC local dentro del restaurante.
- Sin necesidad de conexión a internet.
- Con múltiples usuarios interactuando al mismo tiempo (clientes haciendo pedidos por QR y personal usando el panel administrativo).
- Con datos que deben persistir aunque se apague la PC.

Se requiere una base de datos:
- Embebida (sin servidor externo).
- Estable para uso en producción.
- De fácil respaldo (copiar un archivo).
- Compatible con Spring Boot y JPA.

## 2. Decisión
Se define utilizar **SQLite** como base de datos embebida para QRest.

La base de datos se almacenará en un único archivo:
- Ruta sugerida: `database/qrest.db`
- Ubicada dentro del directorio de la aplicación.

## 3. Alternativas Consideradas

### H2 (embebida)
**Pros**
- Integración muy sencilla con Spring Boot.
- Ideal para desarrollo y pruebas automatizadas.

**Contras**
- No recomendada para producción intensiva.
- Problemas de concurrencia bajo carga de escritura.
- Mayor riesgo de corrupción ante cierres bruscos.

### MySQL / MariaDB
**Pros**
- Muy estable y robusta.
- Ideal para sistemas multiusuario de mayor escala.

**Contras**
- Requiere instalación de servidor de base de datos.
- Aumenta complejidad de despliegue para un restaurante pequeño.
- No es embebida; no encaja con el objetivo "instalar y usar".

### PostgreSQL
**Pros**
- Muy potente, estándar empresarial.

**Contras**
- Excesiva para una aplicación local en una sola máquina.
- Misma problemática de servidor que MySQL.

## 4. Argumentos

### Razones para elegir SQLite
- Es una base de datos **embebida y de producción**, ampliamente utilizada en aplicaciones desktop y móviles.
- No requiere servidor: sólo un archivo `.db`.
- Excelente rendimiento para aplicaciones locales.
- Manejo de concurrencia adecuado para el volumen esperado de QRest.
- Respaldo sencillo: basta con copiar el archivo de base.
- Integrable con Spring Boot mediante driver JDBC y dialecto custom para Hibernate.
- Perfecta para un esquema de instalación simple en la PC del restaurante.

### Consideraciones técnicas
- Se utilizará el driver `org.xerial:sqlite-jdbc`.
- Se definirá un dialecto custom `SQLiteDialect` para Hibernate.
- Se configurará en `application.properties` una URL del tipo:
  - `spring.datasource.url=jdbc:sqlite:database/qrest.db`

## 5. Consecuencias

### Positivas
- Despliegue extremadamente simple: no hay que instalar ni configurar servidores de base de datos.
- Facilita el soporte técnico: el backup es solo un archivo.
- Reduce el riesgo de errores de configuración en entornos pequeños.
- Permite ejecutar QRest en cualquier PC con Java instalado.

### Negativas / Riesgos
- No es ideal para escenarios de alta concurrencia masiva o escalado horizontal.
- Algunas operaciones avanzadas de SQL pueden estar limitadas en comparación con PostgreSQL/MySQL.
- Se requiere cuidado al diseñar migraciones (Flyway/Liquibase) por las restricciones de ALTER TABLE en SQLite.

## 6. Estado
Aprobado

## 7. Enlaces
- ADR-001: Framework Backend — Spring Boot
- ADR-003: Arquitectura del Backend — Monolito modular con Arquitectura Hexagonal
- Clase `SQLiteDialect` en el módulo de configuración del backend
