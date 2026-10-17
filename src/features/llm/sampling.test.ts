import { sampleIndex, softmax } from './sampling'

describe('softmax', () => {
  it('sums to 1', () => {
    const p = softmax([3, 2, 1, -1], 0.7)
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1)
  })

  it('gets sharper at low temperature and flatter at high temperature', () => {
    const cold = softmax([3, 2, 1], 0.2)
    const hot = softmax([3, 2, 1], 2)
    expect(cold[0]).toBeGreaterThan(hot[0] ?? 0)
    expect(cold[2]).toBeLessThan(hot[2] ?? 1)
  })
})

describe('sampleIndex', () => {
  it('maps the random number onto cumulative probabilities', () => {
    const p = [0.5, 0.3, 0.2]
    expect(sampleIndex(p, 0)).toBe(0)
    expect(sampleIndex(p, 0.6)).toBe(1)
    expect(sampleIndex(p, 0.95)).toBe(2)
  })
})
