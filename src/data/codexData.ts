export type CodexCategory = 'basics' | 'combat' | 'status' | 'matrix';

export interface CodexEntry {
  id: string;
  category: CodexCategory;
  titleKey: string;
  descKey: string;
  icon: string;
  tag: string;
}

export const CODEX_CATEGORIES: { id: CodexCategory; nameKey: string; icon: string }[] = [
  { id: 'basics', nameKey: 'codex.categories.basics', icon: '⚡' },
  { id: 'combat', nameKey: 'codex.categories.combat', icon: '⚔️' },
  { id: 'status', nameKey: 'codex.categories.status', icon: '☣️' },
  { id: 'matrix', nameKey: 'codex.categories.matrix', icon: '🌐' },
];

export const CODEX_ENTRIES: CodexEntry[] = [
  // BASICS
  {
    id: 'deck_ram',
    category: 'basics',
    titleKey: 'codex.entries.deck_ram.title',
    descKey: 'codex.entries.deck_ram.desc',
    icon: '⚡',
    tag: 'SYS_RES',
  },
  {
    id: 'neural_integrity',
    category: 'basics',
    titleKey: 'codex.entries.neural_integrity.title',
    descKey: 'codex.entries.neural_integrity.desc',
    icon: '❤️',
    tag: 'FLESH_HP',
  },
  {
    id: 'turn_cycle',
    category: 'basics',
    titleKey: 'codex.entries.turn_cycle.title',
    descKey: 'codex.entries.turn_cycle.desc',
    icon: '🔄',
    tag: 'CYCLE',
  },

  // COMBAT
  {
    id: 'ice_buffer',
    category: 'combat',
    titleKey: 'codex.entries.ice_buffer.title',
    descKey: 'codex.entries.ice_buffer.desc',
    icon: '🛡️',
    tag: 'DEFENSE',
  },
  {
    id: 'card_pipeline',
    category: 'combat',
    titleKey: 'codex.entries.card_pipeline.title',
    descKey: 'codex.entries.card_pipeline.desc',
    icon: '💾',
    tag: 'ACTION',
  },
  {
    id: 'hostile_intents',
    category: 'combat',
    titleKey: 'codex.entries.hostile_intents.title',
    descKey: 'codex.entries.hostile_intents.desc',
    icon: '👁️',
    tag: 'TELEMETRY',
  },

  // STATUS EFFECTS
  {
    id: 'vulnerable',
    category: 'status',
    titleKey: 'codex.entries.vulnerable.title',
    descKey: 'codex.entries.vulnerable.desc',
    icon: '🎯',
    tag: 'DEBUFF',
  },
  {
    id: 'weak',
    category: 'status',
    titleKey: 'codex.entries.weak.title',
    descKey: 'codex.entries.weak.desc',
    icon: '📉',
    tag: 'DEBUFF',
  },
  {
    id: 'poison_corruption',
    category: 'status',
    titleKey: 'codex.entries.poison_corruption.title',
    descKey: 'codex.entries.poison_corruption.desc',
    icon: '☣️',
    tag: 'CORRUPTION',
  },

  // MATRIX NAVIGATION
  {
    id: 'matrix_topology',
    category: 'matrix',
    titleKey: 'codex.entries.matrix_topology.title',
    descKey: 'codex.entries.matrix_topology.desc',
    icon: '🕸️',
    tag: 'GRAPH',
  },
  {
    id: 'data_caches',
    category: 'matrix',
    titleKey: 'codex.entries.data_caches.title',
    descKey: 'codex.entries.data_caches.desc',
    icon: '💎',
    tag: 'REWARD',
  },
  {
    id: 'decompression_nodes',
    category: 'matrix',
    titleKey: 'codex.entries.decompression_nodes.title',
    descKey: 'codex.entries.decompression_nodes.desc',
    icon: '☕',
    tag: 'REST_SITE',
  },
];
