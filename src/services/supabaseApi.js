import supabase from '../lib/supabase'
import { sendEmail, emailTemplates } from './emailService'

// Contact form submissions
export const submitContactForm = async (formData) => {
  try {
    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions_dn2024')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || '',
          message: formData.message,
          inquiry_type: formData.inquiryType || 'general'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Send email notification
    try {
      const emailData = emailTemplates.contactForm(formData)
      await sendEmail({
        from: formData.email,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        type: 'contact'
      })

      // Send auto-reply
      const autoReply = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        type: 'auto-reply'
      })
    } catch (emailError) {
      console.warn('Email sending failed:', emailError)
      // Don't fail the whole submission if email fails
    }

    return { success: true, data }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return { success: false, error: error.message }
  }
}

// Speaking inquiries
export const submitSpeakingInquiry = async (formData) => {
  try {
    // Insert into Supabase
    const { data, error } = await supabase
      .from('speaking_inquiries_dn2024')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization || '',
          event_type: formData.eventType || '',
          message: formData.message,
          priority: 'high'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Send email notification
    try {
      const emailData = emailTemplates.speakingInquiry(formData)
      await sendEmail({
        from: formData.email,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        type: 'speaking'
      })

      // Send auto-reply
      const autoReply = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        type: 'auto-reply'
      })
    } catch (emailError) {
      console.warn('Email sending failed:', emailError)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Speaking inquiry submission error:', error)
    return { success: false, error: error.message }
  }
}

// Newsletter signups
export const submitNewsletterSignup = async (email, source = 'website') => {
  try {
    const { data, error } = await supabase
      .from('newsletter_signups_dn2024')
      .insert([
        {
          email: email,
          source: source
        }
      ])
      .select()

    if (error) {
      console.error('Newsletter signup error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return { success: false, error: error.message }
  }
}

// User feedback
export const submitUserFeedback = async (feedbackData) => {
  try {
    const { data, error } = await supabase
      .from('user_feedback_dn2024')
      .insert([
        {
          rating: feedbackData.rating,
          comment: feedbackData.comment || '',
          email: feedbackData.email || '',
          type: feedbackData.type || 'general'
        }
      ])
      .select()

    if (error) {
      console.error('Feedback submission error:', error)
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Feedback submission error:', error)
    return { success: false, error: error.message }
  }
}