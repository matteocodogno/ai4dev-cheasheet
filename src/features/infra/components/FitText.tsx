import type { SVGProps } from 'react'

import { useFitSvgText } from '../hooks/useFitSvgText'

type Props = Omit<SVGProps<SVGTextElement>, 'ref'> & { text: string; maxWidth: number }

/** SVG text that never overflows its box. */
const FitText = ({ text, maxWidth, ...rest }: Props) => {
  const { ref, fitProps } = useFitSvgText(text, maxWidth)
  return (
    <text ref={ref} {...rest} {...fitProps}>
      {text}
    </text>
  )
}

export default FitText
