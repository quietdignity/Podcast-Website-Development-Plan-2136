import React from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import {Helmet} from 'react-helmet-async'
import {EpisodePlayer,FeedbackWidget} from '../components/UI'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiPlay,FiClock,FiHeart,FiUsers,FiThumbsUp}=FiIcons

const Home=()=> {
  const valueProps=[
    {icon: FiClock,title: "Time as Your Most Valuable Asset",description: "Wisdom about protecting your hours and owning your day"},
    {icon: FiHeart,title: "Real Connection Over Digital Noise",description: "Thoughts on friendship,loneliness,and what we've lost"},
    {icon: FiThumbsUp,title: "Extraordinary in the Ordinary",description: "Finding philosophy in dogs,weather,and everyday moments"},
    {icon: FiUsers,title: "Independent Thinking",description: "Questions that help you build the life you actually want"}
  ]

  return (
    <>
      <Helmet>
        <title>The Daily Note with James Brown - Finding the extraordinary in the ordinary</title>
        <meta name="description" content="Finding the extraordinary in the ordinary. 5 days a week,90 seconds a day,on-air and online from sea to shining sea. Daily wisdom from James Brown." />
        <link rel="canonical" href="https://thedailynote.net/" />
      </Helmet>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-primary-800 to-primary-900 text-cream-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              The Daily Note with James Brown
            </motion.h1>
            <motion.p
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{delay: 0.2}}
              className="text-xl md:text-2xl mb-8 text-cream-200"
            >
              Finding the extraordinary in the ordinary. 5 days a week,90 seconds a day,on-air and online from sea to shining sea.
            </motion.p>
            <motion.p
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{delay: 0.4}}
              className="text-lg mb-12 text-cream-300 max-w-4xl mx-auto"
            >
              Daily wisdom about the small moments,hard choices,and quiet truths that shape who we become. James Brown finds meaning in ordinary life and asks the questions others are afraid to ask.
            </motion.p>
            <motion.div
              initial={{opacity: 0,y: 20}}
              animate={{opacity: 1,y: 0}}
              transition={{delay: 0.6}}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/listen"
                className="bg-bronze-500 hover:bg-bronze-600 text-cream-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="value-proposition" className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop,index)=> (
              <motion.div
                key={prop.title}
                initial={{opacity: 0,y: 20}}
                animate={{opacity: 1,y: 0}}
                transition={{delay: index * 0.1}}
                className="text-center p-6 rounded-lg border border-cream-300 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="bg-bronze-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={prop.icon} className="w-8 h-8 text-bronze-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-800">{prop.title}</h3>
                <p className="text-charcoal-800">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      <section id="latest-episode" className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Today's Episode</h2>
            <p className="text-charcoal-800 text-lg">90-second reflections on finding meaning in the everyday</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <EpisodePlayer episodeTitle="Today's Daily Note" />
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

      {/* Feedback Widget */}
      <FeedbackWidget type="website" position="bottom-right" />
    </>
  )
}

export default Home