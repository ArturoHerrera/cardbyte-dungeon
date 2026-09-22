export type Locale = 'en' | 'es';

export interface LandingTranslations {
  meta: {
    systemStatus: string;
    sublevel: string;
    jackIn: string;
    audioActive: string;
    audioMuted: string;
    romPatching: string;
  };
  nav: {
    title: string;
    story: string;
    manuals: string;
    tech: string;
    operator: string;
  };
  hero: {
    kicker: string;
    title: string;
    quote: string;
    subtext: string;
    ctaPlay: string;
    ctaManuals: string;
    telemetry: {
      latency: string;
      iceLevel: string;
      engine: string;
      memory: string;
    };
  };
  roms: {
    kicker: string;
    title: string;
    description: string;
    esCartridge: {
      tag: string;
      title: string;
      subtitle: string;
      pages: string;
      format: string;
      downloadLabel: string;
      readOnlineLabel: string;
    };
    enCartridge: {
      tag: string;
      title: string;
      subtitle: string;
      pages: string;
      format: string;
      downloadLabel: string;
      readOnlineLabel: string;
    };
    notice: string;
  };
  genesis: {
    kicker: string;
    title: string;
    quote: string;
    quoteAuthor: string;
    p1: string;
    p2: string;
    p3: string;
    highlights: {
      title: string;
      desc: string;
    }[];
  };
  tech: {
    kicker: string;
    title: string;
    description: string;
    cards: {
      tag: string;
      name: string;
      desc: string;
    }[];
  };
  operator: {
    kicker: string;
    title: string;
    badgeTitle: string;
    name: string;
    role: string;
    experience: string;
    education: string;
    bio: string;
    linkedInCta: string;
    githubCta: string;
  };
  footer: {
    corp: string;
    note: string;
    openSource: string;
  };
}

export const translations: Record<Locale, LandingTranslations> = {
  en: {
    meta: {
      systemStatus: 'SYS_READY // BUFFER 0x1842',
      sublevel: 'SUB-LEVEL 09 // CYBERSPACE',
      jackIn: '>> JACK IN',
      audioActive: 'AUDIO [ON]',
      audioMuted: 'AUDIO [OFF]',
      romPatching: 'INJECTING_LOCALE: EN-US',
    },
    nav: {
      title: 'CARDBYTE // TERMINAL',
      story: 'GENESIS',
      manuals: 'MANUALS',
      tech: 'ARCHITECTURE',
      operator: 'OPERATOR',
    },
    hero: {
      kicker: '// PROTOCOL 0x1842 // NEURAL INTERFACE ONLINE //',
      title: 'CARDBYTE DUNGEON',
      quote: 'The sky above the port was the color of television, tuned to a dead channel.',
      subtext:
        'A tactical turn-based deckbuilder roguelike forged in the shadows of 1984 Gibsonian cyberpunk. Hack nodes, break ICE, and extract data matrices before neural feedback fries your deck.',
      ctaPlay: '>> INITIATE RUN / PLAY NOW <<',
      ctaManuals: 'DOWNLOAD GRIMOIRES (PDF)',
      telemetry: {
        latency: 'LATENCY: 08ms',
        iceLevel: 'THREAT: BLACK ICE',
        engine: 'HOST: ONO-SENDAI 7',
        memory: 'BUFFER: 64KB RAM',
      },
    },
    roms: {
      kicker: '// HARDWARE ARCHIVES & EXPANSION MODULES //',
      title: 'CANONICAL OPERATOR GRIMOIRES',
      description:
        'Over 80 pages of diegetic cyberpunk lore, tactical combat matrices, CRT terminal lexicons, and vector cover art. Download the official PDF collector manuals.',
      esCartridge: {
        tag: 'ROM_01 // ES-MX',
        title: 'GRIMORIO DEL OPERADOR',
        subtitle: 'Edición Canónica en Español',
        pages: '85 Pages // US Letter',
        format: 'Dark Mode // The Void Edition // 47 MB',
        downloadLabel: 'DOWNLOAD ROM (PDF)',
        readOnlineLabel: 'READ COMPENDIUM',
      },
      enCartridge: {
        tag: 'ROM_02 // EN-US',
        title: 'OPERATOR MANUAL',
        subtitle: 'Canonical English Compendium',
        pages: '82 Pages // US Letter',
        format: 'Full Vector Cover // Print Ready // 46 MB',
        downloadLabel: 'DOWNLOAD ROM (PDF)',
        readOnlineLabel: 'READ COMPENDIUM',
      },
      notice: 'PDF releases are delivered via GitHub Releases CDN with zero client-side tracking.',
    },
    genesis: {
      kicker: '// DECOMPILING THE MATRIX // BEHIND THE ICE //',
      title: 'THE 48-HOUR AI ACCELERATION EXPERIMENT',
      quote: 'Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators...',
      quoteAuthor: '— William Gibson, Neuromancer (1984)',
      p1: 'Cardbyte Dungeon was born as a rapid engineering experiment: push the limits of modern Generative AI to design, orchestrate, architect, and produce a complete, polished indie roguelike in a single weekend.',
      p2: 'Rather than treating AI as a simple autocomplete, the entire project utilized autonomous agentic workflows: drafting complex combat mathematics, composing rich dystopian lore across 15 narrative sectors, generating procedural WebAudio synthesizers, and compiling 80+ page publication-ready books via automated Python pipelines.',
      p3: 'This project is a love letter to the early cyberpunk literature that founded our imagination, executed with the bleeding-edge tools shaping software engineering today.',
      highlights: [
        {
          title: 'Full-Stack Co-Pilot',
          desc: '100% TypeScript typed combat state machine, card graph pathfinding, and deterministic mechanics.',
        },
        {
          title: 'Autonomous Lore Pipeline',
          desc: 'Over 80 pages of cohesive worldbuilding and slang glossary generated and verified through strict specs.',
        },
        {
          title: 'Procedural Audio Architecture',
          desc: 'Native WebAudio frequency synthesis, CRT filters, and mechanical tactile feedback with 0 external sound files.',
        },
      ],
    },
    tech: {
      kicker: '// SYSTEM SPECIFICATIONS & SOURCE TRACE //',
      title: 'TECHNICAL RADIOGRAPHY',
      description:
        'Clean, modular, deterministic architecture designed for zero latency and instant responsiveness.',
      cards: [
        {
          tag: 'CORE ENGINE',
          name: 'React 19 + TypeScript',
          desc: 'Strict type safety, zero runtime exceptions, custom hook orchestration, and modular screen routing.',
        },
        {
          tag: 'STATE MACHINE',
          name: 'Zustand 5 Store',
          desc: 'Single source of truth with immutable action dispatching for combat, deck modifications, and run progression.',
        },
        {
          tag: 'DESIGN TOKENS',
          name: 'Tailwind CSS v4',
          desc: 'Hardware-accelerated CRT scanlines, phosphor glow effects, matrix grids, and seamless responsive layout.',
        },
        {
          tag: 'AUDIO ENGINE',
          name: 'WebAudio Procedural Synth',
          desc: 'Mathematical wave generation (sine, saw, noise) with biquad filter envelopes and CRT hum simulation.',
        },
        {
          tag: 'MOBILE ERGONOMICS',
          name: 'Android-Inspired Viewport',
          desc: 'Engineered by a Mobile Senior with mobile-first tactile touch targets, safe areas, and dynamic container frames.',
        },
        {
          tag: 'BOOK COMPILER',
          name: 'Python Headless Chrome Pipeline',
          desc: 'Automated Markdown-to-PDF compiler generating US Letter print books with dynamic CSS Paged Media pagination.',
        },
      ],
    },
    operator: {
      kicker: '// OPERATOR IDENTIFICATION // CLEARANCE LEVEL 05 //',
      title: 'OPERATOR CREDENTIAL',
      badgeTitle: 'CYBER SECURITY CLEARANCE BADGE',
      name: 'ARTURO HERRERA',
      role: 'Senior Mobile Engineer // AI Engineering Student',
      experience: '7+ Years Crafting Robust Android Applications',
      education: 'B.S. Artificial Intelligence Engineering (Hybridge)',
      bio: 'Mobile engineer with over seven years scaling production Android ecosystems. Currently diving deep into Full Stack web ecosystems and applied AI engineering, leveraging agentic workflows and LLM orchestration to build resilient, innovative products.',
      linkedInCta: 'CONNECT ON LINKEDIN >>',
      githubCta: 'EXPLORE REPOSITORY (GITHUB) >>',
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // OPERATOR TERMINAL v1.0',
      note: 'No tracking cookies. No telemetry traps. 100% static client-side build.',
      openSource: 'Cardbyte Dungeon is open source software. MIT License.',
    },
  },
  es: {
    meta: {
      systemStatus: 'SISTEMA_LISTO // BÚFER 0x1842',
      sublevel: 'SUB-NIVEL 09 // CIBERESPACIO',
      jackIn: '>> CONECTAR',
      audioActive: 'AUDIO [ACTIVO]',
      audioMuted: 'AUDIO [MUTED]',
      romPatching: 'PARCHEANDO_ROM: ES-MX',
    },
    nav: {
      title: 'CARDBYTE // TERMINAL',
      story: 'GÉNESIS',
      manuals: 'MANUALES',
      tech: 'ARQUITECTURA',
      operator: 'OPERADOR',
    },
    hero: {
      kicker: '// PROTOCOLO 0x1842 // INTERFAZ NEURAL ACTIVA //',
      title: 'CARDBYTE DUNGEON',
      quote: 'El cielo sobre el puerto tenía el color de una pantalla de televisión, sintonizada en un canal muerto.',
      subtext:
        'Un roguelike táctico de construcción de mazos nacido en las sombras del cyberpunk de William Gibson (1984). Hackea nodos, fractura el ICE y extrae matrices de datos antes de que la retroalimentación neural fría tu ciberdeck.',
      ctaPlay: '>> INICIAR INCURSIÓN / JUGAR <<',
      ctaManuals: 'DESCARGAR GRIMORIOS (PDF)',
      telemetry: {
        latency: 'LATENCIA: 08ms',
        iceLevel: 'AMENAZA: ICE NEGRO',
        engine: 'HOST: ONO-SENDAI 7',
        memory: 'BÚFER: 64KB RAM',
      },
    },
    roms: {
      kicker: '// ARCHIVOS DE HARDWARE & MÓDULOS DE EXPANSIÓN //',
      title: 'GRIMORIOS CANÓNICOS DEL OPERADOR',
      description:
        'Más de 80 páginas de lore cyberpunk diegético, tablas tácticas de combate, glosarios de terminal CRT y arte vectorial. Descarga los manuales de colección oficiales en PDF.',
      esCartridge: {
        tag: 'ROM_01 // ES-MX',
        title: 'GRIMORIO DEL OPERADOR',
        subtitle: 'Edición Canónica en Español',
        pages: '85 Páginas // Tamaño Carta (US Letter)',
        format: 'Dark Mode // The Void Edition // 47 MB',
        downloadLabel: 'DESCARGAR ROM (PDF)',
        readOnlineLabel: 'LEER COMPENDIO',
      },
      enCartridge: {
        tag: 'ROM_02 // EN-US',
        title: 'OPERATOR MANUAL',
        subtitle: 'Canonical English Compendium',
        pages: '82 Páginas // Tamaño Carta (US Letter)',
        format: 'Portada Vectorial // Listo para Impresión // 46 MB',
        downloadLabel: 'DESCARGAR ROM (PDF)',
        readOnlineLabel: 'LEER COMPENDIO',
      },
      notice: 'Las descargas de PDF se distribuyen a través de la CDN de GitHub Releases sin rastreadores ni publicidad.',
    },
    genesis: {
      kicker: '// DESCOMPILANDO LA MATRIZ // DETRÁS DEL ICE //',
      title: 'EL EXPERIMENTO DE ACELERACIÓN CON IA EN 48 HORAS',
      quote: 'Ciberespacio. Una alucinación consensual experimentada diariamente por miles de millones de legítimos operadores...',
      quoteAuthor: '— William Gibson, Neuromancer (1984)',
      p1: 'Cardbyte Dungeon nació como un laboratorio de ingeniería rápida: explorar los límites de la Inteligencia Artificial Generativa moderna para diseñar, orquestar, programar y producir un videojuego roguelike completo en un solo fin de semana.',
      p2: 'En lugar de usar la IA como simple autocompletado, todo el proyecto se basó en flujos de trabajo agénticos: balance de matemáticas de combate, composición de un universo narrativo distribuido en 15 sectores, sintetizadores WebAudio procedimentales y compilación de libros de más de 80 páginas mediante pipelines en Python.',
      p3: 'Este proyecto es un tributo directo a la literatura de ciencia ficción clásica que moldeó nuestra imaginación, creado con las herramientas de vanguardia que transforman la ingeniería de software.',
      highlights: [
        {
          title: 'Copiloto Full-Stack',
          desc: 'Máquina de estados en TypeScript, cálculo determinista de daño y ruteo de nodos completamente tipado.',
        },
        {
          title: 'Generación de Lore y Especificaciones',
          desc: 'Más de 80 páginas de ficción cohesiva y glosario de términos validados bajo especificaciones estrictas.',
        },
        {
          title: 'Arquitectura de Audio Procedimental',
          desc: 'Síntesis matemática de ondas (seno, sierra, ruido) y filtrado CRT sin archivos externos de sonido.',
        },
      ],
    },
    tech: {
      kicker: '// ESPECIFICACIONES DEL SISTEMA & TRAZA DE CÓDIGO //',
      title: 'RADIOGRAFÍA TÉCNICA',
      description:
        'Arquitectura modular, limpia y determinista diseñada para una respuesta táctil instantánea y sin latencia.',
      cards: [
        {
          tag: 'MOTOR PRINCIPAL',
          name: 'React 19 + TypeScript',
          desc: 'Seguridad de tipos estricta, arquitectura basada en componentes desacoplados y cero excepciones en tiempo de ejecución.',
        },
        {
          tag: 'ESTADO REACTIVO',
          name: 'Zustand 5 Store',
          desc: 'Única fuente de verdad inmutable para combate, modificación de mazos y persistencia local sin boilerplate.',
        },
        {
          tag: 'SISTEMA DE DISEÑO',
          name: 'Tailwind CSS v4',
          desc: 'Efectos scanlines CRT acelerados por GPU, resplandor de fósforo verde/cian y rejilla vectorial cyberpunk.',
        },
        {
          tag: 'SÍNTESIS DE AUDIO',
          name: 'WebAudio Procedural Synth',
          desc: 'Generación matemática de frecuencias sonoras y simulación de zumbido analógico de terminal CRT.',
        },
        {
          tag: 'ERGONOMÍA MÓVIL',
          name: 'Viewport Diseñado por Android Senior',
          desc: 'Enfoque táctil mobile-first con safe areas, dianas de toque optimizadas y simulación de hardware móvil.',
        },
        {
          tag: 'COMPILADOR DE LIBROS',
          name: 'Pipeline en Python + Headless Chrome',
          desc: 'Compilador automatizado de Markdown a PDF con paginado diegético CSS Paged Media y portadas vectoriales SVG.',
        },
      ],
    },
    operator: {
      kicker: '// IDENTIFICACIÓN DEL OPERADOR // NIVEL DE ACCESO 05 //',
      title: 'CREDENCIAL DEL OPERADOR',
      badgeTitle: 'CYBER SECURITY CLEARANCE BADGE',
      name: 'ARTURO HERRERA',
      role: 'Senior Mobile Engineer // Estudiante de Ing. en Inteligencia Artificial',
      experience: 'Más de 7 años desarrollando aplicaciones robustas en Android',
      education: 'Ingeniería en Inteligencia Artificial (Hybridge)',
      bio: 'Ingeniero de software con más de siete años escalando ecosistemas móviles en Android. Actualmente profundizando en tecnologías Full Stack e Inteligencia Artificial aplicada, orquestando flujos agénticos y modelos de lenguaje para construir productos innovadores y de alto impacto.',
      linkedInCta: 'CONECTAR EN LINKEDIN >>',
      githubCta: 'EXPLORAR REPOSITORIO (GITHUB) >>',
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // TERMINAL DEL OPERADOR v1.0',
      note: 'Sin cookies de rastreo. Sin trampas de telemetría. Compilación 100% estática.',
      openSource: 'Cardbyte Dungeon es software de código abierto. Licencia MIT.',
    },
  },
};
