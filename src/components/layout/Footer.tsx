import { RotatingIcon } from '../ui/RotatingIcon'
import { motion } from 'framer-motion'
import { usePortfolioMotion } from '../../motion/presets'
import { ArrowUp } from 'lucide-react'
import { SiGithub, SiInstagram } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { contact, portfolio } from '../../data/portfolio'
import './Footer.css'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
]
const socialIcons = { github: SiGithub, linkedin: FaLinkedinIn, instagram: SiInstagram }

export function Footer() {
  const { reveal } = usePortfolioMotion()
  return (
    <footer className="footer">
      <motion.div className="page-container" {...reveal()}>
        <div className="footer-main">
          <a className="footer-brand" href="#home">
            <RotatingIcon pulse={1.05}><span className="footer-initials" aria-hidden="true">{portfolio.initials}</span></RotatingIcon>
            <span>{portfolio.name.toUpperCase()}</span>
          </a>
          <nav aria-label="Footer navigation">
            <ul className="footer-links">
              {footerLinks.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}
            </ul>
          </nav>
          <ul className="footer-socials" aria-label="Social profiles">
            {contact.socials.map(({ platform, label, url }) => {
              const Icon = socialIcons[platform]
              return (
                <li key={platform}>
                  <a
                    className="footer-social"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <RotatingIcon duration={0.55} area=".footer-social"><Icon size={19} aria-hidden="true" /></RotatingIcon>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          <a className="footer-top" href="#top" aria-label="Back to top"><ArrowUp size={19} aria-hidden="true" /></a>
        </div>
      </motion.div>
    </footer>
  )
}
