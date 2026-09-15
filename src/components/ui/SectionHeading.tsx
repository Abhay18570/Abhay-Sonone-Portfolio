import type { ComponentProps, ReactNode } from 'react'

type SectionHeadingProps = ComponentProps<'h2'> & { description?: ReactNode }

export function SectionHeading({ children, description, className = '', ...props }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 className={className} {...props}>{children}</h2>
      {description && <p className="mt-4 max-w-2xl text-secondary">{description}</p>}
    </div>
  )
}
