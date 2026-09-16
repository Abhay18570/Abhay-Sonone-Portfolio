import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioMotion, fadeIn } from '../../motion/presets'
import { ExternalLink, Quote } from 'lucide-react'
import { testimonials } from '../../data/portfolio'
import type { Testimonial } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import { TestimonialForm } from './TestimonialForm'
import './Testimonials.css'

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { reveal } = usePortfolioMotion()
  const [imageFailed, setImageFailed] = useState(false)
  const initials = testimonial.name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join('')
  return (
    <motion.article {...reveal((index % 3) * 0.1, fadeIn)} className="testimonial-card" aria-labelledby={`testimonial-${testimonial.id}`}>
      <Quote className="testimonial-quote" size={28} aria-hidden="true" />
      <motion.blockquote {...reveal((index % 3) * 0.1)}><p>{testimonial.quote}</p></motion.blockquote>
      <div className="testimonial-person">
        {testimonial.image && !imageFailed ? (
          <img className="testimonial-avatar" src={testimonial.image} alt="" width={48} height={48} loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        ) : <span className="testimonial-avatar testimonial-initials" aria-hidden="true">{initials}</span>}
        <div>
          <h3 id={`testimonial-${testimonial.id}`}>{testimonial.name}</h3>
          <p>{testimonial.role}</p>
          {testimonial.organization && <p>{testimonial.organization}</p>}
        </div>
      </div>
      {testimonial.linkedin && (
        <a className="testimonial-link" href={testimonial.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${testimonial.name} on LinkedIn (opens in a new tab)`}>
          LinkedIn <ExternalLink size={16} aria-hidden="true" />
        </a>
      )}
    </motion.article>
  )
}

export function Testimonials() {
  const { reveal } = usePortfolioMotion()

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-title">
      <div className="page-container">
        <div className="testimonials-heading">
          <motion.h2 {...reveal()} id="testimonials-title"><GradientText>Testimonials</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>Feedback from people I've collaborated and built with.</motion.p>
        </div>
        {testimonials.length === 0 ? (
          <motion.div className="testimonials-empty" {...reveal()}>
            <div className="testimonials-empty-icon"><Quote size={32} strokeWidth={1.5} aria-hidden="true" /></div>
            <h3>Testimonials Coming Soon</h3>
            <p>Recommendations and feedback from project collaborators, mentors and teammates will be added here.</p>
          </motion.div>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => <TestimonialCard index={index} key={testimonial.id} testimonial={testimonial} />)}
          </div>
        )}
        <TestimonialForm />
      </div>
    </section>
  )
}
