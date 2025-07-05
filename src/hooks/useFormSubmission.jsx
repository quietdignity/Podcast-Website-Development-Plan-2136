import { useState } from 'react'

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitForm = async (submitFunction, formData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const result = await submitFunction(formData)
      
      if (result.success) {
        setSuccess(true)
        return result
      } else {
        setError(result.error || 'Submission failed')
        return result
      }
    } catch (err) {
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