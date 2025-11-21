# ADR-006: Seguridad del Sistema — Spring Security + Basic Auth + Roles
Fecha: 2025-11-15

## 1. Contexto
El sistema QRest funciona en una red local (LAN), donde:

- La **Carta QR** es una vista pública usada por clientes sin autenticación.
- El **Panel Administrativo** requiere protección para evitar accesos no autorizados.
- No hay conexión a internet, por lo que no se usarán OAuth, JWT, ni proveedores externos.
- El backend debe ser simple de mantener y configurar.
- La seguridad debe ser suficiente para un entorno controlado (restaurante).

El objetivo es proteger las rutas críticas sin agregar complejidad innecesaria.

---

## 2. Decisión
Se utilizará **Spring Security con Autenticación Básica (HTTP Basic)** para proteger el panel administrativo.

### Componentes clave:
- **Basic Auth** para proteger endpoints privados.
- **Roles internos**:
  - `ROLE_ADMIN`
  - `ROLE_OPERATOR`
- **Rutas públicas** para la carta QR.
- Contraseñas encriptadas con BCrypt.
- Usuarios almacenados en base de datos (SQLite).

---

## 3. Alcance de la seguridad

### Rutas públicas (no requieren login)
- `/api/products`
- `/api/categories`
- `/api/menu`
- `/api/tables/{id}/menu`
- `/api/orders` (solo POST para pedidos)
- `/api/orders/table/{tableId}`

### Rutas protegidas (requieren Basic Auth)
- `/api/admin/**`
- `/api/orders/manage/**`
- `/api/reports/**`
- `/api/users/**`
- `/api/config/**`

---

## 4. Alternativas Consideradas

### JWT
**Pros**
- Muy usado.
- Stateless.

**Contras**
- Innecesario en LAN.
- Requiere más configuración.
- JWT no aporta valor sin servicios externos.

**Decisión:** Descartado.

---

### Form Login (login web tradicional de pring security)
**Pros**
- Interfaz más amigable.

**Contras**
- React + Electron ya tiene interfaces propias.
- Requiere más configuración.

**Decisión:** Descartado.

---

### Sin autenticación
**Pros**
- Simplicidad total.

**Contras**
- Riesgo de que cualquiera acceda al panel administrativo.
- No funcional en un ambiente real.

**Decisión:** Descartado.

---

## 5. Argumentos a favor de Basic Auth

### ✔ Simplicidad
Ideal para sistemas LAN, sin dependencias externas.

### ✔ Seguridad suficiente para entorno local
El panel está en una PC del restaurante, no expuesto a internet.

### ✔ Integración perfecta con Spring Security
Pocos pasos, simple de mantener.

### ✔ Funciona con React y Electron sin esfuerzo
Solo requiere enviar header:
```
Authorization: Basic base64(usuario:password)
```

### ✔ Permite roles internos
Admin y Operador con permisos diferentes.

---

## 6. Consecuencias

### Positivas
- Implementación simple, estable y mantenible.
- Seguridad adecuada para el contexto.
- Control granular por roles.
- No requiere almacenamiento de tokens.
- No agrega sobrecarga al backend.

### Negativas / Riesgos
- Basic Auth envía credenciales en Base64 (no cifrado), pero:
  - La comunicación está confinada a LAN.
  - No se usa internet.
  - Riesgo controlado.

- Si la instalación se expande a modo nube en el futuro:
  - Será necesario migrar a JWT u OAuth.

---

## 7. Configuración recomendada

### En Spring Security:
- Deshabilitar CSRF para API REST.
- Permitir rutas públicas.
- Exigir autenticación en rutas protegidas.
- BCrypt para contraseñas.


---

## 8. Estado
Aprobado

---

## 9. Enlaces
- ADR-005: Comunicación Front–Back  
- ADR-001: Backend (Spring Boot)  
