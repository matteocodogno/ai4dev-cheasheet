import { useMemo, useState, type ReactNode } from 'react'

import { detectLang, persistLang } from './detectLang'
import { LangContext } from './LangContext'
import type { Lang } from './types'

type Props = { children: ReactNode; initialLang?: Lang }

const LangProvider = ({ children, initialLang }: Props) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const detected = initialLang ?? detectLang()
    document.documentElement.lang = detected
    return detected
  })

  const value = useMemo(
    () => ({
      lang,
      setLang: (next: Lang) => {
        persistLang(next)
        setLangState(next)
      },
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export default LangProvider
