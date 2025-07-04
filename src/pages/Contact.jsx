import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { submitContactForm } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import NewsletterSignup from '../components/NewsletterSignup'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMail, FiMessageCircle, FiDollarSign, FiRss, FiTwitter, FiLinkedin, FiCheck, FiAlertCircle } = FiIcons

const Contact = () => {
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [advertisingForm, setAdvertisingForm] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })

  const { loading: generalLoading, error: generalError, success: generalSuccess, submitForm: submitGeneralForm, resetForm: resetGeneralForm } = useFormSubmission()
  const { loading: adLoading, error: adError, success: adSuccess, submitForm: submitAdForm, resetForm: resetAdForm } = useFormSubmission()

  const handleGeneralSubmit = async (e) => {
    e.preventDefault()
    
    const result = await submitGeneralForm(
      () => submitContactForm({ ...generalForm, formType: 'general' }),
      generalForm
    )

    if (result.success) {
      setGeneralForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => resetGeneralForm(), 3000)
    }
  }

  const handleAdvertisingSubmit = async (e) => {
    e.preventDefault()
    
    const result = await submitAdForm(
      () => submitContactForm({ 
        name: advertisingForm.name,
        email: advertisingForm.email,
        subject: `Advertising Inquiry - ${advertisingForm.company}`,
        message: `Company: ${advertisingForm.company}\nBudget: ${advertisingForm.budget}\n\nMessage: ${advertisingForm.message}`,
        formType: 'advertising'
      }),
      advertisingForm
    )

    if (result.success) {
      setAdvertisingForm({ name: '', email: '', company: '', budget: '', message: '' })
      setTimeout(() => resetAdForm(), 3000)
    }
  }

  const handleGeneralChange = (e) => {
    setGeneralForm({ ...generalForm, [e.target.name]: e.target.value })
  }

  const handleAdvertisingChange = (e) => {
    setAdvertisingForm({ ...advertisingForm, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Helmet>
        <title>Contact - The Daily Note</title>
        <meta name="description" content="Get in touch with James Brown and The Daily Note. Contact for feedback, business inquiries, course support, and advertising opportunities." />
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
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* General Contact */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
                  <SafeIcon icon={FiMessageCircle} className="w-6 h-6 mr-2" />
                  General Contact
                </h2>
                <p className="text-gray-600 mb-4">
                  For all inquiries, feedback, and general questions, please use the contact form.
                </p>
              </div>

              {/* Business Inquiries */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
                  <SafeIcon icon={FiMail} className="w-6 h-6 mr-2" />
                  Business Inquiries
                </h2>
                <div className="space-y-3">
                  <div>
                    <strong className="text-gray-700">Course Support:</strong>
                    <p className="text-gray-600">Questions about the Know Your Power course</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Speaking/Training:</strong>
                    <p className="text-gray-600">Book James for your next event</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Advertising/Sponsorship:</strong>
                    <p className="text-gray-600">Partner with The Daily Note</p>
                  </div>
                </div>
              </div>

              {/* Subscribe & Stay Updated */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
                  <SafeIcon icon={FiRss} className="w-6 h-6 mr-2" />
                  Subscribe & Stay Updated
                </h2>
                <div className="space-y-4">
                  <div>
                    <strong className="text-gray-700">Newsletter:</strong>
                    <p className="text-gray-600 text-sm">Get episodes delivered to your inbox</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">Podcast Apps:</strong>
                    <p className="text-gray-600 text-sm">Available on Spotify, Apple Podcasts, and more</p>
                  </div>
                  <div>
                    <strong className="text-gray-700">RSS Feed:</strong>
                    <a
                      href="https://feeds.captivate.fm/the-james-brown-commentary/"
                      className="text-accent-600 hover:text-accent-700 text-sm ml-2"
                    >
                      Subscribe via RSS
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-primary-700 mb-4">Social Media</h2>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-accent-600">
                    <SafeIcon icon={FiTwitter} className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-accent-600">
                    <SafeIcon icon={FiLinkedin} className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* General Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-700 mb-4">Send a Message</h2>
              
              {generalSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-600 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="general-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="general-name"
                      name="name"
                      value={generalForm.name}
                      onChange={handleGeneralChange}
                      required
                      disabled={generalLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="general-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="general-email"
                      name="email"
                      value={generalForm.email}
                      onChange={handleGeneralChange}
                      required
                      disabled={generalLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="general-subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="general-subject"
                      name="subject"
                      value={generalForm.subject}
                      onChange={handleGeneralChange}
                      disabled={generalLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="general-message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="general-message"
                      name="message"
                      value={generalForm.message}
                      onChange={handleGeneralChange}
                      required
                      disabled={generalLoading}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                      placeholder="Share your thoughts, feedback, or questions..."
                    />
                  </div>

                  {generalError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                      <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                      <p className="text-red-800 text-sm">{generalError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={generalLoading}
                    className="bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {generalLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-700 mb-4">Newsletter Signup</h2>
              <NewsletterSignup source="contact-page" />
            </div>

            {/* Advertising/Sponsorship Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-primary-700 mb-4 flex items-center">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 mr-2" />
                Advertising & Sponsorship
              </h2>
              
              {adSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Inquiry sent successfully!</p>
                  <p className="text-green-600 text-sm">We'll review your proposal and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleAdvertisingSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="ad-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="ad-name"
                      name="name"
                      value={advertisingForm.name}
                      onChange={handleAdvertisingChange}
                      required
                      disabled={adLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ad-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="ad-email"
                      name="email"
                      value={advertisingForm.email}
                      onChange={handleAdvertisingChange}
                      required
                      disabled={adLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ad-company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="ad-company"
                      name="company"
                      value={advertisingForm.company}
                      onChange={handleAdvertisingChange}
                      disabled={adLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ad-budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="ad-budget"
                      name="budget"
                      value={advertisingForm.budget}
                      onChange={handleAdvertisingChange}
                      disabled={adLoading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1k">Under $1,000</option>
                      <option value="1k-5k">$1,000 - $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-plus">$10,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="ad-message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="ad-message"
                      name="message"
                      value={advertisingForm.message}
                      onChange={handleAdvertisingChange}
                      disabled={adLoading}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
                      placeholder="Tell us about your advertising goals and target audience..."
                    />
                  </div>

                  {adError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                      <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                      <p className="text-red-800 text-sm">{adError}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={adLoading}
                    className="bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {adLoading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Contact