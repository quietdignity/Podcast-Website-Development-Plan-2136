import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {motion} from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiCheck, FiX} = FiIcons

const Home = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successType, setSuccessType] = useState('')
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const success = urlParams.get('success')
    if (success) {
      setSuccessType(success)
      setShowSuccessMessage(true)
      // Clear the URL parameter after showing the message
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
    }
  }, [location])

  const getSuccessMessage = (type) => {
    switch (type) {
      case 'contact':
        return {
          title: 'Message Sent Successfully!',
          description: 'Thanks for reaching out! We\'ll get back to you within 24-48 hours.'
        }
      case 'speaking':
        return {
          title: 'Speaking Inquiry Received!',
          description: 'Thanks for your interest! We\'ll respond with availability and pricing within 24 hours.'
        }
      default:
        return {
          title: 'Success!',
          description: 'Your submission was received successfully.'
        }
    }
  }

  const valueProps = [
    {
      icon: '⏰',
      title: "Time as Your Most Valuable Asset",
      description: "Wisdom about protecting your hours and owning your day"
    },
    {
      icon: '❤️',
      title: "Real Connection Over Digital Noise",
      description: "Thoughts on friendship, loneliness, and what we've lost"
    },
    {
      icon: '👍',
      title: "Extraordinary in the Ordinary",
      description: "Finding philosophy in dogs, weather, and everyday moments"
    },
    {
      icon: '👥',
      title: "Independent Thinking",
      description: "Questions that help you build the life you actually want"
    }
  ]

  const successMessage = getSuccessMessage(successType)

  return (
    <>
      <Helmet>
        <title>The Daily Note with James A. Brown - Finding the extraordinary in the ordinary</title>
        <meta
          name="description"
          content="Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea. Daily wisdom from James A. Brown."
        />
        <link rel="canonical" href="https://thedailynote.net/" />
      </Helmet>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -50}}
          className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-start space-x-3">
              <SafeIcon
                icon={FiCheck}
                className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <h3 className="text-green-800 font-semibold">{successMessage.title}</h3>
                <p className="text-green-700 text-sm mt-1">{successMessage.description}</p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-500 hover:text-green-700"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-cream-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Daily Note with James A. Brown
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cream-200">
              Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
            </p>
            <p className="text-lg mb-12 text-cream-300 max-w-4xl mx-auto">
              Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become. James A. Brown finds meaning in ordinary life and asks the questions others are afraid to ask.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/listen"
                className="bg-bronze-500 hover:bg-bronze-600 text-cream-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <span>▶️</span>
                <span>Listen to Today's Episode</span>
              </Link>
              <a
                href="https://knowyourpowernow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-primary-800 text-cream-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Know Your Power Course ($1,497)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="text-center p-6 rounded-lg border border-cream-300 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="text-4xl mb-4">{prop.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary-800">{prop.title}</h3>
                <p className="text-charcoal-800">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Today's Episode</h2>
            <p className="text-charcoal-800 text-lg">90-second reflections on finding meaning in the everyday</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div style={{width: '100%', height: '200px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden'}}>
                <iframe
                  style={{width: '100%', height: '200px'}}
                  frameBorder="no"
                  scrolling="no"
                  seamless
                  src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
                  title="The Daily Note Podcast Player"
                />
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/listen"
                  className="bg-primary-800 hover:bg-primary-900 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Episodes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home