export const LANGS = ['it', 'en'] as const

export type Lang = (typeof LANGS)[number]

/** A value available in every supported language. */
export type Localized<T = string> = Record<Lang, T>

/** A list of strings per language (e.g. the bullets of a Do / Don't block). */
export type LocalizedList = Localized<readonly string[]>

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang)
