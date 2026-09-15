import type { ComponentProps } from 'react'

type CardProps = ComponentProps<'div'> & { hoverable?: boolean }

export function Card({ hoverable = false, className = '', ...props }: CardProps) {
  return <div className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`} {...props} />
}
