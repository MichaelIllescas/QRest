# ADR-005: Comunicación Front–Back — API REST + WebSocket + Cache + Autenticación Básica
Fecha: 2025-11-15  
**Versión actualizada con soporte en tiempo real para pedidos**

---

## 1. Contexto
El sistema QRest opera completamente dentro de una red local (LAN), sin internet.  
Los componentes que deben comunicarse entre sí son:

- **Carta QR (React)** — vista pública para clientes.  
- **Panel Administrativo (React/Electron)** — vista privada para gestión interna.  
- **Backend (Spring Boot)** — núcleo del sistema, ejecutado en la PC local.

Los requisitos clave son:

- Comunicación simple  
- Rápida  
- Confiable  
- Compatible con todos los navegadores  
- Óptima para red local  
- Con actualizaciones **en tiempo real** de los pedidos en el panel administrativo

Además, los endpoints de **la carta QR** son los más consumidos del sistema y deben estar cacheados para máximo rendimiento.

El backend utiliza **autenticación básica de Spring Security** para el panel administrativo.

---

## 2. Decisión
La comunicación del sistema se realizará mediante una combinación optimizada de:

### ✔ API REST + JSON  
- Método principal para todas las operaciones del sistema.  
- Estructura uniforme y predecible.  
- Compatible con cualquier navegador sin plugins.

### ✔ WebSocket para pedidos en tiempo real  
Se incorpora un canal WebSocket exclusivamente para:

- Nuevos pedidos generados desde la carta  
- Actualizaciones de estado del pedido  
- Notificaciones internas al panel administrativo  

Esto permite que el dashboard del panel admin reciba actualizaciones instantáneas sin refrescar la página ni realizar polling continuo.

El uso de WebSocket queda **acotado al módulo de pedidos**, manteniendo REST como tecnología principal.

### ✔ Autenticación básica (HTTP Basic)  
- Solo el panel administrativo requiere autenticación.  
- La carta QR sigue siendo pública (solo lectura).  
- Rutas del panel protegidas con Basic Auth.

### ✔ Cache del lado del backend usando Spring Cache  
Los endpoints más consumidos se cachean:

- `/api/products`  
- `/api/categories`  
- `/api/menu`  
- `/api/tables/{id}/menu`

Objetivos del caché:  
- Minimizar lecturas a SQLite  
- Aumentar velocidad en móviles  
- Reducir carga del backend  
- Evitar delays en la carta QR

### ✔ Estrategia LAN estandarizada  
Dirección base:

```
http://{ip-servidor}:8080/api/...
```

---

## 3. Alternativas Consideradas

### JWT
**Pros**  
- Popular en web moderna  
- Tokens firmados y con expiración

**Contras**  
- No aporta valor en un sistema LAN  
- Agrega complejidad innecesaria

**Conclusión:** descartado.

---

### WebSockets (uso completo en todo el sistema)
**Pros**  
- Comunicación full-duplex  
- Tiempo real completo

**Contras**  
- Demasiada complejidad para un sistema LAN  
- No es necesario tiempo real para la carta QR  
- REST sigue siendo la base ideal

**Conclusión:** se adopta WebSocket **solo** para pedidos.

---

### Polling para pedidos
**Pros**  
- Facilísimo de implementar  
- Sin nuevas dependencias

**Contras**  
- Polling frecuente sobrecargaría SQLite  
- No es una experiencia realmente en tiempo real  

**Conclusión:** descartado para el módulo de pedidos.

---

### Sin cache
**Pros**  
- Simplicidad absoluta

**Contras**  
- Muchas lecturas a SQLite  
- Peor rendimiento en móviles

**Conclusión:** descartado.

---

## 4. Argumentos

### ✔ REST + JSON como base
- Simplicidad  
- Estandarización  
- Debug fácil  
- Compatible con todos los dispositivos

### ✔ WebSocket para pedidos en tiempo real
- El panel administrativo requiere ver pedidos inmediatamente  
- Evita usar polling intensivo  
- Ideal para dashboards internos  
- Perfecto para red local con baja latencia

### ✔ Autenticación básica
- Suficiente para entorno LAN  
- Sin tokens ni sistemas externos  
- Implementación rápida

### ✔ Cache en backend
- Aumenta velocidad en endpoints de alta demanda  
- Minimiza accesos repetitivos a SQLite  
- Tiempo de carga casi inmediato para la carta QR  

---

## 5. Consecuencias

### Positivas
- Dashboard de pedidos 100% en tiempo real  
- Alta velocidad en la carta QR  
- Menor carga general sobre el backend  
- Arquitectura clara y sin sobreingeniería  
- REST sigue siendo el núcleo del sistema

### Negativas
- Requiere mantener un canal WebSocket adicional  
- Basic Auth no cifra credenciales, aunque para LAN no es crítico  

---

## 6. Estado
Aprobado  

---

## 7. Enlaces
- ADR-001: Backend  
- ADR-002: Frontend  
- ADR-003: Arquitectura del Backend  
- ADR-004: Base de Datos SQLite  
