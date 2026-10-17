const WORD = /^[A-Za-zÀ-ÿ]+$/
const CHUNKS = /(\s*)([A-Za-zÀ-ÿ]+|\d{1,3}|[^\sA-Za-zÀ-ÿ\d])/g

/**
 * Teaching approximation of a BPE tokenizer: words split on camelCase and every 5 letters,
 * numbers in groups of 3, punctuation on its own, leading whitespace glued to the next token.
 * Gives the right order of magnitude, not exact counts.
 */
export const approximateTokens = (text: string): string[] => {
  const out: string[] = []
  let last = 0
  for (const m of text.matchAll(CHUNKS)) {
    const [, space = '', chunk = ''] = m
    if (WORD.test(chunk)) {
      chunk.split(/(?=[A-Z][a-z])/).forEach((part, pi) => {
        for (let k = 0; k < part.length; k += 5)
          out.push((pi === 0 && k === 0 ? space : '') + part.slice(k, k + 5))
      })
    } else {
      out.push(space + chunk)
    }
    last = (m.index ?? 0) + m[0].length
  }
  const tail = text.slice(last)
  return tail ? [...out, tail] : out
}
