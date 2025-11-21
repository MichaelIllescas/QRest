# 📄 Páginas del Admin Panel - QRest

## 📋 Resumen General

Este directorio contiene todas las páginas principales del panel de administración de QRest. Cada página implementa un sistema de layout estandarizado que garantiza consistencia visual y funcional en toda la aplicación.

## 🏗️ Arquitectura del Layout

### Sistema de Clases CSS Estándar

Todas las páginas utilizan el archivo CSS `../shared/styles/PageLayout.css` que define un sistema de layout uniforme:

```css
/* Estructura base de cada página */
.page-header    → Sección de título (1200px × 120px mín.)
.page-content   → Área de contenido (1200px × 600px mín.)
```

### 📐 Estructura Visual

```
┌─────────────────────────────────────────┐
│  📋 .page-header                        │  ← 120px mín.
│  ┌─ Título Principal                    │
│  └─ Descripción                        │
└─────────────────────────────────────────┘
            ↕ 2rem spacing
┌─────────────────────────────────────────┐
│  📦 .page-content                       │  ← 600px mín.
│                                         │
│  🎯 .content-placeholder                │
│     ├─ Icono                          │
│     ├─ Título del contenido           │
│     └─ Descripción del placeholder    │
│                                         │
└─────────────────────────────────────────┘
```

## 📱 Responsividad

| Breakpoint | Header | Content | Características |
|------------|--------|---------|-----------------|
| **Desktop** (>1024px) | 120px min | 600px min | Layout completo |
| **Tablet** (768-1024px) | 100px min | 500px min | Reducción moderada |
| **Mobile** (<768px) | 80px min | 400px min | Layout compacto |
| **Small** (<480px) | 70px min | 350px min | Máxima compresión |

## 🎨 Características Visuales

### Bordes Delimitadores
- **Tipo:** `2px dashed #d1d5db`
- **Propósito:** Visualizar límites exactos de contenedores
- **Interactividad:** Cambian de color al hacer hover

### 🎛️ Control de Bordes - Sistema Flexible

Para facilitar el desarrollo y la transición a producción, hemos implementado un sistema de control de bordes que permite cambiar fácilmente el estilo visual:

#### Modos Disponibles

| Modo | Descripción | Header | Content | Uso |
|------|-------------|--------|---------|-----|
| **Default** | Bordes punteados grises | `2px dashed #d1d5db` | `2px dashed #d1d5db` | Desarrollo inicial |
| **Development** | Bordes llamativos | `3px dashed #3b82f6` | `3px dashed #10b981` | Debug y layout |
| **Production** | Bordes sutiles | `1px solid #e5e7eb` | `1px solid #e5e7eb` | Entorno final |
| **Clean** | Sin bordes | `none` | `none` | UI final limpia |

#### 🚀 Métodos de Control

##### 1. **Control Programático (Recomendado)**

```typescript
import { setLayoutMode, layoutModes } from '../shared/utils/layoutModes';

// Métodos directos
setLayoutMode('production');     // Bordes sutiles
setLayoutMode('development');    // Bordes coloridos  
setLayoutMode('clean');          // Sin bordes
setLayoutMode('default');        // Bordes por defecto

// Métodos con atajos
layoutModes.enableProduction();  // → Modo producción
layoutModes.enableDevelopment(); // → Modo desarrollo  
layoutModes.enableClean();       // → Sin bordes
layoutModes.reset();             // → Por defecto
layoutModes.toggle();            // → Alternar desarrollo/producción
```

##### 2. **Control desde Consola del Navegador**

```javascript
// Abrir DevTools (F12) y ejecutar:
layoutModes.enableProduction(); // Bordes sutiles para producción
layoutModes.enableClean();      // Quitar todos los bordes
layoutModes.toggle();           // Alternar entre desarrollo/producción
setLayoutMode('clean');         // Control directo
```

##### 3. **Control por CSS (Manual)**

```tsx
// Aplicar clases individuales
<div className="page-header production">...</div>
<div className="page-content clean">...</div>

// O aplicar globalmente al body
<body className="production-mode">
<body className="development-mode">  
<body className="clean-mode">
```

#### 📋 Casos de Uso Comunes

```typescript
// Al iniciar desarrollo
layoutModes.enableDevelopment();

// Antes de hacer commit
layoutModes.enableProduction();

// Para screenshots/demos
layoutModes.enableClean();

// Para debug de layout
layoutModes.enableDevelopment();
```

### Estados de Desarrollo
```css
.page-header.development  → Borde azul (#3b82f6)
.page-content.development → Borde verde (#10b981)
.production              → Bordes sólidos para producción
.clean                   → Sin bordes para UI final
```

## 📁 Páginas Implementadas

| Página | Archivo | Título | Icono | Descripción |
|--------|---------|--------|-------|-------------|
| **Dashboard** | `Dashboard.tsx` | Dashboard | 📊 | Panel principal de métricas |
| **Pedidos** | `Orders.tsx` | Pedidos | 🛒 | Gestión de pedidos |
| **Productos** | `Products.tsx` | Productos | 🍕 | Catálogo de productos |
| **Categorías** | `Categories.tsx` | Categorías | 📂 | Organización de categorías |
| **Mesas** | `Tables.tsx` | Mesas | 🪑 | Gestión de mesas |
| **Reportes** | `Reports.tsx` | Reportes | 📊 | Informes y estadísticas |
| **Configuración** | `Settings.tsx` | Configuración | ⚙️ | Configuraciones del sistema |
| **Usuarios** | `Users.tsx` | Usuarios | 👥 | Gestión de usuarios |

## 🛠️ Implementación

### Estructura Base de Cada Página

```tsx
import React from 'react';
import Container from '../shared/components/Container';
import '../shared/styles/PageLayout.css';

const PageName: React.FC = () => {
  return (
    <Container size="xl" className="py-6">
      {/* Sección de título estandarizada */}
      <div className="page-header">
        <h1 className="page-title">
          Título de la Página
        </h1>
        <p className="page-description">
          Descripción de la sección
        </p>
      </div>
      
      {/* Área de contenido estandarizada */}
      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">🎯</div>
            <h3 className="placeholder-title">Contenido de [Página]</h3>
            <p className="placeholder-text">
              Aquí va a ir el contenido principal
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PageName;
```

### Clases CSS Disponibles

#### Layout Principal
```css
.page-header      → Container del título
.page-content     → Container del contenido principal
.page-container   → Container base (opcional)
```

#### Tipografía
```css
.page-title       → H1 principal (2rem, bold)
.page-description → Descripción (1rem, gray)
.placeholder-title → Título del placeholder (1.5rem)
.placeholder-text  → Texto del placeholder (1rem)
```

#### Placeholder
```css
.content-placeholder → Container centrado del placeholder
.placeholder-content → Wrapper del contenido placeholder  
.placeholder-icon    → Icono grande (4rem)
```

## 🎯 Beneficios del Sistema

### ✅ Consistencia
- **Tamaños uniformes** en todas las páginas
- **Espaciado estandarizado** 
- **Tipografía coherente**

### ✅ Desarrollo
- **Bordes visuales** para delimitar áreas
- **Sistema responsive** robusto
- **Fácil mantenimiento**

### ✅ Escalabilidad
- **Plantilla reutilizable** para nuevas páginas
- **CSS centralizado** en un solo archivo
- **Fácil personalización** con variantes

### ✅ UX/UI
- **Layout predecible** para usuarios
- **Carga visual consistente**
- **Adaptación perfecta** a dispositivos

## 🚀 Cómo Crear una Nueva Página

1. **Copiar plantilla base** de cualquier página existente
2. **Cambiar imports** y nombre del componente
3. **Personalizar título, icono y descripción**
4. **Mantener estructura de clases CSS**

### Ejemplo Rápido

```tsx
// Nueva página de Inventario
const Inventory: React.FC = () => {
  return (
    <Container size="xl" className="py-6">
      <div className="page-header">
        <h1 className="page-title">Inventario</h1>
        <p className="page-description">
          Gestión de stock y inventario
        </p>
      </div>
      
      <div className="page-content">
        <div className="content-placeholder">
          <div className="placeholder-content">
            <div className="placeholder-icon">📦</div>
            <h3 className="placeholder-title">Contenido de Inventario</h3>
            <p className="placeholder-text">
              Aquí va el sistema de inventario
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
```

## 📚 Referencias

- **Container Component:** `../shared/components/Container/`
- **CSS del Layout:** `../shared/styles/PageLayout.css`
- **Control de Bordes:** `../shared/utils/layoutModes.ts`
- **Navbar:** `../shared/components/Navigation/AdminNavbar.tsx`
- **Layout Principal:** `../shared/layouts/MainLayout.tsx`

## 🛠️ Guía de Workflow Recomendado

### Durante el Desarrollo

```typescript
// 1. Iniciar con modo desarrollo para ver límites claros
import { layoutModes } from '../shared/utils/layoutModes';

// En componentDidMount o useEffect
layoutModes.enableDevelopment();

// Para debugging específico
layoutModes.toggle(); // Alternar entre desarrollo/producción rápidamente
```

### Antes de Producción

```typescript
// 2. Cambiar a modo producción para bordes sutiles
layoutModes.enableProduction();

// 3. Para UI completamente limpia (opcional)
layoutModes.enableClean();
```

### Para Testing/Screenshots

```typescript
// UI sin bordes para capturas profesionales
layoutModes.enableClean();
```

### 💡 Tips y Trucos

#### Comando Rápido en DevTools
```javascript
// Agregar a snippets de Chrome DevTools
function quickLayoutToggle() {
  if (window.layoutModes) {
    window.layoutModes.toggle();
    console.log(`🎨 Layout cambiado a: ${getCurrentLayoutMode()}`);
  }
}

// Usar con: quickLayoutToggle()
```

#### Hotkey Para Desarrollo (Opcional)
```typescript
// Agregar al componente principal
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Ctrl + Shift + L = Toggle layout mode
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
      layoutModes.toggle();
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

---

> **Nota:** Este sistema está diseñado para mantener consistencia visual mientras permite flexibilidad en el contenido específico de cada página. Los bordes son completamente controlables y pueden adaptarse a cualquier fase del desarrollo sin modificar código de páginas individuales.