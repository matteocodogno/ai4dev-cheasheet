import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const reviewCopy: MissionCopy = {
  lead: {
    it: 'Gli agenti scrivono più codice di quanto un team riesca a leggere: il collo di bottiglia si sposta sulla review. Quattro tecniche per reggere il volume. _Nessuna è gratis_: ognuna ha un costo, e conviene sapere chi lo paga.',
    en: 'Agents write more code than a team can read: the bottleneck moves to review. Four techniques to keep up with the volume. _None is free_: each has a cost, and you want to know who pays it.',
  },
  dos: {
    it: [
      'Scrivi la definizione di "basso rischio" e dai un nome a chi la possiede.',
      "Filtra i commenti dell'AI prima che arrivino all'umano: severità, confidenza, duplicati.",
      "Allega alla PR le prove: test, screenshot, output dell'eval, link alla spec.",
      "Chiedi all'agente PR piccole: una cosa per PR, refactoring separato dalla feature.",
    ],
    en: [
      'Write down the definition of "low risk" and name who owns it.',
      'Filter AI comments before they reach the human: severity, confidence, duplicates.',
      'Attach the evidence to the PR: tests, screenshots, eval output, link to the spec.',
      'Ask the agent for small PRs: one thing per PR, refactoring separate from the feature.',
    ],
  },
  donts: {
    it: [
      'Approvare perché "l\'ha già guardata l\'AI".',
      'Rivedere gli esiti con test generati nella stessa sessione che ha scritto il codice.',
      'Mettere in auto-merge la "corsia veloce" senza audit periodico di cosa ci passa.',
      'Accettare PR da 2.000 righe perché "tanto le ha scritte l\'agente".',
    ],
    en: [
      'Approving because "the AI already looked at it".',
      'Reviewing outcomes with tests generated in the same session that wrote the code.',
      'Auto-merging the "fast lane" without periodically auditing what goes through it.',
      'Accepting 2,000-line PRs because "the agent wrote them anyway".',
    ],
  },
}

export type TechniqueId = 'meta' | 'risk' | 'outcomes' | 'volume'

export type Technique = {
  id: TechniqueId
  name: Localized
  color: string
  body: Localized
  evidence?: Localized
  cost: Localized
}

export const TECHNIQUES: readonly Technique[] = [
  {
    id: 'meta',
    name: { it: "Un umano rivede la review dell'AI", en: "A human reviews the AI's review" },
    color: '#2be0e8',
    body: {
      it: "L'AI fa il primo passaggio sul diff. L'umano non rilegge tutto: valuta i commenti, conferma o scarta, e guarda dove l'AI non arriva (dominio, intenzione).",
      en: 'The AI does the first pass on the diff. The human does not reread everything: they assess the comments, confirm or dismiss, and look where the AI cannot (domain, intent).',
    },
    cost: {
      it: "Rumore. Troppi commenti e l'umano smette di leggerli: per questo Uber li filtra prima.",
      en: 'Noise. Too many comments and the human stops reading them: that is why Uber filters them first.',
    },
  },
  {
    id: 'risk',
    name: { it: 'Triage basato sul rischio', en: 'Risk-based triage' },
    color: '#ffd21f',
    body: {
      it: 'Ogni PR riceve una corsia: auth, pagamenti, migration, dati personali vanno in review profonda; docs, test, config isolata in quella veloce.',
      en: 'Every PR gets a lane: auth, payments, migrations, personal data go to deep review; docs, tests, isolated config to the fast one.',
    },
    evidence: { it: 'Duckbill: da 80 a 154 merge a settimana.', en: 'Duckbill: 80 → 154 merges a week.' },
    cost: {
      it: 'Qualcuno deve possedere la definizione di "basso rischio", e risponderne.',
      en: 'Someone owns "low risk", and answers for it.',
    },
  },
  {
    id: 'outcomes',
    name: { it: 'Rivedi gli esiti, non il codice', en: 'Review outcomes, not code' },
    color: '#7cff3c',
    body: {
      it: 'Verifichi il comportamento: test che passano, criteri di accettazione della spec, demo, screenshot, eval. Il codice si legge a campione.',
      en: "You verify the behaviour: passing tests, the spec's acceptance criteria, demo, screenshots, evals. The code is read by sampling.",
    },
    cost: {
      it: 'Funziona solo se i test sono veri: vedi la missione sui mutanti.',
      en: 'Only works if the tests are real: see the mutants mission.',
    },
  },
  {
    id: 'volume',
    name: { it: 'Riduci il volume', en: 'Reduce the volume' },
    color: '#ff2e7e',
    body: {
      it: "PR piccole e focalizzate, l'agente spezza il lavoro in passi revisionabili, meno codice generato per lo stesso risultato.",
      en: 'Small, focused PRs, the agent splits the work into reviewable steps, less generated code for the same result.',
    },
    cost: {
      it: "L'unica che costa all'autore: più PR, più disciplina, più attesa.",
      en: 'The only one that costs the author: more PRs, more discipline, more waiting.',
    },
  },
]

export type Lane = 'low' | 'medium' | 'high' | 'split'

export type PullRequest = { what: Localized; lane: Lane; use: readonly TechniqueId[]; why: Localized }

export const PULL_REQUESTS: readonly PullRequest[] = [
  {
    what: { it: 'Aggiorna il README e due commenti', en: 'Updates the README and two comments' },
    lane: 'low',
    use: ['meta', 'risk'],
    why: {
      it: "Corsia veloce: review dell'AI, l'umano guarda solo i commenti segnalati.",
      en: 'Fast lane: AI review, the human only looks at the flagged comments.',
    },
  },
  {
    what: { it: 'Bump patch di una dipendenza, CI verde', en: 'Patch bump of a dependency, CI green' },
    lane: 'low',
    use: ['risk', 'outcomes'],
    why: {
      it: 'Corsia veloce: gli esiti (CI, test) bastano, purché i test mordano.',
      en: 'Fast lane: outcomes (CI, tests) are enough, as long as the tests bite.',
    },
  },
  {
    what: {
      it: 'Nuovo campo nella risposta di `/orders`, con contract test',
      en: 'New field in the `/orders` response, with a contract test',
    },
    lane: 'medium',
    use: ['meta', 'outcomes'],
    why: {
      it: "Si rivede l'esito (contract test, esempio di risposta) e i commenti dell'AI sul diff.",
      en: 'Review the outcome (contract test, sample response) and the AI comments on the diff.',
    },
  },
  {
    what: { it: 'Cambia il refresh del token JWT', en: 'Changes the JWT token refresh' },
    lane: 'high',
    use: ['risk', 'meta'],
    why: {
      it: "Autenticazione: corsia profonda. Review umana riga per riga, l'AI come secondo paio d'occhi.",
      en: 'Authentication: deep lane. Human line-by-line review, the AI as a second pair of eyes.',
    },
  },
  {
    what: { it: 'Migration che rinomina una colonna', en: 'Migration that renames a column' },
    lane: 'high',
    use: ['risk', 'outcomes'],
    why: {
      it: 'Irreversibile in produzione: review profonda e prova su una copia dei dati.',
      en: 'Irreversible in production: deep review and a dry run on a copy of the data.',
    },
  },
  {
    what: {
      it: 'PR da 2.300 righe: feature, refactoring e rename insieme',
      en: '2,300-line PR: feature, refactoring and rename together',
    },
    lane: 'split',
    use: ['volume'],
    why: {
      it: "Non si rivede: si rimanda indietro. Prima il rename, poi il refactoring, poi la feature. L'agente le spezza in dieci minuti.",
      en: 'It does not get reviewed: it gets sent back. Rename first, then refactoring, then the feature. The agent splits them in ten minutes.',
    },
  },
]

export const laneLabel: Record<Lane, Localized> = {
  low: { it: 'Corsia veloce', en: 'Fast lane' },
  medium: { it: 'Corsia normale', en: 'Normal lane' },
  high: { it: 'Corsia profonda', en: 'Deep lane' },
  split: { it: 'Da spezzare', en: 'Split it' },
}

export const reviewLabels = {
  title: { it: 'Smista la PR', en: 'Triage the PR' },
  hint: {
    it: 'Scegli una PR: vedi la corsia e le tecniche che servono.',
    en: 'Pick a PR: see the lane and the techniques it needs.',
  },
  none: { it: 'Nessuna PR selezionata.', en: 'No PR selected.' },
  cost: { it: 'Costo', en: 'Cost' },
  use: { it: 'USA', en: 'USE' },
}
