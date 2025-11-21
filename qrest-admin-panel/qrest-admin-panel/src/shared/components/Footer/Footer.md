# 🧱 Footer (TypeScript)

Componente de pie de página reutilizable y altamente configurable para aplicaciones React.

## Descripción

Este componente representa un footer moderno y flexible que soporta múltiples secciones de contenido, enlaces personalizados, contenido libre y diferentes tamaños. Ideal para cualquier layout de aplicación que requiera un pie de página profesional.

## Características

- ✅ Tres tamaños configurables (small, medium, large)
- ✅ Sistema de secciones dinámicas con títulos y enlaces
- ✅ Soporte para enlaces internos y externos  
- ✅ Área de contenido libre (children)
- ✅ Copyright personalizable (texto o JSX)
- ✅ Línea divisoria configurable
- ✅ Estilos personalizables vía className y style
- ✅ **TypeScript completo** con tipado estricto
- ✅ **CSS Modules** para encapsulación de estilos
- ✅ Responsive y accesible

## Instalación

Copia los siguientes archivos a tu proyecto:
- `Footer.tsx`
- `Footer.module.css`

## Interfaces TypeScript

```typescript
export type FooterSize = "small" | "medium" | "large";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title?: string;
  links?: FooterLink[];
  content?: React.ReactNode;
}

export interface FooterProps {
  /** Tamaño del footer */
  size?: FooterSize;
  /** Secciones (opcional) */
  sections?: FooterSection[];
  /** Contenido libre debajo de las secciones */
  children?: React.ReactNode;
  /** Clase externa opcional */
  className?: string;
  /** Copyright como texto plano */
  copyrightText?: string;
  /** Copyright como JSX (reemplaza al texto si está presente) */
  copyrightNode?: React.ReactNode;
  /** Mostrar o no línea divisoria inferior */
  showDivider?: boolean;
  /** Estilos inline opcionales */
  style?: React.CSSProperties;
}
```

## Uso Básico

```typescript
import { Footer } from "./components/Footer/Footer";
// o si usas el index.ts:
// import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <div>
      {/* Tu contenido */}
      <Footer />
    </div>
  );
};
```

## Ejemplos de Uso

### Footer Simple (mínimo)
```typescript
<Footer />
```

### Footer con tamaño específico
```typescript
<Footer size="large" />
```

### Footer con copyright personalizado
```typescript
<Footer 
  copyrightText="© 2025 Mi Empresa. Todos los derechos reservados."
  showDivider={false}
/>
```

### Footer con copyright JSX avanzado
```typescript
<Footer 
  copyrightNode={
    <div>
      © 2025 <strong>Mi Empresa</strong> | 
      <a href="/privacy">Privacidad</a> | 
      <a href="/terms">Términos</a>
    </div>
  }
/>
```

### Footer con secciones de enlaces
```typescript
<Footer 
  size="medium"
  sections={[
    {
      title: "Productos",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics", href: "/analytics" },
        { label: "API", href: "/api" }
      ]
    },
    {
      title: "Empresa", 
      links: [
        { label: "Acerca de", href: "/about" },
        { label: "Contacto", href: "/contact" },
        { label: "Blog", href: "https://blog.ejemplo.com", external: true }
      ]
    },
    {
      title: "Soporte",
      links: [
        { label: "Documentación", href: "/docs" },
        { label: "FAQ", href: "/faq" },
        { label: "Ayuda", href: "mailto:help@empresa.com", external: true }
      ]
    }
  ]}
  copyrightText="© 2025 Mi Empresa"
/>
```

### Footer con secciones mixtas (enlaces + contenido personalizado)
```typescript
<Footer 
  sections={[
    {
      title: "Enlaces Rápidos",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Productos", href: "/products" },
        { label: "Servicios", href: "/services" }
      ]
    },
    {
      title: "Contacto",
      content: (
        <div>
          <p>📧 contacto@empresa.com</p>
          <p>📱 +1 (555) 123-4567</p>
          <p>🌍 Ubicación: Ciudad, País</p>
        </div>
      )
    },
    {
      title: "Síguenos",
      content: (
        <div style={{display: 'flex', gap: '10px'}}>
          <a href="https://twitter.com" target="_blank" rel="noopener">🐦</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">💼</a>
          <a href="https://github.com" target="_blank" rel="noopener">🐙</a>
        </div>
      )
    }
  ]}
/>
```

### Footer con contenido libre (children)
```typescript
<Footer 
  size="large"
  sections={[
    {
      title: "Empresa",
      links: [
        { label: "Acerca de", href: "/about" },
        { label: "Carreras", href: "/careers" }
      ]
    }
  ]}
  copyrightText="© 2025 Mi Startup"
>
  {/* Contenido personalizado */}
  <div style={{textAlign: 'center', marginTop: '20px'}}>
    <p>🚀 ¡Únete a nuestra newsletter!</p>
    <input type="email" placeholder="tu@email.com" />
    <button>Suscribirse</button>
  </div>
</Footer>
```

### Footer completo con todos los props
```typescript
<Footer 
  size="large"
  className="custom-footer"
  style={{backgroundColor: '#1a202c', color: '#e2e8f0'}}
  sections={[
    {
      title: "Productos",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "API Docs", href: "https://docs.api.com", external: true }
      ]
    },
    {
      title: "Contacto",
      content: (
        <div>
          <p>Email: info@empresa.com</p>
          <p>Tel: +1-555-0123</p>
        </div>
      )
    }
  ]}
  copyrightNode={
    <div>
      © 2025 <strong>Empresa XYZ</strong> | Hecho con ❤️ en React
    </div>
  }
  showDivider={true}
>
  <div style={{textAlign: 'center'}}>
    <p>Newsletter: <input type="email" placeholder="Email" /></p>
  </div>
</Footer>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `FooterSize` | `"medium"` | Tamaño del footer: `"small"`, `"medium"`, `"large"` |
| `sections` | `FooterSection[]` | `[]` | Array de secciones con título, enlaces y/o contenido |
| `children` | `React.ReactNode` | - | Contenido personalizado que aparece debajo de las secciones |
| `className` | `string` | `""` | Clases CSS adicionales |
| `copyrightText` | `string` | - | Texto de copyright simple |
| `copyrightNode` | `React.ReactNode` | - | Copyright como JSX (tiene prioridad sobre copyrightText) |
| `showDivider` | `boolean` | `true` | Mostrar línea divisoria antes del copyright |
| `style` | `React.CSSProperties` | - | Estilos inline opcionales |

### Estructura de `FooterSection`
```typescript
{
  title?: string;          // Título opcional de la sección
  links?: FooterLink[];    // Array de enlaces
  content?: React.ReactNode; // Contenido JSX personalizado
}
```

### Estructura de `FooterLink`
```typescript
{
  label: string;      // Texto del enlace
  href: string;       // URL o ruta
  external?: boolean; // Si es true, abre en nueva pestaña con rel="noopener noreferrer"
}
```

## Personalización CSS

El Footer usa CSS Modules. Puedes personalizar los estilos sobrescribiendo las clases o usando props:

### Usando className y style props
```typescript
<Footer 
  className="mi-footer-personalizado"
  style={{
    backgroundColor: '#1a202c',
    color: '#e2e8f0',
    padding: '2rem 0'
  }}
/>
```

### Clases CSS disponibles para sobrescribir
```css
/* Contenedor principal */
.footer { }
.footer.small { }
.footer.medium { }
.footer.large { }

/* Contenido interno */
.inner { }
.sections { }
.section { }
.sectionTitle { }
.linksList { }
.link { }
.customContent { }
.childrenArea { }
.divider { }
.bottomBar { }
```

### Ejemplo de personalización
```css
/* En tu CSS global o componente padre */
.mi-footer-personalizado {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.mi-footer-personalizado .section {
  padding: 1.5rem;
}

.mi-footer-personalizado .link {
  color: #fbbf24;
  transition: all 0.3s ease;
}

.mi-footer-personalizado .link:hover {
  color: #f59e0b;
  transform: translateY(-2px);
}
```

## Tamaños del Footer

### Small
- Espaciado reducido
- Ideal para aplicaciones móviles o footers discretos

### Medium (default)  
- Espaciado equilibrado
- Uso general para la mayoría de aplicaciones

### Large
- Espaciado amplio
- Ideal para landing pages o sitios corporativos

```typescript
<Footer size="small" />   // Compacto
<Footer size="medium" />  // Equilibrado (default)
<Footer size="large" />   // Espacioso
```

## Integración con Router

Para usar con React Router, simplemente usa href normales o rutas:

```typescript
<Footer 
  sections={[
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "/" },           // Ruta interna
        { label: "Dashboard", href: "/dashboard" }, // Ruta interna  
        { label: "API", href: "https://api.ejemplo.com", external: true } // Externa
      ]
    }
  ]}
/>
```

Los enlaces internos (sin `external: true`) se comportarán como enlaces normales que el router puede manejar.

## Accesibilidad

El Footer incluye características de accesibilidad:

- ✅ Enlaces externos tienen `rel="noopener noreferrer"`
- ✅ Estructura semántica con `<footer>`, `<h3>`, etc.
- ✅ Enlaces tienen texto descriptivo
- ✅ Navegación por teclado funcional
- ✅ Contraste de colores adecuado (customizable)

## Mejores Prácticas

### 1. Organización de Secciones
```typescript
// ✅ Bueno: Secciones lógicamente agrupadas
<Footer 
  sections={[
    { title: "Productos", links: [...] },
    { title: "Empresa", links: [...] },
    { title: "Legal", links: [...] }
  ]}
/>

// ❌ Evitar: Mezclar tipos de contenido sin organización
```

### 2. Enlaces Externos
```typescript
// ✅ Bueno: Marcar enlaces externos
{ label: "Blog", href: "https://blog.empresa.com", external: true }

// ❌ Evitar: No marcar enlaces externos
{ label: "Blog", href: "https://blog.empresa.com" }
```

### 3. Copyright Dinámico vs Estático
```typescript
// ✅ Bueno: Copyright que se actualiza automáticamente
copyrightText={`© ${new Date().getFullYear()} Mi Empresa`}

// ✅ También bueno: JSX para mayor control
copyrightNode={
  <div>
    © {new Date().getFullYear()} <strong>Mi Empresa</strong>
  </div>
}
```

### 4. Responsive Design
```typescript
// ✅ Bueno: Ajustar tamaño según viewport
const isMobile = window.innerWidth < 768;
<Footer size={isMobile ? "small" : "medium"} />
```

## Layout Sticky Footer

Para mantener el footer pegado al final:

```css
/* CSS del contenedor principal */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1; /* Toma todo el espacio disponible */
}

/* El footer se queda automáticamente al fondo */
```

```jsx
<div className="app-container">
  <header>Header</header>
  <main className="main-content">
    {/* Contenido de la página */}
  </main>
  <Footer />
</div>
```

## Casos de Uso Comunes

### Footer para Dashboard/Admin
```typescript
<Footer 
  size="small"
  copyrightText="© 2025 Admin Panel"
  showDivider={false}
/>
```

### Footer para Landing Page
```typescript
<Footer 
  size="large"
  sections={[
    {
      title: "Producto",
      links: [
        { label: "Características", href: "/features" },
        { label: "Precios", href: "/pricing" },
        { label: "Demo", href: "/demo" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Acerca de", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Carreras", href: "/careers" }
      ]
    },
    {
      title: "Contacto",
      content: (
        <div>
          <p>📧 hola@empresa.com</p>
          <p>📱 +1-555-123-4567</p>
        </div>
      )
    }
  ]}
  copyrightNode={
    <div>
      © 2025 <strong>Mi Empresa</strong> | 
      <a href="/privacy"> Privacidad</a> | 
      <a href="/terms"> Términos</a>
    </div>
  }
>
  <div style={{textAlign: 'center', marginTop: '2rem'}}>
    <h4>🚀 Newsletter</h4>
    <input type="email" placeholder="tu@email.com" />
    <button>Suscribirse</button>
  </div>
</Footer>
```

### Footer para E-commerce
```typescript
<Footer 
  size="medium"
  sections={[
    {
      title: "Tienda",
      links: [
        { label: "Productos", href: "/products" },
        { label: "Ofertas", href: "/deals" },
        { label: "Categorías", href: "/categories" }
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Envíos", href: "/shipping" },
        { label: "Devoluciones", href: "/returns" },
        { label: "FAQ", href: "/faq" }
      ]
    },
    {
      title: "Síguenos",
      content: (
        <div style={{display: 'flex', gap: '15px'}}>
          <a href="https://facebook.com/tienda">📘</a>
          <a href="https://instagram.com/tienda">📸</a>
          <a href="https://twitter.com/tienda">🐦</a>
        </div>
      )
    }
  ]}
  copyrightText="© 2025 Mi Tienda Online"
/>
```

## Troubleshooting

### Problema: Los enlaces no navegan correctamente
**Solución:** Asegúrate de que tu router esté configurado para manejar las rutas, o usa `external: true` para enlaces externos.

### Problema: Los estilos no se aplican
**Solución:** Verifica que estés importando el archivo CSS Module correctamente y que las clases estén definidas.

### Problema: El footer no se queda al fondo
**Solución:** Usa la técnica de Sticky Footer con flexbox mostrada arriba.

### Problema: El copyright no se actualiza
**Solución:** Usa `new Date().getFullYear()` en lugar de un año hardcodeado.

## Notas Técnicas

- El componente es **funcional** y usa TypeScript
- Los estilos usan **CSS Modules** para encapsulación
- Compatible con todos los navegadores modernos
- No depende de React Router (usa enlaces `<a>` normales)
- Flexible y extensible via props y children
- Optimizado para performance y accesibilidad

## Ejemplo Completo de Implementación

```jsx
import React from 'react';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <nav>Mi App</nav>
      </header>
      
      <main className="main-content">
        {/* Contenido de tu aplicación */}
        <h1>Bienvenido</h1>
        <p>Contenido principal aquí...</p>
      </main>

      <Footer 
        size="medium"
        sections={[
          {
            title: "Productos",
            links: [
              { label: "Dashboard", href: "/dashboard" },
              { label: "Analytics", href: "/analytics" },
              { label: "API", href: "/api" }
            ]
          },
          {
            title: "Soporte",
            links: [
              { label: "Documentación", href: "/docs" },
              { label: "FAQ", href: "/faq" },
              { label: "Contacto", href: "mailto:help@empresa.com", external: true }
            ]
          },
          {
            title: "Síguenos",
            content: (
              <div style={{display: 'flex', gap: '10px'}}>
                <a href="https://twitter.com/empresa" target="_blank" rel="noopener noreferrer">🐦</a>
                <a href="https://github.com/empresa" target="_blank" rel="noopener noreferrer">🐙</a>
                <a href="https://linkedin.com/company/empresa" target="_blank" rel="noopener noreferrer">💼</a>
              </div>
            )
          }
        ]}
        copyrightNode={
          <div>
            © {new Date().getFullYear()} <strong>Mi Empresa</strong> | 
            <a href="/privacy" style={{marginLeft: '10px'}}>Privacidad</a> | 
            <a href="/terms" style={{marginLeft: '10px'}}>Términos</a>
          </div>
        }
        showDivider={true}
      >
        {/* Newsletter opcional */}
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <h4>📧 Suscríbete a nuestro newsletter</h4>
          <div style={{display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px'}}>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
            />
            <button style={{padding: '8px 16px', borderRadius: '4px', background: '#007bff', color: 'white', border: 'none'}}>
              Suscribirse
            </button>
          </div>
        </div>
      </Footer>
    </div>
  );
}

export default App;
```

---

## Changelog

### v2.0.0 (2025-11-21)
- 🔄 **BREAKING:** Rediseño completo de la API
- ✨ Sistema de secciones dinámicas con `FooterSection[]`
- ✨ Soporte para contenido mixto (enlaces + JSX personalizado)
- ✨ Prop `children` para contenido libre
- ✨ Copyright como texto o JSX (`copyrightText` | `copyrightNode`)
- ✨ Línea divisoria configurable (`showDivider`)
- ✨ Tres tamaños configurables (`small`, `medium`, `large`)
- ✨ Props `className` y `style` para personalización
- ✅ Enlaces externos automáticos con `rel="noopener noreferrer"`
- ✅ TypeScript completo con interfaces exportadas
- ✅ CSS Modules para encapsulación
- 🗑️ Removidas props obsoletas: `variant`, `companyName`, `year`, etc.
- 🗑️ Removida dependencia de React Router

### v1.0.0 (2025-11-06)
- ✨ Versión inicial del componente Footer
- ✅ Tres variantes (simple, extended, minimal)
- ✅ Soporte para enlaces internos y externos
- ✅ Integración con React Router
- ✅ Enlaces de redes sociales
- ✅ Colores personalizables
- ✅ Accesibilidad completa
- ✅ Responsive design