import { motion, useReducedMotion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { SiReact, SiTypescript, SiPython, SiFastapi, SiNodedotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiHtml5, SiJavascript } from 'react-icons/si'
import { FaCss3Alt, FaJava } from 'react-icons/fa'
import { GradientText } from '../ui/GradientText'
import './TechStack.css'

type Technology = { name: string; icon: IconType; color: string }
const technologies: Technology[] = [
  { name: 'React', icon: SiReact, color: '#087ea4' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#539e43' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169a1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#e4c62b' },
  { name: 'Java', icon: FaJava, color: '#e76f00' },
]

function TechCard({ technology, index }: { technology: Technology; index: number }) {
  const reduceMotion = useReducedMotion()
  const Icon = technology.icon
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : (index % 6) * 0.035 }}
    >
      <div className="tech-logo-card">
        <Icon className="tech-logo" style={{ color: technology.color }} aria-hidden="true" />
        <span>{technology.name}</span>
      </div>
    </motion.li>
  )
}

export function TechStack() {
  return (
    <section id="skills" className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="page-container">
        <h2 id="tech-stack-title" className="tech-stack-heading"><GradientText>Tech Stack</GradientText></h2>
        <ul className="tech-logo-grid">
          {technologies.map((technology, index) => <TechCard key={technology.name} technology={technology} index={index} />)}
        </ul>
        <p className="tech-learning">Constantly learning and exploring new technologies</p>
      </div>
    </section>
  )
}
