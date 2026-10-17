import type { Localized, LocalizedList } from '@/i18n/types'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export type MissionId =
  | 'infra'
  | 'llm'
  | 'tokens'
  | 'weights'
  | 'picker'
  | 'ollama'
  | 'context'
  | 'arsenal'
  | 'agentsmd'
  | 'loop'
  | 'sandbox'
  | 'safety'
  | 'worktree'
  | 'sdd'

export type MissionMeta = {
  id: MissionId
  /** Short name for the mission select grid and the HUD. */
  nav: Localized
  /** Big heading of the section. */
  title: Localized
  /** Rarity encodes depth: common = basics, legendary = advanced workflow. */
  rarity: Rarity
  accent: string
}

/** Copy that every mission has: lead paragraph plus the closing Do / Don't block. */
export type MissionCopy = {
  lead: Localized
  dos: LocalizedList
  donts: LocalizedList
}

export const rarityColor: Record<Rarity, string> = {
  common: 'var(--rarity-common)',
  uncommon: 'var(--rarity-uncommon)',
  rare: 'var(--rarity-rare)',
  epic: 'var(--rarity-epic)',
  legendary: 'var(--rarity-legendary)',
}

export const MISSIONS: readonly MissionMeta[] = [
  {
    id: 'infra',
    nav: { it: 'Infrastruttura', en: 'Infrastructure' },
    title: { it: 'La mappa del territorio', en: 'Map of the territory' },
    rarity: 'common',
    accent: 'var(--cyan)',
  },
  {
    id: 'llm',
    nav: { it: "Cos'è un LLM", en: 'What is an LLM' },
    title: { it: "Cos'è un LLM", en: 'What is an LLM' },
    rarity: 'common',
    accent: 'var(--green)',
  },
  {
    id: 'tokens',
    nav: { it: 'Token e context window', en: 'Tokens and context window' },
    title: { it: 'Token e context window', en: 'Tokens and context window' },
    rarity: 'uncommon',
    accent: 'var(--green)',
  },
  {
    id: 'weights',
    nav: { it: 'Open vs closed weight', en: 'Open vs closed weight' },
    title: { it: 'Open vs closed weight', en: 'Open vs closed weight' },
    rarity: 'uncommon',
    accent: 'var(--blue)',
  },
  {
    id: 'picker',
    nav: { it: 'Scegli il modello', en: 'Pick the model' },
    title: { it: 'Scegli il modello', en: 'Pick the model' },
    rarity: 'uncommon',
    accent: 'var(--cyan)',
  },
  {
    id: 'ollama',
    nav: { it: 'Modello locale con Ollama', en: 'Local model with Ollama' },
    title: { it: 'Un modello sul tuo laptop', en: 'A model on your laptop' },
    rarity: 'rare',
    accent: 'var(--blue)',
  },
  {
    id: 'context',
    nav: { it: 'Context engineering', en: 'Context engineering' },
    title: { it: 'Context engineering', en: 'Context engineering' },
    rarity: 'rare',
    accent: 'var(--purple)',
  },
  {
    id: 'arsenal',
    nav: { it: 'Agent, skill, hook e soci', en: 'Agents, skills, hooks and co.' },
    title: { it: "L'arsenale", en: 'The arsenal' },
    rarity: 'epic',
    accent: 'var(--purple)',
  },
  {
    id: 'agentsmd',
    nav: { it: 'AGENTS.md', en: 'AGENTS.md' },
    title: { it: 'AGENTS.md su tre livelli', en: 'AGENTS.md on three levels' },
    rarity: 'epic',
    accent: 'var(--purple)',
  },
  {
    id: 'loop',
    nav: { it: 'Agent loop', en: 'Agent loop' },
    title: { it: "L'agent loop", en: 'The agent loop' },
    rarity: 'epic',
    accent: 'var(--purple)',
  },
  {
    id: 'sandbox',
    nav: { it: 'Permessi vs sandbox', en: 'Permissions vs sandbox' },
    title: { it: 'Permessi vs sandbox', en: 'Permissions vs sandbox' },
    rarity: 'legendary',
    accent: 'var(--orange)',
  },
  {
    id: 'safety',
    nav: { it: 'Reti di sicurezza', en: 'Safety nets' },
    title: { it: 'Reti di sicurezza', en: 'Safety nets' },
    rarity: 'legendary',
    accent: 'var(--orange)',
  },
  {
    id: 'worktree',
    nav: { it: 'Agenti in parallelo', en: 'Parallel agents' },
    title: { it: 'Agenti in parallelo', en: 'Parallel agents' },
    rarity: 'legendary',
    accent: 'var(--orange)',
  },
  {
    id: 'sdd',
    nav: { it: 'Spec driven development', en: 'Spec driven development' },
    title: { it: 'Spec driven development', en: 'Spec driven development' },
    rarity: 'legendary',
    accent: 'var(--orange)',
  },
]

export const missionAnchor = (id: MissionId) => `m-${id}`

export const missionNumber = (id: MissionId) => MISSIONS.findIndex((m) => m.id === id) + 1

export const getMission = (id: MissionId): MissionMeta => {
  const meta = MISSIONS.find((m) => m.id === id)
  if (!meta) throw new Error(`Unknown mission ${id}`)
  return meta
}
