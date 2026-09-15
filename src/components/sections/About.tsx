import { useState } from 'react'
import aboutImage from '../../images/abhay-about-img.jpeg'
import teamImage from '../../images/abhay-team.jpeg'
import { motion, useReducedMotion } from 'framer-motion'
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
const journeyHighlights = [
  'Full-stack application development',
  'AI/ML and NLP exploration',
  'Hackathon-based problem solving',
  'Growing interest in FinTech and financial technology',
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
  return (
    <ul className="about-checklist">
      {items.map((item) => <li key={item}><CircleCheck size={19} aria-hidden="true" /><span>{item}</span></li>)}
    </ul>
  )
}

export function About() {
  const reduceMotion = useReducedMotion()
  const reveal = (image = false) => ({
    initial: reduceMotion ? false as const : { opacity: 0, x: image ? -10 : 0, y: image ? 0 : 10 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.45 },
  })

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="page-container">
        <div className="about-heading">
          <h2 id="about-title"><GradientText>About Me</GradientText></h2>
          <p>A little about my journey, interests and what I love building.</p>
        </div>
        <div className="about-introduction-row">
          <motion.div {...reveal(true)}>
            <AboutPhoto src={aboutImage} alt="Abhay Sonone at a technical event" />
          </motion.div>
          <motion.div className="about-copy" {...reveal()}>
            <h3>{portfolio.role}</h3>
            <p className="about-college">{portfolio.college}</p>
            <p>I am a Computer Engineering student passionate about building practical technology solutions using full-stack development, AI/ML and data-driven systems. I enjoy turning real-world problems into working software through projects, hackathons and continuous experimentation.</p>
            <p>My current interests include Full Stack Development, Artificial Intelligence, FinTech, backend engineering and data-driven applications. I am particularly interested in understanding how technology can solve practical business and financial problems.</p>
            <CheckList items={highlights} />
          </motion.div>
        </div>
        <hr className="about-divider" />
        <div className="about-journey-row">
          <motion.div className="about-copy about-journey-copy" {...reveal()}>
            <h3>My Technical Journey</h3>
            <p>My journey in technology has grown through academic learning, personal projects and hackathon-based problem solving. I enjoy exploring a problem from its requirements and user needs through frontend development, backend APIs, databases and intelligent features.</p>
            <CheckList items={journeyHighlights} />
          </motion.div>
          <motion.div className="about-journey-photo" {...reveal(true)}>
            <AboutPhoto src={teamImage} alt="Abhay Sonone with his team" />
          </motion.div>
          <div className="about-focus">
            <h3>Currently Exploring</h3>
            <ul>{interests.map((interest) => <li key={interest}>{interest}</li>)}</ul>
          </div>
        </div>
        <div className="about-cta">
          <a href="#projects">Explore My Projects <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
