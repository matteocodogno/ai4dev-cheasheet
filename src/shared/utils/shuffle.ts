/** Fisher-Yates shuffle that returns a new array and never mutates the input. */
export const shuffle = <T>(items: readonly T[], random: () => number = Math.random): T[] =>
  items.reduce<T[]>(
    (acc, _, i) => {
      const last = acc.length - 1 - i
      if (last <= 0) return acc
      const j = Math.floor(random() * (last + 1))
      const next = [...acc]
      ;[next[last], next[j]] = [next[j] as T, next[last] as T]
      return next
    },
    [...items],
  )
