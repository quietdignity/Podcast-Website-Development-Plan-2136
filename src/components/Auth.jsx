import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {Navigate,useNavigate,useLocation} from 'react-router-dom'
import {useAuth} from '../hooks'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiMail,FiLock,FiUser,FiEye,FiEyeOff,FiLoader,FiLogOut,FiEdit2,FiSave,FiX}=FiIcons

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

  return React.createElement(motion.div,{
    initial: {opacity: 0,y: 20},
    animate: {opacity: 1,y: 0},
    className: "w-full max-w-md mx-auto"
  },
    React.createElement('div',{className: "bg-white rounded-lg shadow-lg p-8"},
      React.createElement('div',{className: "text-center mb-8"},
        React.createElement('h2',{className: "text-3xl font-bold text-primary-800 mb-2"},"Welcome Back"),
        React.createElement('p',{className: "text-gray-600"},"Sign in to your account")
      ),
      React.createElement('form',{onSubmit: handleSubmit,className: "space-y-6"},
        React.createElement('div',null,
          React.createElement('label',{htmlFor: "email",className: "block text-sm font-medium text-gray-700 mb-2"},"Email Address"),
          React.createElement('div',{className: "relative"},
            React.createElement(SafeIcon,{icon: FiMail,className: "absolute left-3 top-3 w-5 h-5 text-gray-400"}),
            React.createElement('input',{
              type: "email",
              id: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              required: true,
              disabled: loading,
              className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50",
              placeholder: "Enter your email"
            })
          )
        ),
        React.createElement('div',null,
          React.createElement('label',{htmlFor: "password",className: "block text-sm font-medium text-gray-700 mb-2"},"Password"),
          React.createElement('div',{className: "relative"},
            React.createElement(SafeIcon,{icon: FiLock,className: "absolute left-3 top-3 w-5 h-5 text-gray-400"}),
            React.createElement('input',{
              type: showPassword ? 'text' : 'password',
              id: "password",
              name: "password",
              value: formData.password,
              onChange: handleChange,
              required: true,
              disabled: loading,
              className: "w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50",
              placeholder: "Enter your password"
            }),
            React.createElement('button',{
              type: "button",
              onClick: ()=> setShowPassword(!showPassword),
              className: "absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            },
              React.createElement(SafeIcon,{icon: showPassword ? FiEyeOff : FiEye,className: "w-5 h-5"})
            )
          )
        ),
        error && React.createElement('div',{className: "bg-red-50 border border-red-200 rounded-lg p-3"},
          React.createElement('p',{className: "text-red-800 text-sm"},error)
        ),
        React.createElement('button',{
          type: "submit",
          disabled: loading,
          className: "w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        },
          loading ? React.createElement(React.Fragment,null,
            React.createElement(SafeIcon,{icon: FiLoader,className: "w-5 h-5 animate-spin"}),
            React.createElement('span',null,"Signing in...")
          ) : React.createElement('span',null,"Sign In")
        )
      )
    )
  )
}

export const SignUpForm=({onToggleMode})=> {
  const [formData,setFormData]=useState({
    email: '',password: '',confirmPassword: '',firstName: '',lastName: ''
  })
  const [showPassword,setShowPassword]=useState(false)
  const {signUp,loading,error}=useAuth()

  const handleSubmit=async (e)=> {
    e.preventDefault()
    if (formData.password !==formData.confirmPassword) return
    await signUp(formData.email,formData.password,{
      firstName: formData.firstName,lastName: formData.lastName
    })
  }

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  return React.createElement('div',{className: "w-full max-w-md mx-auto"},
    React.createElement('div',{className: "bg-white rounded-lg shadow-lg p-8"},
      React.createElement('div',{className: "text-center mb-8"},
        React.createElement('h2',{className: "text-3xl font-bold text-primary-800 mb-2"},"Create Account")
      )
    )
  )
}

export const UserProfile=()=> {
  const {user,signOut,updateProfile,loading}=useAuth()
  const [isEditing,setIsEditing]=useState(false)
  const [formData,setFormData]=useState({
    firstName: user?.user_metadata?.firstName || '',
    lastName: user?.user_metadata?.lastName || ''
  })

  const handleSubmit=async (e)=> {
    e.preventDefault()
    const result=await updateProfile(formData)
    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  return React.createElement(motion.div,{
    initial: {opacity: 0,y: 20},
    animate: {opacity: 1,y: 0},
    className: "w-full max-w-md mx-auto"
  },
    React.createElement('div',{className: "bg-white rounded-lg shadow-lg p-8"},
      React.createElement('div',{className: "text-center mb-8"},
        React.createElement('div',{className: "bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"},
          React.createElement(SafeIcon,{icon: FiUser,className: "w-8 h-8 text-primary-600"})
        ),
        React.createElement('h2',{className: "text-2xl font-bold text-primary-800 mb-2"},"Profile"),
        React.createElement('p',{className: "text-gray-600"},"Manage your account information")
      ),
      isEditing ? React.createElement('form',{onSubmit: handleSubmit,className: "space-y-6"},
        React.createElement('div',{className: "grid grid-cols-2 gap-4"},
          React.createElement('div',null,
            React.createElement('label',{htmlFor: "firstName",className: "block text-sm font-medium text-gray-700 mb-2"},"First Name"),
            React.createElement('input',{
              type: "text",
              id: "firstName",
              name: "firstName",
              value: formData.firstName,
              onChange: handleChange,
              required: true,
              disabled: loading,
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
            })
          ),
          React.createElement('div',null,
            React.createElement('label',{htmlFor: "lastName",className: "block text-sm font-medium text-gray-700 mb-2"},"Last Name"),
            React.createElement('input',{
              type: "text",
              id: "lastName",
              name: "lastName",
              value: formData.lastName,
              onChange: handleChange,
              required: true,
              disabled: loading,
              className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
            })
          )
        ),
        React.createElement('div',{className: "flex space-x-3"},
          React.createElement('button',{
            type: "submit",
            disabled: loading,
            className: "flex-1 bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          },
            React.createElement(SafeIcon,{icon: FiSave,className: "w-4 h-4"}),
            React.createElement('span',null,"Save")
          ),
          React.createElement('button',{
            type: "button",
            onClick: ()=> setIsEditing(false),
            className: "flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          },
            React.createElement(SafeIcon,{icon: FiX,className: "w-4 h-4"}),
            React.createElement('span',null,"Cancel")
          )
        )
      ) : React.createElement('div',{className: "space-y-6"},
        React.createElement('div',{className: "space-y-4"},
          React.createElement('div',{className: "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"},
            React.createElement(SafeIcon,{icon: FiUser,className: "w-5 h-5 text-gray-500"}),
            React.createElement('div',null,
              React.createElement('p',{className: "text-sm text-gray-500"},"Name"),
              React.createElement('p',{className: "font-medium text-gray-900"},
                `${user?.user_metadata?.firstName || 'Not set'} ${user?.user_metadata?.lastName || ''}`
              )
            )
          ),
          React.createElement('div',{className: "flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"},
            React.createElement(SafeIcon,{icon: FiMail,className: "w-5 h-5 text-gray-500"}),
            React.createElement('div',null,
              React.createElement('p',{className: "text-sm text-gray-500"},"Email"),
              React.createElement('p',{className: "font-medium text-gray-900"},user?.email)
            )
          )
        ),
        React.createElement('div',{className: "space-y-3"},
          React.createElement('button',{
            onClick: ()=> setIsEditing(true),
            className: "w-full bg-primary-700 hover:bg-primary-800 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          },
            React.createElement(SafeIcon,{icon: FiEdit2,className: "w-4 h-4"}),
            React.createElement('span',null,"Edit Profile")
          ),
          React.createElement('button',{
            onClick: signOut,
            className: "w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          },
            React.createElement(SafeIcon,{icon: FiLogOut,className: "w-4 h-4"}),
            React.createElement('span',null,"Sign Out")
          )
        )
      )
    )
  )
}

export const ProtectedRoute=({children})=> {
  const {user,loading}=useAuth()

  if (loading) {
    return React.createElement('div',{className: "min-h-screen flex items-center justify-center"},
      React.createElement('div',{className: "animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"})
    )
  }

  if (!user) {
    return React.createElement(Navigate,{to: "/door",replace: true})
  }

  return children
}

export const Door=()=> {
  const [mode,setMode]=useState('login')
  const {user}=useAuth()
  const navigate=useNavigate()

  useEffect(()=> {
    if (user) {
      navigate('/dashboard')
    }
  },[user,navigate])

  const handleToggleMode=()=> setMode(mode==='login' ? 'signup' : 'login')

  return React.createElement('div',{className: "min-h-screen bg-gradient-to-br from-primary-50 to-cream-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"},
    React.createElement('div',{className: "w-full max-w-md"},
      mode==='login' && React.createElement(LoginForm,{onToggleMode: handleToggleMode})
    )
  )
}