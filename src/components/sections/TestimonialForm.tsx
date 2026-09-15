import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '../ui/Button'
import { submitTestimonial } from '../../services/testimonialSubmission'
import type { SubmitTestimonial, TestimonialSubmission } from '../../services/testimonialSubmission'
import './TestimonialForm.css'

type FieldErrors = Partial<Record<'name' | 'feedback', string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

export function TestimonialForm({ submit = submitTestimonial }: { submit?: SubmitTestimonial }) {
  const [values, setValues] = useState<TestimonialSubmission>({ name: '', role: '', feedback: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const submitting = useRef(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const feedbackRef = useRef<HTMLTextAreaElement>(null)

  function update(field: keyof TestimonialSubmission, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus('idle')
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const payload = { name: values.name.trim(), role: values.role.trim(), feedback: values.feedback.trim() }
    const nextErrors: FieldErrors = {}
    if (payload.name.length < 2) nextErrors.name = 'Please enter at least 2 characters for your name.'
    if (payload.feedback.length < 10 || payload.feedback.length > 500) nextErrors.feedback = 'Please enter feedback between 10 and 500 characters.'
    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length) {
      setStatus('idle')
      if (nextErrors.name) nameRef.current?.focus()
      else feedbackRef.current?.focus()
      return
    }
    submitting.current = true
    setStatus('submitting')
    try {
      await submit(payload)
      setStatus('success')
      setMessage('Thank you! Your testimonial has been submitted for review.')
      setValues({ name: '', role: '', feedback: '' })
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Your testimonial could not be submitted. Please try again later.')
    } finally {
      submitting.current = false
    }
  }

  return (
    <form className="testimonial-form" aria-labelledby="testimonial-form-title" onSubmit={handleSubmit} noValidate aria-busy={status === 'submitting'}>
      <div className="testimonial-form-heading">
        <h3 id="testimonial-form-title">Share Your Experience</h3>
        <p>Worked with me on a project, hackathon or technical collaboration? I'd love to hear your feedback.</p>
      </div>
      <p className="testimonial-form-notice">Submissions are not available yet. Feedback will require review before publication.</p>
      <fieldset disabled={status === 'submitting'}>
        <div className="testimonial-form-field">
          <label htmlFor="testimonial-name">Your Name</label>
          <input ref={nameRef} id="testimonial-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" required minLength={2} value={values.name} onChange={(event) => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'testimonial-name-error' : undefined} />
          {errors.name && <p id="testimonial-name-error" className="testimonial-form-error">{errors.name}</p>}
        </div>
        <div className="testimonial-form-field">
          <label htmlFor="testimonial-role">Your Role / Organization <span>(optional)</span></label>
          <input id="testimonial-role" name="role" type="text" placeholder="e.g. Teammate, Mentor, Project Collaborator" value={values.role} onChange={(event) => update('role', event.target.value)} />
        </div>
        <div className="testimonial-form-field">
          <label htmlFor="testimonial-feedback">Your Feedback</label>
          <textarea ref={feedbackRef} id="testimonial-feedback" name="feedback" rows={5} placeholder="Share your experience working with me..." required minLength={10} maxLength={500} value={values.feedback} onChange={(event) => update('feedback', event.target.value)} aria-invalid={Boolean(errors.feedback)} aria-describedby={`testimonial-feedback-count${errors.feedback ? ' testimonial-feedback-error' : ''}`} />
          <p id="testimonial-feedback-count" className="testimonial-form-count">{values.feedback.length} / 500</p>
          {errors.feedback && <p id="testimonial-feedback-error" className="testimonial-form-error">{errors.feedback}</p>}
        </div>
        <Button type="submit" className="testimonial-form-submit" disabled={status === 'submitting'}><Send size={18} aria-hidden="true" />{status === 'submitting' ? 'Submitting…' : 'Submit Testimonial'}</Button>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {message && <p className={status === 'success' ? 'testimonial-form-success' : 'testimonial-form-error'}>{message}</p>}
      </div>
    </form>
  )
}
