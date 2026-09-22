## Why

Cardbyte Dungeon cuenta con una profunda identidad cyberpunk, lore canónico y manuales de colección de más de 80 páginas, pero carece de un portal público de acceso web que sirva de vitrina, exponga los orígenes del proyecto (un experimento rápido acelerado con Inteligencia Artificial), distribuya los manuales canónicos en PDF y funcione como tarjeta de presentación profesional del autor (Arturo Herrera).

Esta iniciativa crea una Landing Page de alto impacto visual y rendimiento instantáneo como punto de entrada público, separando limpiamente la experiencia de descubrimiento del motor de juego a través de una arquitectura multi-página en Vite.

## What Changes

- **Arquitectura Multi-Página (MPA) en Vite**:
  - `index.html`: Nuevo portal de aterrizaje y vitrina pública (carga ligera instantánea).
  - `game.html`: Acceso al juego completo de Cardbyte Dungeon (`src/App.tsx`), manteniendo intacto el motor de combate, estado y renderizado.
  - Actualización de `vite.config.ts` con configuración `build.rollupOptions.input` para múltiples entradas.
- **Hero de Telemetría & Misterio**:
  - Monitor CRT con efecto scanlines, cursor parpadeante y efecto máquina de escribir (typewriter) con cita icónica inspirada en William Gibson.
  - Indicadores de telemetría diegética en tiempo real (`LATENCY`, `ICE_LEVEL`, `SYSTEM_ONLINE`).
  - Botón de llamada a la acción principal (`JACK IN / ENTRAR AL CIBERESPACIO`) que enlaza a `/game.html`.
- **Selector de Idioma Diegético (ROM Swapper)**:
  - Soporte bilingüe (Inglés por defecto, Español disponible).
  - Micro-interacción visual que simula la inyección/parcheo de un cartucho ROM de idioma.
- **Cartuchos ROM de Colección (Distribución de Manuales)**:
  - Tarjetas visuales de cartucho ROM para la edición en Español (85 páginas) y en Inglés (82 páginas).
  - Descargas directas de los PDFs configuradas mediante variables de entorno enlazadas a GitHub Releases.
- **Detrás del ICE (El Origen del Proyecto & Experimento IA)**:
  - Ruptura de la cuarta pared explicando la creación del juego en un fin de semana explorando el potencial de la IA generativa como copiloto de diseño, código, lore e ilustración.
- **Radiografía Técnica (Tech Stack Showcase)**:
  - Fichas técnicas detallando React 19, TypeScript, Zustand, Tailwind CSS v4, WebAudio diegético y el pipeline en Python de compilación de libros.
  - Énfasis en la ergonomía móvil y enfoque responsive diseñado desde la perspectiva de un Ingeniero Android.
- **Operator Identity (Tarjeta de Presentación Hacker / ID Badge)**:
  - Credencial digital de Arturo Herrera destacando 7+ años de experiencia como Senior Mobile Engineer (Android) y estudiante de Ingeniería en IA.
  - Enlaces directos a LinkedIn (`https://www.linkedin.com/in/arturo-herrera0792/`) y repositorio de GitHub.
- **Banda Sonora y Efectos de Audio Diegéticos**:
  - Audio ambiental procedimental sutil y elegante con WebAudio (estilo ambient/cyberpunk).
  - Controles de Mute/Unmute y beeps mecánicos sutiles en interacciones de la interfaz.

## Capabilities

### New Capabilities
- `landing-portal`: Especifica los requerimientos de la landing page pública, Hero CRT, selector ROM bilingüe, sistema de audio ambiental, descarga de artefactos, showcase técnico y tarjeta de operador.

### Modified Capabilities
<!-- None -->

## Impact

- **Build & Bundler**: `vite.config.ts` pasa a compilar múltiples entradas HTML (`index.html` y `game.html`).
- **Archivos Raíz**: El archivo `index.html` existente se convierte en `game.html`, y se crea un nuevo `index.html` específico para el portal público.
- **Nuevo Código de Frontend**: Nueva estructura bajo `src/landing/` con componentes React dedicados a la landing page, desacoplados del bundle del juego.
- **Dependencias**: No requiere dependencias externas nuevas; utiliza React, Lucide Icons, Tailwind CSS v4 y la API nativa de WebAudio.
