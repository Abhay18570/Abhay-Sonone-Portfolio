import { memo, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { fadeIn, usePortfolioMotion } from '../../motion/presets'
import { heroPhotos } from './heroPhotos'

type Cell = { current: number; previous?: number }
const ROTATION_INTERVAL = 11000 // 11 seconds per rotation step
const STAGGER_PER_BOX = 75 // 75ms subtle stagger between boxes for coordinated wave transition
const decodedPhotos = new Map<number, Promise<boolean>>()

function subscribeVisibility(notify: () => void) {
  document.addEventListener('visibilitychange', notify)
  return () => document.removeEventListener('visibilitychange', notify)
}
const getHidden = () => document.hidden
const serverHidden = () => false

function preload(index: number) {
  let pending = decodedPhotos.get(index)
  if (!pending) {
    const image = new Image()
    image.src = heroPhotos[index].src
    pending = image.decode().then(() => true, () => {
      decodedPhotos.delete(index)
      return false
    })
    decodedPhotos.set(index, pending)
  }
  return pending
}

const PhotoCell = memo(function PhotoCell({ cell, index, finish, reduced }: {
  cell: Cell
  index: number
  finish: (index: number, current: number) => void
  reduced: boolean
}) {
  const [ready, setReady] = useState(false)
  const layers = reduced || cell.previous === undefined ? [cell.current] : [cell.previous, cell.current]

  return (
    <div className="hero-cell">
      <div className={`hero-photo-layer ${ready ? 'hero-photo-ready' : ''}`}>
        {layers.map((photoIndex) => (
          <img
            key={heroPhotos[photoIndex].src}
            className={`hero-background-photo ${photoIndex === cell.previous ? 'hero-photo-outgoing' : 'hero-photo-incoming'}`}
            src={heroPhotos[photoIndex].src}
            alt=""
            style={{ objectPosition: heroPhotos[photoIndex].position }}
            loading="eager"
            decoding="async"
            onLoad={() => setReady(true)}
            onAnimationEnd={(event) => {
              if (event.animationName === 'hero-photo-crossfade' && photoIndex === cell.current) {
                finish(index, cell.current)
              }
            }}
          />
        ))}
      </div>
      {(index === 1 || index === 5) && <div className="hero-cell-code"><Code2 size={40} strokeWidth={1} /></div>}
    </div>
  )
})

function PhotoGrid({ count }: { count: number }) {
  const { entrance, reduced } = usePortfolioMotion()
  const totalPhotos = heroPhotos.length

  // Initial deterministic arrangement: Box b -> Image (b % totalPhotos)
  const [cells, setCells] = useState<Cell[]>(() =>
    Array.from({ length: count }, (_, b) => ({ current: b % totalPhotos }))
  )

  const stepRef = useRef(0)
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, serverHidden)

  // Preload all hero background images on initial load
  useEffect(() => {
    for (let i = 0; i < totalPhotos; i++) {
      void preload(i)
    }
  }, [totalPhotos])

  const finish = useCallback((boxIndex: number, currentPhotoIndex: number) => {
    setCells((prev) => {
      const existing = prev[boxIndex]
      if (!existing || existing.current !== currentPhotoIndex || existing.previous === undefined) {
        return prev
      }
      return prev.map((cell, i) => (i === boxIndex ? { current: currentPhotoIndex } : cell))
    })
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const staggerTimeouts: ReturnType<typeof setTimeout>[] = []
    let active = true

    const scheduleNextRotation = () => {
      if (!active || document.hidden) return
      timer = setTimeout(() => {
        rotateCycle()
      }, ROTATION_INTERVAL)
    }

    const rotateCycle = () => {
      if (!active || document.hidden) return

      // Deterministic circular step increment: step goes 0, 1, 2, ... (totalPhotos - 1) -> repeats seamlessly
      const nextStep = (stepRef.current + 1) % totalPhotos
      stepRef.current = nextStep

      // Preload next upcoming batch
      for (let b = 0; b < count; b++) {
        const nextUpcoming = (b + nextStep + 1) % totalPhotos
        void preload(nextUpcoming)
      }

      // Stagger each box update slightly to create a coordinated cinematic wave across the mosaic
      for (let b = 0; b < count; b++) {
        const boxIndex = b
        const nextPhotoIndex = (boxIndex + nextStep) % totalPhotos
        const delay = boxIndex * STAGGER_PER_BOX

        const timeout = setTimeout(() => {
          if (!active) return
          setCells((prev) =>
            prev.map((cell, i) => {
              if (i !== boxIndex) return cell
              if (cell.current === nextPhotoIndex) return cell
              return { current: nextPhotoIndex, previous: cell.current }
            })
          )
        }, delay)

        staggerTimeouts.push(timeout)
      }

      scheduleNextRotation()
    }

    scheduleNextRotation()

    const onVisibilityChange = () => {
      clearTimeout(timer)
      staggerTimeouts.forEach((t) => clearTimeout(t))
      staggerTimeouts.length = 0
      if (!document.hidden && active) {
        scheduleNextRotation()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      active = false
      clearTimeout(timer)
      staggerTimeouts.forEach((t) => clearTimeout(t))
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [count, totalPhotos])

  return (
    <motion.div className="hero-collage" data-paused={hidden || undefined} aria-hidden="true" {...entrance(0, fadeIn)}>
      {cells.map((cell, index) => <PhotoCell key={index} cell={cell} index={index} finish={finish} reduced={reduced} />)}
    </motion.div>
  )
}

export function HeroBackground() {
  const { compact } = usePortfolioMotion()
  const count = compact ? 4 : 8
  return <PhotoGrid key={count} count={count} />
}

