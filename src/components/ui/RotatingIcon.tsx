import { useEffect, useRef, type ReactNode } from 'react'
import { animate } from 'framer-motion'
import { usePortfolioMotion } from '../../motion/presets'

type RotatingIconProps = {
  children: ReactNode
  duration?: number
  pulse?: number
  area?: string
}

/** No layout box; individual rotate/scale compose with existing CSS transforms. */
export function RotatingIcon({ children, duration = 0.65, pulse = 1, area }: RotatingIconProps) {
  const root = useRef<HTMLDivElement>(null)
  const { reduced } = usePortfolioMotion()

  useEffect(() => {
    const target = root.current?.firstElementChild as HTMLElement | SVGElement | undefined
    if (!target || reduced) return
    const hitArea = (area && target.closest(area)) || target
    const originalRotate = target.style.rotate
    const originalScale = target.style.scale
    const originalOrigin = target.style.transformOrigin
    const originalBox = target.style.transformBox
    target.style.transformOrigin = 'center'
    if (target instanceof SVGElement) target.style.transformBox = 'fill-box'
    let pending = 0
    let turns = 0
    let running = false
    let disposed = false
    let rotation: ReturnType<typeof animate> | undefined
    let scaling: ReturnType<typeof animate> | undefined

    async function drain() {
      if (running || disposed) return
      running = true
      while (pending > 0 && !disposed) {
        pending--
        const start = turns * 360
        turns++
        rotation = animate(start, turns * 360, {
          duration, ease: 'easeInOut',
          onUpdate: (value) => { target!.style.rotate = `${value}deg` },
        })
        if (pulse !== 1) {
          scaling = animate(0, 1, {
            duration, ease: 'easeInOut',
            onUpdate: (value) => { target!.style.scale = String(1 + (pulse - 1) * Math.sin(Math.PI * value)) },
            onComplete: () => { target!.style.scale = originalScale },
          })
        }
        await rotation
      }
      running = false
    }

    function spin() {
      pending++
      void drain()
    }
    function hover(event: Event) {
      if ((event as PointerEvent).pointerType === 'mouse' &&
          window.matchMedia('(hover: hover) and (pointer: fine)').matches) spin()
    }
    function tap(event: Event) {
      // Never prevent default or delay a link's navigation.
      if ((event as PointerEvent).pointerType === 'touch') spin()
    }
    hitArea.addEventListener('pointerenter', hover)
    hitArea.addEventListener('pointerleave', hover)
    hitArea.addEventListener('pointerup', tap)
    return () => {
      disposed = true
      rotation?.stop()
      scaling?.stop()
      target.style.rotate = originalRotate
      target.style.scale = originalScale
      target.style.transformOrigin = originalOrigin
      target.style.transformBox = originalBox
      hitArea.removeEventListener('pointerenter', hover)
      hitArea.removeEventListener('pointerleave', hover)
      hitArea.removeEventListener('pointerup', tap)
    }
  }, [area, duration, pulse, reduced])

  return <div ref={root} style={{ display: 'contents' }}>{children}</div>
}
