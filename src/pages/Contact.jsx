import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { submitContactForm } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMessageCircle, FiCheck, FiAlertCircle, FiTwitter, FiLinkedin, FiInstagram } = FiIcons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    subject: '',
    message: ''
  })

  const { loading, error, success, submitForm, resetForm } = useFormSubmission()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await submitForm(
      () => submitContactForm({ ...formData, formType: 'general' }),
      formData
    )
    
    if (result.success) {
      setFormData({
        name: '',
        email: '',
        inquiryType: '',
        subject: '',
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
        <title>Contact - The Daily Note</title>
        <meta name="description" content="Get in touch with James Brown and The Daily Note. Contact for feedback, business inquiries, course support, and advertising opportunities." />
        <link rel="canonical" href="https://thedailynote.net/contact" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with James
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-6 flex items-center">
                <SafeIcon icon={FiMessageCircle} className="w-6 h-6 mr-2" />
                Send a Message
              </h2>

              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-600 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
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
                      Email *
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

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Inquiry
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="course-support">Course Support: Questions about the Know Your Power course</option>
                      <option value="speaking-training">Speaking/Training: Book James for your next event</option>
                      <option value="advertising-sponsorship">Advertising/Sponsorship: Partner with The Daily Note</option>
                      <option value="general">Email James about the show</option>
                      <option value="add-to-station">Add The Daily Note to your station</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
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
                      placeholder="Share your thoughts, feedback, or questions..."
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
                    disabled={loading}
                    className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information & Newsletter */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">Stay Connected</h2>
              <p className="text-gray-600 mb-6">Get episodes delivered to your inbox</p>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <iframe 
                  src="https://jamesbrowntv.substack.com/embed" 
                  width="100%" 
                  height="280" 
                  style={{ border: 'none', background: 'white' }} 
                  frameBorder="0" 
                  scrolling="no"
                  title="Subscribe to The Daily Note Newsletter"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">Follow The Daily Note</h2>
              <div className="flex space-x-6">
                <a 
                  href="https://x.com/dailynoteshow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-accent-600 transition-colors"
                  aria-label="Follow on X (Twitter)"
                >
                  <SafeIcon icon={FiTwitter} className="w-8 h-8" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-accent-600 transition-colors"
                  aria-label="Follow on LinkedIn"
                >
                  <SafeIcon icon={FiLinkedin} className="w-8 h-8" />
                </a>
                <a 
                  href="https://instagram.com/dailynoteshow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-accent-600 transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <SafeIcon icon={FiInstagram} className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Contact