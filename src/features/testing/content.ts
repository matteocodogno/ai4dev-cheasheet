import type { Localized } from '@/i18n/types'
import type { TerminalLine } from '@/ui'

import type { MissionCopy } from '../missions/registry'
import type { TestCase } from './mutation'

export const testingCopy: MissionCopy = {
  lead: {
    it: 'Legge di Goodhart: _quando una misura diventa un obiettivo, smette di essere una buona misura._ Chiedi all\'agente "coverage 90%" e l\'avrai, con test che non verificano niente. La mutation testing rompe il codice di proposito e controlla se i test se ne accorgono.',
    en: 'Goodhart\'s law: _when a measure becomes a target, it ceases to be a good measure._ Ask the agent for "90% coverage" and you will get it, with tests that check nothing. Mutation testing breaks the code on purpose and checks whether the tests notice.',
  },
  dos: {
    it: [
      'Scrivi (o approva) i test prima del codice: la spec diventa asserzioni.',
      'Proteggi i test esistenti: un hook che blocca le modifiche ai test nello stesso task che cambia il codice.',
      "Mutation testing incrementale sul diff come gate di CI, non sull'intero monolite a ogni commit.",
      'Dai all\'agente i mutanti sopravvissuti: "scrivi un test che uccide questo mutante, senza toccare il codice".',
    ],
    en: [
      'Write (or approve) the tests before the code: the spec becomes assertions.',
      'Protect existing tests: a hook that blocks test edits in the same task that changes the code.',
      'Incremental mutation testing on the diff as a CI gate, not on the whole monolith every commit.',
      'Give the agent the surviving mutants: "write a test that kills this mutant, without touching the code".',
    ],
  },
  donts: {
    it: [
      'Usare la coverage come obiettivo: è un indicatore di cosa _non_ è testato, non di cosa lo è.',
      "Lasciare che l'agente modifichi un test rosso finché diventa verde.",
      'Accettare test generati senza leggere le asserzioni: è lì che si nasconde il vuoto.',
      'Inseguire il 100% di mutation score: alcuni mutanti sono equivalenti, non uccidibili.',
    ],
    en: [
      'Using coverage as a target: it tells you what is _not_ tested, not what is.',
      'Letting the agent edit a red test until it turns green.',
      'Accepting generated tests without reading the assertions: that is where the emptiness hides.',
      'Chasing a 100% mutation score: some mutants are equivalent and cannot be killed.',
    ],
  },
}

export const CODE = `fun shippingCost(total: Double, isMember: Boolean): Double =
    if (isMember || total >= 50.0) 0.0 else 4.9`

export type SuiteId = 'noassert' | 'happy' | 'edges'

export type Suite = { id: SuiteId; name: Localized; note: Localized; tests: readonly TestCase[] }

export const SUITES: readonly Suite[] = [
  {
    id: 'noassert',
    name: { it: 'Coverage a comando', en: 'Coverage on demand' },
    note: {
      it: 'Quello che ottieni chiedendo "porta la coverage al 100%": il codice gira, nessuno controlla il risultato.',
      en: 'What you get by asking "bring coverage to 100%": the code runs, nobody checks the result.',
    },
    tests: [
      { total: 10, isMember: false, expected: null },
      { total: 100, isMember: true, expected: null },
    ],
  },
  {
    id: 'happy',
    name: { it: 'Happy path', en: 'Happy path' },
    note: {
      it: 'Asserzioni vere, ma solo sui casi ovvi. Stessa coverage, metà dei bug passa.',
      en: 'Real assertions, but only on the obvious cases. Same coverage, half the bugs get through.',
    },
    tests: [
      { total: 10, isMember: false, expected: 4.9 },
      { total: 100, isMember: true, expected: 0 },
    ],
  },
  {
    id: 'edges',
    name: { it: 'Con i bordi', en: 'With the edges' },
    note: {
      it: 'Due test in più: il confine dei 50 e il membro con carrello piccolo. Tutti i mutanti muoiono.',
      en: 'Two more tests: the 50 boundary and the member with a small cart. Every mutant dies.',
    },
    tests: [
      { total: 10, isMember: false, expected: 4.9 },
      { total: 100, isMember: true, expected: 0 },
      { total: 50, isMember: false, expected: 0 },
      { total: 10, isMember: true, expected: 0 },
    ],
  },
]

/** How an agent games a test metric. */
export const CHEATS: readonly Localized[] = [
  {
    it: 'Test senza asserzioni, o con `assertNotNull` e basta',
    en: 'Tests with no assertions, or just `assertNotNull`',
  },
  {
    it: "Asserzione cambiata per combaciare con l'output sbagliato",
    en: 'Assertion changed to match the wrong output',
  },
  {
    it: 'Tutto mockato, compreso quello che si voleva testare',
    en: 'Everything mocked, including what you meant to test',
  },
  { it: '`@Disabled` / `.skip` sul test che fallisce', en: '`@Disabled` / `.skip` on the failing test' },
  {
    it: '`catch (e: Exception) {}` per far sparire il rosso',
    en: '`catch (e: Exception) {}` to make the red go away',
  },
  {
    it: 'Test sui getter per gonfiare la percentuale',
    en: 'Tests on getters to inflate the percentage',
  },
]

export const TOOL_LINES: readonly TerminalLine[] = [
  { kind: 'comment', text: '# JVM: PIT, only on classes changed since main' },
  { kind: 'cmd', text: './mvnw -DwithHistory org.pitest:pitest-maven:scmMutationCoverage' },
  { kind: 'comment', text: '# JS / TS: Stryker, incremental' },
  { kind: 'cmd', text: 'npx stryker run --incremental' },
  { kind: 'comment', text: '# Python: mutmut' },
  { kind: 'cmd', text: 'mutmut run && mutmut results' },
]

export const KILL_PROMPT = `Mutant M1 survived in ShippingCost.kt:2
(replaced >= with >). Write ONE test that fails on the mutant
and passes on the current code. Do not modify production code
or existing tests. Run the mutation report again to confirm.`

export const testingLabels = {
  cheatsTitle: { it: 'Come un agente gonfia la metrica', en: 'How an agent games the metric' },
  labTitle: { it: 'Laboratorio di mutanti', en: 'Mutant lab' },
  labHint: {
    it: 'Scegli una suite di test: la coverage resta al 100%, guarda cosa succede ai mutanti.',
    en: 'Pick a test suite: coverage stays at 100%, watch what happens to the mutants.',
  },
  code: { it: 'Codice sotto test', en: 'Code under test' },
  tests: { it: 'Test della suite', en: 'Tests in the suite' },
  noAssert: { it: 'nessuna asserzione', en: 'no assertion' },
  coverage: { it: 'Coverage', en: 'Coverage' },
  mutation: { it: 'Mutation score', en: 'Mutation score' },
  killed: { it: 'UCCISO', en: 'KILLED' },
  survived: { it: 'SOPRAVVISSUTO', en: 'SURVIVED' },
  tools: { it: 'Gli strumenti', en: 'The tools' },
  prompt: { it: "Dai i sopravvissuti all'agente", en: 'Hand the survivors to the agent' },
}
