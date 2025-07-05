import supabase from '../lib/supabase'
import { sendEmail, emailTemplates } from './emailService'

// Contact form submissions
export const submitContactForm = async (formData) => {
  try {
    console.log('📝 Submitting contact form:', formData)

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions_daily_note_2024')
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
      console.error('❌ Supabase error:', error)
      throw error
    }

    console.log('✅ Contact form saved to database:', data)

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

      // Send auto-reply to user
      const autoReply = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        type: 'auto-reply'
      })

      console.log('✅ Contact form emails sent successfully')
    } catch (emailError) {
      console.warn('⚠️ Email sending failed:', emailError)
      // Don't fail the whole submission if email fails
    }

    return { success: true, data }

  } catch (error) {
    console.error('❌ Contact form submission error:', error)
    return { success: false, error: error.message }
  }
}

// Speaking inquiries
export const submitSpeakingInquiry = async (formData) => {
  try {
    console.log('🎤 Submitting speaking inquiry:', formData)

    // Insert into Supabase
    const { data, error } = await supabase
      .from('speaking_inquiries_daily_note_2024')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization || '',
          event_type: formData.eventType || '',
          event_details: formData.eventDetails,
          priority: 'high'
        }
      ])
      .select()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw error
    }

    console.log('✅ Speaking inquiry saved to database:', data)

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

      // Send auto-reply to user
      const autoReply = emailTemplates.autoReply(formData)
      await sendEmail({
        to: formData.email,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
        type: 'auto-reply'
      })

      console.log('✅ Speaking inquiry emails sent successfully')
    } catch (emailError) {
      console.warn('⚠️ Email sending failed:', emailError)
      // Don't fail the whole submission if email fails
    }

    return { success: true, data }

  } catch (error) {
    console.error('❌ Speaking inquiry submission error:', error)
    return { success: false, error: error.message }
  }
}

// Newsletter signups
export const submitNewsletterSignup = async (email, source = 'website') => {
  try {
    console.log('📧 Submitting newsletter signup:', { email, source })

    const { data, error } = await supabase
      .from('newsletter_signups_daily_note_2024')
      .insert([
        {
          email: email,
          source: source
        }
      ])
      .select()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw error
    }

    console.log('✅ Newsletter signup submitted successfully:', data)
    return { success: true, data }

  } catch (error) {
    console.error('❌ Newsletter signup error:', error)
    return { success: false, error: error.message }
  }
}

// User feedback
export const submitUserFeedback = async (feedbackData) => {
  try {
    console.log('💬 Submitting user feedback:', feedbackData)

    const { data, error } = await supabase
      .from('user_feedback_daily_note_2024')
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
      console.error('❌ Supabase error:', error)
      throw error
    }

    console.log('✅ User feedback submitted successfully:', data)
    return { success: true, data }

  } catch (error) {
    console.error('❌ User feedback submission error:', error)
    return { success: false, error: error.message }
  }
}