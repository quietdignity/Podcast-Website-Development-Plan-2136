import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useAuth, useFormSubmission } from '../hooks'
import { submitContactForm, submitSpeakingInquiry, submitNewsletterSignup, submitUserFeedback } from '../services/api'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMenu, FiX, FiUser, FiLogIn, FiRss, FiTwitter, FiLinkedin, FiInstagram, FiHeadphones, FiMail, FiMessageCircle, FiStar, FiCheck, FiAlertCircle, FiSend, FiMic, FiUsers, FiMusic } = FiIcons

//============================================================================
// LAYOUT COMPONENTS
//============================================================================

export const StickyBar = () => (
  <motion.div
    initial={{ y: -40 }}
    animate={{ y: 0 }}
    className="fixed top-0 left-0 right-0 z-50 bg-bronze-500 text-cream-50 h-10 flex items-center justify-center text-sm font-medium"
  >
    <div className="flex items-center space-x-6">
      <span className="hidden sm:inline">New Episode Daily</span>
      <Link to="/listen" className="flex items-center space-x-2 hover:text-cream-200 transition-colors">
        <SafeIcon icon={FiHeadphones} className="w-4 h-4" />
        <span>Listen Now</span>
      </Link>
      <a href="https://jamesbrowntv.substack.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-cream-200 transition-colors">
        <SafeIcon icon={FiMail} className="w-4 h-4" />
        <span>Subscribe</span>
      </a>
    </div>
  </motion.div>
)

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Listen', path: '/listen' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Speaking & Training', path: '/speaking' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-10 left-0 right-0 z-40 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob" alt="The Daily Note Logo" className="h-10 w-auto" />
            <div className="text-xl font-bold text-primary-800">The Daily Note</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.path) ? 'text-bronze-500 border-b-2 border-bronze-500' : 'text-charcoal-800 hover:text-bronze-500'}`}>
                {item.name}
              </Link>
            ))}

            {user ? (
              <Link to="/dashboard" className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link to="/door" className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiLogIn} className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal-800 hover:text-bronze-500 focus:outline-none">
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isActive(item.path) ? 'text-bronze-500 bg-cream-100' : 'text-charcoal-800 hover:text-bronze-500 hover:bg-cream-100'}`}>
                  {item.name}
                </Link>
              ))}

              {user ? (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-800 hover:bg-cream-100 transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/door" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-800 hover:bg-cream-100 transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export const Footer = () => (
  <footer className="bg-primary-800 text-cream-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Newsletter Section at Top */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-cream-50 mb-4">Get The Daily Note in Your Email Daily at 6 a.m.</h3>
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <iframe src="https://jamesbrowntv.substack.com/embed" width="100%" height="200" style={{ border: 'none', background: 'white' }} frameBorder="0" scrolling="no" title="Subscribe to The Daily Note Newsletter" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob" alt="The Daily Note Logo" className="h-8 w-auto" />
            <h3 className="text-lg font-bold">The Daily Note</h3>
          </div>
          <p className="text-cream-200 text-sm">Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/listen" className="text-cream-200 hover:text-cream-50 transition-colors">Listen</Link></li>
            <li><Link to="/about" className="text-cream-200 hover:text-cream-50 transition-colors">About</Link></li>
            <li><Link to="/education" className="text-cream-200 hover:text-cream-50 transition-colors">Education</Link></li>
            <li><Link to="/speaking" className="text-cream-200 hover:text-cream-50 transition-colors">Speaking</Link></li>
            <li><Link to="/contact" className="text-cream-200 hover:text-cream-50 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Listen</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiMusic} className="w-4 h-4" />
              <a href="https://open.spotify.com/show/6Syvs3L8YwsYEFAYb2bntF" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors">Spotify</a>
            </li>
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiMusic} className="w-4 h-4" />
              <a href="https://podcasts.apple.com/us/podcast/the-james-brown-commentary/id1688955029" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors">Apple Podcasts</a>
            </li>
            <li className="flex items-center space-x-2">
              <SafeIcon icon={FiRss} className="w-4 h-4" />
              <a href="https://feeds.captivate.fm/the-james-brown-commentary/" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors">RSS Feed</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow</h4>
          <div className="flex space-x-4">
            <a href="https://instagram.com/dailynoteshow" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors" aria-label="Follow on Instagram">
              <SafeIcon icon={FiInstagram} className="w-5 h-5" />
            </a>
            <a href="https://x.com/dailynoteshow" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors" aria-label="Follow on X (Twitter)">
              <SafeIcon icon={FiTwitter} className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/" target="_blank" rel="noopener noreferrer" className="text-cream-200 hover:text-cream-50 transition-colors" aria-label="Follow on LinkedIn">
              <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-700 mt-8 pt-8 text-center text-sm text-cream-300">
        <p>&copy; 2024 The Daily Note with James Brown. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export const Layout = ({ children }) => (
  <div className="min-h-screen bg-cream-50">
    <StickyBar />
    <Navigation />
    <main className="pt-20">{children}</main>
    <Footer />
  </div>
)

//============================================================================
// WIDGETS & FORMS
//============================================================================

export const NewsletterSignup = ({ source = 'website' }) => {
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

export const FeedbackWidget = ({ type = 'general', position = 'bottom-right' }) => {
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
        <button onClick={() => setIsOpen(true)} className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-colors" title="Share feedback">
          <SafeIcon icon={FiMessageCircle} className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Share Your Feedback</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">How would you rate your experience?</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      <SafeIcon icon={FiStar} className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments (optional)</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm" placeholder="Tell us what you think..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm" placeholder="your@email.com" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={loading || rating === 0} className="w-full bg-accent-500 hover:bg-accent-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export const EpisodePlayer = ({ episodeTitle = "The Daily Note" }) => {
  const [userSession] = useState(() =>
    sessionStorage.getItem('userSession') || Math.random().toString(36).substring(2, 15)
  )

  useEffect(() => {
    sessionStorage.setItem('userSession', userSession)
  }, [userSession])

  return (
    <div className="episode-player">
      <div style={{ width: '100%', height: '200px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden' }}>
        <iframe
          style={{ width: '100%', height: '200px' }}
          frameBorder="no"
          scrolling="no"
          seamless
          src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
          title="The Daily Note Podcast Player"
        />
      </div>
    </div>
  )
}

export const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website', structuredData }) => {
  const siteUrl = 'https://thedailynote.net'
  const defaultImage = 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="James Brown" />
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${siteUrl}${canonicalUrl || ''}`} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content="The Daily Note" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      <meta name="theme-color" content="#1a2238" />
      <meta name="msapplication-TileColor" content="#1a2238" />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  )
}