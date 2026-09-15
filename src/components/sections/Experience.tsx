import { motion, useReducedMotion } from 'framer-motion'
import { Check, Code2, Lightbulb, Users } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { Card } from '../ui/Card'
import { GradientText } from '../ui/GradientText'
import './Experience.css'

const experienceIcons = { code: Code2, idea: Lightbulb, team: Users }

export function Experience() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="page-container">
        <div className="experience-heading">
          <h2 id="experience-title"><GradientText>Experience</GradientText></h2>
          <p>Experience gained through projects, technical activities and collaborative development.</p>
        </div>
        <div className="experience-timeline">
          {experience.map((entry, index) => {
            const Icon = experienceIcons[entry.icon]
            return (
              <div className="experience-entry" key={entry.id}>
                <motion.span
                  className="experience-marker"
                  aria-hidden="true"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
                <motion.article
                  aria-labelledby={`experience-${entry.id}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
                >
                  <Card hoverable className="experience-card">
                    <div className="experience-card-header">
                      <div>
                        <p className="experience-category">{entry.category}</p>
                        <h3 id={`experience-${entry.id}`}>{entry.title}</h3>
                        <p className="experience-context">{entry.context}</p>
                      </div>
                      <Icon className="experience-icon" size={32} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <p className="experience-description">{entry.description}</p>
                    <ul className="experience-highlights">
                      {entry.highlights.map((highlight) => <li key={highlight}><Check size={18} aria-hidden="true" /><span>{highlight}</span></li>)}
                    </ul>
                    <ul className="experience-tags" aria-label="Technologies and skills">
                      {entry.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </Card>
                </motion.article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
