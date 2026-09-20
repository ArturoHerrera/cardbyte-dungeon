import { TranslationDictionary } from './types';

export const es: TranslationDictionary = {
  common: {
    back: 'VOLVER',
    close: 'CERRAR',
    confirm: 'CONFIRMAR',
    cancel: 'CANCELAR',
    deckBrand: 'ONO-SENDAI 7',
    layer: 'NIVEL',
    hex: 'HEX',
  },
  topbar: {
    integrity: 'INTEGRIDAD:',
    buffer: 'BUFFER:',
    ram: 'RAM:',
    returnToMatrix: 'MATRIZ',
    deckLabel: 'DECK',
    subroutines: 'SUBRUTINAS',
    systemDump: 'VOLCADO',
    cyberdeckProfile: 'PERFIL',
  },
  titleScreen: {
    systemTitle: 'CARDBYTE DUNGEON',
    subtitle: 'ONO-SENDAI CIBERESPACIO 7 // TERMINAL DE INTERFAZ NEURAL',
    jackIn: 'CONECTAR [NUEVA INCURSIÓN]',
    resumeRun: 'REANUDAR INCURSIÓN [SESIÓN ACTIVA]',
    accessProfile: 'PERFIL DE CIBERDECK [ESTADÍSTICAS]',
    systemDump: 'VOLCADO DEL SISTEMA [ROM / DEPURACIÓN]',
    activeSessionDetected: 'SESIÓN ACTIVA DETECTADA // MEMORIA PERSISTIDA',
    floorInfo: 'NIVEL: {{floor}}/7',
    hpInfo: 'INTEGRIDAD: {{hp}}/{{maxHp}}',
    terminalStatus: 'BIOS: ONO-SENDAI v4.02 // HOST: MATRIZ CIBERESPACIAL // AUDIO: {{audioStatus}}',
    version: 'REV 1.0.4 - PROTOCOLO GIBSON-84',
    statusReady: 'SISTEMA LISTO // ESPERANDO COMANDOS DEL OPERADOR',
  },
  map: {
    cyberspaceGraph: 'GRAFO DE LA MATRIZ // SELECCIÓN DE RUTA TÁCTICA',
    sectorStatus: 'TOPOLOGÍA DE SECTOR',
    completed: 'ASEGURADO',
    accessible: 'ACTIVO',
    encrypted: 'ENCRIPTADO',
    nodeCombat: 'Nodo ICE',
    nodeElite: 'ICE de Élite',
    nodeRest: 'Nodo de Caché',
    nodeTreasure: 'Bóveda de Datos',
    nodeBoss: 'Núcleo Wintermute',
  },
  combat: {
    targetHostile: 'ICE HOSTIL OBJETIVO',
    defense: 'DEFENSA',
    subroutinesInRAM: 'SUBRUTINAS EN RAM (MANO)',
    discardBuffer: 'BUFFER DE DESCARTE',
    ramWarning: 'CICLOS DE RAM INSUFICIENTES PARA EJECUTAR SUBRUTINA',
    endCycle: 'FIN DE CICLO [TURNO]',
    enemyTurnBanner: 'ICE HOSTIL CALCULANDO VECTORES DE ATAQUE...',
    victoryBanner: 'ICE HOSTIL NEUTRALIZADO // ACCESO CONCEDIDO',
    proceedToMatrix: 'AVANZAR ENLACE [CONTINUAR]',
    logs: {
      playerTurn: '--- CICLO {{turn}} // FASE DEL OPERADOR ---',
      enemyTurn: '--- CONTRAMEDIDA DE ICE HOSTIL ---',
      playerAttack: 'El operador ejecutó {{card}} infligiendo {{dmg}} daño neural.',
      playerBlock: 'El operador levantó firewall ICE-Buffer de {{val}} puntos.',
      playerStatus: 'Inyectado estado {{status}} al ICE hostil.',
      enemyAttack: 'ICE hostil ejecutó {{action}} infligiendo {{dmg}} de daño.',
      enemyBlock: 'ICE hostil generó escudo defensivo de {{val}} puntos.',
      enemyDefeated: 'Nodo de ICE hostil descompilado. Victoria confirmada.',
      playerFlatlined: 'RETROALIMENTACIÓN NEURAL CRÍTICA: FLATLINE DETECTADO.',
      poisonDamage: 'Código corrupto hostil causó {{dmg}} de daño por veneno al núcleo.',
    },
  },
  cards: {
    starter_strike: {
      name: 'Spike Lógico',
      desc: 'Inyecta un ejecutable directo causando {{val}} de daño neural.',
    },
    starter_defend: {
      name: 'ICE-Buffer',
      desc: 'Levanta firewall protegiendo contra {{val}} de retroalimentación.',
    },
    starter_bash: {
      name: 'Rompehielos',
      desc: 'Martillo militar pesado infligiendo {{dmg}} de daño y desencriptando al objetivo ({{vuln}} Vulnerable).',
    },
    logic_worm: {
      name: 'Gusano Lógico',
      desc: 'Corrompe la memoria anfitriona. Aplica {{val}} de Veneno directo al HP cada ciclo.',
    },
    packet_jam: {
      name: 'Saturación de Paquetes',
      desc: 'Estrangula la conexión. Aplica {{weak}} Débil (-25% daño) y otorga {{block}} ICE-Buffer.',
    },
    overclock: {
      name: 'Overclock',
      desc: 'Fuerza ciclos. Gana {{ram}} RAM y roba {{draw}} subrutina. Sufre {{heat}} daño térmico al fin del turno.',
    },
    system_purge: {
      name: 'Purga del Sistema',
      desc: 'Limpia procesos rebeldes y levanta escudo reforzado (+{{val}} ICE-Buffer).',
    },
    bruteforce: {
      name: 'Fuerza Bruta',
      desc: 'Inunda canales de memoria infligiendo {{val}} de impacto masivo.',
    },
    execute: {
      name: 'Ejecutar',
      desc: 'Exploit dirigido. Causa {{val}} de daño (se duplica a 16 si el objetivo está Desencriptado/Vulnerable).',
    },
    neuro_toxin: {
      name: 'Neuro-Toxina',
      desc: 'Inyección letal de biochip. Aplica {{poison}} de Veneno y {{vuln}} Vulnerable.',
    },
    firewall_aura: {
      name: 'Aura Firewall',
      desc: 'Perímetro de alto voltaje. Gana {{block}} ICE-Buffer y ralentiza nodos hostiles con {{weak}} Débil.',
    },
  },
  enemies: {
    bit_bug: {
      name: 'Bit-Bug (Daemon de Rastreo)',
      intents: {
        attack_swarm: 'Enjambre de Paquetes ({{val}} daño)',
        corrupt_bite: 'Mordida Corrupta ({{val}} daño)',
        hard_shell: 'Cáscara Blindada (+{{val}} defensa)',
      },
    },
    memory_brute: {
      name: 'Memory-Brute (Black ICE)',
      intents: {
        reinforce: 'Reforzar ICE (+{{val}} defensa)',
        overcharge: 'Sobrecargar Condensadores (Buff)',
        sledge: 'Mazo Lógico ({{val}} daño)',
      },
    },
    daemon_cultist: {
      name: 'Daemon-Cultista (Subrutina)',
      intents: {
        decrypt: 'Desencriptar Puertos (Aplica {{val}} Vulnerable)',
        hex: 'Maleficio Oscuro ({{val}} daño)',
        flail: 'Mayal Lógico ({{val}} daño)',
      },
    },
    wintermute: {
      name: 'WINTERMUTE (Núcleo IA Rebelde)',
      intents: {
        core_discharge: 'Descarga del Núcleo ({{val}} daño)',
        subroutine_loop: 'Bucle de Subrutinas (+{{block}} defensa, +{{vuln}} Vulnerable)',
        glitch_injection: 'Inyección de Glitch ({{val}} daño)',
        tessier_enrage: 'Protocolo de Furia Tessier (+{{val}} Poder de Núcleo)',
      },
    },
  },
  rewards: {
    cardRewardTitle: 'BÓVEDA DE MEMORIA DESENCRIPTADA // SELECCIONAR RECOMPENSA',
    cardRewardSubtitle: 'Elige 1 subrutina para compilar y guardar en la ROM de tu ciberdeck:',
    skipReward: 'OMITIR BÓVEDA [SALTAR RECOMPENSA]',
    addedToDeck: 'Subrutina {{name}} compilada y cargada a la ROM del ciberdeck.',
  },
  rest: {
    title: 'NODO DE CACHÉ DESCONECTADO // SUBNET SEGURA',
    subtitle: 'Selecciona una rutina de mantenimiento antes de reingresar al ciberespacio:',
    cooldownTitle: 'ENFRIAMIENTO DE NÚCLEO // REPARAR ENLACE NEURAL',
    cooldownDesc: 'Disipa calor y restaura +{{hp}} de integridad neural (HP).',
    patchTitle: 'REFACTORIZACIÓN DE CÓDIGO // PARCHEAR SUBRUTINA',
    patchDesc: 'Compila una mejora (+) persistente a una subrutina de tu deck.',
    purgeTitle: 'DEPURAR SUBRUTINA // SANITIZAR MEMORIA',
    purgeDesc: 'Elimina permanentemente una subrutina de la ROM para depurar y afinar el mazo.',
    executeCooldown: 'INICIAR ENFRIAMIENTO',
    executePatch: 'SELECCIONAR SUBRUTINA A PARCHEAR',
    executePurge: 'SELECCIONAR SUBRUTINA A DEPURAR',
    selectCardPrompt: 'SELECCIONA UNA SUBRUTINA A COMPILAR (+)',
    selectPurgePrompt: 'SELECCIONA UNA SUBRUTINA A ELIMINAR PERMANENTEMENTE',
    fullyPatched: 'Todas las subrutinas compatibles ya han sido mejoradas.',
    minBufferWarning: 'BLOQUEO DE BUFFER MÍNIMO: El mazo debe conservar al menos 4 subrutinas para evitar un bloqueo del sistema.',
  },
  treasure: {
    title: 'BÓVEDA DE DATOS MILITAR DESPROTEGIDA',
    subtitle: 'Has descubierto un volcado corporativo de alta prioridad abandonado.',
    extractSubroutine: 'EXTRAER SUBRUTINA DE DATOS',
    purgeAndLeave: 'OMITIR BÓVEDA [CONTINUAR]',
  },
  victory: {
    title: 'INCURSIÓN EN EL CIBERESPACIO EXITOSA',
    subtitle: 'EL MAINFRAME DE WINTERMUTE HA SIDO COMPLETAMENTE DESCOMPILADO',
    wintermuteDecrypted: 'Enlace neural asegurado. La inteligencia artificial ha sido desmembrada en puertas lógicas desconectadas. El estado de tu ciberdeck ha sido registrado en los anales de la matriz.',
    systemLogs: 'TELEMETRÍA DEL RESUMEN DE INCURSIÓN',
    returnToTerminal: 'DESCONECTAR // JACK OUT [VOLVER AL TÍTULO]',
  },
  gameOver: {
    title: 'FLATLINE CRÍTICO // CONEXIÓN INTERRUMPIDA',
    subtitle: 'RETROALIMENTACIÓN NEURAL DESTRUYÓ EL BUFFER DEL CIBERDECK',
    cause: 'La integridad del enlace neural cayó a 0. Los biomonitores detectaron desfibrilación cardíaca fatal a través de los puertos de la consola.',
    rebootDeck: 'REINICIAR CIBERDECK [TÍTULO PRINCIPAL]',
  },
  modals: {
    deckView: {
      title: 'BUFFER DE MEMORIA DEL CIBERDECK',
      subtitle: 'SUBRUTINAS INSTALADAS Y LÓGICA DE KERNEL',
      subroutinesTotal: 'TOTAL DE SUBRUTINAS: {{count}}',
    },
    profile: {
      title: 'PERFIL DEL OPERADOR Y ESTADÍSTICAS DEL CIBERDECK',
      alias: 'ALIAS DE CONSOLA: VAQUERO ONO-SENDAI',
      totalRuns: 'TOTAL DE INCURSIONES:',
      victories: 'QUIEBRES DE MAINFRAME (VICTORIAS):',
      flatlines: 'FLATLINES TERMINALES:',
      highestLayer: 'NIVEL MÁS PROFUNDO ALCANZADO:',
      systemSignature: 'FIRMA: CASE_NEUROMANCER_0x1984',
    },
    romDump: {
      title: 'VOLCADO CRUDO DE LA ROM DEL SISTEMA',
      subtitle: 'INSPECTOR DE PERSISTENCIA LOCALSTORAGE',
      copyJson: 'COPIAR JSON CRUDO',
      copied: 'COPIADO AL PORTAPAPELES',
      wipeStorage: 'BORRAR ALMACENAMIENTO LOCAL',
      wipeConfirmPrompt: '¿Seguro que deseas borrar todos los datos locales? Esto reiniciará las incursiones y estadísticas de perfil.',
    },
  },
  codex: {
    title: 'CÓDICE DEL OPERADOR // MANUAL ONO-SENDAI',
    subtitle: 'MANUAL DE REFERENCIA TÁCTICA PARA COMBATE EN EL CIBERESPACIO Y NAVEGACIÓN EN LA MATRIZ',
    categories: {
      basics: 'FUNDAMENTOS',
      combat: 'COMBATE Y ACCIONES',
      status: 'ESTADOS ALTERADOS',
      matrix: 'NAVEGACIÓN EN LA MATRIZ',
    },
    entries: {
      deck_ram: {
        title: 'RAM del Ciberdeck (Energía de Ejecución)',
        desc: 'En cada ciclo de combate, tu consola repone 3 unidades de RAM. Cada subrutina consume un costo exacto de RAM para ejecutarse. La RAM no utilizada se disipa al concluir el turno a menos que cuentes con hardware especializado.',
      },
      neural_integrity: {
        title: 'Integridad Neural (Salud del Jugador)',
        desc: 'Mide la resistencia biológica y neurosináptica de tu organismo. Si la integridad llega a 0, la sobrecarga neural provoca un flatline terminal, abortando la incursión.',
      },
      turn_cycle: {
        title: 'Estructura del Ciclo de Turnos',
        desc: 'Cada turno consta de una Fase del Jugador seguida por una Fase del Enemigo. Juega subrutinas y finaliza con TERMINAR CICLO. El nodo hostil ejecutará de inmediato su intención telegrafiada.',
      },
      ice_buffer: {
        title: 'Buffer ICE (Cortafuegos Defensivo)',
        desc: 'Los escudos ICE generan un buffer temporal. Todo daño entrante es absorbido por el buffer antes de dañar tu Integridad Neural. ¡Atención: el buffer ICE se reinicia a 0 al inicio de tu turno!',
      },
      card_pipeline: {
        title: 'Canal de Ejecución de Subrutinas',
        desc: 'Las cartas resuelven sus efectos de forma atómica y ordenada: impactos de daño, despliegue de escudos e inyección de debuffs. Si una carta recarga RAM o roba rutinas adicionales, se reflejan al instante en la mano.',
      },
      hostile_intents: {
        title: 'Telemetría Hostil (Intenciones del Enemigo)',
        desc: 'Los constructos ICE transmiten su próxima acción calculada sobre su chasis. Utiliza esta predicción para sopesar la defensa preventiva frente a ráfagas ofensivas.',
      },
      vulnerable: {
        title: 'Vulnerable (Debuff de Blanco)',
        desc: 'Las entidades vulnerables reciben un 50% de daño adicional por ataques (Math.floor(DMG * 1.5)). Las acumulaciones se reducen en 1 al terminar la ronda.',
      },
      weak: {
        title: 'Débil / Weak (Atenuación de Ataque)',
        desc: 'Las entidades debilitadas infligen un 25% menos de daño de ataque (Math.floor(DMG * 0.75)). Las acumulaciones disminuyen en 1 al concluir el ciclo.',
      },
      poison_corruption: {
        title: 'Corrupción por Veneno (Fuga Lógica)',
        desc: 'Fuga de código que inflige daño directo a los puntos de integridad igual a las cargas de veneno al iniciar el turno, ¡traspasando por completo cualquier escudo ICE! Se reduce en 1 por turno (Jefes y enemigos Acorazados purgan 2 cargas por turno gracias a contramedidas antivirus).',
      },
      matrix_topology: {
        title: 'Topología de Sectores en la Matriz',
        desc: 'El ciberespacio está estructurado como un grafo dirigido de 8 capas. Solo puedes avanzar a nodos adyacentes conectados. Planifica tu ruta para equilibrar riesgos de combate y recompensas.',
      },
      data_caches: {
        title: 'Cachés de Datos y Recompensas',
        desc: 'Neutralizar un nodo hostil permite desencriptar cachés con nuevas subrutinas para expandir y perfeccionar tu mazo principal.',
      },
      decompression_nodes: {
        title: 'Nodos de Descompresión (Áreas de Descanso)',
        desc: 'Terminales seguras que permiten enfriar procesadores (+30% HP), parchear una subrutina (+ mejora) o depurar una carta obsoleta de la ROM (con salvaguarda obligatoria de al menos 4 cartas).',
      },
      holographic_cartridges: {
        title: 'Cartuchos ROM Holográficos',
        desc: 'Las subrutinas residen en cartuchos ROM tácticos con arte neuronal dedicado, celda de RAM neón de alta visibilidad y chips de impacto estadístico instantáneo ([DMG], [BLOCK], [VULN]). Las subrutinas optimizadas (UPG+) y chips de grado militar (RARE) proyectan un brillo prismático foil holográfico.',
      },
      hostile_constructs: {
        title: 'Telemetría y Viewport de ICE Hostil',
        desc: 'Las entidades hostiles de la red son monitoreadas mediante un visor de escaneo activo con telemetría ciberdeck. Los constructos regulares abarcan Bit-Bugs, Memory-Brutes y Daemon-Cultists. Las élites Apex-ICE exhiben afijos térmicos volátiles, mientras que la IA renegada WINTERMUTE se manifiesta como una deidad matricial omnipotente.',
      },
    },
  },
  tutorial: {
    startSimulation: 'PROTOCOLO DE SIMULACIÓN [TUTORIAL]',
    simTitle: 'PROTOCOLO DE SIMULACIÓN // SECUENCIA DE ARRANQUE',
    simBadge: 'ENTORNO DE PRUEBAS // SANDBOX',
    droneName: 'DRON DE ENTRENAMIENTO // PROTO_0',
    objective: 'OBJETIVO:',
    steps: {
      step1: {
        instruction: 'Ejecuta tu subrutina [Spike Lógico] para infligir daño al Dron de Entrenamiento.',
        tip: 'Dispones de 3 RAM. Jugar Spike Lógico cuesta 1 RAM e inflige 6 de daño.',
      },
      step2: {
        instruction: '¡El dron va a atacar con 6 DMG! Juega [ICE-Buffer] para absorber el impacto y pulsa TERMINAR CICLO.',
        tip: 'ICE-Buffer genera 5 de buffer defensivo. El remanente afectará tu integridad si no lo bloqueas.',
      },
      step3: {
        instruction: 'Inyecta debuffs: Juega [Rompehielos] para hacer Vulnerable al dron, ¡luego ataca con fuerza!',
        tip: 'El estado Vulnerable amplifica todo daño recibido por 1.5x.',
      },
      step4: {
        instruction: 'Combina tus subrutinas restantes y neutraliza al Dron de Entrenamiento.',
        tip: 'Al destruir el dron completarás la certificación del operador.',
      },
    },
    victoryTitle: 'SIMULACIÓN COMPLETADA CON ÉXITO',
    victorySubtitle: 'TODOS LOS SUBSISTEMAS VERIFICADOS // OPERADOR CERTIFICADO',
    startRealRun: 'CONECTARSE A LA MATRIZ REAL [INICIAR]',
    returnToMenu: 'VOLVER AL TERMINAL DE TÍTULO',
  },
  sysAssist: {
    toggleLabel: 'HUD SYS_ASSIST',
    hints: {
      ram: {
        title: 'CICLOS DE RAM DEL CIBERDECK',
        body: 'Energía disponible para ejecutar subrutinas. Se recarga automáticamente a 3 al inicio de cada turno.',
      },
      ice: {
        title: 'BUFFER ICE (CORTAFUEGOS)',
        body: 'Escudo protector activo. Absorbe el daño de ataques enemigos antes de tu integridad. Se reinicia a 0 cada turno.',
      },
      intent: {
        title: 'TELEMETRÍA DE INTENCIÓN HOSTIL',
        body: 'Acción calculada que el enemigo ejecutará de forma inevitable cuando finalices tu ciclo.',
      },
      hand: {
        title: 'SUBRUTINAS EN MEMORIA RAM (MANO)',
        body: 'Cartas extraídas de tu mazo. Pasa el cursor para inspeccionar sus parámetros y costos.',
      },
      endCycle: {
        title: 'CONTROL DE FIN DE CICLO',
        body: 'Concluye tu fase de acción y da paso a la resolución del vector de ataque enemigo.',
      },
      discard: {
        title: 'BUFFER DE DESCARTE',
        body: 'Subrutinas ejecutadas o descartadas. Se reciclan de vuelta a la pila de robo cuando se vacía.',
      },
    },
  },
};

