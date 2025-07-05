import supabase from '../lib/supabase'

// Contact form submissions
export const submitContactForm=async (formData)=> {
  try {
    console.log('Submitting contact form:',formData)
    const submissionData={
      name: formData.name,
      email: formData.email,
      subject: formData.subject || '',
      message: formData.message,
      form_type: formData.formType || 'general',
      inquiry_type: formData.inquiryType || null
    }

    const {data,error}=await supabase
      .from('contact_submissions_dn2024')
      .insert([submissionData])
      .select()

    if (error) {
      console.error('Supabase error:',error)
      throw error
    }

    console.log('Contact form submitted successfully:',data)
    return {success: true,data}
  } catch (error) {
    console.error('Error submitting contact form:',error)
    return {success: false,error: error.message}
  }
}

// Speaking inquiries
export const submitSpeakingInquiry=async (formData)=> {
  try {
    const {data,error}=await supabase
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
    return {success: true,data}
  } catch (error) {
    console.error('Error submitting speaking inquiry:',error)
    return {success: false,error: error.message}
  }
}

// Newsletter signup
export const submitNewsletterSignup=async (email,source='website')=> {
  try {
    const {data,error}=await supabase
      .from('newsletter_signups_dn2024')
      .insert([{email,source}])
      .select()

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    console.error('Error submitting newsletter signup:',error)
    return {success: false,error: error.message}
  }
}

// Episode analytics
export const trackEpisodeEvent=async (eventData)=> {
  try {
    const {data,error}=await supabase
      .from('episode_analytics_dn2024')
      .insert([{
        episode_title: eventData.episodeTitle,
        user_session: eventData.userSession,
        action_type: eventData.actionType,
        page_url: window.location.href,
        user_agent: navigator.userAgent
      }])

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    console.error('Error tracking episode event:',error)
    return {success: false,error: error.message}
  }
}

// User feedback
export const submitUserFeedback=async (feedbackData)=> {
  try {
    const {data,error}=await supabase
      .from('user_feedback_dn2024')
      .insert([{
        feedback_type: feedbackData.type,
        rating: feedbackData.rating,
        comment: feedbackData.comment,
        user_email: feedbackData.email
      }])
      .select()

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    console.error('Error submitting feedback:',error)
    return {success: false,error: error.message}
  }
}

// Get recent contact submissions (for admin use)
export const getRecentContacts=async (limit=10)=> {
  try {
    const {data,error}=await supabase
      .from('contact_submissions_dn2024')
      .select('*')
      .order('created_at',{ascending: false})
      .limit(limit)

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    console.error('Error fetching contacts:',error)
    return {success: false,error: error.message}
  }
}

// Get analytics data
export const getAnalytics=async (days=30)=> {
  try {
    const {data,error}=await supabase
      .from('episode_analytics_dn2024')
      .select('*')
      .gte('timestamp',new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp',{ascending: false})

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    console.error('Error fetching analytics:',error)
    return {success: false,error: error.message}
  }
}