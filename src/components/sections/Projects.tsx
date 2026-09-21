import { RotatingIcon } from '../ui/RotatingIcon'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioMotion } from '../../motion/presets'
import { Code2, ExternalLink, Image } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { projects } from '../../data/portfolio'
import type { Project } from '../../data/portfolio'
import { GradientText } from '../ui/GradientText'
import './Projects.css'

function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = Boolean(project.image) && !imageFailed
  const PreviewIcon = project.placeholder ? Code2 : Image

  return (
    <article className="project-card" aria-labelledby={`project-${project.id}`}>
      <div className="project-preview">
        {hasImage ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} landing page`}
            loading="lazy"
            decoding="async"
            width={800}
            height={474}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="project-preview-placeholder">
            <RotatingIcon><PreviewIcon size={38} strokeWidth={1.5} aria-hidden="true" /></RotatingIcon>
            <span>{project.placeholder ? 'Project preview coming soon' : `Add ${project.title} Preview`}</span>
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-meta-header">
          {project.featured && <span className="project-featured">Featured</span>}
          {project.category && <p className="project-category">{project.category}</p>}
        </div>
        <h3 id={`project-${project.id}`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="project-technologies" aria-label="Project technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        {(project.liveUrl || project.github) && (
          <div className="project-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-live-btn"
                aria-label={`${project.title} live demo (opens in a new tab)`}
              >
                <span>Live Demo</span>
                <RotatingIcon area="a" duration={0.55}>
                  <ExternalLink size={16} aria-hidden="true" />
                </RotatingIcon>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github-btn"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
              >
                <RotatingIcon area="a" duration={0.55}>
                  <SiGithub size={16} aria-hidden="true" />
                </RotatingIcon>
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  const { reveal } = usePortfolioMotion()
  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="page-container">
        <div className="projects-heading">
          <motion.h2 {...reveal()} id="projects-title"><GradientText>Projects</GradientText></motion.h2>
          <motion.p {...reveal(0.1)}>Selected projects where I turn ideas into practical technology solutions.</motion.p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div key={project.id} {...reveal((index % 3) * 0.1)}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
