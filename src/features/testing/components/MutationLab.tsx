import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { Chip, Panel, Stat, Terminal } from '@/ui'

import { CODE, SUITES, testingLabels } from '../content'
import { useMutationLab } from '../hooks/useMutationLab'
import styles from './MutationLab.module.css'

const fmt = (n: number) => n.toFixed(1)

const MutationLab = () => {
  const t = useT()
  const lab = useMutationLab()
  return (
    <Panel title={t(testingLabels.labTitle)}>
      <p className="hint">{t(testingLabels.labHint)}</p>
      <div className={styles.suites} role="group" aria-label={t(testingLabels.tests)}>
        {SUITES.map((s) => (
          <Chip
            key={s.id}
            tone={s.id === lab.suite.id ? 'selected' : 'idle'}
            onClick={() => lab.select(s.id)}
          >
            {t(s.name)}
          </Chip>
        ))}
      </div>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Terminal title={`ShippingCost.kt · ${t(testingLabels.code)}`}>{CODE}</Terminal>
          <Terminal title={`ShippingCostTest.kt · ${t(testingLabels.tests)}`}>
            {lab.suite.tests.map((tc, i) => (
              <span key={`${lab.suite.id}-${i}`} className={styles.test}>
                {`shippingCost(${fmt(tc.total)}, ${tc.isMember})`}
                {tc.expected === null ? (
                  <span className="c">{`  // ${t(testingLabels.noAssert)}`}</span>
                ) : (
                  <>
                    <span className="k"> shouldBe </span>
                    <span className="s">{fmt(tc.expected)}</span>
                  </>
                )}
                {'\n'}
              </span>
            ))}
          </Terminal>
          <p className={styles.note}>{t(lab.suite.note)}</p>
        </div>
        <div>
          <div className={styles.stats}>
            <Stat label={t(testingLabels.coverage)} value={`${lab.coverage}%`} />
            <Stat
              className={clsx(
                styles.score,
                lab.score < 50 ? styles.bad : lab.score < 100 ? styles.mid : styles.good,
              )}
              label={t(testingLabels.mutation)}
              value={`${lab.score}%`}
            />
          </div>
          <ul className={styles.mutants} aria-live="polite">
            {lab.mutants.map((m) => (
              <li key={m.id} className={clsx(styles.mutant, m.killed ? styles.killed : styles.survived)}>
                <span className={styles.id}>{m.id}</span>
                <code>{m.label}</code>
                <span key={`${lab.suite.id}-${m.id}`} className={styles.verdict}>
                  {t(m.killed ? testingLabels.killed : testingLabels.survived)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}

export default MutationLab
