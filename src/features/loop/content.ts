import type { Localized } from '@/i18n/types'

import type { MissionCopy } from '../missions/registry'

export const loopCopy: MissionCopy = {
  lead: {
    it: 'Un agente è un LLM in un ciclo: _pensa, agisce con un tool, osserva il risultato_, ricomincia finché il task è chiuso o qualcosa lo ferma.',
    en: 'An agent is an LLM in a loop: _think, act with a tool, observe the result_, repeat until the task is done or something stops it.',
  },
  dos: {
    it: [
      "Dai all'agente un modo per verificarsi da solo: test, build, uno screenshot. È il moltiplicatore più grande.",
      'Definisci il "finito": criteri di accettazione chiari chiudono il loop.',
      'Interrompi presto ([[Esc]]) quando vedi che va nella direzione sbagliata.',
    ],
    en: [
      "Give the agent a way to check itself: tests, a build, a screenshot. It's the biggest multiplier.",
      'Define "done": clear acceptance criteria close the loop.',
      'Interrupt early ([[Esc]]) when you see it heading the wrong way.',
    ],
  },
  donts: {
    it: [
      'Lasciarlo girare senza limite di turni o budget.',
      'Accettare "ho sistemato" senza un risultato di tool che lo dimostri.',
      'Rispondere a un fallimento con "riprova": aggiungi l\'informazione che mancava.',
    ],
    en: [
      'Letting it run without a turn or budget limit.',
      'Accepting "I fixed it" without a tool result that proves it.',
      'Answering a failure with "try again": add the information that was missing.',
    ],
  },
}

export type LoopStep = { short: Localized; title: Localized; body: Localized; fill: string; ink: string }

export const STEPS: readonly LoopStep[] = [
  {
    short: { it: 'Contesto', en: 'Context' },
    title: { it: 'Raccoglie contesto', en: 'Gathers context' },
    body: {
      it: 'Legge AGENTS.md, il task, i file indicati. Cerca con grep e glob ciò che manca. Qui si vince o si perde: contesto sbagliato, tutto il resto sbaglia.',
      en: "Reads AGENTS.md, the task, the files you pointed at. Searches with grep and glob for what's missing. This is where you win or lose: wrong context, everything else goes wrong.",
    },
    fill: '#2be0e8',
    ink: '#0b8f96',
  },
  {
    short: { it: 'Pensa', en: 'Think' },
    title: { it: 'Pensa e pianifica', en: 'Thinks and plans' },
    body: {
      it: 'Il modello decide il prossimo passo. Con plan mode si ferma qui e ti mostra il piano prima di agire.',
      en: 'The model decides the next step. In plan mode it stops here and shows you the plan before acting.',
    },
    fill: '#ffd21f',
    ink: '#b38b00',
  },
  {
    short: { it: 'Agisce', en: 'Act' },
    title: { it: 'Agisce con un tool', en: 'Acts with a tool' },
    body: {
      it: "Emette una tool call: modifica un file, lancia un comando, chiama un MCP. L'harness controlla i permessi, la sandbox limita gli effetti.",
      en: 'Emits a tool call: edits a file, runs a command, calls an MCP. The harness checks permissions, the sandbox limits the effects.',
    },
    fill: '#ff2e7e',
    ink: '#ff2e7e',
  },
  {
    short: { it: 'Osserva', en: 'Observe' },
    title: { it: 'Osserva il risultato', en: 'Observes the result' },
    body: {
      it: "L'output del tool entra nel contesto: errori di compilazione, test rossi, risultati di ricerca. È il feedback che rende l'agente diverso da una chat.",
      en: 'The tool output enters the context: compile errors, red tests, search results. This feedback is what makes an agent different from a chat.',
    },
    fill: '#7cff3c',
    ink: '#2f8f12',
  },
  {
    short: { it: 'Verifica', en: 'Verify' },
    title: { it: 'Verifica e decide', en: 'Verifies and decides' },
    body: {
      it: 'Test verdi e criteri soddisfatti? Allora risponde e il loop finisce. Altrimenti torna a pensare. Si ferma anche per limite di turni, budget, o una tua interruzione.',
      en: 'Green tests and criteria met? Then it answers and the loop ends. Otherwise it goes back to thinking. It also stops on turn limits, budget, or your interruption.',
    },
    fill: '#ff8a00',
    ink: '#ff8a00',
  },
]

export const loopLabels = {
  untilDone: { it: 'finché non è finito', en: "until it's done" },
  diagram: { it: "Ciclo dell'agente", en: 'Agent loop' },
}

export const KOTLIN_LOOP = `while (turns++ < maxTurns) {
  val reply = llm.call(context, tools)
  if (reply.toolCalls.isEmpty()) return reply.text  // done
  for (call in reply.toolCalls) {
    if (!permissions.allows(call)) askHuman(call)
    context += sandbox.run(call)  // observe
  }
}`
