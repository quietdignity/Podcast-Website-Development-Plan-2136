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
            <img 
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg" 
              alt="James Brown" 
              className="w-full h-auto rounded-lg object-cover shadow-lg"
              style={{ aspectRatio: '4/5', objectPosition: 'center top' }}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              James Brown is an independent-thinking millennial who honors his working-class roots while 
              questioning modern life's trade-offs. With experience as an award-winning journalist and 
              government communications professional, he brings both professional insight and personal 
              authenticity to daily reflections on finding the extraordinary in ordinary moments.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              James finds the extraordinary in the ordinary - dogs, dollar bills, weather, unremarkable 
              Tuesday afternoons. He's not anti-technology or anti-progress, but he questions what we're 
              trading away for efficiency. His commentary comes from life lived, not just researched.
            </p>
          </motion.div>
        </div>

        {/* What James Explores */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.8 }}
          className="bg-primary-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">His Approach</h2>
          <p className="text-lg text-gray-600 mb-6">
            James finds the extraordinary in the ordinary - dogs, dollar bills, weather, unremarkable 
            Tuesday afternoons. He's not anti-technology or anti-progress, but he questions what we're 
            trading away for efficiency. His commentary comes from life lived, not just researched.
          </p>
        </motion.div>

        {/* Why The Daily Note Matters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Why The Daily Note Matters</h2>
          <p className="text-lg text-gray-600">
            In a world optimized for productivity and performance, James offers something different: 
            permission to pause and find meaning in the moments others overlook. Not tips for optimization, 
            but wisdom for discovering what's already extraordinary about your ordinary life.
          </p>
        </motion.div>

        {/* About the Show */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-accent-50 rounded-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-6">About the Show</h2>
          <p className="text-lg text-gray-600 mb-6">
            The Daily Note offers 90-second reflections on finding the extraordinary in ordinary moments. 
            James explores the tension between convenience and meaning, the sacred in the mundane, and the 
            small choices that reveal who we're becoming. Finding the extraordinary in the ordinary. 
            5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
          </p>
        </motion.div>

        {/* Recent Themes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
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