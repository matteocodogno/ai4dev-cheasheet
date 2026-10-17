import { Fragment } from 'react'

const BDD = /(\b(?:GIVEN|WHEN|THEN)\b)/g

type Props = { source: string }

/** Highlights markdown headings and Given/When/Then keywords in the example spec. */
const SpecCode = ({ source }: Props) => (
  <>
    {source.split('\n').map((line, i) => (
      <Fragment key={i}>
        {i > 0 && '\n'}
        {line.startsWith('##') ? (
          <span className="k">{line}</span>
        ) : (
          line.split(BDD).map((part, j) =>
            /^(GIVEN|WHEN|THEN)$/.test(part) ? (
              <span key={j} className="s">
                {part}
              </span>
            ) : (
              part
            ),
          )
        )}
      </Fragment>
    ))}
  </>
)

export default SpecCode
