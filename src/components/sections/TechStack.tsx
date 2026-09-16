import { motion } from 'framer-motion'
import { usePortfolioMotion, scaleIn } from '../../motion/presets'
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
  const { reveal } = usePortfolioMotion()
  const Icon = technology.icon
  return (
    <motion.li
      {...reveal((index % 6) * 0.05, scaleIn)}
    >
      <div className="tech-logo-card">
        <Icon className="tech-logo" style={{ color: technology.color }} aria-hidden="true" />
        <span>{technology.name}</span>
      </div>
    </motion.li>
  )
}

export function TechStack() {
  const { reveal } = usePortfolioMotion()
  return (
    <section id="skills" className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="page-container">
        <motion.h2 {...reveal()} id="tech-stack-title" className="tech-stack-heading"><GradientText>Tech Stack</GradientText></motion.h2>
        <ul className="tech-logo-grid">
          {technologies.map((technology, index) => <TechCard key={technology.name} technology={technology} index={index} />)}
        </ul>
        <motion.p {...reveal()} className="tech-learning">Constantly learning and exploring new technologies</motion.p>
      </div>
    </section>
  )
}
