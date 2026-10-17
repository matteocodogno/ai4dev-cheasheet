import type { Localized, LocalizedList } from '@/i18n/types'
import type { TerminalLine } from '@/ui'

import type { MissionCopy } from '../missions/registry'

export const worktreeCopy: MissionCopy = {
  lead: {
    it: 'Due agenti nella stessa cartella si pestano i piedi. Un _git worktree_ dà a ciascuno la sua copia di lavoro, sullo stesso repository.',
    en: "Two agents in the same folder step on each other's toes. A _git worktree_ gives each one its own working copy, on the same repository.",
  },
  dos: {
    it: [
      'Parallelizza task indipendenti che toccano file diversi.',
      'Parti da un main aggiornato e fai rebase spesso.',
      'Inizia con due agenti, sali solo se la review regge.',
    ],
    en: [
      'Parallelise independent tasks that touch different files.',
      'Start from an up-to-date main and rebase often.',
      'Start with two agents, scale up only if review keeps up.',
    ],
  },
  donts: {
    it: [
      'Mandare due agenti sullo stesso file "per vedere chi fa meglio" senza prevedere il merge.',
      'Usare il parallelismo per compiti con dipendenze: il secondo lavora su codice che non esiste ancora.',
      'Lasciare worktree orfani: `git worktree prune`.',
    ],
    en: [
      'Sending two agents to the same file "to see who does better" without planning the merge.',
      "Parallelising dependent tasks: the second one works on code that doesn't exist yet.",
      'Leaving orphaned worktrees: `git worktree prune`.',
    ],
  },
}

export const WT_LINES: Localized<readonly TerminalLine[]> = {
  it: [
    { kind: 'comment', text: '# una cartella per task, un branch per cartella' },
    { kind: 'cmd', text: 'git worktree add ../t4d-age -b feat/age-filter' },
    { kind: 'cmd', text: 'git worktree add ../t4d-notif -b feat/notifications' },
    { kind: 'blank' },
    { kind: 'comment', text: '# i file non tracciati NON vengono copiati' },
    { kind: 'cmd', text: 'cp .env ../t4d-age/ && cp .env ../t4d-notif/' },
    { kind: 'blank' },
    { kind: 'comment', text: '# un agente per terminale' },
    { kind: 'cmd', text: 'cd ../t4d-age && opencode' },
    { kind: 'blank' },
    { kind: 'comment', text: '# a fine lavoro' },
    { kind: 'cmd', text: 'git worktree list' },
    { kind: 'cmd', text: 'git worktree remove ../t4d-age' },
  ],
  en: [
    { kind: 'comment', text: '# one folder per task, one branch per folder' },
    { kind: 'cmd', text: 'git worktree add ../t4d-age -b feat/age-filter' },
    { kind: 'cmd', text: 'git worktree add ../t4d-notif -b feat/notifications' },
    { kind: 'blank' },
    { kind: 'comment', text: '# untracked files are NOT copied' },
    { kind: 'cmd', text: 'cp .env ../t4d-age/ && cp .env ../t4d-notif/' },
    { kind: 'blank' },
    { kind: 'comment', text: '# one agent per terminal' },
    { kind: 'cmd', text: 'cd ../t4d-age && opencode' },
    { kind: 'blank' },
    { kind: 'comment', text: '# when done' },
    { kind: 'cmd', text: 'git worktree list' },
    { kind: 'cmd', text: 'git worktree remove ../t4d-age' },
  ],
}

export const notIsolatedCopy: { title: Localized; items: LocalizedList } = {
  title: { it: 'Cosa il worktree NON isola', en: 'What a worktree does NOT isolate' },
  items: {
    it: [
      '**Database**: stesso Postgres, stesse tabelle. Usa schemi o container diversi per worktree.',
      '**Porte**: due Spring Boot su 8080 non partono. Assegna `SERVER_PORT` per worktree.',
      '**Container Docker** con lo stesso nome, cache condivise, servizi esterni.',
      '**Il tuo tempo di review**: tre agenti in parallelo producono tre diff da leggere.',
    ],
    en: [
      '**Database**: same Postgres, same tables. Use different schemas or containers per worktree.',
      "**Ports**: two Spring Boot apps on 8080 won't both start. Assign `SERVER_PORT` per worktree.",
      '**Docker containers** with the same name, shared caches, external services.',
      '**Your review time**: three agents in parallel produce three diffs to read.',
    ],
  },
}

export const graphLabels = {
  aria: {
    it: 'Due worktree partono da main e rientrano con un merge',
    en: 'Two worktrees branch off main and merge back',
  },
  agentA: { it: 'agente A', en: 'agent A' },
  agentB: { it: 'agente B', en: 'agent B' },
  merge: { it: 'review + merge (tu)', en: 'review + merge (you)' },
}
