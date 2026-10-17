import type { Localized } from './types'

/** Interface strings shared across features. Mission content lives next to each mission. */
export const ui = {
  newGame: { it: 'Nuova partita', en: 'New game' },
  language: { it: 'Lingua', en: 'Language' },
  copy: { it: 'copia', en: 'copy' },
  copied: { it: 'copiato', en: 'copied' },
  copyFailed: { it: 'seleziona a mano', en: 'select manually' },
  chooseMission: { it: 'Scegli la missione', en: 'Choose your mission' },
  rarity: {
    common: { it: 'Comune', en: 'Common' },
    uncommon: { it: 'Non comune', en: 'Uncommon' },
    rare: { it: 'Raro', en: 'Rare' },
    epic: { it: 'Epico', en: 'Epic' },
    legendary: { it: 'Leggendario', en: 'Legendary' },
  },
} satisfies Record<string, Localized | Record<string, Localized>>
