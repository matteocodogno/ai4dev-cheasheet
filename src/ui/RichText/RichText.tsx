import { parseRichText } from '@/shared/utils/parseRichText'

type Props = { text: string }

/** Renders content strings that use the inline markup: **bold**, `code`, _marker_, [[kbd]]. */
const RichText = ({ text }: Props) => (
  <>
    {parseRichText(text).map((t, i) => {
      switch (t.kind) {
        case 'bold':
          return <b key={i}>{t.value}</b>
        case 'code':
          return <code key={i}>{t.value}</code>
        case 'marker':
          return (
            <em key={i} className="marker">
              {t.value}
            </em>
          )
        case 'kbd':
          return <kbd key={i}>{t.value}</kbd>
        default:
          return <span key={i}>{t.value}</span>
      }
    })}
  </>
)

export default RichText
