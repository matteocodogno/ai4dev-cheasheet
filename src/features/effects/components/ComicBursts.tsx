import { useComicBursts } from '../hooks/useComicBursts'
import styles from './ComicBursts.module.css'

const ComicBursts = () => {
  const bursts = useComicBursts()
  return (
    <>
      {bursts.map((b) => (
        <div key={b.id} className={styles.burst} style={{ left: b.x, top: b.y }} aria-hidden="true">
          {b.word}
        </div>
      ))}
    </>
  )
}

export default ComicBursts
