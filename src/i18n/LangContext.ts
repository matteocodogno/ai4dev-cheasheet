import { createContext } from 'react'

import type { Lang } from './types'

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LangContext = createContext<LangContextValue | null>(null)
