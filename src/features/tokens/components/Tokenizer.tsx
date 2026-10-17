import { useT } from '@/i18n/useT'
import { Panel, Stat } from '@/ui'

import { tokenizerCopy } from '../content'
import { useTokenizer } from '../hooks/useTokenizer'
import styles from './Tokenizer.module.css'

const PALETTE = ['#ffd21f', '#2be0e8', '#ff7aa9', '#7cff3c', '#ffb35c', '#c99bff'] as const

const Tokenizer = () => {
  const t = useT()
  const tk = useTokenizer(tokenizerCopy.sample)
  return (
    <Panel title={t(tokenizerCopy.title)}>
      <p className="hint">{t(tokenizerCopy.hint)}</p>
      <textarea
        className={styles.input}
        aria-label={t(tokenizerCopy.inputLabel)}
        value={tk.text}
        onChange={(e) => tk.setText(e.target.value)}
        spellCheck={false}
      />
      <div className={styles.tokens} aria-hidden="true">
        {tk.tokens.map((tok, i) => (
          <span key={i} className={styles.token} style={{ background: PALETTE[i % PALETTE.length] }}>
            {tok.replace(/\n/g, '↵')}
          </span>
        ))}
      </div>
      <div className={styles.stats}>
        <Stat label={t(tokenizerCopy.chars)} value={tk.chars} />
        <Stat label={t(tokenizerCopy.tokens)} value={tk.tokens.length} />
        <Stat label={t(tokenizerCopy.ratio)} value={tk.ratio} />
      </div>
    </Panel>
  )
}

export default Tokenizer
