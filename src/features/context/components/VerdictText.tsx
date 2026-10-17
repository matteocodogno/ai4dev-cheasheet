import { useT } from '@/i18n/useT'

import { loadoutCopy } from '../content'
import type { Verdict } from '../judgeLoadout'
import styles from './Loadout.module.css'

type Props = { verdict: Verdict | null; selectedCount: number }

const VerdictText = ({ verdict, selectedCount }: Props) => {
  const t = useT()
  const v = loadoutCopy.verdict
  if (!verdict)
    return <span className="hint">{t(loadoutCopy.selected).replace('{n}', String(selectedCount))}</span>
  switch (verdict.kind) {
    case 'secret':
      return <span className={styles.bad}>{t(v.secret)}</span>
    case 'rot':
      return <span className={styles.bad}>{t(v.rot)}</span>
    case 'noise':
      return (
        <span className={styles.bad}>
          {t(v.noise).replace('{items}', verdict.items.map((i) => t(i.name)).join(', '))}
        </span>
      )
    case 'perfect':
      return <span className={styles.good}>{t(v.perfect)}</span>
    case 'missing':
      return <span className={styles.good}>{t(v.missing).replace('{n}', String(verdict.count))}</span>
  }
}

export default VerdictText
