# CARDBYTE DUNGEON // LIBROS DE COLECCIÓN & GRIMORIOS EN PDF

Este directorio almacena las ediciones canónicas completas de **Cardbyte Dungeon: Manual del Operador** maquetadas como **Grimorios Cyberpunk** optimizados para lectura digital en tablets, monitores y dispositivos móviles.

---

## VOLÚMENES DISPONIBLES

1. **Edición en Español:**
   - **Archivo:** [`Cardbyte_Dungeon_Grimoire_ES.pdf`](file:///home/josear/dev/cardbyte-dungeon/books/Cardbyte_Dungeon_Grimoire_ES.pdf)
   - **Páginas:** 88 páginas
   - **Formato:** A4 a color, Dark Mode (The Void Edition), tipografía literaria EB Garamond + JetBrains Mono, portadas vectoriales completas, 15 capítulos, ilustraciones de arte de campo integradas, cajas de terminal CRT, glosarios y tablas de combate.

2. **Edición en Inglés:**
   - **Archivo:** [`Cardbyte_Dungeon_Grimoire_EN.pdf`](file:///home/josear/dev/cardbyte-dungeon/books/Cardbyte_Dungeon_Grimoire_EN.pdf)
   - **Páginas:** 86 páginas
   - **Formato:** Espejo 1:1 canónico en inglés, con portadas vectoriales traducidas, esquemas tácticos y tablas sincronizadas.

---

## REGENERACIÓN DE LOS LIBROS

Para volver a generar los PDFs tras editar el contenido de `docs/`:

```bash
python3 scripts/book-generator/generate_grimoire.py es en
```

El script procesa automáticamente el Markdown, genera las portadas en SVG de resolución infinita, incrusta las figuras de arte de campo y compila los PDFs mediante el motor headless de Chrome con renderizado pixel-perfect.
