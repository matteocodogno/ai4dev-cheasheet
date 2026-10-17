/** Softmax with temperature: higher temperature flattens the distribution. */
export const softmax = (logits: readonly number[], temperature: number): number[] => {
  const t = Math.max(temperature, 0.01)
  const max = Math.max(...logits)
  const exps = logits.map((l) => Math.exp((l - max) / t))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((e) => e / sum)
}

/** Picks an index according to the probabilities, given a uniform random number in [0, 1). */
export const sampleIndex = (probs: readonly number[], r: number): number => {
  const idx = probs.findIndex((_, i) => probs.slice(0, i + 1).reduce((a, b) => a + b, 0) > r)
  return idx === -1 ? probs.length - 1 : idx
}
