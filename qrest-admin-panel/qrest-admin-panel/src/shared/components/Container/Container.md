# 📦 Container Component

Componente contenedor responsivo basado en el sistema de grillas de Bootstrap, diseñado para proporcionar una estructura consistente y responsiva a las páginas y secciones de la aplicación.

## 📝 Descripción
Este componente proporciona un contenedor responsivo con anchos máximos predefinidos en diferentes breakpoints. Es ideal para crear layouts centrados y responsivos que se adaptan automáticamente al tamaño de la pantalla.

**Características principales:**
- **Responsivo**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Centrado**: El contenido se centra horizontalmente en la página
- **Flexible**: Permite configuración fluida o con ancho máximo
- **Tipado**: Completamente tipado con TypeScript
- **Extensible**: Acepta todas las props nativas de un elemento `div`

## 🚀 Importación
```tsx
import { Container } from '@/shared/components/Container';
// o
import Container from '@/shared/components/Container';
```

## 📋 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `fluid` | `boolean` | `false` | Si es true, el container ocupa el 100% del ancho disponible |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | `undefined` | Tamaño máximo del container (solo cuando fluid es false) |
| `className` | `string` | `""` | Clases CSS adicionales |
| `style` | `React.CSSProperties` | `{}` | Estilos inline personalizados |
| `children` | `React.ReactNode` | `undefined` | Contenido del container |
| `...props` | `HTMLAttributes<HTMLDivElement>` | - | Cualquier prop nativa de div (id, onClick, etc.) |
## 📏 Tamaños de Breakpoints

| Tamaño | Ancho Máximo | Uso Recomendado |
|--------|--------------|-----------------|
| `sm` | 576px | Contenido compacto, formularios simples |
| `md` | 768px | Contenido de artículos, tarjetas |
| `lg` | 992px | Dashboards, contenido principal |
| `xl` | 1200px | Páginas principales, layouts amplios |
| `xxl` | 1400px | Contenido extra amplio, pantallas grandes |

## 💡 Ejemplos de Uso

### 1. Container Básico (Responsivo)
```tsx
<Container>
  <h1>Mi Aplicación QRest</h1>
  <p>Este container se adapta automáticamente al tamaño de pantalla.</p>
</Container>
```

### 2. Container Fluido (Ancho Completo)
```tsx
<Container fluid>
  <div className="hero-section">
    <img src="/banner.jpg" alt="Banner" style={{ width: '100%' }} />
    <h1>Bienvenido a QRest</h1>
  </div>
</Container>
```

### 3. Container con Tamaño Específico
```tsx
<Container size="lg">
  <div className="dashboard">
    <h2>Panel de Administración</h2>
    <div className="stats-grid">
      {/* Estadísticas */}
    </div>
  </div>
</Container>
```

### 4. Container Personalizado
```tsx
<Container 
  className="bg-light rounded shadow"
  style={{ marginTop: '2rem', padding: '2rem' }}
  id="main-content"
  role="main"
>
  <h1>Contenido Principal</h1>
  <p>Container con estilos y props personalizados</p>
</Container>
```

### 5. Anidamiento de Containers
```tsx
function Layout() {
  return (
    <>
      {/* Header con fondo completo */}
      <Container fluid className="bg-primary text-white">
        <Container>
          <nav className="py-3">
            <h1>QRest Admin</h1>
            <NavMenu />
          </nav>
        </Container>
      </Container>
      
      {/* Contenido principal limitado */}
      <Container className="py-4">
        <main>
          <Dashboard />
        </main>
      </Container>
      
      {/* Footer con fondo completo */}
      <Container fluid className="bg-dark text-light">
        <Container>
          <footer className="py-4">
            <p>&copy; 2025 QRest. Todos los derechos reservados.</p>
          </footer>
        </Container>
      </Container>
    </>
  );
}
```

## 🎯 Casos de Uso Específicos para QRest

### Dashboard Principal
```tsx
<Container size="xl">
  <div className="dashboard-header">
    <h1>Panel de Administración</h1>
    <UserMenu />
  </div>
  <div className="dashboard-content">
    <StatsCards />
    <OrdersTable />
  </div>
</Container>
```

### Página de Productos
```tsx
<Container>
  <div className="products-page">
    <ProductFilters />
    <ProductGrid />
    <Pagination />
  </div>
</Container>
```

### Formulario de Configuración
```tsx
<Container size="md">
  <form className="settings-form">
    <h2>Configuración del Restaurante</h2>
    <SettingsFields />
    <SaveButton />
  </form>
</Container>
```

### Página de Reportes
```tsx
<Container fluid>
  <div className="reports-layout">
    <aside className="sidebar">
      <ReportFilters />
    </aside>
    <main className="report-content">
      <Container>
        <ReportCharts />
      </Container>
    </main>
  </div>
</Container>
```

## 📚 Mejores Prácticas

### ✅ Recomendaciones

1. **Usa `fluid` para elementos de diseño completos**
   ```tsx
   // ✅ Correcto para headers/footers
   <Container fluid className="header-bg">
     <Container>
       <Navigation />
     </Container>
   </Container>
   ```

2. **Combina con elementos semánticos**
   ```tsx
   // ✅ Buena práctica para accesibilidad
   <Container role="main">
     <main>
       <Content />
     </main>
   </Container>
   ```

3. **Usa tamaños específicos para contenido controlado**
   ```tsx
   // ✅ Para formularios y contenido legible
   <Container size="md">
     <LoginForm />
   </Container>
   ```

### ❌ Evitar

1. **No anidar containers del mismo tipo innecesariamente**
   ```tsx
   // ❌ Evitar
   <Container>
     <Container>
       <Content />
     </Container>
   </Container>
   ```

2. **No usar fluid cuando necesites control de ancho**
   ```tsx
   // ❌ Evitar para contenido de lectura
   <Container fluid>
     <article>Texto muy largo que será difícil de leer</article>
   </Container>
   ```

3. **No omitir el tamaño en containers específicos**
   ```tsx
   // ❌ Poco claro
   <Container>
     <WideDataTable />
   </Container>
   
   // ✅ Mejor
   <Container size="xl">
     <WideDataTable />
   </Container>
   ```

## 🔧 Integración con CSS

El componente utiliza CSS Modules. Las clases disponibles son:

- `.container` - Container responsivo estándar
- `.container-fluid` - Container de ancho completo
- `.container--sm` - Container limitado a tamaño small
- `.container--md` - Container limitado a tamaño medium
- `.container--lg` - Container limitado a tamaño large
- `.container--xl` - Container limitado a tamaño extra large
- `.container--xxl` - Container limitado a tamaño extra extra large

## 🚨 Troubleshooting

### Problema: El container no se ve centrado
**Solución**: Verifica que el CSS Module esté correctamente importado y que no haya conflictos con otros estilos globales.

### Problema: El contenido no respeta el tamaño especificado
**Solución**: Asegúrate de que `fluid` sea `false` cuando uses la prop `size`.

### Problema: TypeScript muestra errores de tipo
**Solución**: Verifica que estés importando el componente correctamente desde el index.ts y que las props sean del tipo correcto.

## ⚡ Performance

- **Liviano**: El componente no tiene dependencias externas
- **Optimizado**: Utiliza CSS Modules para estilos eficientes
- **SSR Ready**: Compatible con renderizado del lado del servidor
- **Tree Shaking**: Importaciones optimizadas

## 🔗 Compatibilidad

- ✅ React 18+
- ✅ TypeScript 4.9+
- ✅ CSS Modules
- ✅ Vite/Webpack
- ✅ Electron (QRest Admin Panel)
- ✅ Todos los navegadores modernos
```

### Container fluid
```jsx
<Container fluid>
  <h1>Container de ancho completo</h1>
  <p>Este container siempre ocupa el 100% del ancho disponible.</p>
</Container>
```

### Container con tamaño específico
```jsx
<Container size="md">
  <h1>Container mediano</h1>
  <p>Este container tiene un max-width de 720px sin importar el breakpoint.</p>
</Container>
```

### Container anidados
```jsx
<Container fluid style={{ backgroundColor: '#f5f5f5' }}>
  <Container>
    <h1>Container centrado dentro de uno fluid</h1>
    <p>Patrón común para secciones con fondo completo y contenido centrado.</p>
  </Container>
</Container>
```

### Container con clase personalizada
```jsx
<Container className="my-custom-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
  <h1>Container personalizado</h1>
  <p>Con estilos adicionales aplicados.</p>
</Container>
```

## 🎨 Tamaños disponibles

| Size | Max Width | Uso recomendado |
|------|-----------|-----------------|
| `sm` | 540px | Contenido estrecho, formularios simples |
| `md` | 720px | Artículos, contenido de lectura |
| `lg` | 960px | Contenido general, layouts medianos |
| `xl` | 1140px | Dashboards, contenido amplio |
| `xxl` | 1320px | Layouts grandes, pantallas ultra anchas |

## 🎯 Casos de uso comunes

### Layout de página completo
```jsx
function App() {
  return (
    <>
      <header style={{ backgroundColor: '#333', color: 'white' }}>
        <Container>
          <h1>Mi Sitio Web</h1>
        </Container>
      </header>
      
      <main>
        <Container>
          <h2>Contenido principal</h2>
          <p>Todo el contenido está correctamente centrado y responsivo.</p>
        </Container>
      </main>
      
      <footer style={{ backgroundColor: '#f5f5f5' }}>
        <Container>
          <p>© 2025 Mi Sitio Web</p>
        </Container>
      </footer>
    </>
  );
}
```

### Sección hero con fondo completo
```jsx
<div style={{ backgroundColor: '#007bff', color: 'white', padding: '4rem 0' }}>
  <Container>
    <h1>Bienvenido a nuestra aplicación</h1>
    <p>Contenido centrado con fondo de ancho completo</p>
  </Container>
</div>
```

### Grid responsivo dentro de container
```jsx
import { Container } from "./components/Container/Container";
import { Grid } from "./components/Grid/Grid";

<Container>
  <Grid columns={3} gap="large" responsive>
    <div>Tarjeta 1</div>
    <div>Tarjeta 2</div>
    <div>Tarjeta 3</div>
  </Grid>
</Container>
```

## ⚙️ Breakpoints

El componente utiliza los siguientes breakpoints (similares a Bootstrap 5):

- **xs**: < 576px (extra pequeño)
- **sm**: ≥ 576px (pequeño)
- **md**: ≥ 768px (mediano)
- **lg**: ≥ 992px (grande)
- **xl**: ≥ 1200px (extra grande)
- **xxl**: ≥ 1400px (extra extra grande)

## 📱 Responsividad

El componente es totalmente responsivo y ajusta automáticamente:
- **Padding horizontal**: 15px en pantallas normales, 12px en móviles
- **Max-width**: Se adapta según los breakpoints definidos
- **Centrado**: Siempre centrado con margin auto

## 🎨 Personalización

Puedes personalizar el container de varias formas:

```jsx
// Con estilos inline
<Container style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
  Contenido
</Container>

// Con clases personalizadas
<Container className="mi-container-custom">
  Contenido
</Container>

// Combinando props
<Container fluid size="xl" className="hero-section">
  Contenido
</Container>
```

## ✨ Buenas prácticas

1. **Usa container normal** para la mayoría de los layouts de contenido
2. **Usa container fluid** para secciones que necesiten ancho completo con padding
3. **Combina con Grid** para crear layouts complejos y responsivos
4. **Usa size específicos** cuando necesites un ancho fijo independiente del breakpoint
5. **Anida containers** cuando necesites fondos de ancho completo con contenido centrado

## 🔗 Componentes relacionados

- **Grid**: Para crear layouts de columnas dentro del container
- **Sidebar**: Puede usarse junto con container para layouts de aplicación
- **NavBar**: Típicamente incluye un container interno para centrar el contenido
