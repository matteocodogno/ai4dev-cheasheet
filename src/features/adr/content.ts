import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const adrCopy: MissionCopy = {
  lead: {
    it: 'Il codice dice _cosa_, l\'ADR dice _perché_. Senza il perché, un agente (o un collega appena arrivato) "sistema" la scelta che avevate fatto apposta. Un ADR è corto, numerato e immutabile: una decisione, il contesto, le alternative scartate, le conseguenze.',
    en: 'Code says _what_, the ADR says _why_. Without the why, an agent (or a new colleague) "fixes" the choice you made on purpose. An ADR is short, numbered and immutable: one decision, the context, the rejected alternatives, the consequences.',
  },
  dos: {
    it: [
      'Una decisione per ADR, con le alternative scartate e il motivo.',
      "Tieni gli ADR nel repository (`docs/adr/`) e linkane l'indice da AGENTS.md.",
      "Chiedi all'agente di verificare ogni piano contro gli ADR prima di scrivere codice.",
      'Per cambiare idea scrivi un nuovo ADR che sostituisce il vecchio (`Superseded by`).',
    ],
    en: [
      'One decision per ADR, with the rejected alternatives and why.',
      'Keep ADRs in the repository (`docs/adr/`) and link the index from AGENTS.md.',
      'Ask the agent to check every plan against the ADRs before writing code.',
      'To change your mind, write a new ADR that replaces the old one (`Superseded by`).',
    ],
  },
  donts: {
    it: [
      'Un ADR per ogni scelta: se tutto è una decisione architetturale, niente lo è.',
      "Lasciare che sia l'agente ad accettare un ADR: lui scrive la bozza, il team decide.",
      'Modificare un ADR accettato: la storia delle decisioni è il valore.',
      'Tenerli in un wiki lontano dal codice, dove nessun agente li legge.',
    ],
    en: [
      'An ADR for every choice: if everything is an architectural decision, nothing is.',
      'Letting the agent accept an ADR: it writes the draft, the team decides.',
      'Editing an accepted ADR: the history of decisions is the value.',
      'Keeping them in a wiki far from the code, where no agent reads them.',
    ],
  },
}

export const ADR_TEMPLATE = `# ADR-0007: jOOQ instead of JPA for persistence

Status: Accepted · 2026-10-19
Deciders: backend team
Supersedes: none

## Context
Complex reporting queries, a schema owned by the DBA team,
N+1 issues with JPA in the previous project.

## Options
1. JPA / Hibernate
2. jOOQ with code generation from the schema
3. Plain JDBC templates

## Decision
Option 2. Type-safe SQL, generated from the real schema.

## Consequences
+ Queries checked at compile time, no lazy-loading surprises
+ Agents see explicit SQL instead of ORM magic
- Code generation step in the build
- No automatic dirty checking: updates are explicit`

export const ADR_PROMPT = `Read docs/adr/ and the discussion in #1234.
Draft an ADR with the template in docs/adr/0000-template.md:
context, at least two options with pros and cons, a proposed
decision. Status: Proposed. Do not change any code.`

export type AdrVerdict = 'adr' | 'agents' | 'none'

export type Decision = { what: Localized; verdict: AdrVerdict; why: Localized }

export const DECISIONS: readonly Decision[] = [
  {
    what: {
      it: 'Passare da REST a gRPC tra due servizi',
      en: 'Switch from REST to gRPC between two services',
    },
    verdict: 'adr',
    why: {
      it: 'Difficile da invertire e attraversa i confini tra team. Chi arriva dopo deve sapere perché.',
      en: 'Hard to reverse and it crosses team boundaries. Whoever comes later must know why.',
    },
  },
  {
    what: { it: 'jOOQ invece di JPA', en: 'jOOQ instead of JPA' },
    verdict: 'adr',
    why: {
      it: 'Cambia il modo di scrivere ogni repository. Senza ADR, il primo agente che vede jOOQ propone di "modernizzare" con JPA.',
      en: 'It changes how every repository is written. Without an ADR, the first agent that sees jOOQ proposes to "modernise" with JPA.',
    },
  },
  {
    what: {
      it: 'Nessun dato personale verso modelli closed weight senza contratto enterprise',
      en: 'No personal data to closed weight models without an enterprise contract',
    },
    verdict: 'adr',
    why: {
      it: 'È un vincolo con un perché legale. ADR per la storia, più una riga in AGENTS.md (e un hook) per farlo rispettare.',
      en: 'It is a constraint with a legal reason. ADR for the history, plus a line in AGENTS.md (and a hook) to enforce it.',
    },
  },
  {
    what: { it: 'I test si chiamano `should_<comportamento>`', en: 'Tests are named `should_<behaviour>`' },
    verdict: 'agents',
    why: {
      it: "È una convenzione, non una decisione con alternative pesanti: va in AGENTS.md, dove l'agente la legge a ogni sessione.",
      en: 'It is a convention, not a decision with heavy alternatives: it goes in AGENTS.md, where the agent reads it every session.',
    },
  },
  {
    what: { it: 'Aggiornare una libreria alla patch successiva', en: 'Bump a library to the next patch' },
    verdict: 'none',
    why: {
      it: 'Lo dice già il commit. Nessuna alternativa da ricordare.',
      en: 'The commit already says it. No alternative to remember.',
    },
  },
  {
    what: { it: 'Rinominare una classe', en: 'Rename a class' },
    verdict: 'none',
    why: { it: 'Reversibile in un minuto. Rumore.', en: 'Reversible in a minute. Noise.' },
  },
]

export const verdictLabel: Record<AdrVerdict, Localized> = {
  adr: { it: 'ADR', en: 'ADR' },
  agents: { it: 'AGENTS.md', en: 'AGENTS.md' },
  none: { it: 'Niente', en: 'Nothing' },
}

export type AdrStep = { who: Localized; what: Localized; color: string }

export const LIFECYCLE: readonly AdrStep[] = [
  {
    who: { it: 'Agente', en: 'Agent' },
    what: {
      it: 'Scrive la bozza dalla discussione: contesto, opzioni, pro e contro. Status `Proposed`.',
      en: 'Drafts it from the discussion: context, options, pros and cons. Status `Proposed`.',
    },
    color: 'var(--cyan)',
  },
  {
    who: { it: 'Team', en: 'Team' },
    what: {
      it: 'Discute nella PR e decide. Status `Accepted` o `Rejected`: anche un rifiuto è una decisione.',
      en: 'Discusses in the PR and decides. Status `Accepted` or `Rejected`: a rejection is a decision too.',
    },
    color: 'var(--yellow)',
  },
  {
    who: { it: 'AGENTS.md', en: 'AGENTS.md' },
    what: {
      it: "Una riga per ADR nell'indice: numero, titolo, regola. Il dettaglio resta nel file.",
      en: 'One line per ADR in the index: number, title, rule. The detail stays in the file.',
    },
    color: 'var(--purple)',
  },
  {
    who: { it: 'Agente', en: 'Agent' },
    what: {
      it: 'Prima di ogni piano controlla gli ADR. Se il piano ne viola uno, si ferma e lo dice.',
      en: 'Before every plan it checks the ADRs. If the plan violates one, it stops and says so.',
    },
    color: 'var(--green)',
  },
]

export const adrLabels = {
  template: { it: 'Un ADR completo', en: 'A complete ADR' },
  prompt: { it: "Fallo scrivere all'agente", en: 'Have the agent draft it' },
  pickerTitle: { it: 'Merita un ADR?', en: 'Is it worth an ADR?' },
  pickerHint: {
    it: 'Scegli una decisione: ADR, una riga in AGENTS.md o niente?',
    en: 'Pick a decision: ADR, one line in AGENTS.md, or nothing?',
  },
  none: { it: 'Nessuna decisione selezionata.', en: 'No decision selected.' },
  lifecycle: { it: 'Il ciclo di vita con gli agenti', en: 'The lifecycle with agents' },
}
