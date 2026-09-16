import { RotatingIcon } from '../ui/RotatingIcon'
import { motion } from 'framer-motion'
import { usePortfolioMotion, slideInLeft, slideInRight, scaleIn, popIn } from '../../motion/presets'
import { Mail, Users } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { contact } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import './Contact.css'

const socialIcons = { github: SiGithub, linkedin: FaLinkedinIn, instagram: SiInstagram }

export function Contact() {
  const { reveal } = usePortfolioMotion()
  const email = contact.email.trim()
  const mailto = email ? `mailto:${email}` : undefined

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="page-container">
        <div className="contact-heading">
          <motion.h2 {...reveal()} id="contact-title"><GradientText>Get In Touch</GradientText></motion.h2>
          <motion.h3 {...reveal(0.06)}>Let's Talk</motion.h3>
          <motion.p {...reveal(0.1)}>Interested in collaborating on a project, discussing technology, or connecting about opportunities? Feel free to reach out.</motion.p>
        </div>
        <div className="contact-content">
          <div className="contact-grid">
            <motion.div {...reveal(0, slideInLeft)}>
              <article className="contact-card" aria-labelledby="contact-email-title">
                <div className="contact-icon"><RotatingIcon area=".contact-icon"><Mail size={28} aria-hidden="true" /></RotatingIcon></div>
                <h3 id="contact-email-title">Email Me</h3>
                <p>Drop me a message anytime</p>
                {mailto ? <a className="contact-email" href={mailto}>{email}</a> : <p className="contact-email-placeholder">Add your email address</p>}
              </article>
            </motion.div>
            <motion.div {...reveal(0.08, slideInRight)}>
              <article className="contact-card" aria-labelledby="contact-social-title">
                <div className="contact-icon"><RotatingIcon area=".contact-icon"><Users size={28} aria-hidden="true" /></RotatingIcon></div>
                <h3 id="contact-social-title">Connect With Me</h3>
                <p>Find me on social platforms</p>
                <ul className="contact-socials">
                  {contact.socials.map(({ platform, label, url }, index) => {
                    const Icon = socialIcons[platform]
                    return (
                      <motion.li key={platform} {...reveal(0.12 + index * 0.05, popIn)}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-social"
                          aria-label={label}
                        >
                          <RotatingIcon duration={0.55} area=".contact-social"><Icon size={22} aria-hidden="true" /></RotatingIcon>
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </article>
            </motion.div>
          </div>
          <motion.div className="contact-cta" {...reveal(0.12, scaleIn)}>
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
