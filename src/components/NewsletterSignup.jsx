import React, { useState } from 'react'
import { submitNewsletterSignup } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMail, FiCheck, FiAlertCircle } = FiIcons

const NewsletterSignup = ({ source = 'website' }) => {
  const [email, setEmail] = useState('')
  const { loading, error, success, submitForm, resetForm } = useFormSubmission()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    const result = await submitForm(
      () => submitNewsletterSignup(email, source),
      { email, source }
    )

    if (result.success) {
      setEmail('')
      setTimeout(() => resetForm(), 3000)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Thanks for subscribing!</p>
        <p className="text-green-600 text-sm">You'll receive our latest episodes in your inbox.</p>
      </div>
    )
  }

  return (
    <div className="newsletter-signup">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !email}
            className="bg-accent-500 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default NewsletterSignup