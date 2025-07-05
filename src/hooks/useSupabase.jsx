import {useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import supabase from '../lib/supabase'

export const useFormSubmission=()=> {
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const [success,setSuccess]=useState(false)

  const submitForm=async (submitFunction,formData)=> {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result=await submitFunction(formData)
      if (result.success) {
        setSuccess(true)
        return result
      } else {
        setError(result.error)
        return result
      }
    } catch (err) {
      setError(err.message)
      return {success: false,error: err.message}
    } finally {
      setLoading(false)
    }
  }

  const resetForm=()=> {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {loading,error,success,submitForm,resetForm}
}

export const usePageTracking=()=> {
  const location=useLocation()

  useEffect(()=> {
    if (typeof window !=='undefined' && window.gtag) {
      window.gtag('config','GA_MEASUREMENT_ID',{
        page_path: location.pathname,
        page_location: window.location.href
      })
    }
  },[location])
}