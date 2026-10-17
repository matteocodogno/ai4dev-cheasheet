import { Fragment } from 'react'

import { useTypewriter } from '../hooks/useTypewriter'
import Cursor from './Cursor'
import type { TerminalLine } from './types'

type Props = {
  lines: readonly TerminalLine[]
  /** Animate the commands as if typed, starting when `start` is true. */
  typing?: boolean
  start?: boolean
}

const renderLine = (line: TerminalLine, partial?: number) => {
  switch (line.kind) {
    case 'cmd':
      return (
        <>
          <span className="p">$</span> {partial === undefined ? line.text : line.text.slice(0, partial)}
        </>
      )
    case 'comment':
      return <span className="c">{line.text}</span>
    case 'out':
      return line.text
    default:
      return ''
  }
}

/** Renders shell lines with prompt and colours, optionally with a typewriter effect. */
const TerminalLines = ({ lines, typing = false, start = true }: Props) => {
  const tw = useTypewriter(lines, typing && start)
  const done = !typing || tw.done
  const visible = done ? lines : lines.slice(0, tw.line + 1)

  if (typing && !start) return null

  return (
    <>
      {visible.map((line, i) => {
        const isTypingLine = !done && i === tw.line
        return (
          <Fragment key={i}>
            {i > 0 && '\n'}
            {renderLine(line, isTypingLine && line.kind === 'cmd' ? tw.char : undefined)}
            {isTypingLine && line.kind === 'cmd' && <Cursor />}
          </Fragment>
        )
      })}
      {typing && done && (
        <>
          {'\n'}
          <span className="p">$</span> <Cursor />
        </>
      )}
    </>
  )
}

export default TerminalLines
