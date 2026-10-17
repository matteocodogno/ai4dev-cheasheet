import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const infraCopy: MissionCopy = {
  lead: {
    it: 'Tutto quello che si muove quando chiedi qualcosa a un agente. _Clicca un componente_ per vedere cosa fa, cosa ci passa dentro e come non farsi male.',
    en: 'Everything that moves when you ask an agent for something. _Click a component_ to see what it does, what flows through it and how not to get hurt.',
  },
  dos: {
    it: [
      'Passa sempre da un gateway (LiteLLM): un solo punto per chiavi, budget, alias di modello e fallback.',
      "Traccia ogni chiamata (Langfuse): prompt, token, costo, latenza. Senza dati non c'è ottimizzazione.",
      "Fai girare l'agente dentro una sandbox, con rete e filesystem limitati.",
      'Usa alias di modello (`coder-default`) invece di nomi hardcoded nel codice e in CI.',
    ],
    en: [
      'Always go through a gateway (LiteLLM): one place for keys, budgets, model aliases and fallbacks.',
      'Trace every call (Langfuse): prompt, tokens, cost, latency. No data, no optimisation.',
      'Run the agent inside a sandbox, with limited network and filesystem.',
      'Use model aliases (`coder-default`) instead of hardcoded names in code and CI.',
    ],
  },
  donts: {
    it: [
      'Chiavi API dei provider sui laptop degli sviluppatori o nei repo.',
      'Server MCP installati "perché c\'erano" senza sapere che permessi hanno.',
      'Mandare codice di un cliente a un provider senza aver verificato contratto e data retention.',
      'Dare per scontato che il modello locale sia gratis: paghi in hardware, tempo e qualità.',
    ],
    en: [
      'Provider API keys on developer laptops or in repositories.',
      'MCP servers installed "because they were there" without knowing what permissions they have.',
      "Sending a client's code to a provider without checking the contract and data retention.",
      'Assuming the local model is free: you pay in hardware, time and quality.',
    ],
  },
}

export const infraLabels = {
  flows: { it: 'Cosa passa', en: 'What flows' },
  diagram: { it: "Diagramma dell'infrastruttura AI4Dev", en: 'AI4Dev infrastructure diagram' },
}

export type InfraNodeId =
  | 'dev'
  | 'ide'
  | 'harness'
  | 'ctx'
  | 'git'
  | 'litellm'
  | 'mcp'
  | 'ci'
  | 'openrouter'
  | 'ollama'
  | 'langfuse'
  | 'app'
  | 'closed'
  | 'openw'

export type InfraNode = {
  id: InfraNodeId
  x: number
  y: number
  label: string
  sub: Localized | string
  color: string
  kind: Localized | string
  desc: Localized
  flow: Localized
  do: Localized
  dont: Localized
}

export type InfraZone = { x: number; y: number; w: number; h: number; color: string; label: Localized }

export const NODE_W = 150
export const NODE_H = 64

export const ZONES: readonly InfraZone[] = [
  { x: 10, y: 85, w: 395, h: 465, color: '#2be0e855', label: { it: 'il tuo laptop', en: 'your laptop' } },
  { x: 200, y: 262, w: 190, h: 268, color: '#ff8a00', label: { it: 'sandbox (nono)', en: 'sandbox (nono)' } },
  {
    x: 452,
    y: 95,
    w: 186,
    h: 280,
    color: '#ff2e7e88',
    label: { it: 'self-hosted su Railway', en: 'self-hosted on Railway' },
  },
]

export const NODES: readonly InfraNode[] = [
  {
    id: 'dev',
    x: 30,
    y: 290,
    label: 'Developer',
    sub: { it: 'tu', en: 'you' },
    color: '#f3e7c8',
    kind: { it: 'Umano', en: 'Human' },
    desc: {
      it: 'Decide cosa fare, scrive la richiesta, approva piani e permessi, rivede il diff. Resta responsabile del codice che finisce nel repo.',
      en: 'Decides what to do, writes the request, approves plans and permissions, reviews the diff. Remains accountable for the code that lands in the repo.',
    },
    flow: {
      it: "Prompt e approvazioni verso l'agente; review verso Git.",
      en: 'Prompts and approvals to the agent; reviews to Git.',
    },
    do: { it: 'Definisci il "finito" prima di iniziare.', en: 'Define "done" before you start.' },
    dont: { it: 'Approvare a raffica senza leggere.', en: 'Rapid-fire approving without reading.' },
  },
  {
    id: 'ide',
    x: 220,
    y: 110,
    label: 'IDE assistant',
    sub: 'Copilot · IntelliJ AI',
    color: '#2be0e8',
    kind: 'Client',
    desc: {
      it: "Completamento e chat dentro l'editor. Ottimo per modifiche locali e veloci, con contesto limitato al file e a quello che apri.",
      en: 'Completion and chat inside the editor. Great for quick local edits, with context limited to the file and what you open.',
    },
    flow: {
      it: 'Snippet del file aperto verso il gateway o il servizio del vendor.',
      en: 'Snippets of the open file to the gateway or the vendor service.',
    },
    do: { it: 'Usalo per micro-modifiche mentre scrivi.', en: 'Use it for micro-edits while you type.' },
    dont: {
      it: 'Usarlo per refactoring su 20 file: serve un agente.',
      en: 'Using it for a 20-file refactoring: that needs an agent.',
    },
  },
  {
    id: 'harness',
    x: 220,
    y: 290,
    label: 'Agent harness',
    sub: 'OpenCode · Claude Code',
    color: '#ffd21f',
    kind: { it: 'Agente', en: 'Agent' },
    desc: {
      it: "Il programma che esegue l'agent loop: costruisce il contesto, chiama il modello, esegue i tool (file, shell, MCP), applica i permessi. È qui che vivono plan mode, checkpoint, sub-agent.",
      en: 'The program that runs the agent loop: builds the context, calls the model, runs tools (files, shell, MCP), enforces permissions. Plan mode, checkpoints and sub-agents live here.',
    },
    flow: {
      it: 'Contesto e definizioni dei tool verso il modello; tool call verso sandbox e MCP.',
      en: 'Context and tool definitions to the model; tool calls to the sandbox and MCP.',
    },
    do: {
      it: 'Configura permessi e AGENTS.md per progetto.',
      en: 'Configure permissions and AGENTS.md per project.',
    },
    dont: {
      it: 'Lanciarlo fuori dalla sandbox con permessi larghi.',
      en: 'Running it outside the sandbox with loose permissions.',
    },
  },
  {
    id: 'ctx',
    x: 220,
    y: 440,
    label: 'Context files',
    sub: 'AGENTS.md · skill · hook',
    color: '#b05cff',
    kind: { it: 'Configurazione', en: 'Configuration' },
    desc: {
      it: 'Istruzioni, skill, command e hook versionati nel repo. Sono il modo in cui il team "programma" il comportamento dell\'agente.',
      en: 'Instructions, skills, commands and hooks versioned in the repo. They are how the team "programs" the agent\'s behaviour.',
    },
    flow: {
      it: "Letti dall'harness a inizio sessione (AGENTS.md) o quando servono (skill).",
      en: 'Read by the harness at session start (AGENTS.md) or when needed (skills).',
    },
    do: { it: 'Versionali e rivedili come il codice.', en: 'Version and review them like code.' },
    dont: { it: 'Lasciarli crescere senza potatura.', en: 'Letting them grow without pruning.' },
  },
  {
    id: 'git',
    x: 220,
    y: 575,
    label: 'Git',
    sub: 'branch · worktree',
    color: '#7cff3c',
    kind: { it: 'Rete di sicurezza', en: 'Safety net' },
    desc: {
      it: 'La storia del codice. Ogni task su un branch, commit piccoli, worktree per il parallelo.',
      en: "The code's history. Every task on a branch, small commits, worktrees for parallel work.",
    },
    flow: {
      it: "Commit dell'agente o tuoi verso il remote; PR verso la CI.",
      en: 'Agent or human commits to the remote; PRs to CI.',
    },
    do: { it: 'Albero pulito prima di ogni sessione.', en: 'Clean tree before every session.' },
    dont: { it: "Lasciare push e force push all'agente.", en: 'Leaving push and force push to the agent.' },
  },
  {
    id: 'litellm',
    x: 470,
    y: 290,
    label: 'LiteLLM',
    sub: 'gateway · Railway',
    color: '#ff8a00',
    kind: 'Gateway',
    desc: {
      it: 'Proxy unico compatibile OpenAI verso tutti i modelli. Gestisce chiavi virtuali per persona o team, budget, rate limit, alias di modello e fallback.',
      en: 'A single OpenAI-compatible proxy to every model. Manages virtual keys per person or team, budgets, rate limits, model aliases and fallbacks.',
    },
    flow: {
      it: 'Richieste da agenti, IDE e app verso OpenRouter o Ollama; tracce verso Langfuse.',
      en: 'Requests from agents, IDEs and apps to OpenRouter or Ollama; traces to Langfuse.',
    },
    do: {
      it: 'Una chiave virtuale per dev e una per CI, con budget.',
      en: 'One virtual key per dev and one for CI, with budgets.',
    },
    dont: { it: 'Distribuire le chiavi reali dei provider.', en: 'Handing out the real provider keys.' },
  },
  {
    id: 'mcp',
    x: 470,
    y: 440,
    label: 'MCP servers',
    sub: 'github · playwright · t4d',
    color: '#ff2e7e',
    kind: 'Tool',
    desc: {
      it: "Server che espongono tool e dati all'agente con un protocollo standard: issue GitHub, browser Playwright, il server MCP di tinder4dogs.",
      en: 'Servers exposing tools and data to the agent through a standard protocol: GitHub issues, Playwright browser, the tinder4dogs MCP server.',
    },
    flow: {
      it: "Tool call dall'harness; risultati che entrano nel contesto.",
      en: 'Tool calls from the harness; results that enter the context.',
    },
    do: { it: 'Abilita solo quelli che servono al task.', en: 'Enable only the ones the task needs.' },
    dont: {
      it: 'Installare server non verificati: eseguono codice con i tuoi permessi.',
      en: 'Installing unverified servers: they run code with your permissions.',
    },
  },
  {
    id: 'ci',
    x: 470,
    y: 575,
    label: 'CI',
    sub: 'Actions · Trivy · Gitleaks',
    color: '#3d8bff',
    kind: 'Delivery',
    desc: {
      it: 'Il giudice imparziale: build, test, scansione vulnerabilità e segreti su ogni PR, che sia scritta da te o da un agente.',
      en: 'The impartial judge: build, tests, vulnerability and secret scanning on every PR, whether written by you or by an agent.',
    },
    flow: {
      it: "PR da Git; deploy verso l'app; alias di modello CI via LiteLLM.",
      en: 'PRs from Git; deploys to the app; CI model aliases via LiteLLM.',
    },
    do: { it: 'Stessi gate per codice umano e generato.', en: 'Same gates for human and generated code.' },
    dont: {
      it: 'Saltare i gate "perché l\'ha già testato l\'agente".',
      en: 'Skipping gates "because the agent already tested it".',
    },
  },
  {
    id: 'openrouter',
    x: 720,
    y: 120,
    label: 'OpenRouter',
    sub: 'router provider',
    color: '#2be0e8',
    kind: 'Provider',
    desc: {
      it: "Aggregatore che dà accesso a molti modelli closed e open weight con un'unica API e fatturazione.",
      en: 'An aggregator giving access to many closed and open-weight models through one API and one bill.',
    },
    flow: {
      it: 'Richieste da LiteLLM verso i singoli provider.',
      en: 'Requests from LiteLLM to the individual providers.',
    },
    do: {
      it: 'Controlla quali provider sono abilitati e le loro policy sui dati.',
      en: 'Check which providers are enabled and their data policies.',
    },
    dont: {
      it: 'Lasciare il routing "al più economico" su codice riservato.',
      en: 'Leaving "cheapest" routing on for confidential code.',
    },
  },
  {
    id: 'ollama',
    x: 720,
    y: 290,
    label: 'Ollama',
    sub: 'open weight · localhost',
    color: '#7cff3c',
    kind: { it: 'Modello locale', en: 'Local model' },
    desc: {
      it: 'Server di modelli open weight sulla tua macchina. Nessun dato esce, costo marginale zero, qualità inferiore ai modelli di frontiera.',
      en: 'An open-weight model server on your machine. No data leaves, zero marginal cost, lower quality than frontier models.',
    },
    flow: {
      it: "Richieste da LiteLLM o direttamente dall'app su localhost:11434.",
      en: 'Requests from LiteLLM or directly from the app on localhost:11434.',
    },
    do: {
      it: 'Usalo per dati riservati e test offline.',
      en: 'Use it for confidential data and offline tests.',
    },
    dont: { it: 'Esporlo sulla rete.', en: 'Exposing it on the network.' },
  },
  {
    id: 'langfuse',
    x: 470,
    y: 120,
    label: 'Langfuse',
    sub: 'tracing · prompt registry',
    color: '#b05cff',
    kind: { it: 'Osservabilità', en: 'Observability' },
    desc: {
      it: "Registra ogni chiamata: prompt, risposta, token, costo, latenza. Fa anche da registry dei prompt usati dall'app e da harness di valutazione.",
      en: 'Records every call: prompt, response, tokens, cost, latency. Also acts as the prompt registry for the app and as an evaluation harness.',
    },
    flow: {
      it: "Tracce da LiteLLM e dall'app; prompt versionati verso l'app.",
      en: 'Traces from LiteLLM and the app; versioned prompts to the app.',
    },
    do: {
      it: 'Etichetta le chiamate per utente, feature e ambiente.',
      en: 'Tag calls by user, feature and environment.',
    },
    dont: { it: 'Loggare dati personali senza mascheramento.', en: 'Logging personal data without masking.' },
  },
  {
    id: 'app',
    x: 720,
    y: 440,
    label: 'tinder4dogs',
    sub: 'Spring Boot · PG · pgvector',
    color: '#f3e7c8',
    kind: { it: 'Applicazione', en: 'Application' },
    desc: {
      it: 'Il prodotto del lab: Kotlin, Spring Boot, PostgreSQL con pgvector per il RAG. Usa a sua volta LLM via Spring AI.',
      en: 'The lab product: Kotlin, Spring Boot, PostgreSQL with pgvector for RAG. It uses LLMs itself via Spring AI.',
    },
    flow: {
      it: 'Chiamate LLM via LiteLLM (tracciate in Langfuse); prompt versionati da Langfuse; dati esposti dal server MCP.',
      en: 'LLM calls via LiteLLM (traced in Langfuse); versioned prompts from Langfuse; data exposed by the MCP server.',
    },
    do: {
      it: "Tratta l'LLM come una dipendenza esterna: timeout, fallback, test.",
      en: 'Treat the LLM as an external dependency: timeouts, fallbacks, tests.',
    },
    dont: { it: 'Prompt hardcoded senza versione.', en: 'Hardcoded, unversioned prompts.' },
  },
  {
    id: 'closed',
    x: 925,
    y: 60,
    label: 'Closed',
    sub: 'Claude · GPT · Gemini',
    color: '#3d8bff',
    kind: { it: 'Modelli', en: 'Models' },
    desc: {
      it: 'Modelli di frontiera accessibili solo via API. I più capaci per agenti e ragionamento lungo. Si pagano a token.',
      en: 'Frontier models available only via API. The most capable for agents and long reasoning. Paid per token.',
    },
    flow: {
      it: 'Ricevono contesto, restituiscono testo e tool call.',
      en: 'They receive context, return text and tool calls.',
    },
    do: { it: 'Usali per i task agentici complessi.', en: 'Use them for complex agentic tasks.' },
    dont: {
      it: 'Mandare segreti o dati personali non necessari.',
      en: 'Sending secrets or unnecessary personal data.',
    },
  },
  {
    id: 'openw',
    x: 925,
    y: 190,
    label: 'Open hosted',
    sub: 'Qwen · Llama · DeepSeek',
    color: '#ff8a00',
    kind: { it: 'Modelli', en: 'Models' },
    desc: {
      it: 'Modelli open weight serviti da un provider: costano meno a token, ma i dati escono comunque dal perimetro.',
      en: 'Open-weight models served by a provider: cheaper per token, but data still leaves your perimeter.',
    },
    flow: { it: 'Come i closed, via OpenRouter.', en: 'Like closed ones, via OpenRouter.' },
    do: {
      it: 'Valuta su un set di prova prima di adottarli.',
      en: 'Evaluate on a test set before adopting them.',
    },
    dont: {
      it: 'Confonderli con "locale": girano su server di altri.',
      en: 'Confusing them with "local": they run on someone else\'s servers.',
    },
  },
]

export const EDGES: readonly (readonly [InfraNodeId, InfraNodeId])[] = [
  ['dev', 'harness'],
  ['dev', 'ide'],
  ['ide', 'litellm'],
  ['harness', 'litellm'],
  ['harness', 'mcp'],
  ['ctx', 'harness'],
  ['harness', 'git'],
  ['git', 'ci'],
  ['litellm', 'openrouter'],
  ['litellm', 'ollama'],
  ['litellm', 'langfuse'],
  ['openrouter', 'closed'],
  ['openrouter', 'openw'],
  ['ci', 'app'],
  ['mcp', 'app'],
]
