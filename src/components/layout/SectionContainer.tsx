import type { ComponentProps } from 'react'

export function SectionContainer({ className = '', ...props }: ComponentProps<'section'>) {
  return <section className={`page-container section-container ${className}`} {...props} />
}
