import { useState } from 'react'
import aboutImage from '../../images/abhay-about-img.jpeg'
import teamImage from '../../images/abhay-team.jpeg'
import { motion } from 'framer-motion'
import { usePortfolioMotion, slideInLeft, slideInRight, fadeInUp, popIn, scaleIn } from '../../motion/presets'
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
  const { reveal } = usePortfolioMotion()
  return (
    <ul className="about-checklist">
      {items.map((item, index) => (
        <motion.li {...reveal(index * 0.07, fadeInUp)} key={item}>
          <motion.span {...reveal(index * 0.07, popIn)} className="about-check-icon">
            <CircleCheck size={19} aria-hidden="true" />
          </motion.span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

export function About() {
  const { reveal } = usePortfolioMotion()

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="page-container">
        <div className="about-heading">
          <motion.h2 {...reveal()} id="about-title"><GradientText>About Me</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>A little about my journey, interests and what I love building.</motion.p>
        </div>
        <div className="about-introduction-row">
          <motion.div {...reveal(0, slideInLeft)}>
            <AboutPhoto src={aboutImage} alt="Abhay Sonone at a technical event" />
          </motion.div>
          <motion.div className="about-copy" {...reveal(0.1, slideInRight)}>
            <motion.h3 {...reveal(0.12)}>{portfolio.role}</motion.h3>
            <motion.p {...reveal(0.16)} className="about-college">{portfolio.college}</motion.p>
            <motion.p {...reveal(0.2)}>I am a Computer Engineering student passionate about building practical technology solutions using full-stack development, AI/ML and data-driven systems. I enjoy turning real-world problems into working software through projects, hackathons and continuous experimentation.</motion.p>
            <motion.p {...reveal(0.24)}>My current interests include Full Stack Development, Artificial Intelligence, FinTech, backend engineering and data-driven applications. I am particularly interested in understanding how technology can solve practical business and financial problems.</motion.p>
            <CheckList items={highlights} />
          </motion.div>
        </div>
        <hr className="about-divider" />
        <div className="about-journey-row">
          <motion.div className="about-copy about-journey-copy" {...reveal(0, slideInLeft)}>
            <motion.h3 {...reveal(0.08)}>Tech Team Lead</motion.h3>
            <motion.p {...reveal(0.14)} className="about-college">Hackops Heroes</motion.p>
            <CheckList items={leadershipHighlights} />
            <div className="about-focus">
              <motion.h3 {...reveal(0.18)}>Currently Exploring</motion.h3>
              <ul>{interests.map((interest, index) => <motion.li {...reveal(0.2 + index * 0.05, scaleIn)} key={interest}>{interest}</motion.li>)}</ul>
            </div>
          </motion.div>
          <motion.div className="about-journey-photo" {...reveal(0.1, slideInRight)}>
            <AboutPhoto src={teamImage} alt="Abhay Sonone with his team" />
          </motion.div>
        </div>
        <div className="about-cta">
          <a href="#projects">Explore My Projects <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
