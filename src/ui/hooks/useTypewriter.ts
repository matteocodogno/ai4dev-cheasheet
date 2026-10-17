import { useEffect, useState } from 'react'

import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

import type { TerminalLine } from '../Terminal/types'

export type TypewriterState = { line: number; char: number; done: boolean }

/**
 * Types commands character by character and prints comments/output instantly.
 * Starts when `active` becomes true; is done immediately with reduced motion.
 */
export const useTypewriter = (lines: readonly TerminalLine[], active: boolean): TypewriterState => {
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ line: 0, char: 0 })
  const done = reduced || pos.line >= lines.length

  useEffect(() => {
    const current = lines[pos.line]
    if (!active || done || !current) return
    const isCmd = current.kind === 'cmd'
    const finishedLine = pos.char >= (isCmd ? current.text.length : 0)
    const delay = isCmd ? (finishedLine ? 380 : 22 + Math.random() * 30) : 160
    const t = window.setTimeout(
      () => setPos((p) => (finishedLine ? { line: p.line + 1, char: 0 } : { ...p, char: p.char + 1 })),
      delay,
    )
    return () => window.clearTimeout(t)
  }, [active, done, lines, pos])

  return { ...pos, done }
}
