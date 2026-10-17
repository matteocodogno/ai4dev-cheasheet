import { useEffect, useRef } from 'react'

import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

type Spark = { x: number; y: number; v: number; s: number; c: string; w: number }

const COLORS = ['#ffd21f', '#ff2e7e', '#2be0e8', '#ff8a00'] as const
const COUNT = 46

const makeSpark = (i: number, w: number, h: number): Spark => ({
  x: Math.random() * w,
  y: Math.random() * h,
  v: 0.2 + Math.random() * 0.7,
  s: 1 + Math.random() * 2.4,
  c: COLORS[i % COLORS.length] ?? '#ffd21f',
  w: Math.random() * 6,
})

/** Draws slowly rising loot sparks on a full-screen canvas. Disabled with reduced motion. */
export const useSparks = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || reduced) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    let sparks = Array.from({ length: COUNT }, (_, i) => makeSpark(i, canvas.width, canvas.height))
    let frame = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      sparks = sparks.map((p) => {
        const w = p.w + 0.02
        const y = p.y - p.v
        return y < -10
          ? { ...p, w, y: canvas.height + 10, x: Math.random() * canvas.width }
          : { ...p, w, y, x: p.x + Math.sin(w) * 0.3 }
      })
      ctx.globalAlpha = 0.55
      sparks.forEach((p) => {
        ctx.fillStyle = p.c
        ctx.fillRect(p.x, p.y, p.s, p.s * 2.2)
      })
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return { ref, enabled: !reduced }
}
