import React,{useState,useEffect} from 'react'
import {motion} from 'framer-motion'
import {useNavigate,useLocation} from 'react-router-dom'
import {submitContactForm} from '../services/api'
import {useFormSubmission} from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiMail,FiUser,FiMessageSquare,FiSend,FiCheck}=FiIcons

const ContactForm=()=> {
  const [formData,setFormData]=useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })

  const {loading,error,success,submitForm,resetForm}=useFormSubmission()
  const navigate=useNavigate()
  const location=useLocation()

  // Check if we're coming back from a successful submission
  useEffect(()=> {
    const urlParams=new URLSearchParams(location.search)
    if (urlParams.get('success')==='contact') {
      // Show success state briefly, then redirect to home
      setTimeout(()=> {
        navigate('/',{replace: true})
      },3000)
    }
  },[location,navigate])

  const handleSubmit=async (e)=> {
    e.preventDefault()
    console.log('📧 Contact form submitting:',formData)

    // Submit to Supabase and send emails
    const result=await submitForm(
      ()=> submitContactForm(formData),
      formData
    )

    if (result.success) {
      console.log('✅ Contact form submission successful')
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
      // Redirect to home with success parameter
      setTimeout(()=> {
        navigate('/?success=contact',{replace: true})
      },2000)
    } else {
      console.error('❌ Contact form submission failed:',result.error)
    }
  }

  const handleChange=(e)=> {
    setFormData({...formData,[e.target.name]: e.target.value})
  }

  if (success) {
    return (
      <motion.div
        initial={{opacity: 0,scale: 0.9}}
        animate={{opacity: 1,scale: 1}}
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
      >
        <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 mb-4">
          Thanks for reaching out! We'll get back to you within 24-48 hours.
        </p>
        <p className="text-green-600 text-sm">Email sent to support@thedailynote.net</p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiMail} className="w-6 h-6 text-primary-700" />
        <h2 className="text-2xl font-bold text-primary-700">Send a Message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <div className="relative">
              <SafeIcon icon={FiUser} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
          >
            <option value="general">General Inquiry</option>
            <option value="speaking">Speaking & Training</option>
            <option value="course">Course Support</option>
            <option value="media">Media & Press</option>
            <option value="partnership">Business Partnership</option>
            <option value="radio">Radio Station</option>
          </select>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
            placeholder="Brief subject line"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <div className="relative">
            <SafeIcon icon={FiMessageSquare} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
              placeholder="Tell us how we can help..."
            />
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
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Sending to support@thedailynote.net...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSend} className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Messages sent directly to support@thedailynote.net • Response within 24-48 hours
        </p>
      </form>
    </div>
  )
}

export default ContactForm