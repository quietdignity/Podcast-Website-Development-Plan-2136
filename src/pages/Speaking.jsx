import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { submitSpeakingInquiry } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMic, FiUsers, FiSend, FiCheck, FiAlertCircle } = FiIcons

const Speaking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventType: '',
    message: ''
  })

  const { loading, error, success, submitForm, resetForm } = useFormSubmission()

  const speakingTopics = [
    {
      title: "The Future of Employee Communications",
      description: "Insights on workforce communication and distributed team management",
      details: [
        "Building connection in remote and hybrid environments",
        "Authentic communication in digital spaces",
        "Leading through uncertainty and change"
      ]
    },
    {
      title: "Finding Meaning in Modern Work",
      description: "Helping teams discover purpose beyond productivity",
      details: [
        "The extraordinary in ordinary work moments",
        "Building genuine workplace relationships",
        "Time as your most valuable currency"
      ]
    },
    {
      title: "Leadership in an Outsourced World",
      description: "Developing self-reliance and authentic leadership",
      details: [
        "Handling challenges without defaulting to outsourcing",
        "Building resilience in complex systems",
        "Independent thinking in connected organizations"
      ]
    }
  ]

  const trainingFormats = [
    "Keynote presentations",
    "Half-day workshops",
    "Executive coaching sessions",
    "Team communication training"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.message.trim()) {
      return
    }

    const result = await submitForm(
      () => submitSpeakingInquiry(formData),
      formData
    )
    
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        eventType: '',
        message: ''
      })
      setTimeout(() => resetForm(), 3000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Helmet>
        <title>Speaking & Corporate Training - The Daily Note</title>
        <meta name="description" content="Book James Brown for speaking engagements and corporate training. Featured speaker at Advanced Learning Institute conferences on employee communications." />
        <link rel="canonical" href="https://thedailynote.net/speaking" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Speaking & Corporate Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Communication expertise for your organization
          </p>
        </motion.div>

        {/* Featured Speaking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          id="featured-speaking"
          className="bg-accent-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Featured Speaker</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-4">
                James has been a featured speaker at Advanced Learning Institute's premier employee communications conferences, 
                sharing insights on the future of workforce communication and distributed team management.
              </p>
              <div className="space-y-2">
                <a 
                  href="https://www.aliconferences.com/events/the-future-of-employee-communications/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-600 hover:text-accent-700 underline"
                >
                  The Future of Employee Communications
                </a>
                <a 
                  href="https://www.aliconferences.com/events/3rd-annual-internal-communications-for-a-deskless-frontline-hybrid-workforce/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-accent-600 hover:text-accent-700 underline"
                >
                  Internal Communications for a Deskless, Frontline, Hybrid Workforce
                </a>
              </div>
            </div>
            <div>
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648125615-james%20brown%20speaking%20at%20a%20conference.jpg" 
                alt="James Brown speaking at a conference"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Speaking Topics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          id="speaking-topics"
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">Speaking Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakingTopics.map((topic, index) => (
              <div key={topic.title} className="bg-white rounded-lg shadow-lg p-6">
                <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <SafeIcon icon={FiMic} className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-700 mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <ul className="space-y-2">
                  {topic.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-start">
                      <span className="text-accent-500 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Training Formats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          id="training-formats"
          className="bg-primary-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Training Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingFormats.map((format, index) => (
              <div key={index} className="flex items-center space-x-3">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-accent-500" />
                <span className="text-gray-700">{format}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Panel Discussion Photo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          id="panel-discussion"
          className="text-center mb-12"
        >
          <img 
            src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751655293423-James%20brown%20on%20a%20panel%20at%20a%20conference.jpg" 
            alt="James Brown on a panel at a conference"
            className="w-full max-w-4xl mx-auto h-80 object-cover rounded-lg shadow-lg"
          />
          <p className="text-gray-600 text-sm mt-4">James Brown (center right) speaking on panel</p>
        </motion.div>

        {/* Request Speaking Information Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          id="speaking-inquiry"
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
            <SafeIcon icon={FiSend} className="w-6 h-6 mr-2" />
            Request Speaking Information
          </h2>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Speaking inquiry sent successfully!</p>
              <p className="text-green-600 text-sm">We'll review your request and get back to you soon with availability and pricing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                >
                  <option value="">Select event type</option>
                  <option value="keynote">Keynote Presentation</option>
                  <option value="workshop">Workshop</option>
                  <option value="coaching">Executive Coaching</option>
                  <option value="training">Team Training</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                  placeholder="Tell us about your event, audience size, date preferences, and any specific topics you'd like covered..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !formData.message.trim()}
                className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-gray-600">
            <p>Investment: Contact for speaking fees and availability</p>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Speaking