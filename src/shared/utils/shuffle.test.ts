import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('keeps every element exactly once', () => {
    const input = [1, 2, 3, 4, 5, 6, 7]
    expect([...shuffle(input)].sort()).toEqual(input)
  })

  it('does not mutate the input', () => {
    const input = Object.freeze([1, 2, 3])
    expect(() => shuffle(input)).not.toThrow()
    expect(input).toEqual([1, 2, 3])
  })

  it('is deterministic for a given random source', () => {
    const seq = [0.1, 0.9, 0.5, 0.3]
    const rnd = () => seq.shift() ?? 0
    expect(shuffle(['a', 'b', 'c', 'd', 'e'], rnd)).toEqual(
      shuffle(
        ['a', 'b', 'c', 'd', 'e'],
        (() => {
          const s = [0.1, 0.9, 0.5, 0.3]
          return () => s.shift() ?? 0
        })(),
      ),
    )
  })
})
