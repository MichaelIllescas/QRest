# UserMenu Component

Componente de menú desplegable para usuarios administrativos del sistema.

## Características

- **Menú desplegable**: Se abre/cierra al hacer click en el botón de usuario
- **Avatar personalizable**: Soporta imágenes o iniciales automáticas
- **Información del usuario**: Muestra nombre y email (opcional)
- **Opciones predefinidas**: Cambiar contraseña y cerrar sesión
- **Responsive**: Se adapta a pantallas móviles ocultando información detallada
- **Accesible**: Soporte completo para navegación con teclado

## Props

```typescript
interface UserMenuProps {
  userInfo?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  onChangePassword?: () => void;
  onLogout?: () => void;
}
```

## Uso

```tsx
import { UserMenu } from './UserMenu';

// Uso básico
<UserMenu />

// Con información del usuario y callbacks
<UserMenu
  userInfo={{
    name: "Juan Pérez",
    email: "juan@example.com",
    avatar: "/path/to/avatar.jpg"
  }}
  onChangePassword={() => console.log('Cambiar contraseña')}
  onLogout={() => console.log('Cerrar sesión')}
/>
```

## Comportamiento

- **Sin información de usuario**: Muestra "Administrador" como nombre por defecto y "AD" como iniciales
- **Con información de usuario**: Muestra el nombre proporcionado y las iniciales del nombre
- **Avatar**: Si se proporciona una URL de avatar, se usa; de lo contrario, muestra las iniciales
- **Responsive**: En móviles, solo muestra el avatar para ahorrar espacio
- **Click fuera**: El menú se cierra automáticamente al hacer click fuera de él

## Integración recomendada

Este componente está diseñado para integrarse con el NavBar usando la prop `children`:

```tsx
<NavBar>
  <UserMenu
    userInfo={currentUser}
    onChangePassword={handlePasswordChange}
    onLogout={handleLogout}
  />
</NavBar>
```