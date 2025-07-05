import supabase from '../lib/supabase'
import { emailTemplates, sendEmail } from './emailService'

export const submitContactForm = async (formData) => {
  try {
    // Store in database
    const { data, error } = await supabase
      .from('contact_submissions_dn2024')
      .insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject || '',
        message: formData.message,
        form_type: formData.formType || 'general',
        inquiry_type: formData.inquiryType || null
      }])
      .select()

    if (error) throw error

    // Send email notification
    try {
      const emailData = emailTemplates.contactForm(formData)
      await sendEmail({
        ...emailData,
        from: formData.email,
        type: 'contact'
      })

      // Send auto-reply to user
      const autoReplyData = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        from: 'support@thedailynote.net',
        ...autoReplyData,
        type: 'auto-reply'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the whole submission if email fails
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const submitSpeakingInquiry = async (formData) => {
  try {
    // Store in database
    const { data, error } = await supabase
      .from('speaking_inquiries_dn2024')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        event_type: formData.eventType,
        message: formData.message
      }])
      .select()

    if (error) throw error

    // Send email notification
    try {
      const emailData = emailTemplates.speakingInquiry(formData)
      await sendEmail({
        ...emailData,
        from: formData.email,
        type: 'speaking'
      })

      // Send auto-reply
      const autoReplyData = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        from: 'support@thedailynote.net',
        ...autoReplyData,
        type: 'auto-reply'
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const submitNewsletterSignup = async (email, source = 'website') => {
  try {
    const { data, error } = await supabase
      .from('newsletter_signups_dn2024')
      .insert([{ email, source }])
      .select()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const submitUserFeedback = async (feedbackData) => {
  try {
    const { data, error } = await supabase
      .from('user_feedback_dn2024')
      .insert([{
        feedback_type: feedbackData.type,
        rating: feedbackData.rating,
        comment: feedbackData.comment,
        user_email: feedbackData.email
      }])
      .select()

    if (error) throw error

    // Send feedback notification email
    try {
      await sendEmail({
        subject: `New Feedback: ${feedbackData.rating}/5 stars`,
        html: `
          <h2>New User Feedback</h2>
          <p><strong>Rating:</strong> ${feedbackData.rating}/5 stars</p>
          <p><strong>Type:</strong> ${feedbackData.type}</p>
          ${feedbackData.email ? `<p><strong>Email:</strong> ${feedbackData.email}</p>` : ''}
          ${feedbackData.comment ? `<p><strong>Comment:</strong> ${feedbackData.comment}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
        type: 'feedback'
      })
    } catch (emailError) {
      console.error('Feedback email failed:', emailError)
    }

    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}