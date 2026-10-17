import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const sandboxCopy: MissionCopy = {
  lead: {
    it: "I permessi sono _il badge_: cosa l'agente può chiedere di fare. La sandbox sono _i muri_: cosa può toccare davvero, anche se il badge è sbagliato.",
    en: 'Permissions are _the badge_: what the agent may ask to do. The sandbox is _the walls_: what it can actually touch, even if the badge is wrong.',
  },
  dos: {
    it: [
      'Prima la sandbox, poi allarga i permessi: è la combinazione che ti dà autonomia.',
      'Nega esplicitamente la lettura di `.env`, `~/.ssh`, `~/.aws`.',
      'Versiona le regole di permesso del progetto insieme al codice.',
    ],
    en: [
      "Sandbox first, then loosen permissions: that's the combination that gives you autonomy.",
      'Explicitly deny reading `.env`, `~/.ssh`, `~/.aws`.',
      "Version the project's permission rules together with the code.",
    ],
  },
  donts: {
    it: [
      'Approvare in automatico ogni richiesta: la fatica da conferma è un rischio reale.',
      'Credere che una regola "deny" su `curl` blocchi l\'uscita dei dati: esistono cento altri modi senza sandbox di rete.',
      "Dare all'agente credenziali con più privilegi di quelli che daresti a un junior al primo giorno.",
    ],
    en: [
      'Auto-approving every request: confirmation fatigue is a real risk.',
      'Believing a "deny" rule on `curl` stops data exfiltration: without a network sandbox there are a hundred other ways.',
      "Giving the agent credentials with more privileges than you'd give a junior on day one.",
    ],
  },
}

export const SIDES: readonly { title: Localized; color: string; items: LocalizedList }[] = [
  {
    title: { it: 'Permessi (harness)', en: 'Permissions (harness)' },
    color: 'var(--yellow)',
    items: {
      it: [
        'Regole allow / ask / deny per tool e comandi: `Bash(./mvnw test)` sì, `Bash(rm -rf *)` no, lettura di `.env` negata.',
        "Applicati dall'agente stesso. Se una regola è scritta male o un comando consentito fa più del previsto, non c'è seconda linea.",
        'Proteggono dagli errori, non da un attacco (prompt injection in un README, in una issue, in una pagina web).',
      ],
      en: [
        'Allow / ask / deny rules per tool and command: `Bash(./mvnw test)` yes, `Bash(rm -rf *)` no, reading `.env` denied.',
        "Enforced by the agent harness itself. If a rule is badly written or an allowed command does more than expected, there's no second line.",
        'They protect against mistakes, not against an attack (prompt injection in a README, an issue, a web page).',
      ],
    },
  },
  {
    title: { it: 'Sandbox (sistema operativo)', en: 'Sandbox (operating system)' },
    color: 'var(--orange)',
    items: {
      it: [
        'Isolamento a livello OS o container: filesystem limitato alla cartella di progetto, rete solo verso domini consentiti.',
        "Vale per tutto ciò che l'agente lancia, compresi script e dipendenze. Nel corso usiamo `nono`, indipendente dal vendor.",
        "Riduce il raggio d'esplosione: anche il peggior comando resta dentro i muri.",
      ],
      en: [
        'OS or container-level isolation: filesystem limited to the project folder, network only to allowed domains.',
        'Applies to everything the agent launches, including scripts and dependencies. In the course we use `nono`, which is vendor-neutral.',
        'Shrinks the blast radius: even the worst command stays inside the walls.',
      ],
    },
  },
]

export type MatrixCell = { title: Localized; body: Localized; bg: string; color: string }

export const MATRIX = {
  cols: ['Sandbox OFF', 'Sandbox ON'],
  rows: [
    {
      label: { it: 'Permessi stretti', en: 'Tight permissions' },
      cells: [
        {
          title: { it: 'Lento e fragile', en: 'Slow and fragile' },
          body: {
            it: 'Mille richieste di conferma, e quando dici "sì a tutto" per stanchezza sei scoperto.',
            en: 'A thousand confirmation prompts, and when you say "yes to all" out of fatigue you\'re exposed.',
          },
          bg: '#5a3a0f',
          color: 'var(--yellow)',
        },
        {
          title: { it: 'Massima sicurezza', en: 'Maximum safety' },
          body: {
            it: 'Per codice di clienti, dati sensibili, ambienti condivisi.',
            en: 'For client code, sensitive data, shared environments.',
          },
          bg: '#0f3a1b',
          color: 'var(--green)',
        },
      ],
    },
    {
      label: { it: 'Permessi larghi', en: 'Loose permissions' },
      cells: [
        {
          title: { it: 'Game over', en: 'Game over' },
          body: {
            it: '`--dangerously-skip-permissions` sul laptop con le chiavi di produzione. Mai.',
            en: '`--dangerously-skip-permissions` on the laptop with production keys. Never.',
          },
          bg: '#3b0a0a',
          color: 'var(--red)',
        },
        {
          title: { it: 'Autonomia sicura', en: 'Safe autonomy' },
          body: {
            it: "L'agente lavora senza interruzioni, i muri limitano i danni. Il punto ideale per task lunghi.",
            en: 'The agent works without interruptions, the walls limit the damage. The sweet spot for long tasks.',
          },
          bg: '#0f3a1b',
          color: 'var(--cyan)',
        },
      ],
    },
  ] satisfies readonly { label: Localized; cells: readonly MatrixCell[] }[],
}
