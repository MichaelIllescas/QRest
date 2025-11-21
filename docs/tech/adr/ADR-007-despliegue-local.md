# ADR-007: Estrategia de Despliegue Local — Backend como Servicio + IP Fija + Instalador Propio + Electron Liviano
Fecha: 2025-11-15  
**Versión actualizada con configuración de IP fija**

---

## 1. Contexto
QRest es un sistema local que funciona sin internet y depende de que el backend sea accesible desde celulares y el panel administrativo.  
Para esto, el backend debe:

- Ejecutarse siempre (sin intervención humana)
- Estar disponible en una dirección fija (IP fija)
- Ser estable ante reinicios o fallos
- Estar separado del frontend Electron
- Centralizar toda la lógica y la BD

Electron debe quedar liviano y actuar solo como interfaz.

---

## 2. Decisión
El despliegue se realizará siguiendo esta arquitectura profesional:

### ✔ Backend Spring Boot como *Windows Service*
- Se inicia automáticamente al prender la PC
- Se reinicia solo ante fallos
- No muestra ventanas ni consolas
- Mantiene logs propios
- Nunca interactúa con los mozos

### ✔ Instalador propio: **QRestBackendSetup.exe**
Este instalador realizará:

1. Copiar el JAR del backend a:
   ```
   C:\QRest\backend\qrest-backend.jar
   ```
2. Crear carpetas:
   ```
   C:\QRest\data\qrest.db
   C:\QRest\logs\
   ```
3. Instalar el JAR como servicio del sistema con:
   - NSSM  
   - o WinSW  
4. Configurar:
   - AutoStart = YES  
   - Restart on failure = ALWAYS  
   - Restart after reboot = YES  

### ✔ El panel administrativo (Electron) es un instalador separado
- Liviano (solo React + Chromium)
- Se conecta a:
  ```
  http://localhost:8080
  ```
- No incluye el backend
- No tiene lógica pesada

### ✔ La carta QR usa la IP fija del backend
Ejemplo:
```
http://192.168.0.10:8080/mesa/5
```

---

## 3. Decisión crítica: **Usar IP fija en la PC del backend**

### ✔ ¿Por qué?  
Si la PC usa IP dinámica (DHCP), el sistema se rompe.

Si la IP cambia:
- los QR dejan de funcionar  
- el panel admin no conecta  
- los pedidos no llegan  

Por eso es obligatorio usar **IP estática**, un estándar en software gastronómico.

### ✔ Configuración recomendada
Ejemplo para redes típicas:

```
Dirección IP:        192.168.0.10
Máscara de subred:   255.255.255.0
Puerta de enlace:    192.168.0.1
DNS:                 8.8.8.8 / 8.8.4.4
```

Esta IP siempre queda libre porque los routers asignan IPs dinámicas arriba de 100 (rango DHCP típico 192.168.0.100–199).

### ✔ Beneficios
- La IP nunca cambia
- Los QR no caducan
- No hace falta reconfigurar nada
- Funciona incluso después de cortes de luz
- Igual que un POS profesional

---

## 4. Alternativas Consideradas

### Incluir backend dentro de Electron
**Descartado.**  
Electron no puede exponer un servidor Java hacia la LAN y sería inestable.

### Docker Desktop
**Descartado.**  
Demasiado complejo y pesado para un restaurante.

### Ejecutar el JAR manualmente
**Descartado.**  
Los mozos no pueden ni deben ejecutar nada manualmente.

---

## 5. Argumentos de la decisión

### ✔ Máxima estabilidad
El backend se ejecuta siempre, incluso tras reinicios.

### ✔ Electron ultra liviano
Solo UI, sin lógica ni BD.

### ✔ Experiencia profesional
Igual que los sistemas de bares, kioscos y restaurantes más usados.

### ✔ Instalación clara
Un instalador para backend + un instalador para el panel admin.

### ✔ QR siempre válidos
Gracias a la IP fija del backend.

---

## 6. Consecuencias

### Positivas
- Sistema robusto y a prueba de usuarios
- Los mozos no necesitan saber nada técnico
- El backend está siempre accesible
- Actualizaciones limpias y seguras
- Menos riesgo operativo
- Flujo profesional de instalación

### Negativas
- Necesita configuración de IP fija (única vez)
- Instalación inicial hecha por técnico (vos)

---

## 7. Estado
Aprobado — Versión actualizada con sección de IP fija.

---

## 8. Enlaces
- ADR-001 — Backend (Spring Boot)
- ADR-003 — Arquitectura Backend
- ADR-006 — Seguridad (Basic Auth)
- ADR-005 — Comunicación REST + Cache
