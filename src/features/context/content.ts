import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const contextCopy: MissionCopy = {
  lead: {
    it: 'Il prompt è una frase, il contesto è _tutto il loadout_. Il lavoro è mettere dentro il minimo indispensabile, al momento giusto.',
    en: 'The prompt is a sentence, the context is _the whole loadout_. The job is to put in the bare minimum, at the right time.',
  },
  dos: {
    it: [
      'Una sessione = un task. Sessione nuova per il task nuovo.',
      'Indica i file di partenza (`@src/.../MatchService.kt`) invece di "guarda il progetto".',
      "Delega l'esplorazione rumorosa a un sub-agent: torna solo la conclusione.",
      'Persisti piani e decisioni su file, non nella chat.',
    ],
    en: [
      'One session = one task. New session for the new task.',
      'Point to the starting files (`@src/.../MatchService.kt`) instead of "look at the project".',
      'Delegate noisy exploration to a sub-agent: only the conclusion comes back.',
      'Persist plans and decisions in files, not in the chat.',
    ],
  },
  donts: {
    it: [
      'Insistere nella stessa sessione dopo tre tentativi falliti: il contesto è inquinato, ricomincia con quello che hai imparato.',
      'Abilitare tutti i server MCP sempre: ogni tool definito costa token a ogni turno.',
      'Mettere segreti nel contesto, anche "solo per un attimo".',
    ],
    en: [
      'Pushing on in the same session after three failed attempts: the context is polluted, restart with what you learned.',
      'Enabling every MCP server all the time: each defined tool costs tokens on every turn.',
      'Putting secrets in the context, even "just for a moment".',
    ],
  },
}

export type LoadoutItem = {
  id: string
  name: Localized
  k: number
  relevant: boolean
  /** Putting this in the context is a security problem, not just noise. */
  secret?: true
}

/** The system prompt and built-in tool definitions are always there. */
export const BASE_K = 16
export const BUDGET_K = 200
/** Above this share of the window, quality starts dropping (context rot). */
export const ROT_THRESHOLD = 0.6

export const LOADOUT: readonly LoadoutItem[] = [
  { id: 'agents', name: { it: 'AGENTS.md di progetto', en: 'Project AGENTS.md' }, k: 3, relevant: true },
  { id: 'ctrl', name: { it: 'MatchController.kt', en: 'MatchController.kt' }, k: 4, relevant: true },
  { id: 'svc', name: { it: 'MatchService.kt', en: 'MatchService.kt' }, k: 5, relevant: true },
  {
    id: 'tests',
    name: { it: 'Test esistenti di /matches', en: 'Existing /matches tests' },
    k: 6,
    relevant: true,
  },
  { id: 'spec', name: { it: 'Spec 004-filtro-eta', en: 'Spec 004-age-filter' }, k: 2, relevant: true },
  { id: 'schema', name: { it: 'Schema tabella dogs', en: 'dogs table schema' }, k: 2, relevant: true },
  { id: 'repo', name: { it: 'Tutto il repository', en: 'The whole repository' }, k: 140, relevant: false },
  {
    id: 'log',
    name: { it: 'Log completo di build (8k righe)', en: 'Full build log (8k lines)' },
    k: 45,
    relevant: false,
  },
  {
    id: 'chat',
    name: { it: 'Chat di ieri sul login', en: "Yesterday's chat about login" },
    k: 30,
    relevant: false,
  },
  {
    id: 'mcp',
    name: { it: '10 server MCP "nel dubbio"', en: '10 MCP servers "just in case"' },
    k: 35,
    relevant: false,
  },
  {
    id: 'env',
    name: { it: '.env con le credenziali', en: '.env with credentials' },
    k: 1,
    relevant: false,
    secret: true,
  },
  { id: 'readme', name: { it: 'README del framework', en: 'Framework README' }, k: 25, relevant: false },
]

export const loadoutCopy = {
  title: { it: 'Prepara il loadout', en: 'Build the loadout' },
  hint: {
    it: 'Task: **"Aggiungi il filtro per età all\'endpoint /matches"**. Scegli cosa mettere nel contesto, poi verifica. La linea rossa è il 60%: oltre, la qualità inizia a calare.',
    en: 'Task: **"Add the age filter to the /matches endpoint"**. Pick what goes into the context, then check. The red line is 60%: beyond it, quality starts dropping.',
  },
  check: { it: 'Verifica il loadout', en: 'Check the loadout' },
  reshuffle: { it: 'Rimescola', en: 'Reshuffle' },
  selected: {
    it: 'Selezionati: {n}. Quando sei pronto, verifica.',
    en: "Selected: {n}. When you're ready, check it.",
  },
  verdict: {
    secret: {
      it: 'Critico: hai messo dei segreti nel contesto. Finiscono nei log del provider e nelle tracce.',
      en: 'Critical: you put secrets in the context. They end up in provider logs and traces.',
    },
    rot: {
      it: 'Context rot: oltre il 60% la qualità cala e paghi tutto a ogni turno.',
      en: 'Context rot: past 60% quality drops and you pay for all of it on every turn.',
    },
    noise: {
      it: 'Rumore nel loadout: {items}. Costa token e distrae.',
      en: 'Noise in the loadout: {items}. It costs tokens and distracts.',
    },
    perfect: {
      it: 'Loadout perfetto: poco, mirato, tutto pertinente.',
      en: 'Perfect loadout: small, targeted, all relevant.',
    },
    missing: {
      it: "Pulito, ma mancano {n} elementi utili (segnati con ?). L'agente può anche cercarli da solo.",
      en: 'Clean, but {n} useful items are missing (marked with ?). The agent can also find them on its own.',
    },
  },
}

export const composeCopy: { title: Localized; items: LocalizedList } = {
  title: { it: 'Come si compone', en: "How it's composed" },
  items: {
    it: [
      '**Stabile** (sempre): system prompt, AGENTS.md, descrizioni di tool e skill. Breve e in cache.',
      "**Just-in-time** (quando serve): file letti dall'agente, skill caricate, risultati MCP. Lascia che l'agente li cerchi invece di precaricarli.",
      '**Di lavoro** (che cresce): conversazione, output dei tool, tentativi falliti. È qui che si accumula il rumore.',
      "**Esterno** (fuori finestra): spec, note, piani su file. L'agente li rilegge quando servono.",
    ],
    en: [
      '**Stable** (always): system prompt, AGENTS.md, tool and skill descriptions. Short and cached.',
      '**Just-in-time** (when needed): files the agent reads, loaded skills, MCP results. Let the agent find them instead of preloading.',
      '**Working** (growing): conversation, tool output, failed attempts. This is where noise piles up.',
      '**External** (outside the window): specs, notes, plans on file. The agent rereads them when needed.',
    ],
  },
}

export const compactCopy: { title: Localized; intro: Localized; items: LocalizedList } = {
  title: { it: "Compact: cos'è e quando", en: 'Compact: what and when' },
  intro: {
    it: '`/compact` fa riassumere la conversazione al modello e riparte da quel riassunto. Libera spazio, ma **perde dettagli**: è una compressione con perdita.',
    en: "`/compact` asks the model to summarise the conversation and restarts from that summary. It frees space, but **loses detail**: it's lossy compression.",
  },
  items: {
    it: [
      '**Usalo** a un confine naturale: fase di ricerca finita, ora si implementa. Puoi guidarlo: `/compact mantieni le decisioni sul filtro età e i file toccati`.',
      '**Usa `/clear`** (o una nuova sessione) quando cambi task: meglio di un compact.',
      "**Non aspettare** l'auto-compact al limite: arriva quando la qualità è già calata.",
      'Prima di compattare, fai scrivere lo stato su file (`NOTES.md`, la spec): sopravvive a qualunque riassunto.',
    ],
    en: [
      '**Use it** at a natural boundary: research is done, now we implement. You can steer it: `/compact keep the age-filter decisions and the files touched`.',
      '**Use `/clear`** (or a new session) when you switch task: better than a compact.',
      "**Don't wait** for auto-compact at the limit: it kicks in when quality has already dropped.",
      'Before compacting, have the state written to a file (`NOTES.md`, the spec): it survives any summary.',
    ],
  },
}
