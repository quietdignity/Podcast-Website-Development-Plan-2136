import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import supabase from '../lib/supabase'

// Custom hook for form submissions
export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitForm = async (submitFunction, formData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await submitFunction(formData)
      
      if (result.success) {
        setSuccess(true)
        return result
      } else {
        setError(result.error)
        return result
      }
    } catch (err) {
      setError(err.message)
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

// Custom hook for real-time analytics
export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data, error } = await supabase
          .from('episode_analytics_dn2024')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(100)

        if (error) throw error
        setAnalytics(data || [])
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()

    // Set up real-time subscription
    const subscription = supabase
      .channel('analytics')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'episode_analytics_dn2024' },
        (payload) => {
          setAnalytics(prev => [payload.new, ...prev.slice(0, 99)])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { analytics, loading }
}

// Custom hook for connection status
export const useSupabaseConnection = () => {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_submissions_dn2024')
          .select('count')
          .limit(1)

        if (error) throw error
        setConnected(true)
        console.log('✅ Supabase: Connected')
      } catch (error) {
        console.error('❌ Supabase connection error:', error)
        setConnected(false)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  return { connected, loading }
}

// Custom hook for page tracking
export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page changes
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
        page_location: window.location.href
      })
    }
  }, [location])
}