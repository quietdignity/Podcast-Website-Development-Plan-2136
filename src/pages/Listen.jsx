import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import EpisodePlayer from '../components/EpisodePlayer'
import NewsletterSignup from '../components/NewsletterSignup'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeadphones, FiMail, FiPlay, FiClock } = FiIcons

const Listen = () => {
  const recentEpisodes = [
    {
      title: "The Power of Showing Up Imperfectly",
      description: "Why authentic connection means being present in messy, unpolished moments",
      date: "December 18, 2024",
      duration: "1:32"
    },
    {
      title: "What We Lose When Convenience Replaces Connection",
      description: "The hidden costs of optimizing away human interaction and effort",
      date: "December 17, 2024",
      duration: "1:28"
    },
    {
      title: "Time as Your Most Valuable Currency",
      description: "Not money - understanding what truly matters in how we spend our hours",
      date: "December 16, 2024",
      duration: "1:35"
    },
    {
      title: "The Courage to Be Ordinary",
      description: "Finding peace in routine and discovering philosophy in everyday moments",
      date: "December 15, 2024",
      duration: "1:41"
    },
    {
      title: "How Small Moments Reveal Universal Truths",
      description: "Finding philosophy in dogs, weather, and unremarkable Tuesday afternoons",
      date: "December 14, 2024",
      duration: "1:29"
    }
  ]

  const platforms = [
    { name: 'Spotify', url: 'https://open.spotify.com/show/6Syvs3L8YwsYEFAYb2bntF', icon: '🎵' },
    { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/the-james-brown-commentary/id1688955029', icon: '🎵' },
    { name: 'RSS Feed', url: 'https://feeds.captivate.fm/the-james-brown-commentary/', icon: '📡' }
  ]

  return (
    <>
      <Helmet>
        <title>Listen to The Daily Note - All Episodes</title>
        <meta name="description" content="Listen to all episodes of The Daily Note with James Brown. Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Listen to The Daily Note
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
          </p>
        </motion.div>

        {/* Main Podcast Player */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Latest Episodes</h2>
              <EpisodePlayer episodeTitle="The Daily Note - All Episodes" />
            </div>
          </div>
        </motion.div>

        {/* Recent Episodes List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary-700 mb-8">Recent Episodes</h2>
          <div className="space-y-6">
            {recentEpisodes.map((episode, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-bronze-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiPlay} className="w-6 h-6 text-bronze-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary-700 mb-2">{episode.title}</h3>
                    <p className="text-gray-600 mb-3">{episode.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{episode.date}</span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>{episode.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About the Show */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-4">About the Show</h2>
          <p className="text-gray-600 text-lg mb-6">
            The Daily Note offers 90-second reflections on finding the extraordinary in ordinary moments. 
            James explores the tension between convenience and meaning, the sacred in the mundane, and the 
            small choices that reveal who we're becoming. Finding the extraordinary in the ordinary. 
            5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
          </p>
        </motion.div>

        {/* Subscribe Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-primary-700 mb-6 flex items-center">
              <SafeIcon icon={FiHeadphones} className="w-6 h-6 mr-2" />
              Subscribe on Your Favorite Platform
            </h3>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <span className="font-medium text-gray-700">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-primary-700 mb-6 flex items-center">
              <SafeIcon icon={FiMail} className="w-6 h-6 mr-2" />
              Get Episodes by Email
            </h3>
            <NewsletterSignup source="listen-page" />
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Listen