import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const agentsMdCopy: MissionCopy = {
  lead: {
    it: "Il file di istruzioni viene caricato _all'inizio di ogni sessione_ e occupa contesto per tutta la durata. Tienilo corto: ogni riga deve cambiare il comportamento dell'agente, altrimenti va tolta.",
    en: "The instruction file is loaded _at the start of every session_ and takes up context for its whole duration. Keep it short: every line must change the agent's behaviour, otherwise remove it.",
  },
  dos: {
    it: [
      'Tieni il file di progetto sotto le ~150 righe e versionalo come il codice.',
      'Usa AGENTS.md come fonte unica; per Claude Code un `CLAUDE.md` con `@AGENTS.md`.',
      "Aggiungi una regola quando vedi l'agente sbagliare due volte la stessa cosa.",
    ],
    en: [
      'Keep the project file under ~150 lines and version it like code.',
      'Use AGENTS.md as the single source; for Claude Code a `CLAUDE.md` containing `@AGENTS.md`.',
      'Add a rule when you see the agent get the same thing wrong twice.',
    ],
  },
  donts: {
    it: [
      "Farlo generare all'agente e committarlo senza rileggerlo.",
      'Scrivere in maiuscolo per "insistere": se una regola è critica, diventa un hook o un test.',
      'Duplicare le stesse regole su tre livelli.',
    ],
    en: [
      'Having the agent generate it and committing without rereading it.',
      'Writing in CAPS to "insist": if a rule is critical, make it a hook or a test.',
      'Duplicating the same rules across three levels.',
    ],
  },
}

export type LevelId = 'home' | 'proj' | 'mod'

export type Level = { id: LevelId; title: Localized; path: Localized; color: string; items: LocalizedList }

export const LEVELS: readonly Level[] = [
  {
    id: 'home',
    title: { it: 'Home (personale)', en: 'Home (personal)' },
    path: {
      it: '~/.config/opencode/AGENTS.md · ~/.claude/CLAUDE.md',
      en: '~/.config/opencode/AGENTS.md · ~/.claude/CLAUDE.md',
    },
    color: 'var(--yellow)',
    items: {
      it: [
        'Lingua e stile di risposta che preferisci.',
        'Il tuo workflow: "proponi un piano prima di modifiche su più file".',
        'Strumenti della tua macchina (`mise`, `gh`).',
        '**Mai** regole del progetto: i colleghi non le vedono.',
      ],
      en: [
        'Your preferred language and response style.',
        'Your workflow: "propose a plan before multi-file changes".',
        'Tools on your machine (`mise`, `gh`).',
        "**Never** project rules: your colleagues can't see them.",
      ],
    },
  },
  {
    id: 'proj',
    title: { it: 'Progetto (team)', en: 'Project (team)' },
    path: { it: './AGENTS.md (versionato)', en: './AGENTS.md (versioned)' },
    color: 'var(--cyan)',
    items: {
      it: [
        'Comandi esatti: build, test, lint, avvio (`./mvnw verify`).',
        "Mappa dell'architettura in 5-10 righe e dove vivono le cose.",
        'Convenzioni non ovvie (Result invece di eccezioni, niente `!!`).',
        'Definition of done e cose da non toccare (migration già applicate).',
      ],
      en: [
        'Exact commands: build, test, lint, run (`./mvnw verify`).',
        'A 5-10 line architecture map and where things live.',
        'Non-obvious conventions (Result instead of exceptions, no `!!`).',
        'Definition of done and things not to touch (already-applied migrations).',
      ],
    },
  },
  {
    id: 'mod',
    title: { it: 'Sotto-modulo', en: 'Sub-module' },
    path: { it: './matching/AGENTS.md', en: './matching/AGENTS.md' },
    color: 'var(--pink)',
    items: {
      it: [
        'Comandi solo del modulo (`./mvnw -pl matching test`).',
        'Vincoli locali: algoritmo di scoring, invarianti di dominio.',
        'Dipendenze ammesse e confini con gli altri moduli.',
        "Viene caricato quando l'agente lavora lì: niente ripetizioni del root.",
      ],
      en: [
        'Module-only commands (`./mvnw -pl matching test`).',
        'Local constraints: scoring algorithm, domain invariants.',
        'Allowed dependencies and boundaries with other modules.',
        "Loaded when the agent works there: don't repeat the root file.",
      ],
    },
  },
]

export const treeCopy = {
  or: { it: '(o ~/.claude/CLAUDE.md)', en: '(or ~/.claude/CLAUDE.md)' },
  importNote: { it: '→ contiene solo @AGENTS.md', en: '→ only contains @AGENTS.md' },
  hint: { it: 'clicca i file evidenziati', en: 'click the highlighted files' },
}

export const neverCopy: { title: Localized; items: LocalizedList } = {
  title: { it: 'Cosa NON ci va, a nessun livello', en: 'What does NOT go in, at any level' },
  items: {
    it: [
      'Segreti, token, URL interni sensibili.',
      'Regole che il linter o il compilatore già impongono.',
      'Consigli generici ("scrivi codice pulito", "sii preciso").',
      "L'albero completo dei file o documentazione lunga: metti un link al file, l'agente lo legge se serve.",
      'Informazioni che cambiano spesso: diventano false in silenzio.',
    ],
    en: [
      'Secrets, tokens, sensitive internal URLs.',
      'Rules the linter or compiler already enforces.',
      'Generic advice ("write clean code", "be precise").',
      'The full file tree or long docs: link to the file, the agent reads it if needed.',
      'Information that changes often: it silently becomes false.',
    ],
  },
}
