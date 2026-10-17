import { isLang, type Lang } from './types'

export const LANG_STORAGE_KEY = 'ai4dev-lang'

const readStorage = (): string | null => {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Order of precedence: ?lang= query param, saved choice, browser language, Italian. */
export const detectLang = (): Lang => {
  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromQuery)) return fromQuery
  const saved = readStorage()
  if (isLang(saved)) return saved
  return (navigator.language || 'it').toLowerCase().startsWith('it') ? 'it' : 'en'
}

export const persistLang = (lang: Lang): void => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    /* storage unavailable: the choice simply isn't remembered */
  }
  const url = new URL(window.location.href)
  url.searchParams.set('lang', lang)
  window.history.replaceState(null, '', url)
  document.documentElement.lang = lang
}
