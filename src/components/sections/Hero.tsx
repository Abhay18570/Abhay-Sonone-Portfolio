import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Code2, FolderOpen, Mail } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import './Hero.css'

function HeroImage({ src, profile = false }: { src: string; profile?: boolean }) {
  const [failed, setFailed] = useState(false)

  return (
    <>
      {profile ? (
        <span className="hero-initials" role={failed ? 'img' : undefined} aria-label={failed ? portfolio.name : undefined} aria-hidden={!failed}>{portfolio.initials}</span>
      ) : (
        <div className="hero-cell-pattern"><Code2 size={48} strokeWidth={1} /></div>
      )}
      {!failed && (
        <img
          src={src}
          alt={profile ? 'Abhay Sonone' : ''}
          className="hero-image"
          onError={() => setFailed(true)}
          decoding="async"
          fetchPriority={profile ? 'high' : 'low'}
        />
      )}
    </>
  )
}

// Brand marks are not exported by the installed Lucide version.
function GithubMark({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.62 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.77 1.04.77 2.1v3.08c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
}

function LinkedinMark({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.37 24H.39V7.98h4.98ZM2.88 5.8A2.9 2.9 0 1 1 2.9 0a2.9 2.9 0 0 1-.02 5.8ZM24 24h-4.97v-7.8c0-1.86-.04-4.26-2.6-4.26-2.6 0-3 2.03-3 4.13V24H8.46V7.98h4.77v2.19h.07c.66-1.26 2.29-2.6 4.71-2.6 5.04 0 5.98 3.31 5.98 7.62Z" /></svg>
}

const socialIcons = { github: GithubMark, linkedin: LinkedinMark, email: Mail }

export function Hero() {
  const reduceMotion = useReducedMotion()
  const entrance = (delay: number, profile = false) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: profile ? 0 : 10, scale: profile ? 0.96 : 1 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-collage" aria-hidden="true">
        {portfolio.heroImages.map((src) => (
          <div className="hero-cell" key={src}><HeroImage src={src} /></div>
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="page-container hero-content">
        <div className="hero-introduction">
          <motion.div className="hero-profile" {...entrance(0, true)}>
            <HeroImage src={portfolio.profileImage} profile />
          </motion.div>
          <motion.h1 id="hero-title" className="hero-name" {...entrance(0.08)}>
            <GradientText>{portfolio.name}</GradientText>
          </motion.h1>
          <motion.div {...entrance(0.14)}>
            <p className="hero-headline">{portfolio.headline}</p>
            <p className="hero-education">{portfolio.role} • {portfolio.college}</p>
          </motion.div>
          <ul className="hero-highlights">
            {portfolio.highlights.map((highlight, index) => (
              <motion.li key={highlight} {...entrance(0.2 + index * 0.06)}>
                <span className={`hero-dot ${index === 1 ? 'hero-dot-green' : ''}`} aria-hidden="true" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </ul>
          <motion.div className="hero-actions" {...entrance(0.32)}>
            <a className="button button-primary" href="#projects"><FolderOpen size={18} aria-hidden="true" />View My Work</a>
            <a className="button button-secondary" href="#contact"><Mail size={18} aria-hidden="true" />Get In Touch</a>
          </motion.div>
          <div className="hero-socials" aria-label="Social profiles">
            {portfolio.socials.map(({ kind, label, href }) => {
              const Icon = socialIcons[kind]
              return href ? (
                <a key={kind} href={href} className="hero-social" aria-label={label}
                  target={kind === 'email' ? undefined : '_blank'} rel={kind === 'email' ? undefined : 'noopener noreferrer'}>
                  <Icon size={20} aria-hidden="true" />
                </a>
              ) : (
                <span key={kind} className="hero-social hero-social-placeholder" role="link" aria-disabled="true"
                  aria-label={label} title={`${label} — coming soon`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
              )
            })}
          </div>
          {portfolio.socials.some(({ href }) => !href) && <p className="hero-social-note">Social links coming soon</p>}
        </div>
        <a href="#about" className="hero-scroll">
          <span>Scroll Down</span>
          <motion.span aria-hidden="true" animate={reduceMotion ? { y: 0 } : { y: [0, 4, 0] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={20} />
          </motion.span>
        </a>
      </div>
    </section>
  )
}
