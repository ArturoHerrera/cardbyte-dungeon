export interface SysAssistHint {
  id: string;
  titleKey: string;
  bodyKey: string;
  hotkey?: string;
}

export const SYS_ASSIST_HINTS: Record<string, SysAssistHint> = {
  ram_counter: {
    id: 'ram_counter',
    titleKey: 'sysAssist.hints.ram.title',
    bodyKey: 'sysAssist.hints.ram.body',
  },
  ice_buffer: {
    id: 'ice_buffer',
    titleKey: 'sysAssist.hints.ice.title',
    bodyKey: 'sysAssist.hints.ice.body',
  },
  enemy_intent: {
    id: 'enemy_intent',
    titleKey: 'sysAssist.hints.intent.title',
    bodyKey: 'sysAssist.hints.intent.body',
  },
  hand_ribbon: {
    id: 'hand_ribbon',
    titleKey: 'sysAssist.hints.hand.title',
    bodyKey: 'sysAssist.hints.hand.body',
  },
  end_cycle: {
    id: 'end_cycle',
    titleKey: 'sysAssist.hints.endCycle.title',
    bodyKey: 'sysAssist.hints.endCycle.body',
  },
  discard_pile: {
    id: 'discard_pile',
    titleKey: 'sysAssist.hints.discard.title',
    bodyKey: 'sysAssist.hints.discard.body',
  },
};
