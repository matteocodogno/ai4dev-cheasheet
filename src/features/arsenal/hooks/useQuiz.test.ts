import { act, renderHook } from '@testing-library/react'

import { useQuiz } from './useQuiz'

const questions = [
  { id: 1, answer: 'a' },
  { id: 2, answer: 'b' },
  { id: 3, answer: 'c' },
]

describe('useQuiz', () => {
  it('scores answers and finishes after the last question', () => {
    const { result } = renderHook(() => useQuiz<string, (typeof questions)[number]>(questions))
    expect(result.current.total).toBe(3)

    for (let i = 0; i < 3; i++) {
      const right = result.current.current?.answer ?? ''
      act(() => result.current.answer(i === 0 ? 'wrong' : right))
      act(() => result.current.next())
    }

    expect(result.current.finished).toBe(true)
    expect(result.current.hits).toBe(2)
  })

  it('ignores a second answer to the same question and blocks next until answered', () => {
    const { result } = renderHook(() => useQuiz<string, (typeof questions)[number]>(questions))
    act(() => result.current.next())
    expect(result.current.index).toBe(0)
    act(() => result.current.answer('x'))
    act(() => result.current.answer('y'))
    expect(result.current.answers).toHaveLength(1)
  })

  it('restarts from the finished screen', () => {
    const { result } = renderHook(() => useQuiz<string, (typeof questions)[number]>(questions))
    for (let i = 0; i < 3; i++) {
      act(() => result.current.answer('x'))
      act(() => result.current.next())
    }
    act(() => result.current.next())
    expect(result.current.index).toBe(0)
    expect(result.current.answers).toHaveLength(0)
  })
})
