# CARDBYTE DUNGEON // LIBROS DE COLECCIÓN & GRIMORIOS EN PDF

Este directorio almacena las ediciones canónicas completas de **Cardbyte Dungeon: Manual del Operador** maquetadas como **Grimorios Cyberpunk** optimizados para lectura digital en tablets, monitores y dispositivos móviles.

---

## VOLÚMENES DISPONIBLES

1. **Edición en Español:**
   - **Archivo:** [`Cardbyte_Dungeon_Grimoire_ES.pdf`](file:///home/josear/dev/cardbyte-dungeon/books/Cardbyte_Dungeon_Grimoire_ES.pdf)
   - **Páginas:** 85 páginas
   - **Formato:** Tamaño Carta (US Letter 8.5" × 11" / 612 × 792 pt), Dark Mode (The Void Edition), portadillas de volumen dedicadas a página completa, paginado diegético CSS Paged Media (`PÁG. [ X / 85 ]`), tipografía literaria EB Garamond + JetBrains Mono, portadas vectoriales completas, 15 capítulos, ilustraciones de arte de campo integradas, cajas de terminal CRT, glosarios y tablas de combate.

2. **Edición en Inglés:**
   - **Archivo:** [`Cardbyte_Dungeon_Grimoire_EN.pdf`](file:///home/josear/dev/cardbyte-dungeon/books/Cardbyte_Dungeon_Grimoire_EN.pdf)
   - **Páginas:** 82 páginas
   - **Formato:** Espejo canónico 1:1 en inglés en Tamaño Carta (US Letter), portadillas de volumen a página completa, paginado diegético (`PAGE [ X / 82 ]`), esquemas tácticos y tablas sincronizadas.

---

## REGENERACIÓN DE LOS LIBROS

Para volver a generar los PDFs tras editar el contenido de `docs/`:

```bash
python3 scripts/book-generator/generate_grimoire.py es en
```

El script procesa automáticamente el Markdown, genera las portadas en SVG de resolución infinita, incrusta las figuras de arte de campo y compila los PDFs mediante el motor headless de Chrome con renderizado pixel-perfect.
