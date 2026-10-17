/**
 * Minimal inline markup for bilingual content, so copy can live in plain TS data:
 *   **bold**   `code`   _marker emphasis_   [[kbd]]
 */
export type RichToken =
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'marker'; value: string }
  | { kind: 'kbd'; value: string }

const PATTERN = /\*\*(.+?)\*\*|`(.+?)`|(?<![\w/])_(.+?)_(?![\w/])|\[\[(.+?)\]\]/g

export const parseRichText = (input: string): RichToken[] => {
  const tokens: RichToken[] = []
  let cursor = 0
  for (const match of input.matchAll(PATTERN)) {
    const index = match.index ?? 0
    if (index > cursor) tokens.push({ kind: 'text', value: input.slice(cursor, index) })
    const [, bold, code, marker, kbd] = match
    if (bold !== undefined) tokens.push({ kind: 'bold', value: bold })
    else if (code !== undefined) tokens.push({ kind: 'code', value: code })
    else if (marker !== undefined) tokens.push({ kind: 'marker', value: marker })
    else if (kbd !== undefined) tokens.push({ kind: 'kbd', value: kbd })
    cursor = index + match[0].length
  }
  if (cursor < input.length) tokens.push({ kind: 'text', value: input.slice(cursor) })
  return tokens
}
