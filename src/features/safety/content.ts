import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const safetyCopy: MissionCopy = {
  lead: {
    it: "Tre scudi, in ordine. Il primo evita l'errore, il secondo lo annulla in un secondo, il terzo ti salva _quasi sempre_. Prova gli incidenti qui sotto per vedere chi para il colpo.",
    en: 'Three shields, in order. The first prevents the mistake, the second undoes it in a second, the third saves you _almost always_. Try the incidents below to see which one blocks the hit.',
  },
  dos: {
    it: [
      "Albero di lavoro pulito prima di avviare l'agente: commit o stash.",
      'Plan mode per tutto ciò che tocca più di due o tre file.',
      "Rivedi il diff completo prima del commit, non il riassunto dell'agente.",
    ],
    en: [
      'Clean working tree before starting the agent: commit or stash.',
      'Plan mode for anything touching more than two or three files.',
      "Review the full diff before committing, not the agent's summary.",
    ],
  },
  donts: {
    it: [
      'Usare i checkpoint al posto di git.',
      "Lasciare che l'agente faccia `push --force` o `reset --hard` senza chiedere.",
      'Accumulare due ore di modifiche non committate "tanto c\'è l\'undo".',
    ],
    en: [
      'Using checkpoints instead of git.',
      'Letting the agent `push --force` or `reset --hard` without asking.',
      'Piling up two hours of uncommitted changes "because undo exists".',
    ],
  },
}

export type ShieldId = 'plan' | 'checkpoint' | 'git'

export type Shield = {
  id: ShieldId
  name: string
  color: string
  when: Localized
  body: Localized
  /** Shortcuts / commands, RichText markup allowed. */
  keys: readonly string[]
  caveat?: Localized
}

export const SHIELDS: readonly Shield[] = [
  {
    id: 'plan',
    name: 'Plan',
    color: 'var(--cyan)',
    when: { it: 'prima di toccare il codice', en: 'before touching the code' },
    body: {
      it: "L'agente legge e propone un piano senza modificare nulla. Tu correggi il piano, che costa poco, invece del codice, che costa tanto.",
      en: 'The agent reads and proposes a plan without changing anything. You fix the plan, which is cheap, instead of the code, which is expensive.',
    },
    keys: ['[[Shift]]+[[Tab]] plan mode (Claude Code)', '[[Tab]] plan agent (OpenCode)'],
  },
  {
    id: 'checkpoint',
    name: 'Checkpoint',
    color: 'var(--yellow)',
    when: { it: 'durante la sessione', en: 'during the session' },
    body: {
      it: "Ogni modifica ai file è un punto di ripristino. Annulli codice e conversazione insieme e riprovi con un'altra istruzione.",
      en: 'Every file edit is a restore point. You undo code and conversation together and retry with a different instruction.',
    },
    keys: ['`/undo` `/redo` (OpenCode)', '[[Esc]][[Esc]] / `/rewind` (Claude Code)'],
    caveat: {
      it: 'Non annullano gli effetti dei comandi shell (migration, rm, chiamate esterne).',
      en: "They don't undo the effects of shell commands (migrations, rm, external calls).",
    },
  },
  {
    id: 'git',
    name: 'Git',
    color: 'var(--green)',
    when: { it: "sempre, fuori dall'agente", en: 'always, outside the agent' },
    body: {
      it: 'La rete che sopravvive a crash, sessioni chiuse e compact sbagliati. Commit piccoli e frequenti, un branch per task.',
      en: 'The net that survives crashes, closed sessions and bad compacts. Small, frequent commits, one branch per task.',
    },
    keys: ['`git switch -c feat/age`', '`git diff`', '`git add -p`', '`git restore .`'],
  },
]

export type Incident = { what: Localized; savedBy: readonly ShieldId[]; why: Localized }

export const INCIDENTS: readonly Incident[] = [
  {
    what: {
      it: "L'agente sta per riscrivere 14 file con un approccio che non condividi.",
      en: 'The agent is about to rewrite 14 files with an approach you disagree with.',
    },
    savedBy: ['plan'],
    why: {
      it: 'Il plan mode lo ferma prima che tocchi qualcosa: correggi il piano, non il codice. Checkpoint e git funzionerebbero, ma solo dopo aver bruciato tempo e token.',
      en: 'Plan mode stops it before it touches anything: you fix the plan, not the code. Checkpoints and git would work too, but only after burning time and tokens.',
    },
  },
  {
    what: {
      it: 'Il refactoring degli ultimi 10 minuti ha rotto tutto e vuoi tornare indietro.',
      en: 'The last 10 minutes of refactoring broke everything and you want to go back.',
    },
    savedBy: ['checkpoint', 'git'],
    why: {
      it: 'Un undo del checkpoint riporta codice e conversazione a prima. Git funziona solo se avevi committato prima di iniziare.',
      en: 'A checkpoint undo restores code and conversation to before. Git works only if you committed before starting.',
    },
  },
  {
    what: {
      it: "La sessione si è chiusa (crash, compact sbagliato) dopo un'ora di lavoro.",
      en: 'The session closed (crash, bad compact) after an hour of work.',
    },
    savedBy: ['git'],
    why: {
      it: 'I checkpoint vivono dentro la sessione; i commit no. Ecco perché si committa spesso.',
      en: "Checkpoints live inside the session; commits don't. That's why you commit often.",
    },
  },
  {
    what: {
      it: "L'agente ha lanciato rm -rf su una cartella del progetto.",
      en: 'The agent ran rm -rf on a project folder.',
    },
    savedBy: ['git'],
    why: {
      it: 'L\'undo dei checkpoint non vede i comandi shell. Git recupera solo i file tracciati e committati: il resto è perso. Una sandbox o un permesso "ask" sul comando avrebbero evitato il danno.',
      en: 'Checkpoint undo doesn\'t see shell commands. Git recovers only tracked, committed files: the rest is gone. A sandbox or an "ask" permission on the command would have prevented it.',
    },
  },
  {
    what: {
      it: 'Ha applicato una migration al database di sviluppo condiviso.',
      en: 'It applied a migration to the shared development database.',
    },
    savedBy: [],
    why: {
      it: 'Nessuno dei tre scudi: l\'effetto è fuori dal repository. Servono plan prima, permesso "ask" sui comandi del DB e un database per sviluppatore.',
      en: 'None of the three shields: the effect is outside the repository. You need a plan first, an "ask" permission on DB commands and one database per developer.',
    },
  },
]

export const incidentLabels = {
  title: { it: 'Simulatore di incidenti', en: 'Incident simulator' },
  hint: {
    it: 'Scegli cosa è successo: gli scudi che ti salvano si illuminano, quelli inutili si spengono.',
    en: 'Pick what happened: the shields that save you light up, the useless ones go dark.',
  },
  none: { it: 'Nessun incidente selezionato.', en: 'No incident selected.' },
  savedBy: { it: 'Ti salva', en: 'Saved by' },
  noShield: { it: 'Nessuno scudo', en: 'No shield' },
  saved: { it: 'SALVO', en: 'SAVED' },
  useless: { it: 'INUTILE', en: 'USELESS' },
}
