import { useState, useEffect, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabase'

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
        console.log('🔄 Getting session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
        console.log('✅ Session loaded:', session?.user?.email || 'No user')
      } catch (error) {
        console.error('❌ Error getting session:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email || 'No user')
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in, navigating to /admin')
          navigate('/admin')
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out, navigating to /door')
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
      console.log('🔄 Attempting sign in for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      console.log('✅ Sign in successful:', data.user?.email)
      return { success: true, data }
    } catch (error) {
      console.error('❌ Sign in error:', error)
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
      console.log('🔄 Attempting sign up for:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      
      if (error) throw error
      
      console.log('✅ Sign up successful:', data.user?.email)
      
      // If email confirmation is disabled, the user will be signed in immediately
      if (data.user && !data.user.email_confirmed_at) {
        console.log('ℹ️ Account created but email not confirmed')
      }
      
      return { success: true, data }
    } catch (error) {
      console.error('❌ Sign up error:', error)
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
      console.log('🔄 Signing out...')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      console.log('✅ Sign out successful')
      return { success: true }
    } catch (error) {
      console.error('❌ Sign out error:', error)
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
        redirectTo: `${window.location.origin}/#/reset-password`
      })
      
      if (error) throw error
      
      return { success: true }
    } catch (error) {
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
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      
      if (error) throw error
      
      return { success: true }
    } catch (error) {
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
      
      const { error } = await supabase.auth.updateUser({
        data: profileData
      })
      
      if (error) throw error
      
      return { success: true }
    } catch (error) {
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