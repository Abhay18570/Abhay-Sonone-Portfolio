import { useSyncExternalStore } from 'react'
import type { MotionProps, Variants } from 'framer-motion'

export const motionTiming = {
  ease: [0.22, 1, 0.36, 1] as const,
  spring: { type: 'spring', stiffness: 260, damping: 20 } as const,
  softSpring: { type: 'spring', stiffness: 200, damping: 24 } as const,
  entrance: 0.55,
  stagger: 0.08,
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const fadeInUp: Variants = {
  hidden: (distance: number = 24) => ({ opacity: 0, y: distance }),
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const fadeInDown: Variants = {
  hidden: (distance: number = 24) => ({ opacity: 0, y: -distance }),
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const fadeUp: Variants = fadeInUp

export const slideInLeft: Variants = {
  hidden: (distance: number = 32) => ({ opacity: 0, x: -distance }),
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const slideInRight: Variants = {
  hidden: (distance: number = 32) => ({ opacity: 0, x: distance }),
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: motionTiming.entrance, ease: motionTiming.ease } },
}

export const rotateIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -6 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.65, ease: motionTiming.ease } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTiming.stagger,
      delayChildren: 0.05,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: motionTiming.ease } },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 18 } },
}

const reducedQuery = '(prefers-reduced-motion: reduce)'
const compactQuery = '(max-width: 767px)'

function subscribe(query: string, notify: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}

const subscribeReduced = (notify: () => void) => subscribe(reducedQuery, notify)
const subscribeCompact = (notify: () => void) => subscribe(compactQuery, notify)
const getReduced = () => window.matchMedia(reducedQuery).matches
const getCompact = () => window.matchMedia(compactQuery).matches
const serverSnapshot = () => true

type RevealProps = MotionProps & { 'data-motion-reveal': boolean }

/** Once-only scroll reveals & initial entrance animations; reduced-motion and small-screen aware */
export function usePortfolioMotion() {
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, serverSnapshot)
  const compact = useSyncExternalStore(subscribeCompact, getCompact, serverSnapshot)

  const transition = (delay = 0) => ({
    duration: reduced ? 0 : motionTiming.entrance,
    delay: reduced ? 0 : delay,
    ease: motionTiming.ease,
  })

  const reveal = (delay = 0, preset: Variants = fadeInUp): RevealProps => ({
    'data-motion-reveal': true,
    variants: preset,
    custom: compact ? 14 : 24,
    initial: reduced ? false : 'hidden',
    animate: reduced ? 'visible' : undefined,
    whileInView: 'visible',
    viewport: { once: true, amount: 0.12 },
    transition: transition(delay),
  })

  const entrance = (delay = 0, preset: Variants = fadeInUp): RevealProps => ({
    ...reveal(delay, preset),
    animate: 'visible',
    whileInView: undefined,
  })

  return { reduced, compact, reveal, entrance }
}

