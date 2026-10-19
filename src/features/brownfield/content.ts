import type { Localized } from '@/i18n/types'
import type { TerminalLine } from '@/ui'

import type { MissionCopy } from '../missions/registry'

export const brownfieldCopy: MissionCopy = {
  lead: {
    it: "Su codice esistente l'agente parte cieco e sicuro di sé: la combinazione peggiore. Tre passi, _in quest'ordine_: mappa com'è, insegna le regole, stendi la rete. Solo dopo si cambia una riga.",
    en: 'On existing code the agent starts blind and confident: the worst combination. Three steps, _in this order_: map how it is, teach the rules, lay the net. Only then change a line.',
  },
  dos: {
    it: [
      "Fai la mappa in plan mode o con permessi di sola lettura: l'agente esplora, non tocca.",
      'Fai validare la mappa a chi conosce il sistema: le "zone da non toccare" le sa solo il team.',
      'Scrivi in AGENTS.md le convenzioni che _esistono_, non quelle che vorresti.',
      'Characterization test sulla zona che cambierai, prima di cambiarla, anche se fotografano un bug.',
    ],
    en: [
      'Build the map in plan mode or with read-only permissions: the agent explores, it does not touch.',
      'Have the map validated by people who know the system: only the team knows the "do not touch" zones.',
      'Write in AGENTS.md the conventions that _exist_, not the ones you wish for.',
      'Characterization tests on the area you will change, before changing it, even if they capture a bug.',
    ],
  },
  donts: {
    it: [
      'Chiedere "migliora questo codice" il primo giorno.',
      'Fidarsi della mappa senza verificare che i comandi di build e test girino davvero.',
      "Lasciare che l'agente corregga i bug che trova mentre scrive la rete: prima si fotografa, poi si cambia.",
      'Riscrivere invece di rifattorizzare perché "tanto lo fa l\'agente".',
    ],
    en: [
      'Asking "improve this code" on day one.',
      'Trusting the map without checking that the build and test commands really run.',
      'Letting the agent fix the bugs it finds while writing the net: capture first, change later.',
      'Rewriting instead of refactoring because "the agent does it anyway".',
    ],
  },
}

export type BrownfieldStep = {
  name: Localized
  color: string
  goal: Localized
  output: Localized
  /** Bullet list of what the step produces, RichText allowed. */
  contents: Localized<readonly string[]>
  promptTitle: string
  prompt: string
  trap: Localized
}

export const STEPS: readonly BrownfieldStep[] = [
  {
    name: { it: 'As-is map', en: 'As-is map' },
    color: 'var(--cyan)',
    goal: {
      it: "Capire cosa c'è, prima di decidere cosa cambiare.",
      en: 'Understand what is there, before deciding what to change.',
    },
    output: { it: '`docs/as-is.md`, rivisto dal team', en: '`docs/as-is.md`, reviewed by the team' },
    contents: {
      it: [
        'Moduli, dipendenze e confini (anche un diagramma Mermaid)',
        'Entry point, flussi principali, dove vivono i dati',
        'Comandi di build, test e avvio **verificati**',
        'Hotspot: file che cambiano spesso e sono complessi',
        'Zone legacy, codice morto, domande aperte',
      ],
      en: [
        'Modules, dependencies and boundaries (a Mermaid diagram too)',
        'Entry points, main flows, where the data lives',
        'Build, test and run commands, **verified**',
        'Hotspots: files that change often and are complex',
        'Legacy zones, dead code, open questions',
      ],
    },
    promptTitle: 'plan mode · as-is map',
    prompt: `Explore this repository read-only. Do not modify files.
Write docs/as-is.md with: modules and their dependencies,
entry points, main data flows, the exact commands to build,
test and run (run them and report what fails), the 10 files
with most commits in the last 12 months, legacy or dead areas,
and a list of open questions for the team.
Mark every claim you could not verify as UNVERIFIED.`,
    trap: {
      it: "L'agente riempie i buchi con ipotesi plausibili. Fatti marcare cosa non ha verificato.",
      en: 'The agent fills gaps with plausible guesses. Make it mark what it did not verify.',
    },
  },
  {
    name: { it: 'Instruction files', en: 'Instruction files' },
    color: 'var(--purple)',
    goal: {
      it: 'Trasformare la mappa in regole che ogni sessione legge.',
      en: 'Turn the map into rules that every session reads.',
    },
    output: {
      it: '`AGENTS.md` root + uno per modulo critico',
      en: 'Root `AGENTS.md` + one per critical module',
    },
    contents: {
      it: [
        'Comandi che funzionano davvero (copiati dalla mappa verificata)',
        'Convenzioni osservate nel codice, con un file di esempio',
        'Zone da non toccare e perché, con link agli ADR',
        'Dove mettere cosa: nuovi endpoint, migration, test',
        'Corto: ogni riga costa contesto in ogni sessione',
      ],
      en: [
        'Commands that really work (copied from the verified map)',
        'Conventions observed in the code, with an example file',
        'Do-not-touch zones and why, with links to the ADRs',
        'Where things go: new endpoints, migrations, tests',
        'Short: every line costs context in every session',
      ],
    },
    promptTitle: 'AGENTS.md draft',
    prompt: `From docs/as-is.md, draft AGENTS.md (max 80 lines):
commands, conventions you can point to in existing code
(cite one file per convention), do-not-touch areas, where
new code goes. Only conventions that already exist.
For module payments/, write a separate payments/AGENTS.md.`,
    trap: {
      it: 'Un AGENTS.md aspirazionale ("usiamo sempre la clean architecture") contraddice il codice e confonde l\'agente.',
      en: 'An aspirational AGENTS.md ("we always use clean architecture") contradicts the code and confuses the agent.',
    },
  },
  {
    name: { it: 'Regression net', en: 'Regression net' },
    color: 'var(--green)',
    goal: {
      it: 'Accorgersi subito se un cambiamento rompe un comportamento esistente.',
      en: 'Notice at once when a change breaks existing behaviour.',
    },
    output: {
      it: 'Characterization test sulla zona da toccare, verdi in CI',
      en: 'Characterization tests on the area to touch, green in CI',
    },
    contents: {
      it: [
        '**Characterization test**: fotografano il comportamento attuale, bug compresi',
        '**Golden master / approval test** per output grandi (report, PDF, JSON)',
        '**Contract test** sulle API pubbliche che altri usano',
        'Girano in CI _prima_ del primo cambiamento',
        'Mutation testing sulla zona per verificare che la rete tenga',
      ],
      en: [
        '**Characterization tests**: capture current behaviour, bugs included',
        '**Golden master / approval tests** for big outputs (reports, PDFs, JSON)',
        '**Contract tests** on public APIs others depend on',
        'They run in CI _before_ the first change',
        'Mutation testing on the area to check the net holds',
      ],
    },
    promptTitle: 'characterization tests',
    prompt: `Write characterization tests for InvoiceService.
Goal: lock the CURRENT behaviour, not the intended one.
Do not change production code. If a result looks like a bug,
keep the assertion and add a comment "// CURRENT BEHAVIOUR, suspected bug".
Cover: normal invoice, zero amount, foreign currency, rounding.`,
    trap: {
      it: 'L\'agente "corregge" l\'asserzione per farla sembrare giusta. In questa fase la verità è il comportamento attuale.',
      en: 'The agent "fixes" the assertion to make it look right. In this phase the truth is the current behaviour.',
    },
  },
]

export const HOTSPOT_LINES: readonly TerminalLine[] = [
  { kind: 'comment', text: '# hotspots: most-changed files in the last 12 months' },
  {
    kind: 'cmd',
    text: "git log --since=12.month --format= --name-only | grep -v '^$' | sort | uniq -c | sort -rn | head -10",
  },
  { kind: 'out', text: '  87 src/main/kotlin/billing/InvoiceService.kt' },
  { kind: 'out', text: '  61 src/main/kotlin/billing/TaxCalculator.kt' },
  { kind: 'out', text: '  44 src/main/resources/db/changelog/master.xml' },
]

export const brownfieldLabels = {
  goal: { it: 'Obiettivo', en: 'Goal' },
  output: { it: 'Output', en: 'Output' },
  trap: { it: 'Trappola', en: 'Trap' },
  step: { it: 'Passo', en: 'Step' },
  hotspots: { it: 'Trova gli hotspot', en: 'Find the hotspots' },
  order: {
    it: "Rete prima del cambiamento. Senza, ogni refactoring dell'agente è un salto nel buio.",
    en: 'Net before change. Without it, every agent refactoring is a leap in the dark.',
  },
}
