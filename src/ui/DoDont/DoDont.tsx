import clsx from 'clsx'

import Badge from '../Badge/Badge'
import RichText from '../RichText/RichText'
import styles from './DoDont.module.css'

type Props = { dos: readonly string[]; donts: readonly string[] }

/** The BUFF / DEBUFF block that closes every mission. Items accept RichText markup. */
const DoDont = ({ dos, donts }: Props) => (
  <div className={styles.grid}>
    <div className={clsx(styles.col, styles.do)}>
      <h4 className={styles.heading}>
        Do{' '}
        <Badge size="sm" color="var(--green)">
          BUFF
        </Badge>
      </h4>
      <ul className={styles.list}>
        {dos.map((item) => (
          <li key={item} className={styles.item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    </div>
    <div className={clsx(styles.col, styles.dont)}>
      <h4 className={styles.heading}>
        Don't{' '}
        <Badge size="sm" color="var(--red)">
          DEBUFF
        </Badge>
      </h4>
      <ul className={styles.list}>
        {donts.map((item) => (
          <li key={item} className={styles.item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default DoDont
