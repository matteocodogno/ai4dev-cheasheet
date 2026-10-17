import { act, renderHook } from '@testing-library/react'

import { useModelPicker } from './useModelPicker'

describe('useModelPicker', () => {
  it('walks through the questions and produces a result', () => {
    const { result } = renderHook(() => useModelPicker())
    expect(result.current.question?.id).toBe('task')
    act(() => result.current.answer('task', 'agent'))
    act(() => result.current.answer('data', 'internal'))
    act(() => result.current.answer('volume', 'team'))
    expect(result.current.result).toBeNull()
    act(() => result.current.answer('hardware', 'cloud'))
    expect(result.current.onResults).toBe(true)
    expect(result.current.result?.picks.length).toBeGreaterThan(0)
  })

  it('returns to results after changing an earlier answer', () => {
    const { result } = renderHook(() => useModelPicker())
    ;(['agent', 'internal', 'team', 'cloud'] as const).forEach((v, i) =>
      act(() => result.current.answer((['task', 'data', 'volume', 'hardware'] as const)[i] ?? 'task', v)),
    )
    act(() => result.current.goTo(1))
    expect(result.current.question?.id).toBe('data')
    act(() => result.current.answer('data', 'regulated'))
    expect(result.current.onResults).toBe(true)
    expect(result.current.answers.data).toBe('regulated')
  })
})
