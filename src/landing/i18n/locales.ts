export type Locale = 'en' | 'es';

export interface QuoteItem {
  text: string;
  source: string;
}

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
    quotes: QuoteItem[];
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
      sublevel: 'ONO-SENDAI CYBERSPACE 7 // GATEWAY',
      jackIn: '>> JACK IN',
      audioActive: 'AUDIO [ON]',
      audioMuted: 'AUDIO [OFF]',
      romPatching: 'PATCHING_ROM: EN-US',
    },
    nav: {
      title: 'CARDBYTE // DUNGEON',
      story: 'GENESIS',
      manuals: 'GRIMOIRES',
      tech: 'ARCHITECTURE',
      operator: 'ARCHITECT',
    },
    hero: {
      kicker: '// PROTOCOL 0x1842 // NEURAL INTERFACE ONLINE //',
      title: 'CARDBYTE DUNGEON',
      quotes: [
        {
          text: 'The sky above the port was the color of television, tuned to a dead channel.',
          source: 'William Gibson // Neuromancer (1984)',
        },
        {
          text: 'All those moments will be lost in time, like tears in rain... Time to die.',
          source: 'Blade Runner (1982) // Roy Batty',
        },
        {
          text: 'Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.',
          source: 'The Matrix (1999) // Morpheus',
        },
        {
          text: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion.",
          source: 'Blade Runner (1982) // Roy Batty',
        },
        {
          text: 'Cyberspace. A consensual hallucination experienced daily by billions of legitimate operators.',
          source: 'William Gibson // Neuromancer (1984)',
        },
        {
          text: 'The Matrix is everywhere. It is all around us. Even now, in this very room.',
          source: 'The Matrix (1999) // Morpheus',
        },
      ],
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
      p1: 'Cardbyte Dungeon was born as an intensive 48-hour challenge: proving how modern Generative AI, guided by rigorous OpenSpec specification contracts, can design, balance, code, and ship a complete indie roguelike from scratch in a single weekend.',
      p2: 'Moving beyond simple autocomplete, the entire project ran on autonomous agent orchestration: deterministic combat state machines, procedural WebAudio synthesis, and an automated publishing pipeline compiling 80+ page publication-ready books.',
      p3: 'This project bridges early cyberpunk literature with modern software engineering: human architectural vision steering AI agents with total deterministic precision.',
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
      kicker: '// SYSTEM ARCHITECT // VERIFIED DOSSIER //',
      title: 'MEET THE ARCHITECT',
      badgeTitle: 'OPERATOR IDENTITY // CREDENTIAL ARCHIVE',
      authId: 'ID: #0792-AH // STATUS: VERIFIED',
      name: 'ARTURO HERRERA',
      role: 'Senior Android Engineer // AI Engineering Student',
      experience: '7+ Years of Android Engineering Experience',
      education: 'B.S. Artificial Intelligence Engineering Student (Hybridge)',
      bioP1:
        'Senior software engineer with over 7 years building production Android applications, focused on solid architecture, performance, and clean code.',
      bioP2:
        'Currently pursuing a B.S. in Artificial Intelligence Engineering. Cardbyte Dungeon represents the intersection of both worlds: senior mobile engineering discipline accelerated by autonomous AI agent workflows and spec-driven rigor.',
      scanPrompt: 'VOIGHT-KAMPFF BIOMETRIC LASER SCAN',
      scanStatus: 'BIOMETRIC MATCH: 99.98% [VERIFIED]',
      linkedInCta: 'CONNECT ON LINKEDIN',
      githubCta: 'EXPLORE REPOSITORY (GITHUB)',
      skills: [
        'Android SDK',
        'Kotlin',
        'Jetpack Compose',
        'System Architecture',
        'AI Agent Orchestration',
        'OpenSpec',
      ],
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // OPERATOR TERMINAL',
      note: 'No tracking cookies. No telemetry traps. 100% static client-side architecture.',
      openSource: 'Cardbyte Dungeon is open source software. MIT License.',
    },
  },
  es: {
    meta: {
      systemStatus: 'SISTEMA_LISTO // BÚFER 0x1842',
      sublevel: 'ONO-SENDAI CIBERESPACIO 7 // TERMINAL',
      jackIn: '>> CONECTAR',
      audioActive: 'AUDIO [ACTIVO]',
      audioMuted: 'AUDIO [MUTED]',
      romPatching: 'PARCHEANDO_ROM: ES-MX',
    },
    nav: {
      title: 'CARDBYTE // DUNGEON',
      story: 'GÉNESIS',
      manuals: 'GRIMORIOS',
      tech: 'ARQUITECTURA',
      operator: 'ARQUITECTO',
    },
    hero: {
      kicker: '// PROTOCOLO 0x1842 // INTERFAZ NEURAL ACTIVA //',
      title: 'CARDBYTE DUNGEON',
      quotes: [
        {
          text: 'El cielo sobre el puerto tenía el color de una pantalla de televisión, sintonizada en un canal muerto.',
          source: 'William Gibson // Neuromancer (1984)',
        },
        {
          text: 'Todos esos momentos se perderán en el tiempo, como lágrimas en la lluvia... Es hora de morir.',
          source: 'Blade Runner (1982) // Roy Batty',
        },
        {
          text: 'Por desgracia, nadie puede decirte qué es Matrix. Tienes que verla tú mismo.',
          source: 'The Matrix (1999) // Morfeo',
        },
        {
          text: 'He visto cosas que ustedes no creerían. Naves de ataque en llamas más allá del hombro de Orión.',
          source: 'Blade Runner (1982) // Roy Batty',
        },
        {
          text: 'Ciberespacio. Una alucinación consensual experimentada diariamente por miles de millones de operadores.',
          source: 'William Gibson // Neuromancer (1984)',
        },
        {
          text: 'Matrix nos rodea. Está por todas partes. Incluso ahora, en esta misma habitación.',
          source: 'The Matrix (1999) // Morfeo',
        },
      ],
      subtext:
        'Un roguelike táctico de construcción de mazos nacido bajo la lluvia y los neones del cyberpunk clásico. Hackea nodos, fractura el ICE Negro y extrae matrices de datos antes de que tu sistema se sobrecaliente.',
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
      p1: 'Cardbyte Dungeon nació como un reto de 48 horas: demostrar cómo la Inteligencia Artificial moderna, guiada por especificaciones rigurosas (OpenSpec), permite diseñar, balancear, programar y publicar un roguelike indie completo en un solo fin de semana.',
      p2: 'Lejos de usar la IA para simple autocompletado, todo el desarrollo operó con orquestación agéntica: máquinas de estados deterministas, síntesis procedimental en Web Audio API y compilación automatizada de grimorios de más de 80 páginas.',
      p3: 'El proyecto une la pasión por el cyberpunk fundacional con el futuro del desarrollo de software: donde la visión humana dicta la arquitectura y la IA ejecuta con absoluta precisión.',
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
      kicker: '// ARQUITECTO DEL SISTEMA // EXPEDIENTE VERIFICADO //',
      title: 'CONOCE AL ARQUITECTO',
      badgeTitle: 'IDENTIDAD DEL OPERADOR // ARCHIVO DE CREDENCIALES',
      authId: 'ID: #0792-AH // ESTADO: VERIFICADO',
      name: 'ARTURO HERRERA',
      role: 'Senior Android Engineer // Estudiante de Ing. en Inteligencia Artificial',
      experience: 'Más de 7 años de experiencia en Android',
      education: 'Estudiante de Ingeniería en Inteligencia Artificial (Hybridge)',
      bioP1:
        'Ingeniero de software con más de 7 años construyendo aplicaciones Android en producción, enfocado en arquitectura sólida, rendimiento y código limpio.',
      bioP2:
        'Actualmente curso la carrera de Ingeniería en Inteligencia Artificial. Cardbyte Dungeon materializa la unión de ambos mundos: disciplina de ingeniería móvil senior acelerada por agentes de IA y desarrollo guiado por especificaciones.',
      scanPrompt: 'ESCÁNER BIOMÉTRICO LÁSER VOIGHT-KAMPFF',
      scanStatus: 'COINCIDENCIA BIOMÉTRICA: 99.98% [VERIFICADO]',
      linkedInCta: 'CONECTAR EN LINKEDIN',
      githubCta: 'EXPLORAR EN GITHUB',
      skills: [
        'Android SDK',
        'Kotlin',
        'Jetpack Compose',
        'Arquitectura de Software',
        'Orquestación de Agentes IA',
        'OpenSpec',
      ],
    },
    footer: {
      corp: 'ONO-SENDAI CYBERSPACE CORP // TERMINAL DEL OPERADOR',
      note: 'Sin cookies de rastreo. Sin trampas de telemetría. Compilación 100% estática en el cliente.',
      openSource: 'Cardbyte Dungeon es software de código abierto. Licencia MIT.',
    },
  },
};
