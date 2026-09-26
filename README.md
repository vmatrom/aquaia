# AQUA · Water Sports Santa Pola

PWA para clientes, con catálogo, reservas individuales, solicitudes para grupos y empresas, mapa geográfico con modelo 3D de moto y códigos promocionales. React + Vite + MapLibre + Three.js.

## Ejecutar

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Node.js 22. Las fotografías ilustrativas están en `public/assets`. Fuentes locales. La PWA cachea interfaz y assets; el mapa satelital requiere conexión a Esri. No se descargan mapas para uso sin conexión.

## Estado funcional

Primera versión de demostración: reservas, solicitudes y códigos se guardan en localStorage del navegador. No se envían al operador ni se cobra. La administración de códigos es pública y local; no sustituye un servidor con autenticación. La disponibilidad, los horarios, el precio final y el punto de encuentro no están conectados al sistema del negocio. Los datos guardados en localhost no se transfieren al dominio desplegado.

- Particulares: 12 experiencias de jet ski, barcos, veleros, parasailing, snorkel e hinchables; fecha, franja orientativa, participantes o unidades, datos, resumen y código.
- Grupos / empresas: asistentes, empresa y necesidades; solicitud de presupuesto sin precio cerrado.
- Promociones: porcentaje o euros, importe mínimo, caducidad inclusiva en Europe/Madrid, límite de usos, activación y pausa. No acumulables. Cancelar un plan no devuelve usos. Ejemplos de demo: AQUA10 y TABARCA20.
- Mapa: puntos aproximados, rutas orientativas, vista 2D/3D, zoom, centrado y moto ampliada con recorrido animado. No sirve para navegación marítima ni determina recorridos autorizados.

## Desplegar en Coolify

1. Crear una aplicación desde este repositorio y la rama `main`.
2. Build pack: **Dockerfile**, ruta `/Dockerfile`, directorio base `/`.
3. Puerto interno: **80**. Healthcheck integrado: `GET /health`.
4. Configurar dominio HTTPS y desplegar. No hacen falta variables secretas para esta demo.
5. Verificar catálogo, mapa, reserva, manifest y service worker desde el dominio.

El Dockerfile ejecuta pruebas y build, y sirve archivos estáticos con Nginx. Coolify administra HTTPS y el proxy. Referencia: https://coolify.io/docs/applications/builds/dockerfile

## GitHub Pages

La rama `main` también se publica automáticamente en https://vmatrom.github.io/aquaia/ mediante GitHub Actions. El build usa `/aquaia/` como ruta base sin cambiar la configuración de Coolify.

## Antes de aceptar reservas reales

Conectar inventario y franjas horarias del operador, backend con validación de precios y promociones, transacciones para aforo y usos de códigos, autenticación administrativa, pagos y confirmaciones. Validar tarifas, puntos de salida, recorridos y condiciones comerciales con el operador. AQUA es una marca de trabajo.

## Fuentes

- https://watersportsantapola.com/ y sus fichas de reserva: servicios, condiciones y tarifas de referencia observados el 17-09-2026.
- https://maplibre.org/maplibre-gl-js/docs/examples/add-a-3d-model-using-threejs/
