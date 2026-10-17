import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const sddCopy: MissionCopy = {
  lead: {
    it: "Il vibe coding funziona per un prototipo. Per il codice che resta, la _spec_ è il contratto tra te, il team e l'agente. Clicca le fasi.",
    en: 'Vibe coding works for a prototype. For code that stays, the _spec_ is the contract between you, the team and the agent. Click the stages.',
  },
  dos: {
    it: [
      'Approva ogni fase prima della successiva: spec, piano, task.',
      'Scrivi criteri di accettazione verificabili: diventano test.',
      'Se il codice devia dalla spec, aggiorna prima la spec (regola del drift).',
      'Strumenti del corso: OpenSpec, cc-sdd (`/kiro`), WellForge.',
    ],
    en: [
      'Approve each stage before the next: spec, plan, tasks.',
      'Write verifiable acceptance criteria: they become tests.',
      'If the code drifts from the spec, update the spec first (the drift rule).',
      'Course tools: OpenSpec, cc-sdd (`/kiro`), WellForge.',
    ],
  },
  donts: {
    it: [
      "Far scrivere la spec all'agente e approvarla senza leggerla.",
      'Spec da 15 pagine per un bugfix: la cerimonia va proporzionata al rischio.',
      'Lasciare la spec a marcire dopo il merge: una spec falsa è peggio di nessuna.',
    ],
    en: [
      'Having the agent write the spec and approving it without reading it.',
      'A 15-page spec for a bugfix: ceremony must match the risk.',
      'Letting the spec rot after the merge: a false spec is worse than none.',
    ],
  },
}

export type Stage = {
  name: string
  color: string
  file: Localized | string
  tagline: Localized
  body: Localized
}

export const STAGES: readonly Stage[] = [
  {
    name: 'Spec',
    color: '#2be0e8',
    file: 'spec.md',
    tagline: { it: 'Il cosa e il perché', en: 'The what and the why' },
    body: {
      it: "Problema, user story, criteri di accettazione verificabili, cosa è fuori scope. Nessuna scelta tecnica. La scrivi tu con l'agente come intervistatore, poi la approvi.",
      en: "Problem, user stories, verifiable acceptance criteria, what's out of scope. No technical choices. You write it with the agent as interviewer, then approve it.",
    },
  },
  {
    name: 'Plan',
    color: '#ffd21f',
    file: 'plan.md',
    tagline: { it: 'Il come', en: 'The how' },
    body: {
      it: 'Architettura, modello dati, contratti API, strategia di test, rischi. Le decisioni importanti diventano ADR. Lo rivede chi conosce il sistema.',
      en: 'Architecture, data model, API contracts, test strategy, risks. Important decisions become ADRs. Reviewed by someone who knows the system.',
    },
  },
  {
    name: 'Tasks',
    color: '#7cff3c',
    file: 'tasks.md',
    tagline: { it: 'Il passo per passo', en: 'Step by step' },
    body: {
      it: 'Task piccoli, ordinati per dipendenza, ognuno legato a un criterio di accettazione. Quelli indipendenti si possono parallelizzare con i worktree.',
      en: 'Small tasks, ordered by dependency, each tied to an acceptance criterion. Independent ones can be parallelised with worktrees.',
    },
  },
  {
    name: 'Implement',
    color: '#ff2e7e',
    file: { it: 'codice + test', en: 'code + tests' },
    tagline: { it: 'Il fare', en: 'The doing' },
    body: {
      it: "Un task per volta, test prima o insieme al codice. L'agente lavora dentro i confini della spec. Se la realtà diverge, si torna alla spec.",
      en: "One task at a time, tests before or alongside code. The agent works within the spec's boundaries. If reality diverges, go back to the spec.",
    },
  },
  {
    name: 'Verify',
    color: '#ff8a00',
    file: 'report',
    tagline: { it: 'Il giudizio', en: 'The verdict' },
    body: {
      it: 'Gate deterministici (build, test, sicurezza) più una valutazione contro i criteri di accettazione. Solo allora la feature è fatta.',
      en: 'Deterministic gates (build, tests, security) plus an evaluation against the acceptance criteria. Only then is the feature done.',
    },
  },
]

/** Example spec rendered in the editor window. Lines starting with ## are headings; GIVEN/WHEN/THEN are keywords. */
export const SPEC_EXAMPLE: Localized = {
  it: `## Problema
Gli utenti ricevono match con cani di età
incompatibile (cuccioli con cani anziani).

## User story
Come proprietario voglio filtrare i match per
fascia d'età per evitare incontri sbilanciati.

## Criteri di accettazione
- GIVEN filtro 1-5 anni WHEN GET /matches
  THEN nessun cane fuori fascia
- GIVEN nessun filtro THEN comportamento invariato

## Fuori scope
Filtro per taglia, ordinamento per distanza.`,
  en: `## Problem
Users get matches with dogs of an incompatible
age (puppies paired with senior dogs).

## User story
As an owner I want to filter matches by age
range to avoid unbalanced meetings.

## Acceptance criteria
- GIVEN filter 1-5 years WHEN GET /matches
  THEN no dog outside the range
- GIVEN no filter THEN behaviour unchanged

## Out of scope
Size filter, sorting by distance.`,
}
