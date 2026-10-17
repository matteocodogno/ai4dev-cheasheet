export type Box = { x: number; y: number; w: number; h: number }

/**
 * Cubic bezier between two boxes. Leaves from the side facing the other box:
 * left/right when they are mostly side by side, top/bottom when mostly stacked.
 */
export const edgePath = (a: Box, b: Box): string => {
  const ax = a.x + a.w / 2
  const ay = a.y + a.h / 2
  const bx = b.x + b.w / 2
  const by = b.y + b.h / 2
  if (Math.abs(bx - ax) > Math.abs(by - ay)) {
    const s = Math.sign(bx - ax)
    const x1 = ax + (s * a.w) / 2
    const x2 = bx - (s * b.w) / 2
    const mx = (x1 + x2) / 2
    return `M${x1} ${ay} C${mx} ${ay}, ${mx} ${by}, ${x2} ${by}`
  }
  const s = Math.sign(by - ay)
  const y1 = ay + (s * a.h) / 2
  const y2 = by - (s * b.h) / 2
  const my = (y1 + y2) / 2
  return `M${ax} ${y1} C${ax} ${my}, ${bx} ${my}, ${bx} ${y2}`
}
