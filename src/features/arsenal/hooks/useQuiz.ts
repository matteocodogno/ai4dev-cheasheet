import { useState } from 'react'

import { shuffle } from '@/shared/utils/shuffle'

export type Answer<A> = { pick: A; correct: boolean }

type QuizItem<A> = { answer: A }

/**
 * Generic multiple-choice quiz: questions in random order, one answer per question,
 * score, and a finished state. Calling `next` on the finished screen restarts.
 */
export const useQuiz = <A, Q extends QuizItem<A>>(questions: readonly Q[]) => {
  const [order, setOrder] = useState<readonly Q[]>(() => shuffle(questions))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<readonly Answer<A>[]>([])

  const finished = index >= order.length
  const current = order[index]
  const currentAnswer = answers[index]

  return {
    total: order.length,
    index,
    current,
    currentAnswer,
    answers,
    hits: answers.filter((a) => a.correct).length,
    finished,
    isLast: index === order.length - 1,
    answer: (pick: A) => {
      if (!current || currentAnswer) return
      setAnswers((a) => [...a, { pick, correct: pick === current.answer }])
    },
    next: () => {
      if (finished) {
        setOrder(shuffle(questions))
        setIndex(0)
        setAnswers([])
        return
      }
      if (currentAnswer) setIndex((i) => i + 1)
    },
  }
}
