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
    quoteSource: string;
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
  genesis: {
    kicker: string;
    title: string;
    subtitle: string;
    quote: string;
    quoteAuthor: string;
    p1: string;
    p2: string;
    p3: string;
    pillarsTitle: string;
    pillars: {
      title: string;
      desc: string;
    }[];
    techTitle: string;
    techSubtitle: string;
    techCards: {
      tag: string;
      name: string;
      desc: string;
    }[];
  };
  grimoires: {
    kicker: string;
    title: string;
    description: string;
    coverAlt: string;
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
  architect: {
    kicker: string;
    title: string;
    badgeTitle: string;
    authId: string;
    name: string;
    role: string;
    experience: string;
    education: string;
    bioP1: string;
    bioP2: string;
    scanPrompt: string;
    scanStatus: string;
    linkedInCta: string;
    githubCta: string;
    skills: string[];
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
      sublevel: 'LOS ANGELES 2049 // CYBERSPACE GATEWAY',
      jackIn: '>> JACK IN',
      audioActive: 'AUDIO [ON]',
      audioMuted: 'AUDIO [OFF]',
      romPatching: 'PATCHING_LOCALE: EN-US',
    },
    nav: {
      title: 'CARDBYTE // 2049',
      story: 'GENESIS',
      manuals: 'GRIMOIRES',
      tech: 'ARCHITECTURE',
      operator: 'ARCHITECT',
    },
    hero: {
      kicker: '// PROTOCOL 0x1842 // NEURAL INTERFACE ONLINE //',
      title: 'CARDBYTE DUNGEON',
      quote: 'The sky above the port was the color of television, tuned to a dead channel.',
      quoteSource: 'William Gibson // Neuromancer (1984)',
      subtext:
        'A tactical turn-based deckbuilder roguelike forged in the rainy shadows of classical cyberpunk. Hack nodes, shatter Black ICE, and extract high-value data matrices before your neural deck fries.',
      ctaPlay: '>> INITIATE RUN / JACK IN <<',
      ctaManuals: 'OFFICIAL GRIMOIRES (PDF)',
      telemetry: {
        latency: 'LATENCY: 06ms',
        iceLevel: 'THREAT: BLACK ICE',
        engine: 'HOST: ONO-SENDAI 7',
        memory: 'BUFFER: 64KB RAM',
      },
    },
    genesis: {
      kicker: '// DECOMPILING THE MATRIX // PROJECT ORIGIN //',
      title: 'THE 48-HOUR AI ACCELERATION EXPERIMENT',
      subtitle: 'A love letter to 1984 Gibsonian cyberpunk orchestrated through autonomous agentic engineering.',
      quote: 'All those moments will be lost in time, like tears in rain... Time to die.',
      quoteAuthor: '— Blade Runner (1982) // Roy Batty',
      p1: 'Cardbyte Dungeon was born as an intensive 48-hour engineering hackathon: exploring how modern Generative AI, when guided by rigorous OpenSpec specification-driven workflows, can design, architect, balance, and build a full, high-finish indie roguelike from scratch in a single weekend.',
      p2: 'Rather than using AI for mere code snippets or autocomplete, the entire project leveraged autonomous multi-agent orchestration: mathematical combat state machines, procedural WebAudio synthesis, 15 sectors of dystopian narrative lore, and an automated publishing pipeline compiling 80+ page publication-ready books.',
      p3: 'This project is both a passionate tribute to early cyberpunk literature (Gibson, Dick, Scott) and a testament to modern engineering paradigms where human architectural vision guides AI agents with total deterministic precision.',
      pillarsTitle: 'ACCELERATION PILLARS',
      pillars: [
        {
          title: 'Spec-Driven Engineering',
          desc: '100% deterministic contracts using OpenSpec: delta specifications, automated verification, and zero drift between architecture and execution.',
        },
        {
          title: 'Agentic Autonomous Workflows',
          desc: 'AI co-piloting combat balancing, deterministic graph generation, and type-safe state transitions across React 19 and TypeScript.',
        },
        {
          title: 'Diegetic Audio & Worldbuilding',
          desc: 'Zero external audio files. Pure mathematical frequency synthesis (Web Audio API) evoking vintage analog synthesizers.',
        },
      ],
      techTitle: 'SYSTEM ARCHITECTURE & RADIOGRAPHY',
      techSubtitle: 'Clean, modular, deterministic stack engineered for instant tactile responsiveness.',
      techCards: [
        {
          tag: 'CORE ENGINE',
          name: 'React 19 + TypeScript',
          desc: 'Strict type safety, custom hook orchestration, and decoupled screen routing between portal and game.',
        },
        {
          tag: 'STATE MACHINE',
          name: 'Zustand 5 Store',
          desc: 'Single source of truth with immutable action dispatching for combat, deck modifications, and run progression.',
        },
        {
          tag: 'DESIGN SYSTEM',
          name: 'Tailwind CSS v4',
          desc: 'Hardware-accelerated CRT scanlines, volumetric mist gradients, and high-contrast Blade Runner typography.',
        },
        {
          tag: 'AUDIO SYNTHESIS',
          name: 'WebAudio Procedural Synth',
          desc: 'Vangelis CS-80 inspired dual-oscillator drone with resonant filter sweeps and tactile mechanical click feedback.',
        },
        {
          tag: 'SPEC FRAMEWORK',
          name: 'OpenSpec (Spec-Driven)',
          desc: 'Rigorous change planning, delta specs, and task tracking ensuring architectural integrity throughout development.',
        },
        {
          tag: 'BOOK COMPILER',
          name: 'Python Headless Chrome Pipeline',
          desc: 'Automated Markdown-to-PDF compiler generating US Letter print books with dynamic CSS Paged Media pagination.',
        },
      ],
    },
    grimoires: {
      kicker: '// CANONICAL ARCHIVES & PUBLICATIONS //',
      title: 'OFFICIAL OPERATOR GRIMOIRES',
      description:
        'Over 80 pages of diegetic cyberpunk lore, tactical combat matrices, CRT terminal lexicons, and vector cover art. Download the official PDF collector editions with a single click.',
      coverAlt: 'Cardbyte Dungeon Canonical Operator Grimoire Book Cover',
      esCartridge: {
        tag: 'EDICIÓN EN ESPAÑOL // ES-MX',
        title: 'GRIMORIO DEL OPERADOR',
        subtitle: 'Edición Canónica de Colección',
        pages: '85 Pages // US Letter Print-Ready',
        format: 'Dark Mode // The Void Edition // 47 MB',
        downloadLabel: 'DOWNLOAD PDF (ES)',
        readOnlineLabel: 'READ COMPENDIUM',
      },
      enCartridge: {
        tag: 'ENGLISH COMPENDIUM // EN-US',
        title: 'OPERATOR MANUAL',
        subtitle: 'Canonical English Edition',
        pages: '82 Pages // US Letter Print-Ready',
        format: 'Full Vector Cover // Print Ready // 46 MB',
        downloadLabel: 'DOWNLOAD PDF (EN)',
        readOnlineLabel: 'READ COMPENDIUM',
      },
      notice: 'PDF releases are delivered directly via GitHub Releases CDN with zero trackers or external telemetry.',
    },
    architect: {
      kicker: '// SYSTEM ARCHITECT // CLEARANCE: LEVEL 05 //',
      title: 'MEET THE ARCHITECT',
      badgeTitle: 'TYRELL CORP BIOMETRIC CLEARANCE DOSSIER',
      authId: 'CLEARANCE_ID: #0792-AH // REPLICANT_CHECK: PASS',
      name: 'ARTURO HERRERA',
      role: 'Senior Mobile Engineer // AI Engineering Student',
      experience: '7+ Years Crafting High-Performance Android Ecosystems',
      education: 'B.S. Artificial Intelligence Engineering Student (Hybridge)',
      bioP1:
        'Software engineer with over seven years specializing in production Android applications, architecture, and mobile performance. Driven by an obsession for craft, robust systems, and high-impact digital experiences.',
      bioP2:
        'Currently advancing studies in Artificial Intelligence Engineering, exploring the intersection of distributed systems, LLM agentic orchestration, and spec-driven software creation. Cardbyte Dungeon represents this union: applied AI velocity grounded in solid engineering foundations.',
      scanPrompt: 'VOIGHT-KAMPFF BIOMETRIC LASER SCAN',
      scanStatus: 'BIOMETRIC MATCH: 99.98% [VERIFIED]',
      linkedInCta: 'CONNECT ON LINKEDIN >>',
      githubCta: 'EXPLORE REPOSITORY (GITHUB) >>',
      skills: [
        'Android SDK',
        'Kotlin & Java',
        'System Architecture',
        'AI Agent Orchestration',
        'OpenSpec',
        'TypeScript',
        'Web Audio API',
      ],
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // OPERATOR TERMINAL 2049',
      note: 'No tracking cookies. No telemetry traps. 100% static client-side architecture.',
      openSource: 'Cardbyte Dungeon is open source software. MIT License.',
    },
  },
  es: {
    meta: {
      systemStatus: 'SISTEMA_LISTO // BÚFER 0x1842',
      sublevel: 'LOS ANGELES 2049 // PORTAL DEL CIBERESPACIO',
      jackIn: '>> CONECTAR',
      audioActive: 'AUDIO [ACTIVO]',
      audioMuted: 'AUDIO [MUTED]',
      romPatching: 'PARCHEANDO_ROM: ES-MX',
    },
    nav: {
      title: 'CARDBYTE // 2049',
      story: 'GÉNESIS',
      manuals: 'GRIMORIOS',
      tech: 'ARQUITECTURA',
      operator: 'ARQUITECTO',
    },
    hero: {
      kicker: '// PROTOCOLO 0x1842 // INTERFAZ NEURAL ACTIVA //',
      title: 'CARDBYTE DUNGEON',
      quote: 'El cielo sobre el puerto tenía el color de una pantalla de televisión, sintonizada en un canal muerto.',
      quoteSource: 'William Gibson // Neuromancer (1984)',
      subtext:
        'Un roguelike táctico de construcción de mazos nacido bajo la lluvia y los neones del cyberpunk clásico. Hackea nodos, fractura el ICE Negro y extrae matrices de datos antes de que la retroalimentación fría tu ciberdeck.',
      ctaPlay: '>> INICIAR INCURSIÓN / JUGAR <<',
      ctaManuals: 'GRIMORIOS OFICIALES (PDF)',
      telemetry: {
        latency: 'LATENCIA: 06ms',
        iceLevel: 'AMENAZA: ICE NEGRO',
        engine: 'HOST: ONO-SENDAI 7',
        memory: 'BÚFER: 64KB RAM',
      },
    },
    genesis: {
      kicker: '// DESCOMPILANDO LA MATRIZ // ORIGEN DEL PROYECTO //',
      title: 'EL EXPERIMENTO DE ACELERACIÓN CON IA EN 48 HORAS',
      subtitle: 'Un tributo al ciberpunk clásico de 1984 orquestado mediante ingeniería agéntica de última generación.',
      quote: 'Todos esos momentos se perderán en el tiempo, como lágrimas en la lluvia... Es hora de morir.',
      quoteAuthor: '— Blade Runner (1982) // Roy Batty',
      p1: 'Cardbyte Dungeon nació como un laboratorio de ingeniería intensiva durante un fin de semana (48 horas): explorar cómo la Inteligencia Artificial Generativa moderna, guiada por especificaciones rigurosas (OpenSpec), permite diseñar, balancear, programar y publicar un roguelike indie completo desde cero.',
      p2: 'En lugar de emplear la IA para simple autocompletado, todo el desarrollo funcionó con orquestación agéntica: máquinas de estados deterministas, síntesis procedimental en Web Audio API, balance matemático de cartas, más de 80 páginas de grimorios con lore diegético y compilación automatizada de libros con pipelines en Python.',
      p3: 'Este proyecto combina la profunda pasión por el género cyberpunk fundacional (Gibson, Dick, Scott) con las herramientas que están redefiniendo el futuro de la ingeniería de software: donde el criterio humano dicta la arquitectura y la IA ejecuta con precisión.',
      pillarsTitle: 'PILARES DE ACELERACIÓN',
      pillars: [
        {
          title: 'Desarrollo Guiado por Especificaciones',
          desc: 'Contratos 100% deterministas con OpenSpec: especificaciones delta, validación automatizada y cero deriva entre diseño y código.',
        },
        {
          title: 'Flujos Agénticos Autónomos',
          desc: 'Copilotos de IA para balance de combate, generación procedural de grafos de nodos y transiciones con seguridad de tipos.',
        },
        {
          title: 'Audio Diegético & Construcción de Mundo',
          desc: 'Cero archivos de sonido externos. Síntesis matemática pura en el navegador que rinde tributo a sintetizadores analógicos retro.',
        },
      ],
      techTitle: 'ARQUITECTURA DEL SISTEMA & RADIOGRAFÍA',
      techSubtitle: 'Arquitectura modular, limpia y determinista diseñada para una respuesta táctil instantánea.',
      techCards: [
        {
          tag: 'MOTOR PRINCIPAL',
          name: 'React 19 + TypeScript',
          desc: 'Seguridad estricta de tipos, orquestación de hooks personalizados y desacoplamiento limpio entre portal y juego.',
        },
        {
          tag: 'ESTADO REACTIVO',
          name: 'Zustand 5 Store',
          desc: 'Única fuente de verdad inmutable para combate, modificación de barajas y persistencia local sin sobrecarga.',
        },
        {
          tag: 'SISTEMA VISUAL',
          name: 'Tailwind CSS v4',
          desc: 'Efectos scanlines CRT acelerados por GPU, bruma volumétrica y tipografía cinematográfica de alto contraste.',
        },
        {
          tag: 'SÍNTESIS DE AUDIO',
          name: 'WebAudio Procedural Synth',
          desc: 'Drone analógico inspirado en el Yamaha CS-80 de Vangelis con filtros oscilantes y clicks mecánicos táctiles.',
        },
        {
          tag: 'FRAMEWORK DE SPECS',
          name: 'OpenSpec (Spec-Driven)',
          desc: 'Planificación rigurosa de cambios, especificaciones delta y seguimiento estricto de tareas sin perder coherencia.',
        },
        {
          tag: 'COMPILADOR DE LIBROS',
          name: 'Pipeline en Python + Chrome Headless',
          desc: 'Compilador automatizado de Markdown a PDF con paginado diegético CSS Paged Media y portadas vectoriales SVG.',
        },
      ],
    },
    grimoires: {
      kicker: '// ARCHIVOS CANÓNICOS & PUBLICACIONES //',
      title: 'GRIMORIOS OFICIALES DEL OPERADOR',
      description:
        'Más de 80 páginas de lore ciberpunk diegético, tablas tácticas de combate, glosarios de terminal CRT y arte vectorial. Descarga las ediciones oficiales de colección en PDF con un solo clic.',
      coverAlt: 'Portada del Grimorio Canónico del Operador Cardbyte Dungeon',
      esCartridge: {
        tag: 'EDICIÓN EN ESPAÑOL // ES-MX',
        title: 'GRIMORIO DEL OPERADOR',
        subtitle: 'Edición Canónica de Colección',
        pages: '85 Páginas // Tamaño Carta (US Letter)',
        format: 'Dark Mode // The Void Edition // 47 MB',
        downloadLabel: 'DESCARGAR PDF (ES)',
        readOnlineLabel: 'LEER COMPENDIO',
      },
      enCartridge: {
        tag: 'ENGLISH COMPENDIUM // EN-US',
        title: 'OPERATOR MANUAL',
        subtitle: 'Canonical English Edition',
        pages: '82 Páginas // Tamaño Carta (US Letter)',
        format: 'Portada Vectorial // Listo para Impresión // 46 MB',
        downloadLabel: 'DESCARGAR PDF (EN)',
        readOnlineLabel: 'LEER COMPENDIO',
      },
      notice: 'Las descargas de PDF se distribuyen a través de la CDN de GitHub Releases sin rastreadores ni publicidad.',
    },
    architect: {
      kicker: '// ARQUITECTO DEL SISTEMA // NIVEL DE ACCESO: 05 //',
      title: 'CONOCE AL ARQUITECTO',
      badgeTitle: 'EXPEDIENTE BIOMÉTRICO // SEGURIDAD TYRELL CORP',
      authId: 'AUTH_ID: #0792-AH // PRUEBA VOIGHT-KAMPFF: APROBADA',
      name: 'ARTURO HERRERA',
      role: 'Senior Mobile Engineer // Estudiante de Ing. en Inteligencia Artificial',
      experience: 'Más de 7 años especializándose en desarrollo de aplicaciones Android',
      education: 'Estudiante de Ingeniería en Inteligencia Artificial (Hybridge)',
      bioP1:
        'Ingeniero de software con más de siete años escalando ecosistemas móviles de alto rendimiento en Android. Apasionado por la artesanía en el código, el diseño de arquitecturas robustas y la creación de experiencias digitales memorables.',
      bioP2:
        'Actualmente profundizando en la Ingeniería en Inteligencia Artificial, investigando la convergencia entre sistemas distribuidos, orquestación de agentes con LLMs y desarrollo guiado por especificaciones. Cardbyte Dungeon materializa esta visión: la velocidad de la IA aplicada con fundamentos sólidos de ingeniería.',
      scanPrompt: 'ESCÁNER BIOMÉTRICO LÁSER VOIGHT-KAMPFF',
      scanStatus: 'COINCIDENCIA BIOMÉTRICA: 99.98% [VERIFICADO]',
      linkedInCta: 'CONECTAR EN LINKEDIN >>',
      githubCta: 'EXPLORAR REPOSITORIO (GITHUB) >>',
      skills: [
        'Android SDK',
        'Kotlin & Java',
        'Arquitectura de Software',
        'Orquestación de Agentes IA',
        'OpenSpec',
        'TypeScript',
        'Web Audio API',
      ],
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // TERMINAL DEL OPERADOR 2049',
      note: 'Sin cookies de rastreo. Sin trampas de telemetría. Compilación 100% estática en el cliente.',
      openSource: 'Cardbyte Dungeon es software de código abierto. Licencia MIT.',
    },
  },
};
