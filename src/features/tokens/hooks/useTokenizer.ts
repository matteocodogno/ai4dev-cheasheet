import { useState } from 'react'

import type { Localized } from '@/i18n/types'
import { useLang } from '@/i18n/useLang'

import { approximateTokens } from '../approximateTokens'

/** Text box state for the tokenizer. Follows the language switch until the user edits the text. */
export const useTokenizer = (sample: Localized) => {
  const { lang } = useLang()
  const [edited, setEdited] = useState<string | null>(null)
  const text = edited ?? sample[lang]
  const tokens = approximateTokens(text)
  return {
    text,
    setText: setEdited,
    tokens,
    chars: text.length,
    ratio: tokens.length ? (text.length / tokens.length).toFixed(1) : '0',
  }
}
