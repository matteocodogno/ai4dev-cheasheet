import { useEffect, useState } from 'react'

export type CopyState = 'idle' | 'copied' | 'failed'

export const useCopyToClipboard = (resetAfterMs = 1600) => {
  const [state, setState] = useState<CopyState>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const t = window.setTimeout(() => setState('idle'), resetAfterMs)
    return () => window.clearTimeout(t)
  }, [state, resetAfterMs])

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return { state, copy }
}
