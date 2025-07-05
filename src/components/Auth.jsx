import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {Navigate,useNavigate,useLocation} from 'react-router-dom'
import {useAuth} from '../hooks'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiMail,FiLock,FiUser,FiEye,FiEyeOff,FiLoader,FiCheck,FiArrowLeft,FiLogOut,FiEdit2,FiSave,FiX}=FiIcons

export const LoginForm=({onToggleMode,onForgotPassword})=> {
  const [formData,setFormData]=useState({email: '',password: ''})
  const [showPassword,setShowPassword]=useState(false)
  const {signIn,loading,error}=useAuth()

  const handleSubmit=async (e)=> {
    e.preventDefault()
    await signIn(formData.email,formData.password)
  }

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  return (
    <motion.div
      initial={{opacity: 0,y: 20}}
      animate={{opacity: 1,y: 0}}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={()=> setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-accent-600 hover:text-accent-700 text-sm underline"
            >
              Forgot your password?
            </button>
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-accent-600 hover:text-accent-700 underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export const SignUpForm=({onToggleMode})=> {
  const [formData,setFormData]=useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [showPassword,setShowPassword]=useState(false)
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const {signUp,loading,error}=useAuth()

  const handleSubmit=async (e)=> {
    e.preventDefault()
    if (formData.password !==formData.confirmPassword) return
    await signUp(formData.email,formData.password,{
      firstName: formData.firstName,
      lastName: formData.lastName
    })
  }

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const passwordsMatch=formData.password===formData.confirmPassword

  return (
    <motion.div
      initial={{opacity: 0,y: 20}}
      animate={{opacity: 1,y: 0}}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join The Daily Note community</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <SafeIcon icon={FiUser} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  placeholder="First name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                minLength={6}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={()=> setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50 ${
                  formData.confirmPassword && !passwordsMatch
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showConfirmPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !passwordsMatch}
            className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-accent-600 hover:text-accent-700 underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export const ProtectedRoute=({children})=> {
  const {user,loading}=useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/door" replace />
  }

  return children
}

export const Door=()=> {
  const [mode,setMode]=useState('login')
  const {user}=useAuth()
  const navigate=useNavigate()
  const location=useLocation()

  useEffect(()=> {
    const hashParams=new URLSearchParams(location.hash.substring(1))
    const type=hashParams.get('type')
    if (type==='recovery') {
      setMode('reset')
    }
  },[location])

  useEffect(()=> {
    if (user) {
      navigate('/dashboard')
    }
  },[user,navigate])

  const handleToggleMode=()=> setMode(mode==='login' ? 'signup' : 'login')
  const handleForgotPassword=()=> setMode('forgot')
  const handleBackToLogin=()=> setMode('login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cream-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode==='login' && (
          <LoginForm
            onToggleMode={handleToggleMode}
            onForgotPassword={handleForgotPassword}
          />
        )}
        {mode==='signup' && <SignUpForm onToggleMode={handleToggleMode} />}
      </div>
    </div>
  )
}