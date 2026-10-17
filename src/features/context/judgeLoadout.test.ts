import { LOADOUT } from './content'
import { judgeLoadout, loadoutUsageK } from './judgeLoadout'

const relevant = LOADOUT.filter((i) => i.relevant).map((i) => i.id)

describe('judgeLoadout', () => {
  it('flags secrets above everything else', () => {
    expect(judgeLoadout(new Set(['env', 'repo'])).kind).toBe('secret')
  })

  it('flags context rot past the threshold', () => {
    expect(judgeLoadout(new Set(['repo'])).kind).toBe('rot')
  })

  it('lists noisy items', () => {
    const v = judgeLoadout(new Set([...relevant, 'readme']))
    expect(v).toMatchObject({ kind: 'noise' })
    expect(v.kind === 'noise' && v.items.map((i) => i.id)).toEqual(['readme'])
  })

  it('is perfect with exactly the relevant items', () => {
    expect(judgeLoadout(new Set(relevant)).kind).toBe('perfect')
  })

  it('counts what is missing', () => {
    expect(judgeLoadout(new Set(relevant.slice(0, 2)))).toEqual({
      kind: 'missing',
      count: relevant.length - 2,
    })
  })

  it('always includes the base system prompt in the usage', () => {
    expect(loadoutUsageK(new Set())).toBe(16)
  })
})
