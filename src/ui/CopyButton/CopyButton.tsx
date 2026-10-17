import clsx from 'clsx'

import { ui } from '@/i18n/ui'
import { useT } from '@/i18n/useT'
import { useCopyToClipboard } from '@/shared/hooks/useCopyToClipboard'

import styles from './CopyButton.module.css'

type Props = { text: string; className?: string }

const CopyButton = ({ text, className }: Props) => {
  const t = useT()
  const { state, copy } = useCopyToClipboard()
  const label = state === 'copied' ? ui.copied : state === 'failed' ? ui.copyFailed : ui.copy
  return (
    <button type="button" className={clsx(styles.copy, className)} onClick={() => void copy(text)}>
      <span aria-live="polite">{t(label)}</span>
    </button>
  )
}

export default CopyButton
