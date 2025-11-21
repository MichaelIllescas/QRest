import React from "react";
import styles from "./Container.module.css";

/**
 * Tamaños disponibles para el container
 * - sm: Small (576px)
 * - md: Medium (768px) 
 * - lg: Large (992px)
 * - xl: Extra Large (1200px)
 * - xxl: Extra Extra Large (1400px)
 */
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Props para el componente Container
 */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 
     * Si es true, el container ocupa el 100% del ancho disponible.
     * Por defecto es false (container con ancho máximo responsivo).
     */
    fluid?: boolean;
    
    /** 
     * Tamaño máximo del container. Solo aplica cuando fluid es false.
     * Define el breakpoint máximo hasta donde el container se expandirá.
     */
    size?: ContainerSize;
    
    /** Clase CSS adicional para personalizar el estilo */
    className?: string;
    
    /** Estilos inline personalizados */
    style?: React.CSSProperties;
    
    /** Contenido que se renderiza dentro del container */
    children?: React.ReactNode;
}

/**
 * Componente Container responsivo similar a Bootstrap
 * 
 * Este componente proporciona un contenedor centrado con ancho máximo responsivo,
 * ideal para estructurar el layout de páginas y secciones.
 * 
 * @example
 * ```tsx
 * // Container básico (ancho responsivo con máximo definido)
 * <Container>
 *   <h1>Mi contenido</h1>
 * </Container>
 * 
 * // Container fluido (ocupa todo el ancho disponible)
 * <Container fluid>
 *   <div>Contenido que ocupa todo el ancho</div>
 * </Container>
 * 
 * // Container con tamaño específico
 * <Container size="lg">
 *   <p>Container limitado a tamaño large (992px)</p>
 * </Container>
 * 
 * // Container con clases y estilos personalizados
 * <Container 
 *   className="mi-container-personalizado"
 *   style={{ backgroundColor: '#f5f5f5', padding: '20px' }}
 * >
 *   <div>Container estilizado</div>
 * </Container>
 * 
 * // Container con props de HTML nativas
 * <Container 
 *   id="main-container"
 *   role="main"
 *   onClick={handleClick}
 * >
 *   <main>Contenido principal</main>
 * </Container>
 * ```
 * 
 * @param props - Propiedades del componente Container
 * @returns Elemento div con las clases y estilos aplicados
 */
export function Container({
    fluid = false,
    size,
    className = "",
    style = {},
    children,
    ...props
}: ContainerProps): React.ReactElement {
    // Construir la clase del contenedor
    const containerClassName = `
        ${fluid ? styles['container-fluid'] : styles.container}
        ${size && !fluid ? styles[`container--${size}`] : ""}
        ${className}
    `.trim().replace(/\s+/g, " ");

    return (
        <div
            className={containerClassName}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}

export default Container;