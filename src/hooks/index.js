import { useState, useEffect, useContext, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import supabase from '../lib/supabase'

// ============================================================================
// AUTH CONTEXT & HOOK
// ============================================================================

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        if (event === 'SIGNED_IN') {
          navigate('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          navigate('/door')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign in error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, metadata = {}) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Sign up error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (newPassword, accessToken) => {
    try {
      setLoading(true)
      setError(null)
      if (accessToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: accessToken
        })
        if (sessionError) throw sessionError
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Update password error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.updateUser({ data: profileData })
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Update profile error:', error)
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ============================================================================
// FORM SUBMISSION HOOK
// ============================================================================

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

// ============================================================================
// SEO & ANALYTICS HOOKS
// ============================================================================

export const useSEO = (pageData) => {
  const location = useLocation()

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageData.title,
        page_location: window.location.href
      })
    }

    // Update document title
    document.title = pageData.title

    // Add structured data
    if (pageData.structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(pageData.structuredData)
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [location, pageData])
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

// ============================================================================
// SUPABASE CONNECTION HOOK
// ============================================================================

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