import { LANGS } from '@/i18n/types'
import { ui } from '@/i18n/ui'
import { useLang } from '@/i18n/useLang'
import { useT } from '@/i18n/useT'

import styles from './LangSwitch.module.css'

const LangSwitch = () => {
  const { lang, setLang } = useLang()
  const t = useT()
  return (
    <div className={styles.group} role="group" aria-label={t(ui.language)}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={styles.btn}
          aria-pressed={l === lang}
          onClick={() => setLang(l)}
          data-no-burst
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LangSwitch
