import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const tokensCopy: MissionCopy = {
  lead: {
    it: 'I modelli non leggono caratteri né parole: leggono _token_. Tutto si misura e si paga in token, e tutto deve stare nella finestra di contesto.',
    en: "Models don't read characters or words: they read _tokens_. Everything is measured and paid in tokens, and everything must fit in the context window.",
  },
  dos: {
    it: [
      "Controlla l'occupazione del contesto (`/context` in Claude Code, indicatore in OpenCode).",
      'Leggi file per range e fai grep mirati invece di aprire file interi.',
      "Fai filtrare l'output dei comandi: `./mvnw test -q`, `| tail -50`.",
    ],
    en: [
      'Check context usage (`/context` in Claude Code, the indicator in OpenCode).',
      'Read files by range and run targeted greps instead of opening whole files.',
      'Filter command output: `./mvnw test -q`, `| tail -50`.',
    ],
  },
  donts: {
    it: [
      'Incollare stack trace e log interi "così ha tutto".',
      'Confondere la dimensione della finestra con la memoria: finita la sessione, il contesto non esiste più.',
      'Riempire la finestra fino al limite: la qualità cala molto prima.',
    ],
    en: [
      'Pasting entire stack traces and logs "so it has everything".',
      'Confusing window size with memory: when the session ends, the context is gone.',
      'Filling the window to the limit: quality drops well before that.',
    ],
  },
}

export const tokenizerCopy = {
  title: { it: 'Tokenizer da campo', en: 'Field tokenizer' },
  hint: {
    it: "Scrivi qualcosa. È un'approssimazione didattica (i tokenizer reali usano BPE), ma l'ordine di grandezza è quello.",
    en: "Type something. It's a teaching approximation (real tokenizers use BPE), but the order of magnitude is right.",
  },
  sample: {
    it: 'fun findMatches(dog: Dog): List<Match> = repository.findByBreed(dog.breed)\n// Trova i cani compatibili per razza',
    en: 'fun findMatches(dog: Dog): List<Match> = repository.findByBreed(dog.breed)\n// Find compatible dogs by breed',
  },
  inputLabel: { it: 'Testo da tokenizzare', en: 'Text to tokenize' },
  chars: { it: 'caratteri', en: 'characters' },
  tokens: { it: 'token stimati', en: 'estimated tokens' },
  ratio: { it: 'caratteri per token', en: 'chars per token' },
}

export const rulesCopy: { title: Localized; items: LocalizedList } = {
  title: { it: 'Regole di massima', en: 'Rules of thumb' },
  items: {
    it: [
      'Inglese: circa **4 caratteri per token**. Italiano e codice ne usano di più a parità di significato.',
      'Paghi **input** (tutto ciò che mandi, a ogni turno) e **output** (tipicamente 3-5 volte più caro per token).',
      "Il **prompt caching** rende molto più economico l'input ripetuto identico: prefissi stabili (system prompt, AGENTS.md) prima, parti variabili dopo.",
      'Ogni turno di un agente **rimanda tutta la conversazione**. Un log da 20k token letto al turno 3 lo ripaghi a ogni turno successivo.',
    ],
    en: [
      'English: about **4 characters per token**. Italian and code use more tokens for the same meaning.',
      'You pay for **input** (everything you send, every turn) and **output** (typically 3-5 times more expensive per token).',
      '**Prompt caching** makes identical repeated input much cheaper: stable prefixes (system prompt, AGENTS.md) first, variable parts after.',
      'Every agent turn **resends the whole conversation**. A 20k-token log read at turn 3 is paid again on every following turn.',
    ],
  },
}

export const windowCopy = {
  title: { it: "Cosa c'è dentro la finestra di contesto", en: "What's inside the context window" },
  hint: {
    it: 'Esempio realistico di un agente di coding a metà sessione, su una finestra da 200k token. Clicca un blocco.',
    en: 'A realistic example of a coding agent mid-session, on a 200k-token window. Click a block.',
  },
  empty: {
    it: 'Seleziona un blocco per vedere cosa contiene.',
    en: 'Select a block to see what it contains.',
  },
  free: { it: 'liberi', en: 'free' },
}

export type WindowBlock = { name: Localized; k: number; color: string; desc: Localized }

export const WINDOW_SIZE_K = 200

export const WINDOW_BLOCKS: readonly WindowBlock[] = [
  {
    name: { it: 'System prompt', en: 'System prompt' },
    k: 4,
    color: '#f3e7c8',
    desc: {
      it: "Istruzioni dell'harness: chi è l'agente, come usa i tool, regole di sicurezza. Fisso, va in cache.",
      en: 'Harness instructions: who the agent is, how it uses tools, safety rules. Fixed, cached.',
    },
  },
  {
    name: { it: 'Definizioni tool', en: 'Tool definitions' },
    k: 12,
    color: '#ffd21f',
    desc: {
      it: 'Nome, descrizione e schema JSON di ogni tool built-in (read, edit, bash, grep...). Presenti a ogni turno.',
      en: 'Name, description and JSON schema of every built-in tool (read, edit, bash, grep...). Present on every turn.',
    },
  },
  {
    name: { it: 'Tool MCP', en: 'MCP tools' },
    k: 18,
    color: '#ff2e7e',
    desc: {
      it: 'Ogni server MCP aggiunge le sue definizioni. Dieci server possono valere decine di migliaia di token prima ancora di iniziare.',
      en: 'Every MCP server adds its definitions. Ten servers can be worth tens of thousands of tokens before you even start.',
    },
  },
  {
    name: { it: 'AGENTS.md', en: 'AGENTS.md' },
    k: 3,
    color: '#b05cff',
    desc: {
      it: "Istruzioni di progetto, home e sotto-modulo. Caricate all'avvio.",
      en: 'Project, home and sub-module instructions. Loaded at startup.',
    },
  },
  {
    name: { it: 'Skill (descrizioni)', en: 'Skills (descriptions)' },
    k: 1,
    color: '#c99bff',
    desc: {
      it: 'Solo nome e descrizione di ogni skill. Il corpo si carica quando serve.',
      en: "Only each skill's name and description. The body loads when needed.",
    },
  },
  {
    name: { it: 'Conversazione', en: 'Conversation' },
    k: 26,
    color: '#2be0e8',
    desc: {
      it: 'I tuoi messaggi e le risposte del modello, incluso il ragionamento visibile.',
      en: "Your messages and the model's replies, including visible reasoning.",
    },
  },
  {
    name: { it: 'File letti', en: 'Files read' },
    k: 48,
    color: '#7cff3c',
    desc: {
      it: "Contenuto dei file aperti dall'agente. Spesso la voce più grande: leggere per range aiuta.",
      en: 'Contents of files the agent opened. Often the biggest item: reading by range helps.',
    },
  },
  {
    name: { it: 'Output dei tool', en: 'Tool output' },
    k: 30,
    color: '#ff8a00',
    desc: {
      it: 'Risultati di comandi, test, grep, chiamate MCP. Un log di build verboso può occupare più del codice.',
      en: 'Results of commands, tests, greps, MCP calls. A verbose build log can take more room than the code.',
    },
  },
  {
    name: { it: 'Riserva output', en: 'Output reserve' },
    k: 16,
    color: '#ff7aa9',
    desc: {
      it: 'Spazio che deve restare libero per la risposta e per il ragionamento del modello.',
      en: "Space that must stay free for the model's answer and reasoning.",
    },
  },
]
