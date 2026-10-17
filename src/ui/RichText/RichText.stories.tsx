import type { Meta, StoryObj } from '@storybook/react-vite'

import RichText from './RichText'

const meta = {
  title: 'UI/RichText',
  component: RichText,
  args: {
    text: 'Plain, **bold**, `code`, _marker emphasis_ and [[Esc]] [[Esc]] keys.',
  },
} satisfies Meta<typeof RichText>

export default meta

export const Default: StoryObj<typeof meta> = {}
