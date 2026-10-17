import type { Meta, StoryObj } from '@storybook/react-vite'

import Panel from './Panel'

const meta = {
  title: 'UI/Panel',
  component: Panel,
  args: {
    title: 'Rules of thumb',
    tone: 'dark',
    children: <p>English: about 4 characters per token. Italian and code use more.</p>,
  },
  argTypes: { tone: { control: 'inline-radio', options: ['dark', 'paper'] } },
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {}
export const Paper: Story = { args: { tone: 'paper' } }
export const AccentShadow: Story = {
  args: { shadowColor: 'var(--orange)', titleColor: 'var(--orange)', title: 'Open weight' },
}
