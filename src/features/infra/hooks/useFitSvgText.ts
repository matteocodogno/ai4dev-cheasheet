import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Squeezes an SVG <text> into `maxWidth` when it overflows (e.g. before the display font loads).
 * Re-measures when the text changes and once the web fonts are ready.
 */
export const useFitSvgText = (text: string, maxWidth: number) => {
  const ref = useRef<SVGTextElement>(null)
  const [squeeze, setSqueeze] = useState(false)

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current
      // getComputedTextLength needs a layout engine (absent in jsdom)
      if (!el || typeof el.getComputedTextLength !== 'function') return
      el.removeAttribute('textLength')
      setSqueeze(el.getComputedTextLength() > maxWidth)
    }
    measure()
    let alive = true
    void document.fonts?.ready.then(() => alive && measure())
    return () => {
      alive = false
    }
  }, [text, maxWidth])

  return { ref, fitProps: squeeze ? { textLength: maxWidth, lengthAdjust: 'spacingAndGlyphs' } : {} }
}
