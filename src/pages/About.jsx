import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiClock, FiHeart, FiSearch, FiCompass } = FiIcons

const About = () => {
  const explorations = [
    {
      icon: FiClock,
      title: "Time as your most valuable currency",
      description: "Not money - understanding what truly matters in how we spend our hours"
    },
    {
      icon: FiHeart,
      title: "Real friendship requires showing up imperfectly",
      description: "Why authentic connection means being present in messy, unpolished moments"
    },
    {
      icon: FiSearch,
      title: "What we lose when convenience replaces connection",
      description: "The hidden costs of optimizing away human interaction and effort"
    },
    {
      icon: FiCompass,
      title: "How small moments reveal universal truths",
      description: "Finding philosophy in dogs, weather, and unremarkable Tuesday afternoons"
    }
  ]

  const recentThemes = [
    "The courage to be ordinary and find peace in routine",
    "Why loneliness is a systems problem, not a personal failing",
    "What we lose when families stop having dinner table debates",
    "How to handle your own problems in an outsourced world",
    "Discovering philosophy in everyday moments that others overlook"
  ]

  return (
    <>
      <Helmet>
        <title>About James Brown - The Daily Note</title>
        <meta name="description" content="James Brown is an independent-thinking millennial who finds wisdom in the everyday, questioning modern life's trade-offs while honoring working-class roots." />
        <link rel="canonical" href="https://thedailynote.net/about" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            About James Brown
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding wisdom in the everyday
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg" 
                alt="James Brown" 
                className="w-full max-w-sm mx-auto h-auto rounded-lg object-cover shadow-lg mb-4"
              />
              <p className="text-gray-600 text-sm italic">James A. Brown in his hometown Rochester, NY</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              James Brown is an independent-thinking millennial who honors his working-class roots while questioning modern life's trade-offs. With experience as an award-winning journalist and government communications professional, he brings both professional insight and personal authenticity to daily reflections on finding the extraordinary in ordinary moments.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              James finds the extraordinary in the ordinary - dogs, dollar bills, weather, unremarkable Tuesday afternoons. He's not anti-technology or anti-progress, but he questions what we're trading away for efficiency. His commentary comes from life lived, not just researched.
            </p>
          </motion.div>
        </div>

        {/* About The Daily Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          id="about-the-daily-note"
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">About The Daily Note</h2>
          <p className="text-lg text-gray-600 mb-6">
            The Daily Note is a daily commentary podcast that finds deeper meaning in everyday moments. Host James A. Brown explores how our world really works through thoughtful observation and authentic storytelling.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Each short-form episode starts with something specific James noticed while walking downtown, a conversation overheard in a coffee shop, or a small detail that revealed something larger about modern life. These aren't political hot takes or partisan commentary. The Daily Note offers genuine reflection and systems thinking for busy professionals.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            This daily podcast serves listeners who want intelligent analysis without the noise. Perfect for commuters, coffee breaks, and anyone seeking thoughtful perspective on current events, workplace dynamics, and American culture.
          </p>
          <p className="text-lg text-gray-600">
            The Daily Note delivers smart commentary, personal storytelling, and practical insights in bite-sized episodes that respect your time and intelligence. New episodes Monday through Friday. Commentary for people who want to understand their world better, not feel better about what they already believe.
          </p>
        </motion.div>

        {/* What James Explores */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          id="what-james-explores"
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">What James Explores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {explorations.map((exploration, index) => (
              <div key={exploration.title} className="flex items-start space-x-4">
                <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <SafeIcon icon={exploration.icon} className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-700 mb-2">{exploration.title}</h3>
                  <p className="text-gray-600">{exploration.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* His Approach */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          id="his-approach"
          className="bg-primary-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">His Approach</h2>
          <p className="text-lg text-gray-600 mb-6">
            James finds the extraordinary in the ordinary - dogs, dollar bills, weather, unremarkable Tuesday afternoons. He's not anti-technology or anti-progress, but he questions what we're trading away for efficiency. His commentary comes from life lived, not just researched.
          </p>
        </motion.div>

        {/* Recent Themes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          id="recent-themes"
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Recent Themes</h2>
          <div className="space-y-4">
            {recentThemes.map((theme, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-600">{theme}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default About