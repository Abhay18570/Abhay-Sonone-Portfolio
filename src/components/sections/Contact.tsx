import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Users } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { contact } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import './Contact.css'

const socialIcons = { github: SiGithub, linkedin: FaLinkedinIn, instagram: SiInstagram }

export function Contact() {
  const reduceMotion = useReducedMotion()
  const email = contact.email.trim()
  const mailto = email ? `mailto:${email}` : undefined
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : delay },
  })

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="page-container">
        <motion.div className="contact-heading" {...reveal()}>
          <h2 id="contact-title"><GradientText>Get In Touch</GradientText></h2>
          <h3>Let's Talk</h3>
          <p>Interested in collaborating on a project, discussing technology, or connecting about opportunities? Feel free to reach out.</p>
        </motion.div>
        <div className="contact-content">
          <div className="contact-grid">
            <motion.div {...reveal()}>
              <article className="contact-card" aria-labelledby="contact-email-title">
                <div className="contact-icon"><Mail size={28} aria-hidden="true" /></div>
                <h3 id="contact-email-title">Email Me</h3>
                <p>Drop me a message anytime</p>
                {mailto ? <a className="contact-email" href={mailto}>{email}</a> : <p className="contact-email-placeholder">Add your email address</p>}
              </article>
            </motion.div>
            <motion.div {...reveal(0.06)}>
              <article className="contact-card" aria-labelledby="contact-social-title">
                <div className="contact-icon"><Users size={28} aria-hidden="true" /></div>
                <h3 id="contact-social-title">Connect With Me</h3>
                <p>Find me on social platforms</p>
                <ul className="contact-socials">
                  {contact.socials.map(({ platform, label, url }) => {
                    const Icon = socialIcons[platform]
                    return (
                      <li key={platform}>
                        {url.trim() ? (
                          <a href={url.trim()} target="_blank" rel="noopener noreferrer" className="contact-social" aria-label={label}><Icon size={22} aria-hidden="true" /></a>
                        ) : (
                          <span className="contact-social contact-social-unavailable" role="link" aria-disabled="true" aria-label={`${label} — coming soon`} title={`${label} — coming soon`}><Icon size={22} aria-hidden="true" /></span>
                        )}
                      </li>
                    )
                  })}
                </ul>
                {contact.socials.some(({ url }) => !url.trim()) && <p className="contact-note">More profile links coming soon</p>}
              </article>
            </motion.div>
          </div>
          <motion.div className="contact-cta" {...reveal()}>
            <h3>Let's Build Something Together</h3>
            <p>Whether it's a web application, AI/ML project, FinTech idea or technical collaboration, I'm always open to exploring interesting opportunities.</p>
            {mailto ? (
              <a className="contact-message" href={mailto}><Mail size={18} aria-hidden="true" />Send Me a Message</a>
            ) : (
              <>
                <button type="button" className="contact-message" disabled aria-describedby="contact-email-pending"><Mail size={18} aria-hidden="true" />Send Me a Message</button>
                <p id="contact-email-pending" className="contact-cta-note">Email contact coming soon</p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
