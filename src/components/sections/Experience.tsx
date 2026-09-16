import { RotatingIcon } from '../ui/RotatingIcon'
import { useSyncExternalStore } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePortfolioMotion, motionTiming, scaleIn } from '../../motion/presets'
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

const tabletQuery = '(max-width: 1199px)'
function subscribeTablet(notify: () => void) {
  const media = window.matchMedia(tabletQuery)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const getTablet = () => window.matchMedia(tabletQuery).matches
const serverTablet = () => true

const experienceReveal: Variants = {
  hidden: (distance: number) => ({ opacity: 0, x: distance, scale: 0.98 }),
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.8, ease: motionTiming.ease },
  },
}

export function Experience() {
  const { reveal, compact, reduced } = usePortfolioMotion()
  const tablet = useSyncExternalStore(subscribeTablet, getTablet, serverTablet)
  const distance = compact ? 30 : tablet ? 50 : 80

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
                {...reveal(0, experienceReveal)}
                custom={index % 2 === 0 ? distance : -distance}
                transition={{ duration: reduced ? 0 : 0.8, ease: motionTiming.ease }}
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
                        <RotatingIcon area=".experience-icon-wrapper"><Icon size={26} strokeWidth={1.5} className="experience-icon" /></RotatingIcon>
                      </div>
                    </div>

                    <p className="experience-description">{entry.description}</p>

                    <ul className="experience-highlights">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>
                          <Check size={18} aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="experience-tags" aria-label="Skills and technologies">
                      {entry.tags.map((tag) => (
                        <li key={tag} className="experience-tag">
                          {tag}
                        </li>
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

