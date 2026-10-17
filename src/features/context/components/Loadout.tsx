import { useT } from '@/i18n/useT'
import { Button, Chip, Panel, RichText, type ChipTone } from '@/ui'

import { BUDGET_K, loadoutCopy, type LoadoutItem } from '../content'
import { useLoadout } from '../hooks/useLoadout'
import styles from './Loadout.module.css'
import VerdictText from './VerdictText'

const toneFor = (item: LoadoutItem, isOn: boolean, checked: boolean): ChipTone => {
  if (!checked) return isOn ? 'selected' : 'idle'
  if (isOn) return item.relevant ? 'good' : 'bad'
  return 'idle'
}

const markFor = (item: LoadoutItem, isOn: boolean, checked: boolean) => {
  if (!checked) return ''
  if (isOn) return item.relevant ? ' ✓' : ' ✗'
  return item.relevant ? ' ?' : ''
}

const barColor = (pct: number) => (pct > 60 ? 'var(--red)' : pct > 35 ? 'var(--yellow)' : 'var(--cyan)')

/** Pick what goes into the context for a concrete task, then reveal the verdict. */
const Loadout = () => {
  const t = useT()
  const lo = useLoadout()
  return (
    <Panel title={t(loadoutCopy.title)}>
      <p className="hint">
        <RichText text={t(loadoutCopy.hint)} />
      </p>
      <div className={styles.chips}>
        {lo.items.map((item) => {
          const isOn = lo.selected.has(item.id)
          return (
            <Chip
              key={item.id}
              tone={toneFor(item, isOn, lo.checked)}
              meta={`${item.k}k${markFor(item, isOn, lo.checked)}`}
              aria-pressed={isOn}
              disabled={lo.checked}
              onClick={() => lo.toggle(item.id)}
              data-no-burst
            >
              {t(item.name)}
            </Chip>
          )
        })}
      </div>
      <div className={styles.budget}>
        <i className={styles.fill} style={{ width: `${lo.usagePct}%`, background: barColor(lo.usagePct) }} />
        <span className={styles.budgetText}>
          {lo.usageK}k / {BUDGET_K}k
        </span>
      </div>
      <div className={styles.actions}>
        <Button onClick={lo.check} disabled={lo.checked}>
          {t(loadoutCopy.check)}
        </Button>
        <Button variant="secondary" onClick={lo.reshuffle}>
          {t(loadoutCopy.reshuffle)}
        </Button>
      </div>
      <div className={styles.verdict} aria-live="polite">
        <VerdictText verdict={lo.verdict} selectedCount={lo.selected.size} />
      </div>
    </Panel>
  )
}

export default Loadout
