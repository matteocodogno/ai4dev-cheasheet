import type { Localized, LocalizedList } from '@/i18n/types'
import type { TerminalLine } from '@/ui'

import type { MissionCopy } from '../missions/registry'

export const ollamaCopy: MissionCopy = {
  lead: {
    it: "Ollama scarica, quantizza e serve modelli open weight con un'API locale. _Cinque comandi_ e sei operativo.",
    en: "Ollama downloads, quantises and serves open-weight models through a local API. _Five commands_ and you're up and running.",
  },
  dos: {
    it: [
      'Usalo per dati che non possono uscire, prototipi offline, test di integrazione deterministici.',
      'Fissa il tag del modello (`qwen2.5-coder:7b`, non `latest`).',
      'Confronta sullo stesso set di prompt prima di sostituire un modello cloud.',
    ],
    en: [
      "Use it for data that can't leave, offline prototypes, deterministic integration tests.",
      'Pin the model tag (`qwen2.5-coder:7b`, not `latest`).',
      'Compare on the same prompt set before replacing a cloud model.',
    ],
  },
  donts: {
    it: [
      'Aspettarti che un 7B guidi un agente su un task di 40 passi come un modello di frontiera.',
      'Esporre la porta `11434` sulla rete: non ha autenticazione.',
      'Dimenticare il contesto di default: tagliato in silenzio, l\'agente "dimentica" metà del file.',
    ],
    en: [
      'Expecting a 7B to drive a 40-step agent task like a frontier model.',
      "Exposing port `11434` on the network: there's no authentication.",
      'Forgetting the default context: silently truncated, the agent "forgets" half the file.',
    ],
  },
}

export const OLLAMA_LINES: Localized<readonly TerminalLine[]> = {
  it: [
    { kind: 'comment', text: '# 1. installa (macOS) oppure lo script ufficiale su Linux' },
    { kind: 'cmd', text: 'brew install ollama' },
    { kind: 'comment', text: '# 2. avvia il server con un contesto adatto al codice' },
    { kind: 'cmd', text: 'OLLAMA_CONTEXT_LENGTH=32768 ollama serve' },
    { kind: 'comment', text: '# 3. scarica un modello per il codice' },
    { kind: 'cmd', text: 'ollama pull qwen2.5-coder:7b' },
    { kind: 'comment', text: '# 4. provalo' },
    { kind: 'cmd', text: 'ollama run qwen2.5-coder:7b "Spiega una data class Kotlin"' },
    { kind: 'comment', text: '# 5. cosa gira e quanta memoria usa' },
    { kind: 'cmd', text: 'ollama ps' },
    { kind: 'out', text: 'NAME                ID       SIZE    PROCESSOR' },
    { kind: 'out', text: 'qwen2.5-coder:7b    dae1…    6.0 GB  100% GPU' },
    { kind: 'comment', text: '# API compatibile OpenAI' },
    {
      kind: 'cmd',
      text: 'curl localhost:11434/v1/chat/completions -d \'{"model":"qwen2.5-coder:7b","messages":[{"role":"user","content":"ciao"}]}\'',
    },
  ],
  en: [
    { kind: 'comment', text: '# 1. install (macOS) or use the official script on Linux' },
    { kind: 'cmd', text: 'brew install ollama' },
    { kind: 'comment', text: '# 2. start the server with a context suited to code' },
    { kind: 'cmd', text: 'OLLAMA_CONTEXT_LENGTH=32768 ollama serve' },
    { kind: 'comment', text: '# 3. pull a coding model' },
    { kind: 'cmd', text: 'ollama pull qwen2.5-coder:7b' },
    { kind: 'comment', text: '# 4. try it' },
    { kind: 'cmd', text: 'ollama run qwen2.5-coder:7b "Explain a Kotlin data class"' },
    { kind: 'comment', text: '# 5. what is running and how much memory it uses' },
    { kind: 'cmd', text: 'ollama ps' },
    { kind: 'out', text: 'NAME                ID       SIZE    PROCESSOR' },
    { kind: 'out', text: 'qwen2.5-coder:7b    dae1…    6.0 GB  100% GPU' },
    { kind: 'comment', text: '# OpenAI-compatible API' },
    {
      kind: 'cmd',
      text: 'curl localhost:11434/v1/chat/completions -d \'{"model":"qwen2.5-coder:7b","messages":[{"role":"user","content":"hi"}]}\'',
    },
  ],
}

export const sizingCopy: { title: Localized; items: LocalizedList } = {
  title: { it: 'Scegliere la taglia', en: 'Picking the size' },
  items: {
    it: [
      'Regola rapida: un modello da **7-8B** quantizzato a 4 bit occupa circa **5 GB**, uno da 14B circa 9 GB, uno da 32B circa 20 GB. Serve quella RAM (o VRAM) libera, più spazio per il contesto.',
      'Il contesto di default di Ollama è piccolo. Per lavorare su codice alzalo: `OLLAMA_CONTEXT_LENGTH=32768 ollama serve`.',
      "Espone un'API compatibile OpenAI su `http://localhost:11434/v1`: la puoi collegare a LiteLLM, Spring AI, OpenCode.",
      'Su Mac con Apple Silicon la memoria unificata aiuta molto. Su laptop senza GPU, aspettati pochi token al secondo.',
    ],
    en: [
      'Quick rule: a **7-8B** model quantised to 4 bits takes about **5 GB**, a 14B about 9 GB, a 32B about 20 GB. You need that much free RAM (or VRAM), plus room for the context.',
      "Ollama's default context is small. For coding work, raise it: `OLLAMA_CONTEXT_LENGTH=32768 ollama serve`.",
      'It exposes an OpenAI-compatible API at `http://localhost:11434/v1`: plug it into LiteLLM, Spring AI, OpenCode.',
      'On Apple Silicon Macs unified memory helps a lot. On laptops without a GPU, expect a few tokens per second.',
    ],
  },
}

export const SPRING_AI_YAML = `spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        options:
          model: qwen2.5-coder:7b
          temperature: 0.2`
