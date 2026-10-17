import { useT } from '@/i18n/useT'

import { heroCopy } from '../content'
import styles from './Footer.module.css'
import heroStyles from './Hero.module.css'

const Footer = () => {
  const t = useT()
  return (
    <footer className={styles.footer}>
      <div className={styles.done}>{t(heroCopy.done)}</div>
      <p className={styles.text}>{t(heroCopy.footer)}</p>
      <a className={heroStyles.start} href="#select">
        {t(heroCopy.back)}
      </a>
    </footer>
  )
}

export default Footer
