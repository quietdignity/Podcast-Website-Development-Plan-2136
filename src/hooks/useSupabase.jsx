import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitForm = async (submitFunction, formData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log('📝 Submitting form with data:', formData)
      const result = await submitFunction(formData)
      
      if (result.success) {
        console.log('✅ Form submitted successfully:', result.data)
        setSuccess(true)
        return result
      } else {
        console.error('❌ Form submission failed:', result.error)
        setError(result.error || 'Submission failed')
        return result
      }
    } catch (err) {
      console.error('❌ Form submission error:', err)
      setError(err.message || 'An error occurred')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return { loading, error, success, submitForm, resetForm }
}

export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
        page_location: window.location.href
      })
    }
  }, [location])
}