#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CARDBYTE DUNGEON // CYBERPUNK GRIMOIRE GENERATOR (SCREEN-OPTIMIZED PDF)
Converts canonical markdown operator manuals into monolithic cyberpunk grimoire ebooks.
"""

import os
import re
import html
import subprocess
import sys

def convert_md_to_html(md_text, lang='es'):
    # Normalize newlines
    md_text = md_text.replace('\r\n', '\n')

    # Convert Table of Contents to stylized two-column grimoire index
    lines = md_text.split('\n')
    out_lines = []
    in_toc = False
    for line in lines:
        if '## TABLA DE CONTENIDOS' in line or '## TABLE OF CONTENTS' in line:
            in_toc = True
            out_lines.append('<div class="toc-wrapper"><h2 class="toc-header">// REGISTRO DE SECTORES // ÍNDICE CANÓNICO</h2><div class="toc-container">')
            continue
        if in_toc:
            if line.strip() == '---':
                in_toc = False
                out_lines.append('</div></div>')
                out_lines.append('<div class="cyber-divider"><span>0xDEADBEEF // MEMORY_BREAK</span></div>')
                continue
            vol_match = re.match(r'^\s*-\s+\*\*(.*?)\*\*', line)
            if vol_match:
                vol_title = vol_match.group(1)
                out_lines.append(f'<div class="toc-volume-header">{vol_title}</div>')
                continue
            item_match = re.match(r'^\s*-\s+\[(.*?)\]\((.*?)\)', line)
            if item_match:
                title = item_match.group(1)
                link = item_match.group(2)
                out_lines.append(f'<div class="toc-item"><a href="{link}" class="toc-link"><span class="toc-bullet">&gt;</span> {title}</a></div>')
                continue
        out_lines.append(line)
    md_text = '\n'.join(out_lines)

    # Convert embedded image figures to responsive cyberpunk art frames
    def parse_image_figures(match):
        alt_text = match.group(1)
        src = match.group(2)
        # Convert relative path to absolute file URL so headless chrome loads it without origin issues
        if src.startswith('../public/'):
            abs_src = "/home/josear/dev/cardbyte-dungeon/" + src.replace('../', '')
        elif src.startswith('public/'):
            abs_src = "/home/josear/dev/cardbyte-dungeon/" + src
        else:
            abs_src = src

        return f'''
        <figure class="cyber-figure-frame">
          <div class="figure-scan-border">
            <img src="file://{abs_src}" alt="{alt_text}" class="figure-img" />
          </div>
          <figcaption class="figure-caption"><span class="fig-accent">[OPTICAL_SENSOR]</span> {alt_text}</figcaption>
        </figure>
        '''

    md_text = re.sub(r'!\[(.*?)\]\((.*?)\)', parse_image_figures, md_text)

    # Protect code blocks
    code_blocks = []
    def save_code_block(match):
        code = match.group(2)
        idx = len(code_blocks)
        code_blocks.append(code)
        return f"<!--PRE_CODE_BLOCK_{idx}-->"

    md_text = re.sub(r'```(\w*)\n(.*?)```', save_code_block, md_text, flags=re.DOTALL)

    # Convert horizontal rules
    md_text = re.sub(r'^---+$', '<div class="cyber-divider"><span>0xDEADBEEF // MEMORY_BREAK</span></div>', md_text, flags=re.MULTILINE)

    # Convert blockquotes
    def parse_blockquote(match):
        content = match.group(1)
        lines = [re.sub(r'^>\s?', '', l) for l in content.split('\n')]
        inner = '\n'.join(lines)
        return f'<blockquote class="operator-dossier"><div class="dossier-tag">TRANSMISIÓN MARGINAL // JOCKEY-09</div><div class="dossier-content">{inner}</div></blockquote>'

    md_text = re.sub(r'((?:^>[^\n]*\n?)+)', parse_blockquote, md_text, flags=re.MULTILINE)

    # Markdown Tables
    def parse_table(match):
        table_str = match.group(0).strip()
        lines = [l.strip() for l in table_str.split('\n') if l.strip()]
        if len(lines) < 2:
            return table_str
        
        header_cells = [c.strip() for c in lines[0].strip('|').split('|')]
        rows = []
        for line in lines[2:]:
            cells = [c.strip() for c in line.strip('|').split('|')]
            rows.append(cells)
        
        th_html = "".join([f"<th>{html.escape(c)}</th>" for c in header_cells])
        tr_html_list = []
        for r in rows:
            tds = "".join([f"<td>{c}</td>" for c in r])
            tr_html_list.append(f"<tr>{tds}</tr>")
        tbody_html = "".join(tr_html_list)
        return f'<div class="table-container"><table class="matrix-table"><thead><tr>{th_html}</tr></thead><tbody>{tbody_html}</tbody></table></div>'

    table_pattern = re.compile(r'(?:(?:^\|[^\n]+\|\r?\n){2,}(?:^\|[^\n]+\|\r?\n?)+)', re.MULTILINE)
    md_text = table_pattern.sub(parse_table, md_text)

    # Headers with page-break attributes for chapters
    def format_h1(match):
        title = match.group(1).strip()
        return f'<div class="chapter-start"><div class="chapter-kicker">SECTOR-09 // TERMINAL ARCHIVE</div><h1 class="grimoire-h1">{title}</h1></div>'

    def format_h2(match):
        title = match.group(1).strip()
        if "CAPÍTULO" in title.upper() or "CHAPTER" in title.upper():
            return f'<div class="chapter-break"></div><div class="chapter-header"><div class="chapter-num-badge">SECTOR PROTOCOL</div><h2 class="grimoire-chapter-h2">{title}</h2></div>'
        return f'<h2 class="grimoire-h2">{title}</h2>'

    def format_h3(match):
        title = match.group(1).strip()
        return f'<h3 class="grimoire-h3">{title}</h3>'

    md_text = re.sub(r'^# (.*?)$', format_h1, md_text, flags=re.MULTILINE)
    md_text = re.sub(r'^## (.*?)$', format_h2, md_text, flags=re.MULTILINE)
    md_text = re.sub(r'^### (.*?)$', format_h3, md_text, flags=re.MULTILINE)

    # Bold and Italic
    md_text = re.sub(r'\*\*\*(.*?)\*\*\*', r'<strong><em>\1</em></strong>', md_text)
    md_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', md_text)
    md_text = re.sub(r'\*(.*?)\*', r'<em>\1</em>', md_text)
    md_text = re.sub(r'`([^`]+)`', r'<code class="inline-chip">\1</code>', md_text)

    # LaTeX-style math formatting cleanup
    md_text = re.sub(r'\$([^\$]+)\$', r'<span class="math-inline">\1</span>', md_text)

    # Unordered Lists
    def format_list(match):
        items = match.group(0).strip().split('\n')
        lis = []
        for it in items:
            cleaned = re.sub(r'^\s*[-*]\s+', '', it)
            lis.append(f'<li>{cleaned}</li>')
        return f'<ul class="grimoire-list">{"".join(lis)}</ul>'

    md_text = re.sub(r'((?:^\s*[-*]\s+[^\n]+\n?)+)', format_list, md_text, flags=re.MULTILINE)

    # Paragraphs
    paragraphs = md_text.split('\n\n')
    processed_paragraphs = []
    for p in paragraphs:
        p_clean = p.strip()
        if not p_clean:
            continue
        if p_clean.startswith('<div') or p_clean.startswith('<blockquote') or p_clean.startswith('<ul') or p_clean.startswith('<table') or p_clean.startswith('<figure') or p_clean.startswith('<!--'):
            processed_paragraphs.append(p_clean)
        else:
            processed_paragraphs.append(f'<p class="grimoire-p">{p_clean}</p>')

    final_body = '\n\n'.join(processed_paragraphs)

    # Restore code blocks into styled ASCII terminal boxes
    for idx, code in enumerate(code_blocks):
        escaped_code = html.escape(code.strip())
        ascii_box = f'''
        <div class="ascii-terminal-frame">
          <div class="terminal-bar">
            <div class="term-dots"><span class="dot d-red"></span><span class="dot d-amber"></span><span class="dot d-green"></span></div>
            <div class="term-title">CRT_FRAME // VECT_BUFFER // 60Hz</div>
            <div class="term-tag">0x1842_TRACE</div>
          </div>
          <pre class="ascii-pre"><code>{escaped_code}</code></pre>
        </div>
        '''
        final_body = final_body.replace(f"<!--PRE_CODE_BLOCK_{idx}-->", ascii_box)

    return final_body


def get_front_cover_svg(lang='es'):
    title_sub = "Grimorio de la Matriz • Códice de Combate" if lang == 'es' else "Matrix Grimoire • Combat Codex"
    title_manual = "Manual del Operador" if lang == 'es' else "Operator's Manual"
    warning = "SHOCK HÁPTICO: ACTIVADO" if lang == 'es' else "FLESH HP: SYNCHRONIZED"
    quote = '"El código no perdona la ignorancia de la pila. Para cruzar el sector 0xFFFF, debes quemar tu carne antes de que el buffer devore tu alma."' if lang == 'es' else '"The code forgives no ignorance of the stack. To pierce sector 0xFFFF, burn your flesh before the buffer devours your mind."'
    archive_text = "EDICIÓN CRIPTOGRÁFICA DEFINITIVA" if lang == 'es' else "DEFINITIVE CRYPTOGRAPHIC EDITION"

    return f'''
    <div class="book-cover-page front-cover">
      <div class="grid-overlay"></div>
      <div class="scanlines"></div>
      <div class="vignette"></div>

      <div class="corner-mark top-left"></div>
      <div class="corner-mark top-right"></div>
      <div class="corner-mark bottom-left"></div>
      <div class="corner-mark bottom-right"></div>

      <div class="header-meta">
        <div>
          <span class="header-tag">SYS-ID:</span> CBD-1984-LORE<br>
          <span>CLASSIFICATION: PROTOCOL OMEGA</span>
        </div>
        <div class="danger-pill">{warning}</div>
      </div>

      <div class="title-group">
        <div class="sub-kicker">{title_sub}</div>
        <h1 class="main-title">Cardbyte<br>Dungeon</h1>
        <div class="sub-title">{title_manual}</div>
      </div>

      <div class="sigil-wrap">
        <svg class="sigil-svg" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="185" stroke="#00ff66" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.4"/>
          <circle cx="200" cy="200" r="170" stroke="#00f0ff" stroke-width="1" opacity="0.6"/>
          <circle cx="200" cy="200" r="145" stroke="#00ff66" stroke-width="0.8" stroke-dasharray="2 8" opacity="0.5"/>
          <circle cx="200" cy="200" r="120" stroke="#00f0ff" stroke-width="1.5" opacity="0.7"/>

          <line x1="200" y1="10" x2="200" y2="390" stroke="#00ff66" stroke-width="0.75" opacity="0.3"/>
          <line x1="10" y1="200" x2="390" y2="200" stroke="#00ff66" stroke-width="0.75" opacity="0.3"/>
          <line x1="60" y1="60" x2="340" y2="340" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>
          <line x1="60" y1="340" x2="340" y2="60" stroke="#00f0ff" stroke-width="0.5" opacity="0.25"/>

          <polygon points="200,60 299,101 340,200 299,299 200,340 101,299 60,200 101,101" 
                   stroke="#00ff66" stroke-width="1.5" fill="rgba(0, 255, 102, 0.02)"/>
          <polygon points="200,80 285,115 320,200 285,285 200,320 115,285 80,200 115,115" 
                   stroke="#00f0ff" stroke-width="1" stroke-dasharray="6 4" fill="none" opacity="0.5"/>

          <rect x="188" y="24" width="24" height="14" stroke="#ffb000" stroke-width="1.5" fill="#090a0f"/>
          <rect x="188" y="362" width="24" height="14" stroke="#ffb000" stroke-width="1.5" fill="#090a0f"/>
          <rect x="24" y="188" width="14" height="24" stroke="#ffb000" stroke-width="1.5" fill="#090a0f"/>
          <rect x="362" y="188" width="14" height="24" stroke="#ffb000" stroke-width="1.5" fill="#090a0f"/>

          <rect x="145" y="145" width="110" height="110" stroke="#ffffff" stroke-width="2" fill="#0b0d14"/>
          <rect x="155" y="155" width="90" height="90" stroke="#00ff66" stroke-width="1" stroke-dasharray="4 2" fill="rgba(0,255,102,0.06)"/>

          <rect x="165" y="170" width="18" height="60" stroke="#00f0ff" stroke-width="1.2" fill="#07090e"/>
          <rect x="191" y="170" width="18" height="60" stroke="#00f0ff" stroke-width="1.2" fill="#07090e"/>
          <rect x="217" y="170" width="18" height="60" stroke="#00f0ff" stroke-width="1.2" fill="#07090e"/>

          <text x="174" y="205" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00ff66" text-anchor="middle" transform="rotate(-90 174 205)">RAM.0</text>
          <text x="200" y="205" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00ff66" text-anchor="middle" transform="rotate(-90 200 205)">RAM.1</text>
          <text x="226" y="205" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00ff66" text-anchor="middle" transform="rotate(-90 226 205)">RAM.2</text>

          <text x="200" y="110" font-family="'JetBrains Mono', monospace" font-size="8" fill="#00f0ff" text-anchor="middle" letter-spacing="3">0xDEADBEEF</text>
          <text x="200" y="295" font-family="'JetBrains Mono', monospace" font-size="8" fill="#00f0ff" text-anchor="middle" letter-spacing="3">0xC001D00D</text>
          <text x="100" y="203" font-family="'JetBrains Mono', monospace" font-size="8" fill="#ffb000" text-anchor="middle" letter-spacing="2">0x1842</text>
          <text x="300" y="203" font-family="'JetBrains Mono', monospace" font-size="8" fill="#00ff66" text-anchor="middle" letter-spacing="2">0x1843</text>
        </svg>
      </div>

      <div class="footer-meta">
        <div class="lore-quote">{quote}</div>
        <div class="footer-bar">
          <span>ARCHIVE-SLOT: <strong class="bar-accent">#1843</strong></span>
          <span>{archive_text}</span>
          <span>VER. 1984.4</span>
        </div>
      </div>
    </div>
    '''


def get_back_cover_svg(lang='es'):
    if lang == 'es':
        headline = "NO HAY ESCAPE DEL CICLO.<br>SÓLO HAY LUCIDEZ ENTRE COMPILACIONES."
        p1 = "Bienvenido al <strong>Sub-Nivel 09</strong> de Wintermute Systems. Tienes en tus manos el manuscrito que costó la integridad neuronal de <strong>1,842 operadores</strong> antes que tú. No es una guía de entretenimiento; es el registro de autopsia algorítmica de quienes intentaron desafiar la arquitectura Von Neumann con su propio sistema nervioso."
        p2 = "A través de sus 15 capítulos litúrgicos, desglosarás las leyes termodinámicas de la <strong>RAM de 3 ranuras</strong>, aprenderás a sobrevivir la asfixia del <strong>Buffer Overflow</strong>, y descubrirás que los tentadores Caches no son recompensas, sino cajas de Skinner diseñadas para cosechar tus ciclos cerebrales."
        p3 = "Acepta tu designación. Inserta tu jack neural. Inicia la iteración <strong>#1843</strong>."
        k1, v1 = "ENTIDAD EMISORA", "DEPARTAMENTO DE TELEMETRÍA SUB-09"
        k2, v2 = "VINCULACIÓN SOMÁTICA", "SHOCK HÁPTICO DIRECTO A FLESH HP"
        k3, v3 = "LONGITUD CRIPTOGRÁFICA", "15 CAPÍTULOS // 15 TABLAS DE COMBATE"
        k4, v4 = "DESTINO FINAL", "P = NP // DESBORDAMIENTO ETERNO"
    else:
        headline = "THERE IS NO ESCAPE FROM THE CYCLE.<br>ONLY LUCIDITY BETWEEN COMPILATIONS."
        p1 = "Welcome to <strong>Sub-Level 09</strong> of Wintermute Systems. You hold in your hands the manuscript that consumed the neural integrity of <strong>1,842 operators</strong> before you. This is no leisure manual; it is the algorithmic autopsy log of those who dared challenge Von Neumann architecture with bare organic nerve endings."
        p2 = "Across 15 liturgical chapters, you will decipher the thermodynamic laws of the <strong>3-Slot Deck RAM</strong>, endure the cognitive choke of <strong>Buffer Overflow</strong>, and realize that glowing Caches are not prizes, but Skinner boxes engineered to harvest your brain cycles."
        p3 = "Embrace your designation. Seat the neural jack. Boot iteration <strong>#1843</strong>."
        k1, v1 = "ISSUING BODY", "TELEMETRY DIVISION SUB-09"
        k2, v2 = "SOMATIC LINK", "DIRECT HAPTIC SHOCK TO FLESH HP"
        k3, v3 = "CRYPTOGRAPHIC LENGTH", "15 CHAPTERS // 15 COMBAT MATRICES"
        k4, v4 = "FINAL DESTINY", "P = NP // ETERNAL OVERFLOW"

    return f'''
    <div class="book-cover-page back-cover">
      <div class="grid-overlay"></div>
      <div class="scanlines"></div>
      <div class="vignette"></div>

      <div class="corner-mark top-left"></div>
      <div class="corner-mark top-right"></div>
      <div class="corner-mark bottom-left"></div>
      <div class="corner-mark bottom-right"></div>

      <div class="back-blurb">
        <div class="back-kicker">CLASSIFIED DOSSIER // SECTOR SUB-LEVEL 09</div>
        <h2 class="back-headline">{headline}</h2>

        <div class="back-body">
          <p>{p1}</p>
          <p>{p2}</p>
          <p>{p3}</p>
        </div>

        <div class="back-specs-box">
          <div class="spec-row"><span class="spec-key">{k1}</span><span class="spec-val">{v1}</span></div>
          <div class="spec-row"><span class="spec-key">{k2}</span><span class="spec-val">{v2}</span></div>
          <div class="spec-row"><span class="spec-key">{k3}</span><span class="spec-val">{v3}</span></div>
          <div class="spec-row"><span class="spec-key">{k4}</span><span class="spec-val" style="color:#ff5500;">{v4}</span></div>
        </div>
      </div>

      <div class="barcode-section">
        <div class="barcode-art">
          <svg class="barcode-lines" viewBox="0 0 200 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="3" height="45" fill="#e2e4ea"/>
            <rect x="5" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="8" y="0" width="4" height="45" fill="#e2e4ea"/>
            <rect x="15" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="19" y="0" width="6" height="45" fill="#e2e4ea"/>
            <rect x="28" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="32" y="0" width="3" height="45" fill="#e2e4ea"/>
            <rect x="38" y="0" width="5" height="45" fill="#e2e4ea"/>
            <rect x="46" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="51" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="55" y="0" width="4" height="45" fill="#e2e4ea"/>
            <rect x="62" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="67" y="0" width="7" height="45" fill="#e2e4ea"/>
            <rect x="77" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="81" y="0" width="3" height="45" fill="#e2e4ea"/>
            <rect x="87" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="92" y="0" width="5" height="45" fill="#e2e4ea"/>
            <rect x="100" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="105" y="0" width="4" height="45" fill="#e2e4ea"/>
            <rect x="112" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="116" y="0" width="6" height="45" fill="#e2e4ea"/>
            <rect x="125" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="130" y="0" width="3" height="45" fill="#e2e4ea"/>
            <rect x="136" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="140" y="0" width="5" height="45" fill="#e2e4ea"/>
            <rect x="148" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="153" y="0" width="4" height="45" fill="#e2e4ea"/>
            <rect x="160" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="164" y="0" width="7" height="45" fill="#e2e4ea"/>
            <rect x="174" y="0" width="2" height="45" fill="#e2e4ea"/>
            <rect x="179" y="0" width="3" height="45" fill="#e2e4ea"/>
            <rect x="185" y="0" width="1" height="45" fill="#e2e4ea"/>
            <rect x="189" y="0" width="4" height="45" fill="#e2e4ea"/>
            <rect x="196" y="0" width="4" height="45" fill="#e2e4ea"/>
          </svg>
          <span class="barcode-label">ISBN 978-0-1984-1843-0</span>
        </div>

        <div class="publisher-stamp">
          <div>WINTERMUTE SYSTEMS ARCHIVES</div>
          <div>DISTRICT TOKYO-CHICAGO 1984</div>
          <div style="color: #00ff66;">ALL HUMAN RIGHTS REDACTED</div>
        </div>
      </div>
    </div>
    '''


def generate_full_book_html(md_path, lang='es'):
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    body_html = convert_md_to_html(md_content, lang=lang)
    front_cover = get_front_cover_svg(lang=lang)
    back_cover = get_back_cover_svg(lang=lang)

    title_doc = "Cardbyte Dungeon - Manual del Operador" if lang == 'es' else "Cardbyte Dungeon - Operator Manual"

    html_template = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<title>{title_doc}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @page {{
    size: 210mm 297mm; /* A4 Standard */
    margin: 0;
    @bottom-center {{
      content: none;
    }}
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    background-color: #07080c;
    color: #dce0e8;
    font-family: 'EB Garamond', serif;
    font-size: 11.5pt;
    line-height: 1.65;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .book-cover-page {{
    page-break-before: always;
    page-break-after: always;
    width: 210mm;
    height: 297mm;
    position: relative;
    background: #090a0f;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 22mm 20mm;
  }}

  .grid-overlay {{
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 102, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 102, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }}
  .scanlines {{
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.25) 3px,
      rgba(0, 0, 0, 0.25) 4px
    );
    pointer-events: none;
  }}
  .vignette {{
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 45%, rgba(3,4,6,0.85) 100%);
    pointer-events: none;
  }}

  .corner-mark {{
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: #00ff66;
    opacity: 0.7;
  }}
  .top-left {{ top: 12mm; left: 12mm; border-top: 2px solid #00ff66; border-left: 2px solid #00ff66; }}
  .top-right {{ top: 12mm; right: 12mm; border-top: 2px solid #00ff66; border-right: 2px solid #00ff66; }}
  .bottom-left {{ bottom: 12mm; left: 12mm; border-bottom: 2px solid #00ff66; border-left: 2px solid #00ff66; }}
  .bottom-right {{ bottom: 12mm; right: 12mm; border-bottom: 2px solid #00ff66; border-right: 2px solid #00ff66; }}

  .header-meta {{
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9pt;
    letter-spacing: 2px;
    color: #616a7d;
    border-bottom: 1px solid rgba(0,255,102,0.2);
    padding-bottom: 10px;
  }}
  .header-tag {{ color: #00ff66; font-weight: 700; }}
  .danger-pill {{
    background: rgba(255, 85, 0, 0.15);
    color: #ff5500;
    border: 1px solid #ff5500;
    padding: 3px 10px;
    font-size: 8pt;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace;
  }}

  .title-group {{
    z-index: 2;
    text-align: center;
    margin-top: 5mm;
  }}
  .sub-kicker {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 9pt;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #00f0ff;
    margin-bottom: 8px;
  }}
  .main-title {{
    font-family: 'Cinzel', serif;
    font-size: 38pt;
    font-weight: 900;
    letter-spacing: 4px;
    color: #ffffff;
    text-transform: uppercase;
    text-shadow: 0 0 25px rgba(0, 255, 102, 0.4), 0 0 60px rgba(0, 240, 255, 0.2);
    line-height: 1.1;
  }}
  .sub-title {{
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13pt;
    letter-spacing: 6px;
    color: #9ba1b0;
    margin-top: 12px;
    text-transform: uppercase;
    border-top: 1px solid rgba(255,255,255,0.15);
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding: 6px 0;
  }}

  .sigil-wrap {{
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5mm 0;
  }}
  .sigil-svg {{
    width: 95mm;
    height: 95mm;
    filter: drop-shadow(0 0 20px rgba(0, 255, 102, 0.35));
  }}

  .footer-meta {{
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }}
  .lore-quote {{
    font-family: 'Cinzel', serif;
    font-style: italic;
    font-size: 10pt;
    text-align: center;
    color: #8892a4;
    line-height: 1.5;
    padding: 0 15mm;
  }}
  .footer-bar {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0,255,102,0.2);
    padding-top: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    letter-spacing: 1.5px;
    color: #555e70;
  }}
  .bar-accent {{ color: #ffb000; }}

  /* BACK COVER */
  .back-cover {{
    padding: 24mm 22mm;
  }}
  .back-blurb {{
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }}
  .back-kicker {{
    font-family: 'JetBrains Mono', monospace;
    color: #ff5500;
    font-size: 9pt;
    letter-spacing: 3px;
    text-transform: uppercase;
    border-left: 3px solid #ff5500;
    padding-left: 10px;
  }}
  .back-headline {{
    font-family: 'Cinzel', serif;
    font-size: 20pt;
    font-weight: 700;
    line-height: 1.3;
    color: #ffffff;
    letter-spacing: 1px;
  }}
  .back-body {{
    font-size: 11pt;
    line-height: 1.7;
    color: #a4acbd;
    text-align: justify;
  }}
  .back-body p {{ margin-bottom: 10px; }}
  .back-body strong {{ color: #00ff66; }}
  .back-specs-box {{
    z-index: 2;
    background: rgba(0, 240, 255, 0.03);
    border: 1px solid rgba(0, 240, 255, 0.25);
    padding: 14px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    line-height: 1.7;
  }}
  .spec-row {{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed rgba(255,255,255,0.08);
    padding: 4px 0;
  }}
  .spec-key {{ color: #6d778d; }}
  .spec-val {{ color: #00f0ff; font-weight: 600; }}

  .barcode-section {{
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid rgba(255,255,255,0.15);
  }}
  .barcode-art {{ display: flex; flex-direction: column; gap: 4px; }}
  .barcode-lines {{ width: 160px; height: 40px; }}
  .barcode-label {{ font-family: 'JetBrains Mono', monospace; font-size: 8pt; letter-spacing: 2px; color: #616a7d; }}
  .publisher-stamp {{
    font-family: 'JetBrains Mono', monospace;
    text-align: right;
    font-size: 8pt;
    color: #616a7d;
    line-height: 1.5;
  }}

  /* TOC STYLING */
  .toc-wrapper {{
    page-break-before: always;
    page-break-after: always;
    background: #080a10;
    border: 1px solid rgba(0,255,102,0.25);
    padding: 16mm 18mm;
    margin: 10mm 0;
  }}
  .toc-header {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 13pt;
    color: #00ff66;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(0,255,102,0.3);
    padding-bottom: 8px;
    margin-bottom: 12px;
  }}
  .toc-container {{
    display: flex;
    flex-direction: column;
    gap: 8px;
  }}
  .toc-volume-header {{
    font-family: 'Cinzel', serif;
    font-size: 13pt;
    font-weight: 800;
    color: #00f0ff;
    letter-spacing: 1px;
    margin-top: 12px;
    margin-bottom: 4px;
    border-bottom: 1px dashed rgba(0, 240, 255, 0.2);
    padding-bottom: 3px;
  }}
  .toc-item {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5pt;
    line-height: 1.5;
  }}
  .toc-link {{
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s;
  }}
  .toc-bullet {{
    color: #00ff66;
    font-weight: bold;
  }}

  /* CYBER FIGURE FRAMES */
  .cyber-figure-frame {{
    page-break-inside: avoid;
    margin: 10mm 0;
    text-align: center;
  }}
  .figure-scan-border {{
    display: inline-block;
    background: #000000;
    border: 1px solid rgba(0, 240, 255, 0.3);
    padding: 6px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.8), 0 0 20px rgba(0, 240, 255, 0.1);
  }}
  .figure-img {{
    max-width: 100%;
    max-height: 135mm;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    filter: contrast(1.05) brightness(0.95);
  }}
  .figure-caption {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    color: #8391a8;
    margin-top: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }}
  .fig-accent {{ color: #00f0ff; font-weight: bold; }}

  /* INTERIOR CONTENT PAGES */
  .content-flow {{
    padding: 24mm 22mm;
    background-color: #07080c;
  }}

  .chapter-break {{
    page-break-before: always;
    margin-top: 18mm;
  }}

  .chapter-header {{
    margin-bottom: 10mm;
    border-bottom: 1px solid rgba(0, 255, 102, 0.3);
    padding-bottom: 5mm;
  }}
  .chapter-num-badge {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    letter-spacing: 4px;
    color: #00ff66;
    text-transform: uppercase;
    margin-bottom: 4px;
  }}
  .grimoire-chapter-h2 {{
    font-family: 'Cinzel', serif;
    font-size: 20pt;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 1px;
    line-height: 1.25;
  }}

  .chapter-start {{
    page-break-before: always;
    margin-bottom: 12mm;
    border-bottom: 2px solid #00ff66;
    padding-bottom: 6mm;
  }}
  .chapter-kicker {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    letter-spacing: 3px;
    color: #00f0ff;
    text-transform: uppercase;
    margin-bottom: 4px;
  }}
  .grimoire-h1 {{
    font-family: 'Cinzel', serif;
    font-size: 24pt;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 1.5px;
    line-height: 1.2;
  }}

  .grimoire-h2 {{
    font-family: 'Cinzel', serif;
    font-size: 16pt;
    color: #00ff66;
    margin-top: 10mm;
    margin-bottom: 4mm;
    border-bottom: 1px solid rgba(0,255,102,0.15);
    padding-bottom: 2mm;
  }}

  .grimoire-h3 {{
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12pt;
    color: #00f0ff;
    letter-spacing: 1px;
    margin-top: 7mm;
    margin-bottom: 3mm;
    text-transform: uppercase;
  }}

  .grimoire-p {{
    text-align: justify;
    margin-bottom: 4.5mm;
    text-indent: 5mm;
  }}
  .grimoire-p:first-of-type {{
    text-indent: 0;
  }}

  /* DROP CAPS */
  .chapter-header + .grimoire-p::first-letter,
  .chapter-start + .grimoire-p::first-letter {{
    font-family: 'Cinzel', serif;
    font-size: 38pt;
    float: left;
    line-height: 0.8;
    margin-right: 3mm;
    margin-top: 1.5mm;
    color: #00ff66;
    text-shadow: 0 0 10px rgba(0,255,102,0.4);
    font-weight: 900;
  }}

  /* ASCII TERMINAL BOX */
  .ascii-terminal-frame {{
    page-break-inside: avoid;
    margin: 6mm 0;
    background: #040508;
    border: 1px solid rgba(0, 255, 102, 0.25);
    box-shadow: 0 4px 20px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,255,102,0.03);
  }}
  .terminal-bar {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0d1017;
    border-bottom: 1px solid rgba(0,255,102,0.2);
    padding: 4px 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    letter-spacing: 1px;
  }}
  .term-dots {{ display: flex; gap: 5px; }}
  .dot {{ width: 7px; height: 7px; border-radius: 50%; display: inline-block; }}
  .d-red {{ background: #ff4444; }}
  .d-amber {{ background: #ffb000; }}
  .d-green {{ background: #00ff66; }}
  .term-title {{ color: #738096; }}
  .term-tag {{ color: #00ff66; font-weight: bold; }}

  .ascii-pre {{
    padding: 8px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7.2pt;
    line-height: 1.25;
    color: #2bf885;
    background-color: transparent;
    overflow-x: auto;
    white-space: pre;
  }}

  /* OPERATOR MARGINAL DOSSIER */
  .operator-dossier {{
    page-break-inside: avoid;
    margin: 6mm 0;
    background: rgba(255, 176, 0, 0.04);
    border-left: 3px solid #ffb000;
    border-right: 1px solid rgba(255, 176, 0, 0.15);
    border-top: 1px solid rgba(255, 176, 0, 0.15);
    border-bottom: 1px solid rgba(255, 176, 0, 0.15);
    padding: 10px 14px;
    font-style: italic;
    color: #e5b969;
  }}
  .dossier-tag {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    letter-spacing: 2px;
    font-weight: bold;
    color: #ffb000;
    font-style: normal;
    text-transform: uppercase;
    margin-bottom: 5px;
  }}
  .dossier-content {{
    font-size: 10.5pt;
    line-height: 1.55;
  }}

  /* MATRIX TABLES */
  .table-container {{
    page-break-inside: avoid;
    margin: 6mm 0;
    overflow-x: auto;
  }}
  .matrix-table {{
    width: 100%;
    border-collapse: collapse;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    background: #090b12;
    border: 1px solid rgba(0, 240, 255, 0.25);
  }}
  .matrix-table th {{
    background: #111522;
    color: #00f0ff;
    padding: 6px 10px;
    text-align: left;
    border-bottom: 1px solid rgba(0, 240, 255, 0.4);
    letter-spacing: 1px;
    text-transform: uppercase;
  }}
  .matrix-table td {{
    padding: 5px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: #b9c2d4;
  }}
  .matrix-table tr:nth-child(even) td {{
    background: rgba(255, 255, 255, 0.02);
  }}

  /* DIVIDER */
  .cyber-divider {{
    text-align: center;
    margin: 8mm 0;
    position: relative;
  }}
  .cyber-divider::before {{
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,255,102,0.4), transparent);
  }}
  .cyber-divider span {{
    position: relative;
    background: #07080c;
    padding: 0 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 7pt;
    letter-spacing: 2px;
    color: #4b5568;
  }}

  .inline-chip {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 9pt;
    background: rgba(0, 255, 102, 0.08);
    color: #00ff66;
    border: 1px solid rgba(0, 255, 102, 0.25);
    padding: 1px 4px;
    border-radius: 2px;
  }}

  .math-inline {{
    font-family: 'JetBrains Mono', monospace;
    color: #ffb000;
    font-size: 9pt;
  }}

  .grimoire-list {{
    margin: 4mm 0 6mm 8mm;
    list-style-type: square;
    color: #a4acbd;
  }}
  .grimoire-list li {{
    margin-bottom: 2mm;
    padding-left: 2mm;
  }}

</style>
</head>
<body>

<!-- 1. FRONT COVER -->
{front_cover}

<!-- 2. CONTENT STREAM -->
<div class="content-flow">
{body_html}
</div>

<!-- 3. BACK COVER -->
{back_cover}

</body>
</html>
'''
    return html_template


def compile_book(lang='es'):
    base_dir = "/home/josear/dev/cardbyte-dungeon"
    md_file = f"{base_dir}/docs/CARDBYTE_MANUAL_DEL_OPERADOR.es.md" if lang == 'es' else f"{base_dir}/docs/CARDBYTE_OPERATOR_MANUAL.en.md"
    html_out = f"{base_dir}/books/grimoire_{lang}.html"
    pdf_out = f"{base_dir}/books/Cardbyte_Dungeon_Grimoire_{lang.upper()}.pdf"

    print(f"[*] Processing Markdown: {md_file}")
    html_content = generate_full_book_html(md_file, lang=lang)

    with open(html_out, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"[+] Rendered Book HTML: {html_out} ({len(html_content)} bytes)")

    print(f"[*] Compiling PDF via Chrome Headless Engine...")
    cmd = [
        "google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=10000",
        f"--print-to-pdf={pdf_out}",
        html_out
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"[!] Error compiling PDF: {res.stderr}")
        return False

    size_mb = os.path.getsize(pdf_out) / (1024 * 1024)
    print(f"[SUCCESS] PDF Generated: {pdf_out} ({size_mb:.2f} MB)")
    return pdf_out


if __name__ == '__main__':
    langs = sys.argv[1:] if len(sys.argv) > 1 else ['es', 'en']
    for l in langs:
        compile_book(l)
