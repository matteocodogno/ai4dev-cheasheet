import { useState } from 'react'

import { QUESTIONS, type Answers, type QuestionId } from '../content'
import { recommend, type Complete } from '../recommend'

const isComplete = (a: Answers): a is Complete =>
  a.task !== undefined && a.data !== undefined && a.volume !== undefined && a.hardware !== undefined

/** Wizard state: answers, the step on screen, and the recommendation once every question is answered. */
export const useModelPicker = () => {
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState(0)
  const complete = isComplete(answers)
  const onResults = step >= QUESTIONS.length

  return {
    answers,
    step,
    question: onResults ? undefined : QUESTIONS[step],
    total: QUESTIONS.length,
    result: complete ? recommend(answers) : null,
    onResults,
    answer: (id: QuestionId, value: string) => {
      const next = { ...answers, [id]: value }
      setAnswers(next)
      const firstMissing = QUESTIONS.findIndex((q) => next[q.id] === undefined)
      setStep(firstMissing === -1 ? QUESTIONS.length : firstMissing)
    },
    goTo: (i: number) => setStep(Math.max(0, Math.min(i, QUESTIONS.length))),
    back: () => setStep((s) => Math.max(0, s - 1)),
    restart: () => {
      setAnswers({})
      setStep(0)
    },
  }
}
