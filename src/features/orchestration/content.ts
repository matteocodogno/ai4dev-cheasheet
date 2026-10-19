import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const orchestrationCopy: MissionCopy = {
  lead: {
    it: 'Workflow: il percorso lo scrivi tu nel codice. Agente: il percorso lo sceglie il modello. Prima di mettere in piedi una squadra di agenti chiediti se basta _una chiamata, una catena o un agente solo_. Ogni agente in più moltiplica token, latenza e punti di rottura.',
    en: 'Workflow: you write the path in code. Agent: the model picks the path. Before setting up a team of agents, ask whether _one call, a chain or a single agent_ is enough. Every extra agent multiplies tokens, latency and failure points.',
  },
  dos: {
    it: [
      'Parti da un agente solo con buoni tool. Aggiungi orchestrazione quando misuri un limite, non prima.',
      "Dai a ogni sub-agent un brief completo: obiettivo, vincoli, formato dell'output, quando fermarsi.",
      'Metti un budget (passi, token, tempo) e un criterio di stop a ogni loop.',
      'Isola i worker paralleli: un worktree, un branch, nessuna risorsa condivisa.',
    ],
    en: [
      'Start with a single agent and good tools. Add orchestration when you measure a limit, not before.',
      'Give every sub-agent a complete brief: goal, constraints, output format, when to stop.',
      'Put a budget (steps, tokens, time) and a stop criterion on every loop.',
      'Isolate parallel workers: one worktree, one branch, no shared resources.',
    ],
  },
  donts: {
    it: [
      "Multi-agent per fare scena: un agente che chiacchiera con un altro agente non è un'architettura.",
      "Usare lo stesso prompt per generare e per valutare: l'evaluator deve avere criteri suoi.",
      "Passare tra agenti riassunti vaghi: ogni passaggio perde contesto, e l'ultimo non sa più perché.",
    ],
    en: [
      'Multi-agent for show: one agent chatting with another agent is not an architecture.',
      'Using the same prompt to generate and to evaluate: the evaluator needs its own criteria.',
      'Passing vague summaries between agents: every hand-off loses context, and the last one no longer knows why.',
    ],
  },
}

export type PatternId = 'single' | 'chain' | 'routing' | 'parallel' | 'orchestrator' | 'evaluator'

export type Pattern = {
  id: PatternId
  name: string
  color: string
  kind: Localized
  /** Stages of the mini flow diagram; a nested array is drawn as parallel lanes. */
  flow: readonly (string | readonly string[])[]
  body: Localized
  useFor: Localized
  cost: Localized
}

export const PATTERNS: readonly Pattern[] = [
  {
    id: 'single',
    name: 'Single agent',
    color: '#ffd21f',
    kind: { it: 'il default', en: 'the default' },
    flow: ['task', 'agent ⟳ tools', 'result'],
    body: {
      it: 'Un modello in loop con i suoi tool: legge, agisce, verifica, ripete. Copre la maggior parte del lavoro quotidiano.',
      en: 'One model looping with its tools: read, act, verify, repeat. Covers most daily work.',
    },
    useFor: {
      it: 'Bug fix, feature piccola, refactoring locale.',
      en: 'Bug fix, small feature, local refactoring.',
    },
    cost: { it: 'Il contesto si riempie su task lunghi.', en: 'The context fills up on long tasks.' },
  },
  {
    id: 'chain',
    name: 'Prompt chaining',
    color: '#2be0e8',
    kind: { it: 'workflow', en: 'workflow' },
    flow: ['LLM 1', 'gate', 'LLM 2', 'gate', 'LLM 3'],
    body: {
      it: "Passi fissi in sequenza, ognuno con l'output del precedente. Tra un passo e l'altro un gate: un controllo automatico o un umano.",
      en: 'Fixed steps in sequence, each fed by the previous output. Between steps a gate: an automatic check or a human.',
    },
    useFor: {
      it: 'Spec, piano, task: il flusso spec-driven.',
      en: 'Spec, plan, tasks: the spec-driven flow.',
    },
    cost: {
      it: 'Rigido: se il task non si scompone così, forza.',
      en: "Rigid: if the task doesn't split that way, it forces it.",
    },
  },
  {
    id: 'routing',
    name: 'Routing',
    color: '#7cff3c',
    kind: { it: 'workflow', en: 'workflow' },
    flow: ['input', 'router', ['A', 'B', 'C']],
    body: {
      it: "Un classificatore guarda l'input e lo manda allo specialista giusto, o al modello più economico che basta.",
      en: 'A classifier looks at the input and sends it to the right specialist, or to the cheapest model that is enough.',
    },
    useFor: {
      it: 'Triage di issue e ticket, domande semplici al modello piccolo.',
      en: 'Issue and ticket triage, simple questions to the small model.',
    },
    cost: {
      it: 'Un errore del router manda tutto nel posto sbagliato.',
      en: 'A router mistake sends everything to the wrong place.',
    },
  },
  {
    id: 'parallel',
    name: 'Parallelization',
    color: '#3d8bff',
    kind: { it: 'workflow', en: 'workflow' },
    flow: ['task', ['LLM', 'LLM', 'LLM'], 'merge'],
    body: {
      it: '**Sectioning**: pezzi indipendenti in parallelo. **Voting**: lo stesso task più volte, poi si confrontano i risultati.',
      en: '**Sectioning**: independent pieces in parallel. **Voting**: the same task several times, then compare the results.',
    },
    useFor: {
      it: 'Review su sicurezza, performance e convenzioni in contemporanea.',
      en: 'Reviewing security, performance and conventions at the same time.',
    },
    cost: {
      it: 'Token moltiplicati; il merge va progettato.',
      en: 'Tokens multiplied; the merge must be designed.',
    },
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator-workers',
    color: '#b05cff',
    kind: { it: 'agentico', en: 'agentic' },
    flow: ['orchestrator', ['worker', 'worker', '…'], 'integrate'],
    body: {
      it: "L'orchestratore scompone il task _a runtime_ e delega a sub-agent con contesto pulito, poi integra. La differenza dal parallelo: i pezzi non li conosci prima.",
      en: 'The orchestrator splits the task _at runtime_ and delegates to sub-agents with a clean context, then integrates. The difference from parallel: you do not know the pieces in advance.',
    },
    useFor: {
      it: 'Modifiche su molti moduli, ognuno con le sue sorprese.',
      en: 'Changes across many modules, each with its own surprises.',
    },
    cost: {
      it: 'Il più caro e il più difficile da debuggare.',
      en: 'The most expensive and the hardest to debug.',
    },
  },
  {
    id: 'evaluator',
    name: 'Evaluator-optimizer',
    color: '#ff2e7e',
    kind: { it: 'agentico', en: 'agentic' },
    flow: ['generator', '⇄', 'evaluator', 'ok'],
    body: {
      it: "Uno genera, l'altro valuta con criteri espliciti e rimanda indietro il feedback, finché passa. Il criterio migliore è deterministico: test, compilatore, linter.",
      en: 'One generates, the other evaluates against explicit criteria and sends feedback back, until it passes. The best criterion is deterministic: tests, compiler, linter.',
    },
    useFor: {
      it: 'Codice che deve passare una suite, testi con una rubrica chiara.',
      en: 'Code that must pass a suite, texts with a clear rubric.',
    },
    cost: {
      it: 'Senza criterio chiaro gira in tondo.',
      en: 'Without a clear criterion it goes in circles.',
    },
  },
]

export type OrchestrationScenario = { what: Localized; best: PatternId; why: Localized }

export const SCENARIOS: readonly OrchestrationScenario[] = [
  {
    what: { it: 'Correggere un bug in un modulo che conosci.', en: 'Fix a bug in a module you know.' },
    best: 'single',
    why: {
      it: 'Nessuna orchestrazione: un agente con test e plan mode basta e avanza.',
      en: 'No orchestration: one agent with tests and plan mode is more than enough.',
    },
  },
  {
    what: {
      it: "Da una issue a spec, piano e task, con l'approvazione del team tra le fasi.",
      en: 'From an issue to spec, plan and tasks, with team approval between phases.',
    },
    best: 'chain',
    why: {
      it: 'Le fasi sono note e in ordine fisso; i gate sono le approvazioni umane.',
      en: 'The phases are known and in a fixed order; the gates are the human approvals.',
    },
  },
  {
    what: {
      it: 'Arrivano issue miste: bug, domande, richieste di feature.',
      en: 'Mixed issues come in: bugs, questions, feature requests.',
    },
    best: 'routing',
    why: {
      it: 'Prima si classifica, poi ogni tipo va al suo flusso (e le domande al modello economico).',
      en: 'Classify first, then each type goes to its own flow (and questions to the cheap model).',
    },
  },
  {
    what: {
      it: 'Review di una PR su sicurezza, performance e convenzioni.',
      en: 'Review a PR for security, performance and conventions.',
    },
    best: 'parallel',
    why: {
      it: 'Tre controlli indipendenti con prompt diversi: sectioning, poi un merge dei commenti.',
      en: 'Three independent checks with different prompts: sectioning, then merging the comments.',
    },
  },
  {
    what: {
      it: 'Migrare 40 servizi a una nuova major di Spring Boot.',
      en: 'Migrate 40 services to a new Spring Boot major.',
    },
    best: 'orchestrator',
    why: {
      it: "Il lavoro per servizio si scopre strada facendo: l'orchestratore delega, un worker per servizio, ognuno nel suo worktree.",
      en: 'The work per service is discovered along the way: the orchestrator delegates, one worker per service, each in its own worktree.',
    },
  },
  {
    what: {
      it: 'Scrivere una query SQL che deve passare una suite di test esistente.',
      en: 'Write an SQL query that must pass an existing test suite.',
    },
    best: 'evaluator',
    why: {
      it: 'Il criterio è deterministico: genera, lancia i test, rimanda gli errori, ripeti.',
      en: 'The criterion is deterministic: generate, run the tests, send back the failures, repeat.',
    },
  },
]

export const orchestrationLabels = {
  title: { it: 'Che schema serve?', en: 'Which pattern fits?' },
  hint: {
    it: 'Scegli il task: lo schema più semplice che regge si accende.',
    en: 'Pick the task: the simplest pattern that holds lights up.',
  },
  none: { it: 'Nessun task selezionato.', en: 'No task selected.' },
  useFor: { it: 'Per', en: 'For' },
  cost: { it: 'Costo', en: 'Cost' },
  match: { it: 'QUESTO', en: 'THIS ONE' },
  source: {
    it: 'Tassonomia da "Building effective agents" (Anthropic).',
    en: 'Taxonomy from "Building effective agents" (Anthropic).',
  },
  sourceUrl: 'https://www.anthropic.com/engineering/building-effective-agents',
}
