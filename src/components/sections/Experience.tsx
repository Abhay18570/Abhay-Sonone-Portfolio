import { motion } from 'framer-motion'
import { usePortfolioMotion, scaleIn, fadeInUp } from '../../motion/presets'
import { Building2, Calendar, Check, Code2, Globe, Laptop, MapPin, Smartphone, Users } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { Card } from '../ui/Card'
import { GradientText } from '../ui/GradientText'
import './Experience.css'

const roleIcons = {
  code: Code2,
  web: Globe,
  partner: Users,
  mobile: Smartphone,
}

export function Experience() {
  const { reveal } = usePortfolioMotion()

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="page-container">
        <div className="experience-heading">
          <motion.h2 {...reveal()} id="experience-title"><GradientText>Experience</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>Experience gained through projects, technical activities and collaborative development.</motion.p>
        </div>
        <div className="experience-timeline">
          {experience.map((entry, index) => {
            const Icon = roleIcons[entry.icon]
            return (
              <motion.div
                className="experience-entry"
                key={entry.id}
                {...reveal(index * 0.1)}
                onViewportEnter={(el) => el?.target.setAttribute('data-entered', 'true')}
              >
                <motion.span
                  className="experience-marker"
                  aria-hidden="true"
                  {...reveal(0, scaleIn)}
                />
                <article aria-labelledby={`experience-${entry.id}`}>
                  <Card hoverable className={`experience-card ${entry.current ? 'experience-card-current' : ''}`}>
                    <div className="experience-card-header">
                      <div className="experience-header-main">
                        <div className="experience-badge-row">
                          <span className="experience-type-badge">{entry.type}</span>
                          {entry.current && (
                            <span className="experience-current">
                              <span className="experience-current-dot" aria-hidden="true" />
                              Currently Working
                            </span>
                          )}
                        </div>
                        <h3 id={`experience-${entry.id}`} className="experience-role">{entry.role}</h3>
                        <p className="experience-company">{entry.company}</p>
                        <div className="experience-meta" aria-label="Experience metadata">
                          <span className="experience-meta-item">
                            <Calendar size={15} aria-hidden="true" />
                            <span>{entry.period}{entry.durationLabel ? ` · ${entry.durationLabel}` : ''}</span>
                          </span>
                          {entry.location && (
                            <span className="experience-meta-item">
                              <MapPin size={15} aria-hidden="true" />
                              <span>{entry.location}</span>
                            </span>
                          )}
                          {entry.workMode && (
                            <span className="experience-meta-item">
                              {entry.workMode === 'Remote' ? (
                                <Laptop size={15} aria-hidden="true" />
                              ) : (
                                <Building2 size={15} aria-hidden="true" />
                              )}
                              <span>{entry.workMode}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="experience-icon-wrapper" aria-hidden="true">
                        <Icon size={26} strokeWidth={1.5} className="experience-icon" />
                      </div>
                    </div>

                    <p className="experience-description">{entry.description}</p>

                    <ul className="experience-highlights">
                      {entry.highlights.map((highlight, hIndex) => (
                        <motion.li key={highlight} {...reveal(hIndex * 0.04, fadeInUp)}>
                          <Check size={18} aria-hidden="true" />
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <ul className="experience-tags" aria-label="Skills and technologies">
                      {entry.tags.map((tag, tIndex) => (
                        <motion.li key={tag} className="experience-tag" {...reveal(0.08 + tIndex * 0.03, scaleIn)}>
                          {tag}
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </article>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

