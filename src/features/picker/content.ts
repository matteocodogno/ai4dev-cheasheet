import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const pickerCopy: MissionCopy = {
  lead: {
    it: 'Quattro domande, poi le opzioni papabili. _Il dato decide dove può girare il modello, il task decide quale._',
    en: 'Four questions, then the shortlist. _The data decides where the model may run, the task decides which one._',
  },
  dos: {
    it: [
      'Parti dal dato, non dal modello: la classificazione del dato restringe le opzioni prima ancora del task.',
      'Metti ogni scelta dietro un alias LiteLLM (`coder-default`, `batch-cheap`): cambiare modello diventa una riga di config.',
      'Confronta 2-3 candidati sullo stesso set di prompt presi dal tuo caso reale.',
    ],
    en: [
      'Start from the data, not the model: data classification narrows the options before the task does.',
      'Put every choice behind a LiteLLM alias (`coder-default`, `batch-cheap`): switching model becomes one line of config.',
      'Compare 2-3 candidates on the same prompt set taken from your real use case.',
    ],
  },
  donts: {
    it: [
      'Usare il modello più grande per tutto: su classificazione e batch paghi molto di più senza guadagno di qualità.',
      'Mandare dati regolati a un\'API solo perché "non fanno training": servono contratto, regione e retention verificati.',
      'Fidarsi delle classifiche generiche: il benchmark che conta è il tuo.',
    ],
    en: [
      'Using the biggest model for everything: on classification and batch you pay far more for no quality gain.',
      'Sending regulated data to an API just because "they don\'t train on it": you need a verified contract, region and retention.',
      'Trusting generic leaderboards: the benchmark that matters is yours.',
    ],
  },
}

export type TaskKind = 'agent' | 'reasoning' | 'assist' | 'batch' | 'embed'
export type DataClass = 'public' | 'internal' | 'client' | 'regulated'
export type Volume = 'low' | 'team' | 'high'
export type Hardware = 'cloud' | 'laptop' | 'gpu'

export type Answers = { task?: TaskKind; data?: DataClass; volume?: Volume; hardware?: Hardware }
export type QuestionId = keyof Answers

export type Choice<V extends string> = { value: V; label: Localized; hint: Localized }

export type Question =
  | { id: 'task'; title: Localized; choices: readonly Choice<TaskKind>[] }
  | { id: 'data'; title: Localized; choices: readonly Choice<DataClass>[] }
  | { id: 'volume'; title: Localized; choices: readonly Choice<Volume>[] }
  | { id: 'hardware'; title: Localized; choices: readonly Choice<Hardware>[] }

export const QUESTIONS: readonly Question[] = [
  {
    id: 'task',
    title: { it: 'Che lavoro deve fare?', en: 'What job does it do?' },
    choices: [
      {
        value: 'agent',
        label: { it: 'Agente di coding', en: 'Coding agent' },
        hint: { it: 'task lunghi, tool, più file', en: 'long tasks, tools, many files' },
      },
      {
        value: 'reasoning',
        label: { it: 'Ragionamento difficile', en: 'Hard reasoning' },
        hint: { it: 'architettura, debug, review', en: 'architecture, debugging, review' },
      },
      {
        value: 'assist',
        label: { it: 'Assistenza rapida', en: 'Quick assist' },
        hint: { it: 'completamento, piccole modifiche, chat', en: 'completion, small edits, chat' },
      },
      {
        value: 'batch',
        label: { it: 'Batch su testo', en: 'Text batch jobs' },
        hint: { it: 'estrazione, classificazione, riassunti', en: 'extraction, classification, summaries' },
      },
      {
        value: 'embed',
        label: { it: 'Ricerca semantica / RAG', en: 'Semantic search / RAG' },
        hint: { it: 'embedding per pgvector', en: 'embeddings for pgvector' },
      },
    ],
  },
  {
    id: 'data',
    title: { it: 'Che dati vede il modello?', en: 'What data does the model see?' },
    choices: [
      {
        value: 'public',
        label: { it: 'Pubblici', en: 'Public' },
        hint: { it: 'open source, documentazione', en: 'open source, documentation' },
      },
      {
        value: 'internal',
        label: { it: 'Interni', en: 'Internal' },
        hint: { it: 'codice nostro, niente dati personali', en: 'our code, no personal data' },
      },
      {
        value: 'client',
        label: { it: 'Del cliente', en: "Client's" },
        hint: { it: 'codice sotto NDA o contratto', en: 'code under NDA or contract' },
      },
      {
        value: 'regulated',
        label: { it: 'Regolati', en: 'Regulated' },
        hint: {
          it: 'dati personali, sanitari, finanziari, segreti',
          en: 'personal, health, financial data, secrets',
        },
      },
    ],
  },
  {
    id: 'volume',
    title: { it: 'Quanto lo userete?', en: 'How much will you use it?' },
    choices: [
      {
        value: 'low',
        label: { it: 'Poco', en: 'Lightly' },
        hint: { it: 'una persona, ogni tanto', en: 'one person, now and then' },
      },
      {
        value: 'team',
        label: { it: 'Tutto il team', en: 'Whole team' },
        hint: { it: 'uso quotidiano', en: 'daily use' },
      },
      {
        value: 'high',
        label: { it: 'Pipeline', en: 'Pipeline' },
        hint: { it: 'migliaia di chiamate al giorno', en: 'thousands of calls a day' },
      },
    ],
  },
  {
    id: 'hardware',
    title: { it: 'Che hardware avete?', en: 'What hardware do you have?' },
    choices: [
      {
        value: 'cloud',
        label: { it: 'Solo cloud', en: 'Cloud only' },
        hint: { it: 'nessuna macchina dedicata', en: 'no dedicated machines' },
      },
      {
        value: 'laptop',
        label: { it: 'Laptop potenti', en: 'Strong laptops' },
        hint: { it: 'es. Apple Silicon con 32 GB+', en: 'e.g. Apple Silicon with 32 GB+' },
      },
      {
        value: 'gpu',
        label: { it: 'GPU nostre', en: 'Our own GPUs' },
        hint: { it: 'server o cloud GPU gestiti da noi', en: 'servers or cloud GPUs we run' },
      },
    ],
  },
]

export type Access = 'ok' | 'conditions' | 'no'

export type ModelOption = {
  id: string
  name: Localized
  examples: Localized
  /** 0 = not suited, 3 = best fit. */
  fit: Record<TaskKind, 0 | 1 | 2 | 3>
  access: Record<DataClass, Access>
  /** Cost fit by usage volume: -1 = poor, 2 = great. */
  cost: Record<Volume, -1 | 0 | 1 | 2>
  /** Hardware this option needs; undefined = runs anywhere. */
  needs?: readonly Hardware[]
  why: Localized
  conditions: Localized
  howTo: Localized
}

export const OPTIONS: readonly ModelOption[] = [
  {
    id: 'frontier-api',
    name: { it: 'Modello di frontiera via API', en: 'Frontier model via API' },
    examples: { it: 'Claude Opus / Sonnet, GPT, Gemini Pro', en: 'Claude Opus / Sonnet, GPT, Gemini Pro' },
    fit: { agent: 3, reasoning: 3, assist: 2, batch: 1, embed: 0 },
    access: { public: 'ok', internal: 'ok', client: 'conditions', regulated: 'no' },
    cost: { low: 1, team: 1, high: -1 },
    why: {
      it: 'I più capaci su task lunghi, uso dei tool e ragionamento. Zero infrastruttura.',
      en: 'The most capable on long tasks, tool use and reasoning. Zero infrastructure.',
    },
    conditions: {
      it: 'Per codice del cliente: contratto business con zero data retention, e permesso esplicito del cliente.',
      en: "For client code: a business contract with zero data retention, and the client's explicit permission.",
    },
    howTo: {
      it: 'Chiave del provider solo in LiteLLM, alias `coder-default`, budget per persona.',
      en: 'Provider key only in LiteLLM, alias `coder-default`, per-person budget.',
    },
  },
  {
    id: 'frontier-tenant',
    name: {
      it: 'Frontiera nel vostro cloud, regione EU/CH',
      en: 'Frontier in your cloud tenant, EU/CH region',
    },
    examples: {
      it: 'Gli stessi modelli via AWS Bedrock, Google Vertex AI o Azure OpenAI',
      en: 'The same models via AWS Bedrock, Google Vertex AI or Azure OpenAI',
    },
    fit: { agent: 3, reasoning: 3, assist: 2, batch: 1, embed: 0 },
    access: { public: 'ok', internal: 'ok', client: 'ok', regulated: 'conditions' },
    cost: { low: 0, team: 1, high: -1 },
    why: {
      it: 'Qualità di frontiera dentro il contratto e la regione che avete già con il cloud provider.',
      en: 'Frontier quality inside the contract and region you already have with your cloud provider.',
    },
    conditions: {
      it: 'Per dati regolati: DPA firmato, regione verificata (non tutti i modelli sono disponibili in ogni regione) e parere legale.',
      en: 'For regulated data: signed DPA, verified region (not every model is available in every region) and a legal review.',
    },
    howTo: {
      it: 'LiteLLM supporta Bedrock, Vertex e Azure come backend: stesso alias, cambia solo la config.',
      en: 'LiteLLM supports Bedrock, Vertex and Azure as backends: same alias, only the config changes.',
    },
  },
  {
    id: 'small-api',
    name: { it: 'Modello piccolo e veloce via API', en: 'Small, fast model via API' },
    examples: { it: 'Claude Haiku, GPT mini, Gemini Flash', en: 'Claude Haiku, GPT mini, Gemini Flash' },
    fit: { agent: 1, reasoning: 1, assist: 3, batch: 3, embed: 0 },
    access: { public: 'ok', internal: 'ok', client: 'conditions', regulated: 'no' },
    cost: { low: 2, team: 2, high: 2 },
    why: {
      it: 'Costa una frazione dei modelli grandi e risponde in fretta: ideale per volumi e compiti ripetitivi.',
      en: 'Costs a fraction of the big models and answers fast: ideal for volume and repetitive jobs.',
    },
    conditions: {
      it: 'Stesse condizioni delle API di frontiera per il codice del cliente.',
      en: 'Same conditions as frontier APIs for client code.',
    },
    howTo: {
      it: 'Alias `batch-cheap` in LiteLLM; usalo anche per i sub-agent di esplorazione.',
      en: 'Alias `batch-cheap` in LiteLLM; use it for exploration sub-agents too.',
    },
  },
  {
    id: 'open-hosted',
    name: { it: 'Open weight su un host esterno', en: 'Open weight on an external host' },
    examples: {
      it: 'Qwen Coder, DeepSeek, gpt-oss, Llama, Mistral via OpenRouter o provider dedicati',
      en: 'Qwen Coder, DeepSeek, gpt-oss, Llama, Mistral via OpenRouter or dedicated providers',
    },
    fit: { agent: 2, reasoning: 2, assist: 2, batch: 3, embed: 0 },
    access: { public: 'ok', internal: 'conditions', client: 'no', regulated: 'no' },
    cost: { low: 2, team: 2, high: 2 },
    why: {
      it: 'Prezzo per token basso e tanta scelta. Buono per sperimentare prima di decidere se ospitarlo voi.',
      en: 'Low price per token and lots of choice. Good to experiment before deciding whether to host it yourselves.',
    },
    conditions: {
      it: 'Per codice interno: scegli host con policy chiare su log e retention, e disattiva il routing "al più economico".',
      en: 'For internal code: pick hosts with clear log and retention policies, and turn off "cheapest" routing.',
    },
    howTo: {
      it: 'Via OpenRouter dietro LiteLLM; fissa provider e versione del modello.',
      en: 'Via OpenRouter behind LiteLLM; pin provider and model version.',
    },
  },
  {
    id: 'self-host',
    name: { it: 'Open weight sulle vostre GPU', en: 'Open weight on your own GPUs' },
    examples: {
      it: 'Qwen Coder, gpt-oss, Llama, Mistral serviti con vLLM',
      en: 'Qwen Coder, gpt-oss, Llama, Mistral served with vLLM',
    },
    fit: { agent: 2, reasoning: 2, assist: 2, batch: 3, embed: 0 },
    access: { public: 'ok', internal: 'ok', client: 'ok', regulated: 'ok' },
    cost: { low: -1, team: 1, high: 2 },
    needs: ['gpu'],
    why: {
      it: 'Il dato non esce mai dal vostro perimetro e il costo è fisso: conviene quando il volume è alto.',
      en: 'Data never leaves your perimeter and the cost is fixed: it pays off when volume is high.',
    },
    conditions: {
      it: 'Serve qualcuno che gestisca GPU, aggiornamenti e monitoraggio. Qualità inferiore alla frontiera sugli agenti lunghi.',
      en: 'You need someone to run GPUs, updates and monitoring. Lower quality than frontier on long agent tasks.',
    },
    howTo: {
      it: "vLLM espone un'API compatibile OpenAI: la registri in LiteLLM come qualsiasi altro modello.",
      en: 'vLLM exposes an OpenAI-compatible API: register it in LiteLLM like any other model.',
    },
  },
  {
    id: 'laptop',
    name: { it: 'Modello locale sul laptop', en: 'Local model on the laptop' },
    examples: {
      it: 'Qwen Coder 7-14B, gpt-oss 20B via Ollama',
      en: 'Qwen Coder 7-14B, gpt-oss 20B via Ollama',
    },
    fit: { agent: 0, reasoning: 1, assist: 2, batch: 2, embed: 0 },
    access: { public: 'ok', internal: 'ok', client: 'ok', regulated: 'ok' },
    cost: { low: 2, team: 0, high: -1 },
    needs: ['laptop', 'gpu'],
    why: {
      it: 'Nessun dato esce dalla macchina, costo marginale zero, funziona anche offline.',
      en: 'No data leaves the machine, zero marginal cost, works offline too.',
    },
    conditions: {
      it: 'Qualità e velocità limitate: va bene per assistenza e prototipi, non per guidare un agente.',
      en: 'Limited quality and speed: fine for assist and prototypes, not for driving an agent.',
    },
    howTo: {
      it: 'Ollama con `OLLAMA_CONTEXT_LENGTH` alzato; vedi la missione successiva.',
      en: 'Ollama with a raised `OLLAMA_CONTEXT_LENGTH`; see the next mission.',
    },
  },
  {
    id: 'embed-api',
    name: { it: 'Embedding via API', en: 'Embeddings via API' },
    examples: {
      it: 'Modelli di embedding di OpenAI, Voyage o Gemini, salvati in pgvector',
      en: 'Embedding models from OpenAI, Voyage or Gemini, stored in pgvector',
    },
    fit: { agent: 0, reasoning: 0, assist: 0, batch: 0, embed: 3 },
    access: { public: 'ok', internal: 'ok', client: 'conditions', regulated: 'no' },
    cost: { low: 2, team: 2, high: 1 },
    why: {
      it: 'Qualità alta, nessuna infrastruttura, costo basso: gli embedding sono economici.',
      en: 'High quality, no infrastructure, low cost: embeddings are cheap.',
    },
    conditions: {
      it: 'Il testo indicizzato esce verso il provider: stesse condizioni delle API per il codice del cliente.',
      en: 'The indexed text goes to the provider: same conditions as APIs for client code.',
    },
    howTo: {
      it: 'Fissa modello e dimensione del vettore: se li cambi devi reindicizzare tutto.',
      en: 'Pin model and vector size: if you change them you must re-index everything.',
    },
  },
  {
    id: 'embed-open',
    name: { it: 'Embedding open in casa', en: 'Open embeddings in-house' },
    examples: {
      it: 'bge-m3, multilingual-e5, nomic-embed-text, salvati in pgvector',
      en: 'bge-m3, multilingual-e5, nomic-embed-text, stored in pgvector',
    },
    fit: { agent: 0, reasoning: 0, assist: 0, batch: 0, embed: 3 },
    access: { public: 'ok', internal: 'ok', client: 'ok', regulated: 'ok' },
    cost: { low: 1, team: 2, high: 2 },
    why: {
      it: 'Modelli piccoli che girano anche su CPU: il dato resta in casa. Scegline uno multilingue se i testi sono in italiano.',
      en: 'Small models that even run on CPU: data stays in-house. Pick a multilingual one if the texts are in Italian.',
    },
    conditions: {
      it: 'Valuta la qualità del retrieval sulle tue query prima di sceglierlo.',
      en: 'Measure retrieval quality on your own queries before choosing it.',
    },
    howTo: {
      it: 'Ollama o un container con il modello; stesso pgvector, stessa pipeline.',
      en: 'Ollama or a container with the model; same pgvector, same pipeline.',
    },
  },
]

export const pickerLabels = {
  step: { it: 'Domanda', en: 'Question' },
  back: { it: 'Indietro', en: 'Back' },
  restart: { it: 'Ricomincia', en: 'Start over' },
  resultsTitle: { it: 'Opzioni papabili', en: 'Shortlist' },
  best: { it: 'Prima scelta', en: 'Top pick' },
  alt: { it: 'Alternativa', en: 'Alternative' },
  examples: { it: 'Esempi', en: 'Examples' },
  why: { it: 'Perché', en: 'Why' },
  conditions: { it: 'A condizione che', en: 'Provided that' },
  caveat: { it: 'Attenzione', en: 'Watch out' },
  how: { it: 'Come collegarlo', en: 'How to wire it' },
  excluded: { it: 'Scartate', en: 'Ruled out' },
  excludedData: {
    it: 'questo tipo di dato non può uscire verso questo servizio',
    en: "this kind of data can't go to this service",
  },
  excludedHardware: { it: 'richiede hardware che non avete', en: "needs hardware you don't have" },
  none: {
    it: 'Nessuna opzione regge questi vincoli. Con dati regolati e solo cloud, servono un tenant cloud con DPA e regione verificati oppure GPU vostre: parlane con legale e infrastruttura prima di partire.',
    en: 'No option meets these constraints. With regulated data and cloud only, you need a cloud tenant with a verified DPA and region, or your own GPUs: talk to legal and infrastructure before starting.',
  },
  disclaimer: {
    it: 'Le famiglie di modelli sono indicative e cambiano ogni pochi mesi: verifica versioni, prezzi e disponibilità prima di decidere. Non è una consulenza legale sul trattamento dei dati.',
    en: 'Model families are indicative and change every few months: check versions, prices and availability before deciding. This is not legal advice on data processing.',
  },
}
