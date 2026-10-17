import type { Localized } from './types'
import { useLang } from './useLang'

/** A value that is either the same in every language (plain string) or translated. */
export type MaybeLocalized<T = string> = T | Localized<T>

const isLocalized = <T>(value: MaybeLocalized<T>): value is Localized<T> =>
  typeof value === 'object' && value !== null && 'it' in value && 'en' in value

/** Returns a resolver that picks the current language out of any (Maybe)Localized value. */
export const useT = () => {
  const { lang } = useLang()
  return <T>(value: MaybeLocalized<T>): T => (isLocalized(value) ? value[lang] : value)
}
