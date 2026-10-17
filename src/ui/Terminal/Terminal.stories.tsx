import type { Meta, StoryObj } from '@storybook/react-vite'

import Terminal from './Terminal'
import TerminalLines from './TerminalLines'
import { linesToClipboard, type TerminalLine } from './types'

const lines: TerminalLine[] = [
  { kind: 'comment', text: '# pull a coding model' },
  { kind: 'cmd', text: 'ollama pull qwen2.5-coder:7b' },
  { kind: 'cmd', text: 'ollama ps' },
  { kind: 'out', text: 'NAME                ID       SIZE    PROCESSOR' },
]

const meta = {
  title: 'UI/Terminal',
  component: Terminal,
  args: { title: '~/tinder4dogs', children: null },
} satisfies Meta<typeof Terminal>

export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {
  render: (args) => (
    <Terminal {...args} copyText={linesToClipboard(lines)}>
      <TerminalLines lines={lines} />
    </Terminal>
  ),
}

export const Typing: Story = {
  render: (args) => (
    <Terminal {...args}>
      <TerminalLines lines={lines} typing />
    </Terminal>
  ),
}

export const Code: Story = {
  render: () => (
    <Terminal title="application.yml">
      <span className="k">spring</span>:{'\n'}
      {'  '}
      <span className="k">ai</span>: <span className="s">...</span>
    </Terminal>
  ),
}
