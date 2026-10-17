import { useT } from '@/i18n/useT'
import { Columns, Panel, RichText } from '@/ui'

import Mission from '../../missions/components/Mission'
import { rulesCopy, tokensCopy } from '../content'
import ContextWindowBar from './ContextWindowBar'
import Tokenizer from './Tokenizer'

const TokensMission = () => {
  const t = useT()
  return (
    <Mission id="tokens" copy={tokensCopy}>
      <Columns>
        <Tokenizer />
        <Panel tone="paper" title={t(rulesCopy.title)}>
          <ul>
            {t(rulesCopy.items).map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Panel>
      </Columns>
      <ContextWindowBar />
    </Mission>
  )
}

export default TokensMission
