// Airtable API service
const AIRTABLE_BASE_ID = 'appXXXXXXXXXXXXXX' // You'll get this from Airtable
const AIRTABLE_API_KEY = 'patXXXXXXXXXXXXXX' // You'll get this from Airtable
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`

const headers = {
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json'
}

// Contact form submissions
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/Contact%20Submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        records: [{
          fields: {
            'Name': formData.name,
            'Email': formData.email,
            'Subject': formData.subject || '',
            'Message': formData.message,
            'Inquiry Type': formData.inquiryType || 'general',
            'Submitted': new Date().toISOString(),
            'Status': 'New'
          }
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit to Airtable')
    }

    const result = await response.json()
    
    // Send email notification (simplified)
    try {
      await sendSimpleEmail({
        to: 'support@thedailynote.net',
        subject: `Contact Form: ${formData.subject || 'New Message'}`,
        message: `
New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || 'No subject'}
Inquiry Type: ${formData.inquiryType || 'General'}

Message:
${formData.message}

Submitted: ${new Date().toLocaleString()}
        `
      })
    } catch (emailError) {
      console.warn('Email notification failed:', emailError)
      // Don't fail the whole submission if email fails
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Airtable submission error:', error)
    return { success: false, error: error.message }
  }
}

// Speaking inquiries
export const submitSpeakingInquiry = async (formData) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/Speaking%20Inquiries`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        records: [{
          fields: {
            'Name': formData.name,
            'Email': formData.email,
            'Phone': formData.phone,
            'Organization': formData.organization || '',
            'Event Type': formData.eventType || '',
            'Message': formData.message,
            'Submitted': new Date().toISOString(),
            'Status': 'New',
            'Priority': 'High'
          }
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit speaking inquiry')
    }

    const result = await response.json()
    
    // Send email notification
    try {
      await sendSimpleEmail({
        to: 'support@thedailynote.net',
        subject: `🎤 Speaking Inquiry: ${formData.organization || formData.name}`,
        message: `
SPEAKING OPPORTUNITY - Priority Response Required

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Organization: ${formData.organization || 'Not specified'}
Event Type: ${formData.eventType || 'Not specified'}

Event Details:
${formData.message}

Submitted: ${new Date().toLocaleString()}
        `
      })
    } catch (emailError) {
      console.warn('Email notification failed:', emailError)
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Speaking inquiry submission error:', error)
    return { success: false, error: error.message }
  }
}

// Newsletter signups
export const submitNewsletterSignup = async (email, source = 'website') => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/Newsletter%20Signups`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        records: [{
          fields: {
            'Email': email,
            'Source': source,
            'Submitted': new Date().toISOString(),
            'Status': 'Active'
          }
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit newsletter signup')
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return { success: false, error: error.message }
  }
}

// User feedback
export const submitUserFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${AIRTABLE_BASE_URL}/User%20Feedback`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        records: [{
          fields: {
            'Rating': feedbackData.rating,
            'Comment': feedbackData.comment || '',
            'Email': feedbackData.email || '',
            'Type': feedbackData.type || 'general',
            'Submitted': new Date().toISOString()
          }
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to submit feedback')
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error('Feedback submission error:', error)
    return { success: false, error: error.message }
  }
}

// Simple email service using EmailJS or similar
const sendSimpleEmail = async (emailData) => {
  // Using EmailJS as a backup email service
  // You can also use Formspree, Netlify Forms, or any other service
  
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'service_xxxxxxx', // EmailJS service ID
        template_id: 'template_xxxxxxx', // EmailJS template ID
        user_id: 'user_xxxxxxxxxx', // EmailJS user ID
        template_params: {
          to_email: emailData.to,
          subject: emailData.subject,
          message: emailData.message,
          from_name: 'The Daily Note Website'
        }
      })
    })

    if (response.ok) {
      console.log('✅ Email sent successfully')
    } else {
      throw new Error('Email service failed')
    }
  } catch (error) {
    console.warn('📧 Email failed, but data was saved:', error.message)
    // Don't throw error - we still want form submission to succeed
  }
}