import { parseRichText } from './parseRichText'

describe('parseRichText', () => {
  it('returns plain text untouched', () => {
    expect(parseRichText('hello world')).toEqual([{ kind: 'text', value: 'hello world' }])
  })

  it('parses bold, code, marker and kbd', () => {
    expect(parseRichText('a **b** `c` _d_ [[Esc]]')).toEqual([
      { kind: 'text', value: 'a ' },
      { kind: 'bold', value: 'b' },
      { kind: 'text', value: ' ' },
      { kind: 'code', value: 'c' },
      { kind: 'text', value: ' ' },
      { kind: 'marker', value: 'd' },
      { kind: 'text', value: ' ' },
      { kind: 'kbd', value: 'Esc' },
    ])
  })

  it('does not treat underscores inside identifiers or paths as emphasis', () => {
    expect(parseRichText('OLLAMA_CONTEXT_LENGTH and snake_case')).toEqual([
      { kind: 'text', value: 'OLLAMA_CONTEXT_LENGTH and snake_case' },
    ])
  })

  it('keeps underscores literal inside code spans', () => {
    expect(parseRichText('`OLLAMA_CONTEXT_LENGTH=32768`')).toEqual([
      { kind: 'code', value: 'OLLAMA_CONTEXT_LENGTH=32768' },
    ])
  })
})
