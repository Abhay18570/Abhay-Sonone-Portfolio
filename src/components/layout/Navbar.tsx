import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'

const navigationItems = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
]

// Replace public/resume.pdf when the final resume is ready.
const resumePath = '/resume.pdf'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const toggleRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const visibleSections = new Set<string>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleSections.add(entry.target.id)
        else visibleSections.delete(entry.target.id)
      }
      const active = navigationItems.find(({ id }) => visibleSections.has(id))
      setActiveId(active?.id ?? '')
    }, { rootMargin: '-80px 0px -45% 0px', threshold: 0 })

    for (const { id } of navigationItems) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1150px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
    // Keep focus on a visible control when a destination does not exist yet.
    toggleRef.current?.focus()
  }

  function renderLinks(mobile = false) {
    return navigationItems.map(({ id, label }) => (
      <li key={id}>
        <a
          href={`#${id}`}
          className="navbar-link"
          aria-current={activeId === id ? 'location' : undefined}
          onClick={mobile ? closeMenu : undefined}
        >
          {label}
        </a>
      </li>
    ))
  }

  function resumeLink(mobile = false) {
    return (
      <a href={resumePath} download className="button button-primary navbar-resume" onClick={mobile ? closeMenu : undefined}>
        <Download size={16} aria-hidden="true" />
        Download Resume
      </a>
    )
  }

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
    >
      <nav aria-label="Primary navigation" className="page-container">
        <div className="navbar-row">
          <a href="#home" className="navbar-brand" onClick={() => setIsOpen(false)}>
            <span className="navbar-logo" aria-hidden="true">AS</span>
            <span>ABHAY SONONE</span>
          </a>
          <ul className="navbar-desktop-links">{renderLinks()}</ul>
          <div className="navbar-desktop-resume">{resumeLink()}</div>
          <button
            ref={toggleRef}
            type="button"
            className="navbar-toggle"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
        <motion.div
          id="mobile-navigation"
          className="navbar-mobile"
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeInOut' }}
          inert={!isOpen}
          aria-hidden={!isOpen}
        >
          <div className="navbar-mobile-content">
            <ul>{renderLinks(true)}</ul>
            {resumeLink(true)}
          </div>
        </motion.div>
      </nav>
    </header>
  )
}
