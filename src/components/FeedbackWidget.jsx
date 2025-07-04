import React, { useState } from 'react'
import { submitUserFeedback } from '../services/api'
import { useFormSubmission } from '../hooks/useSupabase'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMessageCircle, FiStar, FiCheck, FiX } = FiIcons

const FeedbackWidget = ({ type = 'general', position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [email, setEmail] = useState('')
  const { loading, error, success, submitForm, resetForm } = useFormSubmission()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await submitForm(
      () => submitUserFeedback({ type, rating, comment, email }),
      { type, rating, comment, email }
    )

    if (result.success) {
      setRating(0)
      setComment('')
      setEmail('')
      setTimeout(() => {
        resetForm()
        setIsOpen(false)
      }, 2000)
    }
  }

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Share feedback"
        >
          <SafeIcon icon={FiMessageCircle} className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Share Your Feedback</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          {success ? (
            <div className="text-center py-4">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">Thanks for your feedback!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1 ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <SafeIcon icon={FiStar} className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments (optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm"
                  placeholder="Tell us what you think..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm"
                  placeholder="your@email.com"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || rating === 0}
                className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default FeedbackWidget