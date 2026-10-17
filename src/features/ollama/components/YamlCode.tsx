import { Fragment } from 'react'

type Props = { source: string }

/** Tiny YAML highlighter: keys in magenta, scalar values in yellow. Enough for config snippets. */
const YamlCode = ({ source }: Props) => (
  <>
    {source.split('\n').map((line, i) => {
      const m = /^(\s*)([\w.-]+):(.*)$/.exec(line)
      return (
        <Fragment key={i}>
          {i > 0 && '\n'}
          {m ? (
            <>
              {m[1]}
              <span className="k">{m[2]}</span>:{m[3] ? <span className="s">{m[3]}</span> : null}
            </>
          ) : (
            line
          )}
        </Fragment>
      )
    })}
  </>
)

export default YamlCode
