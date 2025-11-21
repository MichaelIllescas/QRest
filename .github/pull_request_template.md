#  Pull Request — QRest / Carta Interactiva

##  Tipo de cambio
Seleccioná una opción:

- [ ] `feat:` Nueva funcionalidad
- [ ] `fix:` Corrección de bug
- [ ] `refactor:` Refactor sin cambios funcionales
- [ ] `docs:` Documentación
- [ ] `test:` Tests agregados o corregidos
- [ ] `chore:` Tarea menor (configs, scripts)
- [ ] `style:` Cambios de estilo sin lógica

---

##  Descripción del cambio
> Explicá brevemente qué hiciste y por qué.

---

##  Arquitectura y buenas prácticas
Confirmá que cumpliste las siguientes reglas:

- [ ] Cumple **Hexagonal Architecture** (puertos de entrada/salida correctos)
- [ ] Solo se retorna **DTO**, no entidades
- [ ] Respeté límites del módulo (no accedo directamente a otro módulo)
- [ ] Respeté **SRP** (Single Responsibility)
- [ ] Código limpio y nomenclatura en inglés
- [ ] No hay lógica en controladores, solo delegación a casos de uso
- [ ] Sanitización de inputs aplicada
- [ ] MapStruct usado correctamente
- [ ] CSS Modules aplicado (si es frontend)

---

##  Testing realizado
- [ ] Tests unitarios agregados o actualizados
- [ ] Tests de integración (si aplica)
- [ ] Cobertura del caso de uso verificada

**Describí qué tests agregaste:**

---

##  Issue / Historia de Usuario relacionada
> Ejemplo: “Resuelve US-017”  
> Link o ID:

---

##  ¿Qué se debe revisar?
> Indicá qué partes revisar más en detalle:  
> lógica, DTOs, endpoints, validaciones, UI, rendimiento, etc.

---

##  Evidencias (opcional)
Insertar capturas, logs o resultados de tests:

---

##  Checklist final antes de solicitar el merge

- [ ] Código compila sin warnings
- [ ] Sin `console.log` ni prints
- [ ] Sin TODOs pendientes
- [ ] Sin cambios accidentales en archivos ajenos
- [ ] Documentación actualizada (si aplica)
- [ ] Revisión propia (self-review) realizada

---

## 🧑 Comentarios adicionales
> Cualquier aclaración, nota técnica o decisión relevante.
