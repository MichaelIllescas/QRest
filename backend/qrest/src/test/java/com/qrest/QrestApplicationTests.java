package com.qrest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Prueba de humo para la aplicación Spring Boot.
 *
 * Propósito:
 * - Verificar que el contexto de Spring se carga sin excepciones.
 *
 * Contrato de la prueba:
 * - Entrada: ninguna (arranque de contexto por SpringBootTest).
 * - Salida: la prueba pasa cuando no ocurre ninguna excepción al iniciar el contexto.
 * - Modos de fallo: excepción al inicializar beans o configuración inválida.
 */
@SpringBootTest
class QrestApplicationTests {

    /**
     * Test vacío cuyo único propósito es arrancar el contexto de Spring.
     * Si el contexto no puede iniciarse, JUnit marcará esta prueba como fallida.
     */
    
    void contextLoads() {
    }

}