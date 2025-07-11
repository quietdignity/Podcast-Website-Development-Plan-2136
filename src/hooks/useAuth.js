import {useState,useEffect,useContext,createContext} from 'react'
import {useNavigate} from 'react-router-dom'
import supabase from '../lib/supabase'

const AuthContext=createContext()

export const useAuth=()=> {
  const context=useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider=({children})=> {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const navigate=useNavigate()

  useEffect(()=> {
    const getSession=async ()=> {
      try {
        const {data: {session},error}=await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:',error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const {data: {subscription}}=supabase.auth.onAuthStateChange(
      async (event,session)=> {
        setUser(session?.user ?? null)
        setLoading(false)
        if (event==='SIGNED_IN') {
          navigate('/dashboard')
        } else if (event==='SIGNED_OUT') {
          navigate('/door')
        }
      }
    )

    return ()=> subscription.unsubscribe()
  },[navigate])

  const signIn=async (email,password)=> {
    try {
      setLoading(true)
      setError(null)
      const {data,error}=await supabase.auth.signInWithPassword({email,password})
      if (error) throw error
      return {success: true,data}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const signUp=async (email,password,metadata={})=> {
    try {
      setLoading(true)
      setError(null)
      const {data,error}=await supabase.auth.signUp({
        email,
        password,
        options: {data: metadata}
      })
      if (error) throw error
      return {success: true,data}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const signOut=async ()=> {
    try {
      setLoading(true)
      setError(null)
      const {error}=await supabase.auth.signOut()
      if (error) throw error
      return {success: true}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const resetPassword=async (email)=> {
    try {
      setLoading(true)
      setError(null)
      const {error}=await supabase.auth.resetPasswordForEmail(email,{
        redirectTo: `${window.location.origin}/#/reset-password`
      })
      if (error) throw error
      return {success: true}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const updatePassword=async (newPassword,accessToken)=> {
    try {
      setLoading(true)
      setError(null)
      if (accessToken) {
        const {error: sessionError}=await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: accessToken
        })
        if (sessionError) throw sessionError
      }
      const {error}=await supabase.auth.updateUser({password: newPassword})
      if (error) throw error
      return {success: true}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const updateProfile=async (profileData)=> {
    try {
      setLoading(true)
      setError(null)
      const {error}=await supabase.auth.updateUser({data: profileData})
      if (error) throw error
      return {success: true}
    } catch (error) {
      setError(error.message)
      return {success: false,error: error.message}
    } finally {
      setLoading(false)
    }
  }

  const value={
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

  return React.createElement(AuthContext.Provider,{value},children)
}