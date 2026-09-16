import { RotatingIcon } from '../ui/RotatingIcon'
import { motion } from 'framer-motion'
import { usePortfolioMotion, slideInLeft, slideInRight, fadeInUp, scaleIn } from '../../motion/presets'
import { BookOpen, Check, GraduationCap, School } from 'lucide-react'
import { education, studyAreas } from '../../data/portfolio'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import './Education.css'

const educationIcons = { degree: GraduationCap, diploma: BookOpen, school: School }
const educationCardVariants = [slideInLeft, fadeInUp, slideInRight]

export function Education() {
  const { reveal, compact } = usePortfolioMotion()

  return (
    <section id="education" className="education" aria-labelledby="education-title">
      <div className="page-container">
        <div className="education-heading">
          <motion.h2 {...reveal()} id="education-title"><GradientText>Education</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>My academic journey in Computer Engineering and technology.</motion.p>
        </div>
        <div className="education-grid">
          {education.map((entry, index) => {
            const Icon = educationIcons[entry.icon]
            const variant = compact ? fadeInUp : educationCardVariants[index % educationCardVariants.length]
            return (
              <motion.article
                key={entry.id}
                aria-labelledby={`education-${entry.id}`}
                {...reveal(index * 0.12, variant)}
              >
                <Card hoverable className={`education-card ${entry.current ? 'education-card-current' : ''}`}>
                  <div className="education-card-top">
                    <RotatingIcon><Icon size={40} strokeWidth={1.5} className={`education-icon education-icon-${entry.icon}`} aria-hidden="true" /></RotatingIcon>
                    {entry.current && <span className="education-current"><span aria-hidden="true" />Currently Studying</span>}
                  </div>
                  <h3 id={`education-${entry.id}`}>{entry.degree}</h3>
                  <p className="education-institution">{entry.field}<br />{entry.institution}</p>
                  <span className="education-period">{entry.period}</span>
                  <p className="education-pending">{entry.result}</p>
                  <ul className="education-highlights">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}><Check size={18} aria-hidden="true" /><span>{highlight}</span></li>
                    ))}
                  </ul>
                </Card>
              </motion.article>
            )
          })}
        </div>
        <motion.div className="education-studies" {...reveal(0.1)}>
          <h3>Relevant Areas of Study</h3>
          <p>Areas I am studying and exploring</p>
          <ul>
            {studyAreas.map((area, index) => (
              <motion.li key={area} {...reveal(0.15 + index * 0.04, scaleIn)}>
                <Badge>{area}</Badge>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
