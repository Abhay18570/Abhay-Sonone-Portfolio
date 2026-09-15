import type { ComponentProps } from 'react'

export function GradientText({ className = '', ...props }: ComponentProps<'span'>) {
  return <span className={`gradient-text ${className}`} {...props} />
}
