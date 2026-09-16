import { RotatingIcon } from '../ui/RotatingIcon'
import { useSyncExternalStore } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePortfolioMotion, motionTiming } from '../../motion/presets'
import type { IconType } from 'react-icons'
import { SiReact, SiTypescript, SiPython, SiFastapi, SiNodedotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiHtml5, SiJavascript, SiSpringboot, SiAngular, SiMysql, SiExpress, SiFirebase, SiSupabase } from 'react-icons/si'
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
  { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
  { name: 'Angular', icon: SiAngular, color: '#dd0031' },
  { name: 'MySQL', icon: SiMysql, color: '#4479a1' },
  { name: 'Express.js', icon: SiExpress, color: '#333333' },
  { name: 'Firebase', icon: SiFirebase, color: '#f59e0b' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ecf8e' },
]

const gridQueries = ['(min-width: 600px)', '(min-width: 900px)', '(min-width: 1200px)']
function subscribeGrid(notify: () => void) {
  const queries = gridQueries.map((query) => window.matchMedia(query))
  queries.forEach((query) => query.addEventListener('change', notify))
  return () => queries.forEach((query) => query.removeEventListener('change', notify))
}
const getColumns = () => window.matchMedia(gridQueries[2]).matches ? 6
  : window.matchMedia(gridQueries[1]).matches ? 4
    : window.matchMedia(gridQueries[0]).matches ? 3 : 2
const serverColumns = () => 2

type CardAnimation = { delay: number; index: number; mobile: boolean; columns: number; reduced: boolean }
const cardVariants: Variants = {
  hidden: ({ index, mobile, columns, reduced }: CardAnimation) => reduced
    ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
    : { opacity: 0, y: mobile ? 20 : columns === 6 ? 35 : 25,
        scale: mobile ? 0.94 : 0.88, rotate: (index % 2 === 0 ? -1 : 1) * (mobile ? 2 : 4) },
  visible: ({ delay, reduced }: CardAnimation) => ({
    opacity: 1, y: 0, scale: 1, rotate: 0,
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: motionTiming.ease },
  }),
}
const logoVariants: Variants = {
  hidden: ({ reduced }: CardAnimation) => ({ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.5, rotate: reduced ? 0 : -15 }),
  visible: ({ delay, reduced }: CardAnimation) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay + 0.1, ease: motionTiming.ease },
  }),
}
const nameVariants: Variants = {
  hidden: ({ reduced }: CardAnimation) => ({ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }),
  visible: ({ delay, reduced }: CardAnimation) => ({
    opacity: 1, y: 0,
    transition: { duration: reduced ? 0 : 0.3, delay: reduced ? 0 : delay + 0.18, ease: motionTiming.ease },
  }),
}
const headingVariants: Variants = {
  hidden: { opacity: 0, y: -25, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: motionTiming.ease } },
}

function TechCard({ technology, animation }: { technology: Technology; animation: CardAnimation }) {
  const Icon = technology.icon
  return (
    <motion.li variants={cardVariants} custom={animation}>
      <div className="tech-logo-card">
        <RotatingIcon area=".tech-logo-card" duration={0.6}>
          <motion.div className="tech-logo-entrance" variants={logoVariants} custom={animation}>
            <Icon className="tech-logo" style={{ color: technology.color }} aria-hidden="true" />
          </motion.div>
        </RotatingIcon>
        <motion.span variants={nameVariants} custom={animation}>{technology.name}</motion.span>
      </div>
    </motion.li>
  )
}

export function TechStack() {
  const { reveal, compact, reduced } = usePortfolioMotion()
  const columns = useSyncExternalStore(subscribeGrid, getColumns, serverColumns)
  return (
    <section id="skills" className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="page-container">
        <motion.h2 {...reveal(0, headingVariants)} transition={{ duration: reduced ? 0 : 0.65, ease: motionTiming.ease }} id="tech-stack-title" className="tech-stack-heading"><GradientText>Tech Stack</GradientText></motion.h2>
        <motion.ul
          className="tech-logo-grid"
          data-motion-reveal
          initial={reduced ? false : 'hidden'}
          animate={reduced ? 'visible' : undefined}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: {} }}
        >
          {technologies.map((technology, index) => {
            const row = Math.floor(index / columns)
            const column = index % columns
            const waveIndex = row * columns + (row % 2 === 0 ? column : columns - 1 - column)
            return <TechCard key={technology.name} technology={technology} animation={{
              index, columns, mobile: compact, reduced, delay: 0.18 + waveIndex * 0.09,
            }} />
          })}
        </motion.ul>
        <motion.p {...reveal()} className="tech-learning">Constantly learning and exploring new technologies</motion.p>
      </div>
    </section>
  )
}
