import type { Localized, LocalizedList } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const llmCopy: MissionCopy = {
  lead: {
    it: 'Una frase per iniziare, poi _scava_ finché ti serve. Ogni strato aggiunge un livello di dettaglio.',
    en: 'One sentence to start, then _dig_ as deep as you need. Each layer adds a level of detail.',
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

export type DepthLayer = {
  title: Localized
  background: string
  color: string
  /** Either a single paragraph or a list of bullets. RichText markup allowed. */
  body: Localized | LocalizedList
  /** Shows the next-token demo inside this layer. */
  demo?: true
}

export const LAYERS: readonly DepthLayer[] = [
  {
    title: { it: 'Superficie', en: 'Surface' },
    background: '#123a1c',
    color: 'var(--green)',
    body: {
      it: 'Un LLM è un programma che, dato un testo, **prevede il pezzo di testo successivo**. Ripetuto migliaia di volte, quel singolo trucco produce codice, spiegazioni e piani. Non "sa" cose come un database: ha imparato schemi statistici da enormi quantità di testo e codice.',
      en: 'An LLM is a program that, given some text, **predicts the next piece of text**. Repeated thousands of times, that single trick produces code, explanations and plans. It doesn\'t "know" things like a database does: it has learned statistical patterns from huge amounts of text and code.',
    },
  },
  {
    title: { it: 'Prossimo token', en: 'Next token' },
    background: '#0f2c3a',
    color: 'var(--cyan)',
    demo: true,
    body: {
      it: 'A ogni passo il modello produce una **distribuzione di probabilità** su tutti i token possibili, poi ne sceglie uno (sampling). La **temperature** decide quanto osare: bassa = scelte prevedibili, alta = più varietà e più errori. Provalo qui sotto.',
      en: 'At every step the model produces a **probability distribution** over all possible tokens, then picks one (sampling). **Temperature** decides how bold to be: low = predictable choices, high = more variety and more mistakes. Try it below.',
    },
  },
  {
    title: { it: 'Dentro il modello', en: 'Inside the model' },
    background: '#24123a',
    color: 'var(--purple)',
    body: {
      it: [
        '**Token → embedding**: ogni token diventa un vettore di migliaia di numeri che ne cattura il "significato".',
        '**Transformer**: decine di strati che rielaborano quei vettori. Il pezzo chiave è l\'**attention**: ogni token "guarda" tutti i precedenti e decide quali contano. È per questo che il contesto conta così tanto.',
        '**Pesi (weights)**: miliardi di parametri numerici. Sono il modello. "Open weight" significa che puoi scaricare proprio questi.',
        "Il costo dell'attention cresce con la lunghezza del contesto: più contesto = più lento, più caro, e più facile che l'informazione importante si perda in mezzo.",
      ],
      en: [
        '**Token → embedding**: each token becomes a vector of thousands of numbers that captures its "meaning".',
        '**Transformer**: dozens of layers that rework those vectors. The key piece is **attention**: each token "looks at" all the previous ones and decides which matter. That\'s why context matters so much.',
        '**Weights**: billions of numeric parameters. They are the model. "Open weight" means you can download exactly these.',
        'Attention cost grows with context length: more context = slower, more expensive, and more likely that important information gets lost in the middle.',
      ],
    },
  },
  {
    title: { it: 'Come nasce', en: "How it's made" },
    background: '#3a2412',
    color: 'var(--orange)',
    body: {
      it: [
        '**Pre-training**: prevedere il token successivo su trilioni di token. Ne esce un "completatore" bravissimo ma non un assistente.',
        '**Fine-tuning su istruzioni**: esempi di domanda e risposta lo trasformano in assistente.',
        '**RL da feedback** (umano o automatico, es. test che passano): lo allinea a cosa è utile, sicuro, corretto. Qui nascono le capacità agentiche e di uso dei tool.',
        '**Knowledge cutoff**: dopo una certa data il modello non sa nulla. Le API e le librerie nuove vanno date nel contesto.',
      ],
      en: [
        '**Pre-training**: predicting the next token over trillions of tokens. The result is an excellent "autocompleter", not an assistant.',
        '**Instruction fine-tuning**: question and answer examples turn it into an assistant.',
        '**RL from feedback** (human or automatic, e.g. passing tests): aligns it with what is useful, safe and correct. This is where agentic and tool-use skills come from.',
        '**Knowledge cutoff**: after a certain date the model knows nothing. New APIs and libraries must be provided in context.',
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
        '**Non determinismo**: stesso prompt, risposte diverse. Progetta il workflow perché sia verificabile, non ripetibile.',
        '**Reasoning / thinking**: alcuni modelli "ragionano" generando token intermedi prima della risposta. Più qualità sui problemi difficili, più token pagati.',
        '**Context rot**: oltre una certa soglia di riempimento la qualità cala, anche se tecnicamente "ci sta".',
      ],
      en: [
        '**Hallucinations**: the model generates what is plausible, not what is true. A non-existent method "sounds" as right as a real one. Antidote: tests, the compiler, tools that verify.',
        '**Non-determinism**: same prompt, different answers. Design the workflow to be verifiable, not repeatable.',
        '**Reasoning / thinking**: some models "reason" by generating intermediate tokens before answering. Better quality on hard problems, more tokens paid.',
        '**Context rot**: past a certain fill level quality drops, even if it technically "fits".',
      ],
    },
  },
]

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
