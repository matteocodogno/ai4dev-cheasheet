import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' }

const Button = ({ variant = 'primary', className, type = 'button', ...rest }: Props) => (
  <button type={type} className={clsx(styles.button, styles[variant], className)} {...rest} />
)

export default Button
