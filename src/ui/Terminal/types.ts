export type TerminalLine =
  | { kind: 'cmd'; text: string }
  | { kind: 'comment'; text: string }
  | { kind: 'out'; text: string }
  | { kind: 'blank' }

export const lineText = (line: TerminalLine): string => (line.kind === 'blank' ? '' : line.text)

/** What a "copy" button should put on the clipboard: commands and comments, no sample output. */
export const linesToClipboard = (lines: readonly TerminalLine[]): string =>
  lines
    .filter((l) => l.kind !== 'out')
    .map(lineText)
    .join('\n')
