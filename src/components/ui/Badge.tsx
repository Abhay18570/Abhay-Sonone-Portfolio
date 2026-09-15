import type { ComponentProps } from 'react'

export function Badge({ className = '', ...props }: ComponentProps<'span'>) {
  return <span className={`inline-flex items-center gap-2 rounded-full border border-border bg-elevated px-3 py-1 text-xs font-medium text-secondary ${className}`} {...props} />
}
