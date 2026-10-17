import type { KeyboardEvent } from 'react'

/** Keyboard handler for non-button elements with role="button": Enter and Space activate. */
export const onActivateKey = (run: () => void) => (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    run()
  }
}
