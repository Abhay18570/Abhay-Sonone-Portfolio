export type TestimonialSubmission = {
  name: string
  role: string
  feedback: string
}

export type SubmitTestimonial = (submission: TestimonialSubmission) => Promise<void>

// Replace this adapter with a real API request. Resolve only after persistence
// confirms receipt for review; public testimonials remain separately curated.
export const submitTestimonial: SubmitTestimonial = async () => {
  throw new Error('Testimonial submissions are not available yet. Your feedback has not been sent or saved. Please try again later.')
}
