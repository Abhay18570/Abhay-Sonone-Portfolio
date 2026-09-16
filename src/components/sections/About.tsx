import { useState } from 'react'
import aboutImage from '../../images/abhay-about-img.jpeg'
import teamImage from '../../images/abhay-team.jpeg'
import { motion, type Variants } from 'framer-motion'
import { usePortfolioMotion, motionTiming } from '../../motion/presets'
import { ArrowRight, CircleCheck, Image } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import './About.css'

const highlights = [
  'Third Year Computer Engineering Student',
  'Currently in Semester 5',
  'Interested in Full Stack Development, AI/ML & FinTech',
  'Active in project development and hackathons',
  'Focused on building practical, real-world solutions',
]
const leadershipHighlights = [
  'Founded and leading the Hackops Heroes tech-focused student community',
  'Leading a collaborative team of 5+ developers',
  'Coordinating technical development for hackathon projects',
]
const interests = ['FinTech', 'Artificial Intelligence', 'Backend Engineering', 'Data Analytics', 'System Design']

// Reveal each complete row as one group, preserving all resting layout styles.
function directionalReveal(direction: 1 | -1): Variants {
  return {
    hidden: (distance: number) => ({ opacity: 0, x: direction * distance, scale: 0.98 }),
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { duration: 0.8, ease: motionTiming.ease },
    },
  }
}
const studentReveal = directionalReveal(1)
const leadershipReveal = directionalReveal(-1)

function AboutPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="about-photo">
      <div className="about-photo-fallback" role={failed ? 'img' : undefined}
        aria-label={failed ? `${portfolio.name} — photograph coming soon` : undefined} aria-hidden={!failed}>
        <span>{portfolio.initials}</span>
        <Image size={24} strokeWidth={1.5} aria-hidden="true" />
      </div>
      {!failed && <img src={src} alt={alt} loading="lazy" decoding="async" width={800} height={500} onError={() => setFailed(true)} />}
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="about-checklist">
      {items.map((item) => (
        <li key={item}>
          <span className="about-check-icon">
            <CircleCheck size={19} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function About() {
  const { reveal, compact, reduced } = usePortfolioMotion()
  const rowReveal = (variants: Variants) => ({
    ...reveal(0, variants),
    custom: compact ? 36 : 80,
    transition: { duration: reduced ? 0 : 0.8, ease: motionTiming.ease },
  })

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="page-container">
        <div className="about-heading">
          <motion.h2 {...reveal()} id="about-title"><GradientText>About Me</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>A little about my journey, interests and what I love building.</motion.p>
        </div>
        <motion.div className="about-introduction-row" {...rowReveal(studentReveal)}>
          <div>
            <AboutPhoto src={aboutImage} alt="Abhay Sonone at a technical event" />
          </div>
          <div className="about-copy">
            <h3>{portfolio.role}</h3>
            <p className="about-college">{portfolio.college}</p>
            <p>I am a Computer Engineering student passionate about building practical technology solutions using full-stack development, AI/ML and data-driven systems. I enjoy turning real-world problems into working software through projects, hackathons and continuous experimentation.</p>
            <p>My current interests include Full Stack Development, Artificial Intelligence, FinTech, backend engineering and data-driven applications. I am particularly interested in understanding how technology can solve practical business and financial problems.</p>
            <CheckList items={highlights} />
          </div>
        </motion.div>
        <hr className="about-divider" />
        <motion.div className="about-journey-row" {...rowReveal(leadershipReveal)}>
          <div className="about-copy about-journey-copy">
            <h3>Tech Team Lead</h3>
            <p className="about-college">Hackops Heroes</p>
            <CheckList items={leadershipHighlights} />
            <div className="about-focus">
              <h3>Currently Exploring</h3>
              <ul>{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
            </div>
          </div>
          <div className="about-journey-photo">
            <AboutPhoto src={teamImage} alt="Abhay Sonone with his team" />
          </div>
        </motion.div>
        <div className="about-cta">
          <a href="#projects">Explore My Projects <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
