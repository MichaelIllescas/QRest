# 📊 Componente Table — Tabla Avanzada para React (TSX + TypeScript)

El componente **Table** es una tabla avanzada, completamente tipada y altamente configurable para aplicaciones React.  
Incluye búsqueda en tiempo real, paginación con puntos suspensivos, ordenamiento dinámico, acciones por fila, renderizado personalizado, variantes visuales y modos funcionales.

---

# ✨ Características principales

- 🔍 **Búsqueda en tiempo real** en todas las columnas visibles  
- ↕ **Ordenamiento ascendente/descendente** por columna  
- 📄 **Paginación avanzada** con puntos suspensivos + botones “Anterior/Siguiente”  
- 🧩 **Acciones personalizadas por fila**  
- 🎨 **Renderizado de celdas totalmente personalizable** mediante `render`  
- 💪 **Tipado fuerte con genéricos `<T>`**  
- 🎛 **Modos funcionales:** `full`, `simple`, `minimal`  
- 🎨 **Variantes visuales:** `default`, `bordered`, `striped`, `compact`  
- 📱 **Totalmente responsiva**  
- ⚡ Optimizada con `useMemo` para evitar renderizados innecesarios  

---

# 📦 Importación

```tsx
import { Table } from "./components/Table/Table";
import type { TableColumn } from "./components/Table/table.types";
```

---

# 🧠 Descripción general

`Table<T>` es un componente genérico que se adapta automáticamente al tipo de datos que recibe.  
Esto habilita:

- Autocompletado en todas las props  
- Validación estricta de tipos  
- Menos errores en tiempo de desarrollo  
- Mayor claridad al definir columnas  

---

# 🚀 Ejemplo básico de uso

```tsx
import { Table } from "./components/Table/Table";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
];

const data: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com" },
  { id: 2, name: "María García", email: "maria@example.com" },
  { id: 3, name: "Carlos López", email: "carlos@example.com" },
];

export function App() {
  return (
    <Table<User>
      data={data}
      columns={columns}
      title="Lista de Usuarios"
      itemsPerPage={10}
    />
  );
}
```

---

# 📋 Props

| Prop | Tipo | Default | Descripción |
|------|-------|---------|-------------|
| **data** | `T[]` | `[]` | Lista de objetos a renderizar |
| **columns** | `TableColumn<T>[]` | `[]` | Configuración de columnas |
| **actions** | `(row: T) => ReactNode` | `undefined` | Acciones por cada fila |
| **itemsPerPage** | `number` | `10` | Elementos por página |
| **title** | `string` | `undefined` | Título mostrado arriba |
| **children** | `ReactNode` | `undefined` | Elementos adicionales en el header |
| **searchable** | `boolean` | `true` | Habilitar/deshabilitar búsqueda |
| **sortable** | `boolean` | `true` | Habilitar/deshabilitar ordenamiento |
| **variant** | `"default" | "bordered" | "striped" | "compact"` | `"default"` | Estilo visual |
| **mode** | `"full" | "simple" | "minimal"` | `"full"` | Nivel de funcionalidad |

---

# 🧱 Estructura de columnas (`TableColumn<T>`)

```ts
interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}
```

---

# 🎨 Variantes visuales

### ✔ `default`
Estilo limpio y moderno.

### ✔ `bordered`
Agrega bordes a todas las celdas.

### ✔ `striped`
Filas alternadas en gris claro.

### ✔ `compact`
Reduce tamaños y paddings.

Ejemplo:

```tsx
<Table
  data={data}
  columns={columns}
  variant="striped"
/>
```

---

# 🧭 Modos funcionales

| Modo | Funcionalidad |
|------|---------------|
| **full** | Todo activo: búsqueda, ordenamiento, paginación |
| **simple** | Tabla + paginación (sin búsqueda ni ordenamiento) |
| **minimal** | Solo la tabla |

Ejemplo:

```tsx
<Table
  data={data}
  columns={columns}
  mode="simple"
  variant="compact"
/>
```

---

# 💡 Ejemplos completos

---

## ✔ Tabla con acciones por fila

```tsx
<Table
  data={products}
  title="Inventario"
  columns={[
    { key: "id", label: "ID" },
    { key: "name", label: "Producto" },
    { key: "price", label: "Precio" },
  ]}
  actions={(row) => (
    <>
      <button onClick={() => editProduct(row)}>Editar</button>
      <button onClick={() => deleteProduct(row)}>Eliminar</button>
    </>
  )}
/>
```

---

## ✔ Renderizado personalizado

```tsx
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  {
    key: "status",
    label: "Estado",
    render: (value) => (
      <span style={{ 
        color: value === "activo" ? "green" : "red",
        fontWeight: "bold"
      }}>
        {value.toUpperCase()}
      </span>
    )
  }
];
```

---

## ✔ Children en el header

```tsx
<Table
  data={users}
  columns={columns}
  title="Gestión de Usuarios"
>
  <button onClick={addUser}>+ Nuevo Usuario</button>
  <button onClick={exportUsers}>Exportar CSV</button>
</Table>
```

---

## ✔ Tabla sin búsqueda ni ordenamiento

```tsx
<Table
  data={logs}
  searchable={false}
  sortable={false}
  itemsPerPage={20}
  columns={[
    { key: "timestamp", label: "Fecha/Hora" },
    { key: "action", label: "Acción" },
    { key: "user", label: "Usuario" },
  ]}
/>
```

---

# 📱 Diseño responsivo

- En celulares, el contenedor usa `overflow-x: auto`
- Mantiene integridad del diseño sin romper el layout
- Soporta columnas largas o muchas columnas

---

# 🎯 Casos de uso recomendados

- Paneles administrativos
- Inventarios
- Gestión de usuarios
- Listado de pedidos
- Auditorías
- Reportes y dashboards
- Cualquier CRUD con tablas

---

# 🧠 Buenas prácticas

✔ Tipar `<T>` siempre  
✔ Usar `render` para valores complejos  
✔ Evitar funciones pesadas inline en `actions`  
✔ Para tablas grandes, usar `variant="compact"`  
✔ `mode="minimal"` para dashboards o métricas  

---

# 🏁 Conclusión

El componente **Table** es una herramienta completa, potente y profesional para construir interfaces administrativas o sistemas que manejen listados complejos con búsquedas, ordenamiento y acciones.

