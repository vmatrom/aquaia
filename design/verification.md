# Verificación · 16 septiembre 2026

## Funcional

- Build de producción correcto; cuatro pruebas automatizadas de descuentos correctas (porcentaje, importe fijo, normalización, inexistente, mínimo, caducidad, pausa, usos agotados y total no negativo).
- Browser/IAB: reserva individual completa con AQUA10, 85 EUR → 76,50 EUR; código inválido rechazado. Persistencia comprobada tras recargar.
- Browser/IAB: grupo de 18 asistentes, empresa y necesidades; se guarda solicitud de presupuesto sin cobro ni confirmación externa.
- Browser/IAB: crear EMPRESA15, pausar, consultar usos de AQUA10.
- Filtro Tabarca: dos resultados. Reserva y formulario comprobados a 390 × 844, sin desbordamiento horizontal.
- Mapa de producción: cartografía, rutas, modelo geométrico 3D de moto, recorrido y pausa; cambio de ruta y perspectiva 2D. Sin errores ni avisos en consola de producción durante la comprobación.
- Manifest servido con HTTP 200, display standalone y tres iconos. Service worker servido con HTTP 200. La instalación en un teléfono físico y la navegación offline no se han probado.
- Dockerfile preparado según la documentación de Coolify. No se ha ejecutado Docker localmente porque el equipo no tiene Docker disponible.

## Comparación visual

Inspección directa mediante view_image de conceptos y capturas finales de Browser/IAB. Desktop de catálogo 1435 × 1096; mapa 1504 × 1040; móvil 390 × 844. Capturas durables en esta carpeta.

1. Paleta: fondo carbón, superficies oscuras y acento amarillo lima conservados.
2. Composición: hero dividido, cuatro tarjetas y navegación reducida conservados; extensiones de grupos y promociones añadidas por petición del usuario.
3. Tipografía: Manrope, titulares pesados y controles consistentes; jerarquía revisada en desktop y móvil.
4. Imágenes: fotografías conceptuales independientes, correctamente cargadas. Se reemplazaron los huecos provisionales antes de publicar.
5. Contenedores: radios, bordes y ritmo de espaciado coherentes. En móvil las actividades pasan a dos columnas y el mapa a una.
6. Texto superior: titular, subtítulo y beneficios del concepto conservados. Se añade Mapa 3D y su CTA por petición expresa; gestión pasa al pie por prioridad de clientes.
7. Mapa: mismo patrón mapa grande + selector lateral. Se emplea geografía real y modelo procedural en lugar de una imagen decorativa; se omiten las etiquetas y afirmaciones no verificadas que generó el concepto.

Correcciones principales: worker MapLibre empaquetado explícitamente para Vite; profundidad de la capa Three.js; protección frente a fuente de ruta todavía no cargada en recargas de desarrollo; imágenes ausentes; fuentes limitadas al alfabeto latino.

La implementación conserva fielmente la dirección visual de los conceptos, con las extensiones solicitadas. No se afirma identidad píxel a píxel: marca vectorial, fotografías, copy de fichas y cartografía tienen las variaciones descritas. No quedan errores visuales de carga detectados en los flujos comprobados.
