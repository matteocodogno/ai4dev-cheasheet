import { useT } from '@/i18n/useT'
import { useInViewOnce } from '@/shared/hooks/useInViewOnce'
import { Columns, linesToClipboard, Panel, RichText, Terminal, TerminalLines } from '@/ui'

import Mission from '../../missions/components/Mission'
import { OLLAMA_LINES, ollamaCopy, sizingCopy, SPRING_AI_YAML } from '../content'
import YamlCode from './YamlCode'

const OllamaMission = () => {
  const t = useT()
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3)
  const lines = t(OLLAMA_LINES)
  return (
    <Mission id="ollama" copy={ollamaCopy}>
      <Columns>
        <div ref={ref}>
          <Terminal title="~/tinder4dogs" copyText={linesToClipboard(lines)}>
            <TerminalLines lines={lines} typing start={inView} />
          </Terminal>
        </div>
        <Panel tone="paper" title={t(sizingCopy.title)}>
          <ul>
            {t(sizingCopy.items).map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Panel>
      </Columns>
      <Terminal title="application.yml (Spring AI)" className="spaced">
        <YamlCode source={SPRING_AI_YAML} />
      </Terminal>
    </Mission>
  )
}

export default OllamaMission
