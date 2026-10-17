import { useEffect, useState } from 'react'

import { useLang } from '@/i18n/useLang'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

import { NEXT_TOKEN } from '../content'
import { sampleIndex, softmax } from '../sampling'

/** State of the next-token demo: picks per step, temperature, and the candidate just drawn. */
export const useNextToken = () => {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const { prompt, steps } = NEXT_TOKEN[lang]
  const [temperature, setTemperature] = useState(0.7)
  const [picks, setPicks] = useState<readonly number[]>([])
  const [drawn, setDrawn] = useState<number | null>(null)

  const step = picks.length
  const current = steps[step]
  const probabilities = current
    ? softmax(
        current.map(([, l]) => l),
        temperature,
      )
    : []

  useEffect(() => {
    if (drawn === null) return
    const t = window.setTimeout(
      () => {
        setPicks((p) => [...p, drawn])
        setDrawn(null)
      },
      reduced ? 0 : 550,
    )
    return () => window.clearTimeout(t)
  }, [drawn, reduced])

  return {
    prompt,
    chosen: picks.map((p, i) => steps[i]?.[p]?.[0] ?? ''),
    candidates: current?.map(([token], i) => ({ token, probability: probabilities[i] ?? 0 })) ?? [],
    temperature,
    setTemperature,
    drawn,
    complete: current === undefined,
    canSample: current !== undefined && drawn === null,
    sample: () => setDrawn(sampleIndex(probabilities, Math.random())),
    reset: () => {
      setPicks([])
      setDrawn(null)
    },
  }
}
