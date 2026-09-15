import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Check, GraduationCap, School } from 'lucide-react'
import { education, studyAreas } from '../../data/portfolio'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import './Education.css'

const educationIcons = { degree: GraduationCap, diploma: BookOpen, school: School }

export function Education() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="education" className="education" aria-labelledby="education-title">
      <div className="page-container">
        <div className="education-heading">
          <h2 id="education-title"><GradientText>Education</GradientText></h2>
          <p>My academic journey in Computer Engineering and technology.</p>
        </div>
        <div className="education-grid">
          {education.map((entry, index) => {
            const Icon = educationIcons[entry.icon]
            return (
              <motion.article
                key={entry.id}
                aria-labelledby={`education-${entry.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.07 }}
              >
                <Card hoverable className={`education-card ${entry.current ? 'education-card-current' : ''}`}>
                  <div className="education-card-top">
                    <Icon size={40} strokeWidth={1.5} className={`education-icon education-icon-${entry.icon}`} aria-hidden="true" />
                    {entry.current && <span className="education-current"><span aria-hidden="true" />Currently Studying</span>}
                  </div>
                  <h3 id={`education-${entry.id}`}>{entry.degree}</h3>
                  <p className="education-institution">{entry.institution}</p>
                  <span className="education-period">{entry.period}</span>
                  {entry.detailsPending && <p className="education-pending">School name and year to be added.</p>}
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
        <div className="education-studies">
          <h3>Relevant Areas of Study</h3>
          <p>Areas I am studying and exploring</p>
          <ul>{studyAreas.map((area) => <li key={area}><Badge>{area}</Badge></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
