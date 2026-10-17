import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  args: { children: 'Dig deeper', variant: 'primary' },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'secondary'] } },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Reset' } }
export const Disabled: Story = { args: { disabled: true } }
