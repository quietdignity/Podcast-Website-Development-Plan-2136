import supabase from '../lib/supabase'

export const submitContactForm=async (formData)=> {
  try {
    const {data,error}=await supabase
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
    return {success: true,data}
  } catch (error) {
    return {success: false,error: error.message}
  }
}

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
    return {success: false,error: error.message}
  }
}

export const submitNewsletterSignup=async (email,source='website')=> {
  try {
    const {data,error}=await supabase
      .from('newsletter_signups_dn2024')
      .insert([{email,source}])
      .select()

    if (error) throw error
    return {success: true,data}
  } catch (error) {
    return {success: false,error: error.message}
  }
}

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
    return {success: false,error: error.message}
  }
}