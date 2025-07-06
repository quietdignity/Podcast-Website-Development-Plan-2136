import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'

const Door = () => {
  const [mode, setMode] = useState('login')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user) {
      navigate('/admin')
    }
  }, [user, navigate])

  useEffect(() => {
    // Check if this is a password reset URL
    const urlParams = new URLSearchParams(location.hash.split('?')[1])
    const accessToken = urlParams.get('access_token')
    const type = urlParams.get('type')

    if (type === 'recovery' && accessToken) {
      setMode('reset-password')
    }
  }, [location])

  const handleToggleMode = () => setMode(mode === 'login' ? 'signup' : 'login')

  const handleForgotPassword = () => setShowForgotPassword(true)

  const handleBackToLogin = () => {
    setShowForgotPassword(false)
    setMode('login')
  }

  if (user) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cream-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode === 'reset-password' ? (
          <ResetPasswordForm
            accessToken={new URLSearchParams(location.hash.split('?')[1]).get('access_token')}
            onComplete={handleBackToLogin}
          />
        ) : showForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        ) : mode === 'login' ? (
          <LoginForm
            onToggleMode={handleToggleMode}
            onForgotPassword={handleForgotPassword}
          />
        ) : (
          <SignUpForm onToggleMode={handleToggleMode} />
        )}
      </div>
    </div>
  )
}

export default Door