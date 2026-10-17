import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const arsenalCopy: MissionCopy = {
  lead: {
    it: 'Sette strumenti che si somigliano ma non sono intercambiabili. La domanda giusta: _chi lo attiva, quando, e quanto contesto costa?_',
    en: "Seven tools that look alike but aren't interchangeable. The right question: _who triggers it, when, and how much context does it cost?_",
  },
  dos: {
    it: [
      "Ciò che **deve** succedere sempre va in un hook, non in un'istruzione.",
      'Le procedure lunghe e occasionali vanno in skill: costano solo la descrizione finché non servono.',
      'Promuovi a command un prompt che ti ritrovi a riscrivere per la terza volta.',
    ],
    en: [
      'What **must** always happen goes in a hook, not in an instruction.',
      'Long, occasional procedures go in skills: they only cost their description until needed.',
      'Promote to a command any prompt you find yourself rewriting for the third time.',
    ],
  },
  donts: {
    it: [
      'Scrivere "esegui SEMPRE ktlint" in AGENTS.md e sperare: è una richiesta, non una garanzia.',
      'Creare sub-agent per tutto: ogni passaggio perde contesto e aggiunge latenza.',
      'Scrivere un server MCP per qualcosa che una CLI già fa (`gh`, `psql`).',
    ],
    en: [
      'Writing "ALWAYS run ktlint" in AGENTS.md and hoping: it\'s a request, not a guarantee.',
      'Creating sub-agents for everything: every hand-off loses context and adds latency.',
      'Writing an MCP server for something a CLI already does (`gh`, `psql`).',
    ],
  },
}

export type GearName = 'Agent' | 'Instruction file' | 'Skill' | 'Command' | 'Hook' | 'MCP tool' | 'Sub-agent'

export type Gear = {
  name: GearName
  color: string
  what: Localized
  useFor: Localized
  notFor: Localized
  /** 0-100: determinism, context cost, reuse. */
  stats: readonly [number, number, number]
}

export const GEAR: readonly Gear[] = [
  {
    name: 'Agent',
    color: '#ffd21f',
    what: {
      it: 'Modello + loop + tool, con obiettivo e autonomia.',
      en: 'Model + loop + tools, with a goal and autonomy.',
    },
    useFor: {
      it: 'Task multi-passo dove serve decidere strada facendo: da issue a PR, debug, refactoring.',
      en: 'Multi-step tasks where decisions are made along the way: issue to PR, debugging, refactoring.',
    },
    notFor: {
      it: 'Trasformazioni deterministiche: uno script fa prima e non sbaglia.',
      en: 'Deterministic transformations: a script is faster and never wrong.',
    },
    stats: [30, 80, 60],
  },
  {
    name: 'Instruction file',
    color: '#b05cff',
    what: {
      it: 'AGENTS.md / CLAUDE.md: sempre nel contesto.',
      en: 'AGENTS.md / CLAUDE.md: always in context.',
    },
    useFor: {
      it: 'Fatti sempre veri sul progetto: comandi, architettura, convenzioni.',
      en: 'Always-true facts about the project: commands, architecture, conventions.',
    },
    notFor: {
      it: 'Procedure lunghe usate di rado (skill) o regole da garantire (hook).',
      en: 'Long, rarely used procedures (skills) or rules that must be guaranteed (hooks).',
    },
    stats: [35, 40, 90],
  },
  {
    name: 'Skill',
    color: '#2be0e8',
    what: {
      it: 'Cartella con istruzioni e script, caricata su richiesta.',
      en: 'A folder with instructions and scripts, loaded on demand.',
    },
    useFor: {
      it: 'Procedure ripetibili e specialistiche: creare una migration, generare un report, usare una libreria interna.',
      en: 'Repeatable, specialist procedures: creating a migration, generating a report, using an internal library.',
    },
    notFor: {
      it: "Cose da sapere a ogni turno: vanno nell'instruction file.",
      en: 'Things needed every turn: they belong in the instruction file.',
    },
    stats: [55, 15, 85],
  },
  {
    name: 'Command',
    color: '#7cff3c',
    what: { it: 'Prompt salvato, lanciato da te con /nome.', en: 'A saved prompt you launch with /name.' },
    useFor: {
      it: 'Flussi che decidi tu quando avviare: /review-pr, /spec, /release.',
      en: 'Flows you decide when to start: /review-pr, /spec, /release.',
    },
    notFor: {
      it: 'Qualcosa che deve succedere da solo: serve un hook.',
      en: 'Something that must happen by itself: that needs a hook.',
    },
    stats: [60, 20, 80],
  },
  {
    name: 'Hook',
    color: '#ff2e7e',
    what: {
      it: "Script eseguito dall'harness a un evento (prima o dopo un tool, a fine sessione).",
      en: 'A script the harness runs on an event (before or after a tool, at session end).',
    },
    useFor: {
      it: 'Garanzie deterministiche: formattare dopo ogni edit, bloccare comandi, notificare.',
      en: 'Deterministic guarantees: format after every edit, block commands, notify.',
    },
    notFor: {
      it: 'Decisioni che richiedono giudizio: lo script non ragiona.',
      en: "Decisions that need judgement: a script doesn't reason.",
    },
    stats: [100, 5, 70],
  },
  {
    name: 'MCP tool',
    color: '#ff8a00',
    what: {
      it: 'Tool esposti da un server esterno con protocollo standard.',
      en: 'Tools exposed by an external server via a standard protocol.',
    },
    useFor: {
      it: 'Accesso a sistemi e dati: issue tracker, DB, browser, API interne, condivisibile tra harness diversi.',
      en: 'Access to systems and data: issue tracker, DB, browser, internal APIs, shareable across harnesses.',
    },
    notFor: {
      it: 'Ciò che una CLI già fa bene: costa contesto a ogni turno.',
      en: 'What a CLI already does well: it costs context every turn.',
    },
    stats: [70, 60, 75],
  },
  {
    name: 'Sub-agent',
    color: '#3d8bff',
    what: {
      it: 'Agente figlio con contesto pulito e istruzioni proprie.',
      en: 'A child agent with a clean context and its own instructions.',
    },
    useFor: {
      it: 'Esplorazioni rumorose, ricerche ampie, review indipendenti, lavori in parallelo.',
      en: 'Noisy exploration, broad searches, independent reviews, parallel work.',
    },
    notFor: {
      it: 'Modifiche piccole e sequenziali: il passaggio di contesto costa più del lavoro.',
      en: 'Small, sequential edits: the context hand-off costs more than the work.',
    },
    stats: [40, 10, 55],
  },
]

export const gearLabels = {
  stats: { it: ['Determinismo', 'Costo contesto', 'Riuso'], en: ['Determinism', 'Context cost', 'Reuse'] },
  useFor: { it: 'Usalo per', en: 'Use it for' },
  notFor: { it: 'Non per', en: 'Not for' },
} satisfies Record<string, Localized<string | readonly string[]>>

export type Scenario = { prompt: Localized; answer: GearName; why: Localized }

export const SCENARIOS: readonly Scenario[] = [
  {
    prompt: {
      it: 'Dopo ogni modifica a un file .kt deve girare ktlint, sempre, senza eccezioni.',
      en: 'After every change to a .kt file, ktlint must run, always, no exceptions.',
    },
    answer: 'Hook',
    why: {
      it: 'È una garanzia deterministica legata a un evento: lo script gira anche se il modello se ne dimentica.',
      en: "It's a deterministic guarantee tied to an event: the script runs even if the model forgets.",
    },
  },
  {
    prompt: {
      it: 'Una procedura di 12 passi per creare una migration Flyway, serve una volta ogni due settimane.',
      en: 'A 12-step procedure to create a Flyway migration, needed once every two weeks.',
    },
    answer: 'Skill',
    why: {
      it: 'Lunga e occasionale: costa solo la descrizione finché non serve, poi si carica intera.',
      en: 'Long and occasional: it only costs its description until needed, then loads in full.',
    },
  },
  {
    prompt: {
      it: 'Prima di ogni PR lanci a mano una review con la stessa checklist del team.',
      en: "Before every PR you manually launch a review with the team's usual checklist.",
    },
    answer: 'Command',
    why: {
      it: 'Lo avvii tu, quando decidi tu, e il prompt è sempre lo stesso.',
      en: 'You start it, when you decide, and the prompt is always the same.',
    },
  },
  {
    prompt: {
      it: 'Il build si lancia con ./mvnw verify e i test di integrazione usano Testcontainers.',
      en: 'The build runs with ./mvnw verify and integration tests use Testcontainers.',
    },
    answer: 'Instruction file',
    why: {
      it: 'Fatto stabile del progetto, utile in quasi ogni sessione: va in AGENTS.md.',
      en: 'A stable project fact, useful in almost every session: it goes in AGENTS.md.',
    },
  },
  {
    prompt: {
      it: "L'agente deve leggere le issue di GitHub e interrogare lo schema reale del DB.",
      en: 'The agent must read GitHub issues and query the real DB schema.',
    },
    answer: 'MCP tool',
    why: {
      it: 'Accesso a sistemi esterni con un protocollo standard (o una CLI, se basta).',
      en: "Access to external systems through a standard protocol (or a CLI, if that's enough).",
    },
  },
  {
    prompt: {
      it: 'Capire dove si gestisce il matching esplorando 300 file, senza riempire il contesto principale.',
      en: 'Find where matching is handled by exploring 300 files, without filling the main context.',
    },
    answer: 'Sub-agent',
    why: {
      it: 'Esplorazione rumorosa in un contesto separato: torna solo la conclusione.',
      en: 'Noisy exploration in a separate context: only the conclusion comes back.',
    },
  },
  {
    prompt: {
      it: 'Partire da una issue e arrivare a una PR con test verdi, decidendo i passi strada facendo.',
      en: 'Go from an issue to a PR with green tests, deciding the steps along the way.',
    },
    answer: 'Agent',
    why: {
      it: 'Task multi-passo con decisioni: serve il loop completo con tool e verifica.',
      en: 'A multi-step task with decisions: it needs the full loop with tools and verification.',
    },
  },
]

export const quizLabels = {
  title: { it: 'Test sul campo: cosa usi?', en: 'Field test: what do you use?' },
  scenario: { it: 'scenario', en: 'scenario' },
  hits: { it: 'colpi critici', en: 'critical hits' },
  hit: { it: 'Critico!', en: 'Critical!' },
  miss: { it: 'Mancato!', en: 'Missed!' },
  next: { it: 'Prossimo scenario', en: 'Next scenario' },
  result: { it: 'Vedi risultato', en: 'See result' },
  again: { it: 'Rigioca', en: 'Play again' },
  final: {
    it: 'Missione compiuta: {hits} colpi critici su {total}.',
    en: 'Mission complete: {hits} critical hits out of {total}.',
  },
  legendary: { it: 'Leggendario!', en: 'Legendary!' },
  retry: { it: 'Rigioca per migliorare il punteggio.', en: 'Play again to improve your score.' },
}
