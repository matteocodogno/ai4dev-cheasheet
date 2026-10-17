import { useT } from '@/i18n/useT'

import { VIDEO } from '../content'
import styles from './VideoSource.module.css'

/** Credit and link to the 3Blue1Brown video the mission is based on. */
const VideoSource = () => {
  const t = useT()
  return (
    <div className={styles.source}>
      <a className={styles.watch} href={VIDEO.url} target="_blank" rel="noopener noreferrer">
        <i className={styles.play} aria-hidden="true" />
        {t(VIDEO.label)} · {VIDEO.duration}
      </a>
      <span className={styles.meta}>
        {VIDEO.author}, “{VIDEO.title}” (
        <a href={VIDEO.lessonUrl} target="_blank" rel="noopener noreferrer">
          {t(VIDEO.lesson)}
        </a>
        ). {t(VIDEO.note)}
      </span>
    </div>
  )
}

export default VideoSource
