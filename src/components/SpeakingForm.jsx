import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { submitSpeakingInquiry } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMic, FiUser, FiMail, FiPhone, FiBuilding, FiMessageSquare, FiSend, FiCheck } = FiIcons

const SpeakingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventType: 'keynote',
    eventDetails: ''
  })

  const { loading, error, success, submitForm, resetForm } = useFormSubmission()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await submitForm(
      () => submitSpeakingInquiry(formData),
      formData
    )

    if (result.success) {
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        eventType: 'keynote',
        eventDetails: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        resetForm()
      }, 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
      >
        <SafeIcon icon={FiCheck} className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Speaking Inquiry Received!</h3>
        <p className="text-green-700 mb-4">
          Thanks for your interest! We'll respond with availability and pricing within 24 hours.
        </p>
        <button
          onClick={() => resetForm()}
          className="text-green-600 hover:text-green-700 underline"
        >
          Submit another inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiMic} className="w-6 h-6 text-primary-700" />
        <h2 className="text-2xl font-bold text-primary-700">Speaking Inquiry</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <div className="relative">
              <SafeIcon icon={FiPhone} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
              Organization
            </label>
            <div className="relative">
              <SafeIcon icon={FiBuilding} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                disabled={loading}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
                placeholder="Company name"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
          >
            <option value="keynote">Keynote Presentation</option>
            <option value="workshop">Workshop</option>
            <option value="training">Corporate Training</option>
            <option value="panel">Panel Discussion</option>
            <option value="coaching">Executive Coaching</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="eventDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Event Details *
          </label>
          <div className="relative">
            <SafeIcon icon={FiMessageSquare} className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              id="eventDetails"
              name="eventDetails"
              rows={4}
              value={formData.eventDetails}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
              placeholder="Event date, location, audience size, duration, topic, budget range..."
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
          className="w-full bg-bronze-600 hover:bg-bronze-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiSend} className="w-4 h-4" />
              <span>Submit Speaking Inquiry</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Priority response within 24 hours for speaking inquiries
        </p>
      </form>
    </div>
  )
}

export default SpeakingForm