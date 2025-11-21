/**
 * Utilidad para controlar los bordes del layout de páginas
 * Permite cambiar fácilmente entre modos de desarrollo, producción y limpio
 */

export type LayoutMode = 'development' | 'production' | 'clean' | 'default';

/**
 * Cambia el modo de visualización de los bordes de layout
 * @param mode - Modo de bordes a aplicar
 */
export const setLayoutMode = (mode: LayoutMode) => {
  // Remover clases existentes
  document.body.classList.remove(
    'development-mode',
    'production-mode', 
    'clean-mode'
  );

  // Aplicar nueva clase según el modo
  switch (mode) {
    case 'development':
      document.body.classList.add('development-mode');
      console.log('🔧 Modo desarrollo: Bordes punteados azules/verdes activados');
      break;
    
    case 'production':
      document.body.classList.add('production-mode');
      console.log('🚀 Modo producción: Bordes sólidos sutiles activados');
      break;
    
    case 'clean':
      document.body.classList.add('clean-mode');
      console.log('✨ Modo limpio: Sin bordes activado');
      break;
    
    case 'default':
      // No agregar ninguna clase, usar estilos por defecto
      console.log('📋 Modo por defecto: Bordes punteados grises');
      break;
  }
};

/**
 * Obtiene el modo actual de layout
 * @returns El modo actual activo
 */
export const getCurrentLayoutMode = (): LayoutMode => {
  if (document.body.classList.contains('development-mode')) {
    return 'development';
  }
  if (document.body.classList.contains('production-mode')) {
    return 'production';
  }
  if (document.body.classList.contains('clean-mode')) {
    return 'clean';
  }
  return 'default';
};

/**
 * Toggle entre modo desarrollo y producción
 */
export const toggleDevelopmentMode = () => {
  const currentMode = getCurrentLayoutMode();
  const newMode = currentMode === 'development' ? 'production' : 'development';
  setLayoutMode(newMode);
};

/**
 * Atajos para modes comunes
 */
export const layoutModes = {
  /** Activar modo desarrollo - bordes azules/verdes */
  enableDevelopment: () => setLayoutMode('development'),
  
  /** Activar modo producción - bordes sutiles */
  enableProduction: () => setLayoutMode('production'),
  
  /** Activar modo limpio - sin bordes */
  enableClean: () => setLayoutMode('clean'),
  
  /** Resetear a modo por defecto */
  reset: () => setLayoutMode('default'),
  
  /** Toggle desarrollo/producción */
  toggle: toggleDevelopmentMode
};

// Exportar para uso en consola del navegador
if (typeof window !== 'undefined') {
  (window as Window & typeof globalThis & {
    layoutModes: typeof layoutModes;
    setLayoutMode: typeof setLayoutMode;
  }).layoutModes = layoutModes;
  
  (window as Window & typeof globalThis & {
    layoutModes: typeof layoutModes;
    setLayoutMode: typeof setLayoutMode;
  }).setLayoutMode = setLayoutMode;
}

/**
 * Ejemplo de uso:
 * 
 * // En cualquier componente
 * import { setLayoutMode, layoutModes } from '../shared/utils/layoutModes';
 * 
 * // Cambiar a modo producción
 * setLayoutMode('production');
 * 
 * // O usar atajos
 * layoutModes.enableProduction();
 * layoutModes.enableClean();
 * 
 * // En consola del navegador
 * layoutModes.toggle(); // Alternar desarrollo/producción
 * setLayoutMode('clean'); // Quitar todos los bordes
 */