import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const weightsCopy: MissionCopy = {
  lead: {
    it: 'La domanda non è "quale è migliore" ma _chi tiene i pesi_, e quindi chi paga cosa.',
    en: 'The question isn\'t "which is better" but _who holds the weights_, and therefore who pays for what.',
  },
  dos: {
    it: [
      'Scegli per compito: closed per agenti lunghi e refactoring, open per classificazione, estrazione, dati riservati.',
      'Calcola il costo totale: token × volume contro hardware + persone + tempo.',
      'Metti entrambi dietro lo stesso gateway, così cambiare modello è una riga di config.',
    ],
    en: [
      'Choose per task: closed for long agents and refactoring, open for classification, extraction, confidential data.',
      'Compute the total cost: tokens × volume versus hardware + people + time.',
      'Put both behind the same gateway, so switching model is one line of config.',
    ],
  },
  donts: {
    it: [
      'Scegliere un modello open "per risparmiare" senza misurare la qualità sul tuo caso.',
      'Ignorare la licenza perché "è su Hugging Face".',
      'Dare per scontato che "closed" significhi che i tuoi dati vengono usati per il training: verifica il contratto, spesso non è così via API.',
    ],
    en: [
      'Choosing an open model "to save money" without measuring quality on your use case.',
      'Ignoring the licence because "it\'s on Hugging Face".',
      'Assuming "closed" means your data is used for training: check the contract, via API it often isn\'t.',
    ],
  },
}

export type WeightSide = { title: string; color: string; paragraphs: LocalizedList }

export const SIDES: readonly WeightSide[] = [
  {
    title: 'Closed weight',
    color: 'var(--blue)',
    paragraphs: {
      it: [
        'I pesi restano al provider. Usi il modello solo via API o prodotto (Claude, GPT, Gemini).',
        '**Cosa paghi:** per token, input e output separati, con sconti per cache e batch. Oppure abbonamento a posto utente.',
        '**Ottieni:** i modelli più capaci, zero infrastruttura, aggiornamenti continui.',
        "**Rischi:** dati che escono dal perimetro, modello che cambia o viene ritirato, costi variabili con l'uso, lock-in.",
      ],
      en: [
        'The weights stay with the provider. You use the model only via API or product (Claude, GPT, Gemini).',
        '**What you pay:** per token, input and output priced separately, with discounts for caching and batch. Or a per-seat subscription.',
        '**You get:** the most capable models, zero infrastructure, continuous updates.',
        '**Risks:** data leaving your perimeter, models that change or get retired, usage-driven costs, lock-in.',
      ],
    },
  },
  {
    title: 'Open weight',
    color: 'var(--orange)',
    paragraphs: {
      it: [
        'I pesi sono scaricabili (Llama, Qwen, Mistral, DeepSeek, gpt-oss). Li fai girare dove vuoi.',
        '**Cosa paghi:** hardware (GPU, RAM), energia, operazioni. Oppure un host che lo serve per te, di nuovo a token, di solito meno caro.',
        '**Ottieni:** controllo, privacy, costo prevedibile, versione congelata, fine-tuning possibile.',
        "**Rischi:** qualità inferiore sui compiti agentici lunghi, licenze con clausole d'uso, il lavoro di gestione è tuo.",
      ],
      en: [
        'The weights are downloadable (Llama, Qwen, Mistral, DeepSeek, gpt-oss). You run them wherever you want.',
        '**What you pay:** hardware (GPU, RAM), energy, operations. Or a host that serves it for you, again per token, usually cheaper.',
        '**You get:** control, privacy, predictable cost, a frozen version, fine-tuning is possible.',
        '**Risks:** lower quality on long agentic tasks, licences with usage clauses, the operations work is yours.',
      ],
    },
  },
]

export const trapCopy: { title: Localized; body: Localized } = {
  title: {
    it: 'Trappola classica: open weight non è open source',
    en: 'Classic trap: open weight is not open source',
  },
  body: {
    it: "Hai i pesi, ma quasi mai i dati di training né il codice per riprodurli. E la licenza può limitare l'uso commerciale o imporre condizioni. Leggila prima di metterlo in produzione.",
    en: 'You get the weights, but almost never the training data or the code to reproduce them. And the licence may restrict commercial use or impose conditions. Read it before going to production.',
  },
}
