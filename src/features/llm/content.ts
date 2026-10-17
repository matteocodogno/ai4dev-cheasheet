import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const llmCopy: MissionCopy = {
  lead: {
    it: 'Il percorso di _Large Language Models explained briefly_ di 3Blue1Brown, in sei strati. Parti dal copione, poi scava finché ti serve.',
    en: "The path of 3Blue1Brown's _Large Language Models explained briefly_, in six layers. Start from the script, then dig as deep as you need.",
  },
  dos: {
    it: [
      "Tratta l'output come la PR di un collega bravo ma distratto: si rivede sempre.",
      'Chiudi il cerchio con verifiche automatiche: compilazione, test, linter.',
      'Dai al modello la documentazione delle librerie recenti invece di sperare che la conosca.',
    ],
    en: [
      'Treat the output like a PR from a skilled but distracted colleague: always review it.',
      'Close the loop with automatic checks: compilation, tests, linters.',
      'Give the model the docs of recent libraries instead of hoping it knows them.',
    ],
  },
  donts: {
    it: [
      'Chiedere "sei sicuro?" come verifica: risponde in modo plausibile, non controlla.',
      'Usare un LLM per calcoli esatti o dati che cambiano senza un tool.',
      'Antropomorfizzare: "ha capito" e "si ricorda" sono scorciatoie, non fatti.',
    ],
    en: [
      'Asking "are you sure?" as verification: it answers plausibly, it doesn\'t check.',
      'Using an LLM for exact calculations or changing data without a tool.',
      'Anthropomorphising: "it understood" and "it remembers" are shortcuts, not facts.',
    ],
  },
}

export const VIDEO = {
  url: 'https://www.youtube.com/watch?v=LPZh9BOjkQs',
  lessonUrl: 'https://www.3blue1brown.com/lessons/mini-llm/',
  title: 'Large Language Models explained briefly',
  author: '3Blue1Brown',
  duration: '8 min',
  label: { it: 'Guarda il video', en: 'Watch the video' },
  lesson: { it: 'versione scritta', en: 'written version' },
  note: {
    it: "Livelli 1-5 dal video. Il livello 6 è un'aggiunta del corso.",
    en: 'Layers 1-5 follow the video. Layer 6 is a course addition.',
  },
}

export type DepthLayer = {
  title: Localized
  background: string
  color: string
  /** Either a single paragraph or a list of bullets. RichText markup allowed. */
  body: Localized | LocalizedList
  /** Shows the next-token demo inside this layer. */
  demo?: 'next-token' | 'transformer'
}

export const LAYERS: readonly DepthLayer[] = [
  {
    title: { it: 'Il copione strappato', en: 'The torn script' },
    background: '#123a1c',
    color: 'var(--green)',
    body: {
      it: [
        "Immagina un copione: un dialogo tra una persona e un assistente AI, ma le risposte dell'assistente sono state strappate via.",
        'Ora immagina una macchina che, dato un testo qualsiasi, **prevede la parola successiva**. Le dai il copione, lei propone la prima parola della risposta, la aggiungi al testo e ripeti. Parola dopo parola, la risposta si scrive da sola.',
        'Un chatbot fa esattamente questo. Un LLM è una **funzione matematica molto sofisticata** che, per qualunque testo, prevede cosa viene dopo.',
        'Il "copione" iniziale che descrive l\'assistente è quello che oggi chiamiamo **system prompt**. Il tuo messaggio viene aggiunto in coda, poi il modello continua a scrivere.',
      ],
      en: [
        "Picture a movie script: a dialogue between a person and an AI assistant, but the assistant's replies have been torn out.",
        'Now picture a machine that, given any text, **predicts the next word**. You feed it the script, it proposes the first word of the reply, you append it and repeat. Word by word, the reply writes itself.',
        'A chatbot does exactly this. An LLM is a **very sophisticated mathematical function** that predicts what comes next for any piece of text.',
        'The opening "script" describing the assistant is what we now call the **system prompt**. Your message is appended to it, then the model keeps writing.',
      ],
    },
  },
  {
    title: { it: 'Probabilità, non certezze', en: 'Probabilities, not certainties' },
    background: '#0f2c3a',
    color: 'var(--cyan)',
    demo: 'next-token',
    body: {
      it: 'Il modello non sceglie una parola con certezza: assegna una **probabilità a ogni parola possibile**. Se prendesse sempre la più probabile il testo suonerebbe meccanico, quindi a volte ne pesca una meno probabile. Per questo, anche se la funzione è deterministica, **lo stesso prompt dà risposte diverse**. La **temperature** regola quanto osare. Provalo qui sotto.',
      en: "The model doesn't pick one word with certainty: it assigns a **probability to every possible word**. Always taking the most likely one sounds mechanical, so it sometimes draws a less likely one. That's why, even though the function is deterministic, **the same prompt gives different answers**. **Temperature** sets how bold to be. Try it below.",
    },
  },
  {
    title: { it: 'Come impara', en: 'How it learns' },
    background: '#24123a',
    color: 'var(--purple)',
    body: {
      it: [
        "**Parametri (o pesi)**: pensali come le manopole di una macchina enorme. Il comportamento del modello dipende solo da questi valori, e i modelli grandi ne hanno **centinaia di miliardi**. Nessuno li imposta a mano: partono casuali, e all'inizio il modello produce solo parole a caso.",
        "**Un passo di addestramento**: prendi un testo, nascondi l'ultima parola, fai prevedere al modello quella parola e confrontala con quella vera.",
        "**Backpropagation**: l'algoritmo che ritocca tutte le manopole di poco, così la parola giusta diventa un po' più probabile e tutte le altre un po' meno.",
        'Ripeti su **trilioni** di esempi e il modello diventa bravo sul testo che ha visto e sorprendentemente ragionevole su quello che non ha mai visto.',
        '**La scala**: leggere senza sosta il testo usato per addestrare GPT-3 richiederebbe a una persona **più di 2.600 anni**, e i modelli più recenti ne usano molto di più.',
        '**Il calcolo**: con un miliardo di somme e moltiplicazioni al secondo, addestrare i modelli più grandi richiederebbe **ben oltre 100 milioni di anni**. Si può fare solo grazie alle **GPU**, chip progettati per fare moltissime operazioni in parallelo.',
      ],
      en: [
        "**Parameters (or weights)**: think of them as the dials of a huge machine. The model's behaviour depends only on these values, and large models have **hundreds of billions** of them. Nobody sets them by hand: they start random, and at first the model just outputs gibberish.",
        '**One training step**: take a text, hide the last word, have the model predict it and compare with the true word.',
        '**Backpropagation**: the algorithm that nudges every dial slightly, so the right word becomes a bit more likely and every other word a bit less.',
        'Repeat over **trillions** of examples and the model gets good on the text it has seen and surprisingly reasonable on text it has never seen.',
        "**The scale**: reading GPT-3's training text non-stop would take a person **over 2,600 years**, and newer models use far more.",
        "**The compute**: at one billion additions and multiplications per second, training the largest models would take **well over 100 million years**. It's only possible thanks to **GPUs**, chips built to run huge numbers of operations in parallel.",
      ],
    },
  },
  {
    title: { it: 'Da completatore ad assistente', en: 'From autocompleter to assistant' },
    background: '#3a2412',
    color: 'var(--orange)',
    body: {
      it: [
        'Tutto quello visto finora è il **pre-training**: il modello impara a completare testo preso da internet. Ma completare internet non è la stessa cosa che essere un buon assistente.',
        "Per questo c'è una seconda fase: **RLHF** (reinforcement learning from human feedback). Persone vere segnalano le risposte inutili o problematiche, e le loro correzioni spostano i parametri verso le risposte che gli utenti preferiscono.",
        'Conseguenza pratica: il modello è ottimizzato per dare risposte **gradite e plausibili**, non per verificare che siano vere. La verifica tocca a te (e ai tuoi test).',
      ],
      en: [
        'Everything so far is **pre-training**: the model learns to auto-complete text taken from the internet. But auto-completing the internet is not the same as being a good assistant.',
        "So there's a second stage: **RLHF** (reinforcement learning from human feedback). Real people flag unhelpful or problematic replies, and their corrections shift the parameters toward the replies users prefer.",
        "Practical consequence: the model is optimised to give **pleasing, plausible** answers, not to check they're true. Verification is on you (and your tests).",
      ],
    },
  },
  {
    title: { it: 'Dentro il transformer', en: 'Inside the transformer' },
    background: '#2a1040',
    color: '#d08cff',
    demo: 'transformer',
    body: {
      it: [
        'Fino al 2017 i modelli leggevano il testo **una parola alla volta**. Il **transformer**, introdotto da ricercatori di Google, lo legge **tutto insieme, in parallelo**: è quello che rende utili le GPU.',
        "**Embedding**: ogni parola diventa una lunga lista di numeri, perché l'addestramento funziona solo con valori continui. Quei numeri codificano il significato della parola.",
        '**Attention**: le liste di numeri si "parlano" e si correggono a vicenda in base al contesto. "Pesca" in "ho mangiato una pesca matura" e in "andiamo a pesca sul fiume" parte uguale ed esce diversa.',
        "**Feed-forward (MLP)**: una rete neurale che dà al modello spazio per memorizzare gli schemi imparati durante l'addestramento.",
        "Attention e feed-forward si ripetono per **molti strati**. Alla fine, l'ultimo vettore della sequenza, ormai carico di contesto, produce la probabilità di ogni parola successiva.",
        '**Comportamento emergente**: i ricercatori progettano la struttura, ma il comportamento nasce dalla taratura di centinaia di miliardi di parametri. Per questo è molto difficile spiegare **perché** un modello fa proprio quella previsione.',
      ],
      en: [
        "Until 2017 models read text **one word at a time**. The **transformer**, introduced by researchers at Google, takes it in **all at once, in parallel**: that's what makes GPUs pay off.",
        "**Embeddings**: each word becomes a long list of numbers, because training only works with continuous values. Those numbers encode the word's meaning.",
        '**Attention**: the lists of numbers "talk" to each other and refine their meaning from the context. "Bank" in "they jumped into the river bank" and in "the bank raised rates" starts the same and comes out different.',
        '**Feed-forward (MLP)**: a neural network that gives the model room to store the patterns learned during training.',
        'Attention and feed-forward repeat for **many layers**. In the end, the last vector of the sequence, now loaded with context, produces the probability of every possible next word.',
        "**Emergent behaviour**: researchers design the framework, but the behaviour comes from how hundreds of billions of parameters get tuned. That's why it's so hard to explain **why** a model makes exactly the prediction it does.",
      ],
    },
  },
  {
    title: { it: 'Limiti da veterano', en: 'Veteran-level limits' },
    background: '#3a1220',
    color: 'var(--magenta)',
    body: {
      it: [
        '**Allucinazioni**: il modello genera ciò che è plausibile, non ciò che è vero. Un metodo inesistente "suona" giusto quanto uno reale. Antidoto: test, compilatore, tool che verificano.',
        '**Knowledge cutoff**: dopo una certa data il modello non sa nulla. Le API e le librerie nuove vanno date nel contesto.',
        '**Reasoning / thinking**: alcuni modelli "ragionano" generando token intermedi prima della risposta. Più qualità sui problemi difficili, più token pagati.',
        '**Context rot**: più testo dai all\'attention, più l\'informazione importante si diluisce. Oltre una certa soglia la qualità cala, anche se tecnicamente "ci sta".',
      ],
      en: [
        '**Hallucinations**: the model generates what is plausible, not what is true. A non-existent method "sounds" as right as a real one. Antidote: tests, the compiler, tools that verify.',
        '**Knowledge cutoff**: after a certain date the model knows nothing. New APIs and libraries must be provided in context.',
        '**Reasoning / thinking**: some models "reason" by generating intermediate tokens before answering. Better quality on hard problems, more tokens paid.',
        '**Context rot**: the more text you give attention, the more the important information gets diluted. Past a certain point quality drops, even if it technically "fits".',
      ],
    },
  },
]

/** Stages of the transformer pipeline shown under layer 5. */
export const TRANSFORMER_FLOW: readonly { label: Localized; color: string; repeat?: true }[] = [
  { label: { it: 'testo', en: 'text' }, color: 'var(--paper)' },
  { label: { it: 'embedding', en: 'embeddings' }, color: 'var(--cyan)' },
  { label: { it: 'attention', en: 'attention' }, color: 'var(--magenta)', repeat: true },
  { label: { it: 'feed-forward', en: 'feed-forward' }, color: 'var(--yellow)', repeat: true },
  {
    label: { it: 'probabilità della parola successiva', en: 'next-word probabilities' },
    color: 'var(--green)',
  },
]

export const transformerLabels = {
  repeat: { it: '× molti strati', en: '× many layers' },
  aria: { it: 'Pipeline del transformer', en: 'Transformer pipeline' },
}

export const llmLabels = {
  depth: { it: 'PROFONDITÀ', en: 'DEPTH' },
  dig: { it: 'Scava più a fondo', en: 'Dig deeper' },
  up: { it: 'Risali', en: 'Go back up' },
  sample: { it: 'Campiona token', en: 'Sample token' },
  reset: { it: 'Reset', en: 'Reset' },
  complete: {
    it: 'Frase completa. Alza la temperature e ricomincia: vedrai uscire scelte più strane.',
    en: "Sentence complete. Raise the temperature and restart: you'll see stranger choices come out.",
  },
}

/** Candidate next tokens with their logits, one step per entry. */
export type Candidate = readonly [token: string, logit: number]

export const NEXT_TOKEN: Localized<{ prompt: string; steps: readonly (readonly Candidate[])[] }> = {
  it: {
    prompt: 'Il test è fallito perché il',
    steps: [
      [
        ['metodo', 3.1],
        ['mock', 2.6],
        ['valore', 2.2],
        ['database', 1.7],
        ['cane', 0.2],
        ['gelato', -1.5],
      ],
      [
        ['restituisce', 2.9],
        ['non', 2.5],
        ['è', 1.9],
        ['lancia', 1.6],
        ['abbaia', -0.5],
        ['vola', -1.8],
      ],
      [
        ['null', 3.0],
        ['un', 2.4],
        ['una', 1.6],
        ['sempre', 1.1],
        ['pizza', -1.2],
        ['Marte', -2.0],
      ],
      [
        ['.', 2.8],
        ['invece', 2.2],
        ['quando', 1.8],
        ['senza', 1.2],
        ['!', 0.6],
        ['🐕', -1.0],
      ],
    ],
  },
  en: {
    prompt: 'The test failed because the',
    steps: [
      [
        ['method', 3.1],
        ['mock', 2.6],
        ['value', 2.2],
        ['database', 1.7],
        ['dog', 0.2],
        ['ice cream', -1.5],
      ],
      [
        ['returns', 2.9],
        ['is', 2.5],
        ['throws', 1.9],
        ['never', 1.6],
        ['barks', -0.5],
        ['flies', -1.8],
      ],
      [
        ['null', 3.0],
        ['an', 2.4],
        ['the', 1.6],
        ['always', 1.1],
        ['pizza', -1.2],
        ['Mars', -2.0],
      ],
      [
        ['.', 2.8],
        ['instead', 2.2],
        ['when', 1.8],
        ['without', 1.2],
        ['!', 0.6],
        ['🐕', -1.0],
      ],
    ],
  },
}
