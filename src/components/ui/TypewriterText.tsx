import { useEffect, useState } from 'react'
import { usePortfolioMotion } from '../../motion/presets'
import './TypewriterText.css'

interface TypewriterTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  restartDelay?: number
  className?: string
}

export function TypewriterText({
  texts,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2000,
  restartDelay = 400,
  className = '',
}: TypewriterTextProps) {
  const { reduced } = usePortfolioMotion()
  const [index, setIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reduced || !texts.length) return

    const currentFullText = texts[index % texts.length]
    let timeoutId: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      // Typing phase: add characters one by one
      if (displayedText.length < currentFullText.length) {
        const nextChar = currentFullText.slice(0, displayedText.length + 1)
        // Realistic human typing variation (±12ms)
        const jitter = Math.floor(Math.random() * 25) - 12
        const delay = Math.max(30, typingSpeed + jitter)
        timeoutId = setTimeout(() => {
          setDisplayedText(nextChar)
        }, delay)
      } else {
        // Full sentence completed: pause before deleting
        const pauseJitter = Math.floor(Math.random() * 200) - 100
        timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, Math.max(1000, pauseDuration + pauseJitter))
      }
    } else {
      // Deleting phase: remove characters one by one
      if (displayedText.length > 0) {
        const prevChars = currentFullText.slice(0, displayedText.length - 1)
        const jitter = Math.floor(Math.random() * 15) - 7
        const delay = Math.max(20, deletingSpeed + jitter)
        timeoutId = setTimeout(() => {
          setDisplayedText(prevChars)
        }, delay)
      } else {
        // Finished deleting: short pause before advancing to next sentence
        timeoutId = setTimeout(() => {
          setIsDeleting(false)
          setIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }, restartDelay)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, isDeleting, index, texts, typingSpeed, deletingSpeed, pauseDuration, restartDelay, reduced])

  if (!texts.length) return null

  if (reduced) {
    return (
      <span className={`typewriter-text ${className}`}>
        <span>{texts[0]}</span>
      </span>
    )
  }

  const currentMessage = texts[index % texts.length]

  return (
    <span className={`typewriter-text ${className}`} aria-label={currentMessage}>
      <span className="sr-only">{currentMessage}</span>
      <span aria-hidden="true" className="typewriter-content">
        {displayedText}
        <span className="typewriter-cursor" />
      </span>
    </span>
  )
}
