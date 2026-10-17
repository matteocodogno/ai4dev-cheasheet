import { Fragment } from 'react'

const KEYWORDS = /\b(while|val|if|return|for|in)\b/
const TOKENS = /(\/\/.*$|\b(?:while|val|if|return|for|in)\b)/g

type Props = { source: string }

/** Minimal Kotlin highlighter for short snippets: keywords and line comments. */
const KotlinCode = ({ source }: Props) => (
  <>
    {source.split('\n').map((line, li) => (
      <Fragment key={li}>
        {li > 0 && '\n'}
        {line.split(TOKENS).map((part, pi) =>
          part.startsWith('//') ? (
            <span key={pi} className="c">
              {part}
            </span>
          ) : KEYWORDS.test(part) && part.trim() === part ? (
            <span key={pi} className="k">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </Fragment>
    ))}
  </>
)

export default KotlinCode
