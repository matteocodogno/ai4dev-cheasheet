import { edgePath } from './edgePath'

describe('edgePath', () => {
  const box = (x: number, y: number) => ({ x, y, w: 100, h: 50 })

  it('connects right side to left side for horizontal neighbours', () => {
    expect(edgePath(box(0, 0), box(300, 0))).toBe('M100 25 C200 25, 200 25, 300 25')
  })

  it('connects bottom to top for vertical neighbours', () => {
    expect(edgePath(box(0, 0), box(0, 200))).toBe('M50 50 C50 125, 50 125, 50 200')
  })

  it('works in the reverse direction', () => {
    expect(edgePath(box(300, 0), box(0, 0))).toBe('M300 25 C200 25, 200 25, 100 25')
  })
})
