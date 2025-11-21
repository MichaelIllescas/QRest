# ADR-002: Selección del Framework Frontend — React
Fecha: 2025-11-15

## 1. Contexto
El sistema QRest requiere una interfaz moderna y rápida que funcione:
- En modo **Carta QR** para clientes.
- En modo **Panel Administrativo** para gestión del restaurante.
- Totalmente responsive.
- Ejecutándose en navegador dentro de una red local (sin internet).

El frontend debe comunicarse vía REST con el backend, renderizar información en tiempo real y ofrecer una experiencia fluida incluso en dispositivos de gama baja.

## 2. Decisión
Se define utilizar **React** como framework frontend oficial del proyecto.

## 3. Alternativas Consideradas
### Vue.js
✔️ Fácil curva de aprendizaje  
❌ Menor presencia industrial comparado con React  
❌ Menos recursos y librerías para entornos altamente personalizados  

### Angular
✔️ Arquitectura sólida y completa  
❌ Mucho más pesado y complejo para el caso de uso  
❌ Excesivo para un sistema local y ligero como QRest  

### Svelte
✔️ Muy rápido, excelente performance  
❌ Comunidad menor  
❌ No estándar industrial para software empresarial instalable  

## 4. Argumentos
### Pros
- Dominio completo del equipo de Desarrollo en React.
- Ecosistema inmenso de componentes, hooks y librerías.
- Ideal para paneles administrativos y UI reactivas.
- Excelente para código modular y mantenible.
- Soporte perfecto para comunicación REST con el backend.
- Permite crear un frontend limpio, reutilizable y escalable.

### Contras
- Requiere herramientas adicionales para SSR (que QRest no necesita).
- La administración del estado requiere librerías extra si se complica (aunque QRest no lo necesita).

## 5. Consecuencias
- El proyecto será más rápido de desarrollar por experiencia previa.
- La UI será altamente personalizable para futuras versiones.
- Facilita la expansión de módulos (estadísticas, reportes visuales, etc.).

## 6. Estado
Aprobado

## 7. Enlaces
- ADR-001: Framework Backend  
- ADR-003: Arquitectura del Backend  
