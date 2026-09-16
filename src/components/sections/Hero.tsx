import { RotatingIcon } from '../ui/RotatingIcon'
import { motion } from 'framer-motion'
import { usePortfolioMotion, rotateIn, fadeInUp } from '../../motion/presets'
import { ChevronDown, FolderOpen, Mail } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { portfolio, socialLinks } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import { TypewriterText } from '../ui/TypewriterText'
import { HeroBackground } from './HeroBackground'
import profilePhoto from '../../images/profile-photo.jpeg'
import './Hero.css'

const socialIcons = { github: SiGithub, linkedin: FaLinkedinIn, instagram: SiInstagram }

export function Hero() {
  const { entrance, reduced, compact } = usePortfolioMotion()

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="page-container hero-content">
        <div className="hero-introduction">
          <motion.div className="hero-profile" {...entrance(0.08, rotateIn)}>
            <img
              src={profilePhoto}
              alt="Abhay Sonone"
              className="hero-profile-image"
              width={250}
              height={250}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
          <motion.h1 id="hero-title" className="hero-name" {...entrance(0.18, fadeInUp)}>
            <GradientText>{portfolio.name}</GradientText>
          </motion.h1>
          <motion.div {...entrance(0.26, fadeInUp)}>
            <p className="hero-headline">{portfolio.headline}</p>
            <p className="hero-education">{portfolio.role} • {portfolio.college}</p>
          </motion.div>
          <motion.div className="hero-typewriter-wrap" {...entrance(0.34, fadeInUp)}>
            <span className="hero-dot" aria-hidden="true" />
            <TypewriterText
              texts={portfolio.highlights}
              typingSpeed={65}
              deletingSpeed={35}
              pauseDuration={2000}
            />
          </motion.div>
          <motion.div className="hero-actions" {...entrance(0.44, fadeInUp)}>
            <a className="button button-primary" href="#projects"><FolderOpen size={18} aria-hidden="true" />View My Work</a>
            <a className="button button-secondary" href="#contact"><Mail size={18} aria-hidden="true" />Get In Touch</a>
          </motion.div>
          <div className="hero-socials" aria-label="Social profiles">
            {socialLinks.map(({ platform, label, url }, index) => {
              const Icon = socialIcons[platform]
              return (
                <motion.a
                  {...entrance(0.54 + index * 0.06, fadeInUp)}
                  key={platform}
                  href={url}
                  className="hero-social"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RotatingIcon duration={0.55} area=".hero-social"><Icon size={20} aria-hidden="true" /></RotatingIcon>
                </motion.a>
              )
            })}
          </div>
        </div>
        <a href="#about" className="hero-scroll">
          <span>Scroll Down</span>
          <motion.span aria-hidden="true" animate={reduced || compact ? { y: 0 } : { y: [0, 4, 0] }}
            transition={reduced || compact ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={20} />
          </motion.span>
        </a>
      </div>
    </section>
  )
}
