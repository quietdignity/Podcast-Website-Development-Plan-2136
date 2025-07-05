import React from 'react'
import {Helmet} from 'react-helmet-async'
import {motion} from 'framer-motion'
import {useAuth} from '../hooks'
import {UserProfile} from '../components/Auth'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiHeadphones,FiBookOpen,FiMic,FiMail}=FiIcons

const Dashboard=()=> {
  const {user}=useAuth()

  const quickLinks=[
    {
      title: 'Listen to Episodes',
      description: 'Catch up on the latest Daily Note episodes',
      icon: FiHeadphones,
      href: '/listen',
      color: 'bg-blue-500'
    },
    {
      title: 'Know Your Power Course',
      description: 'Access your advocacy training materials',
      icon: FiBookOpen,
      href: 'https://knowyourpowernow.com',
      color: 'bg-green-500',
      external: true
    },
    {
      title: 'Speaking Inquiries',
      description: 'Book James for your next event',
      icon: FiMic,
      href: '/speaking',
      color: 'bg-purple-500'
    },
    {
      title: 'Newsletter',
      description: 'Subscribe to daily email updates',
      icon: FiMail,
      href: 'https://jamesbrowntv.substack.com',
      color: 'bg-orange-500',
      external: true
    }
  ]

  return (
    <>
      <Helmet>
        <title>Dashboard - The Daily Note</title>
        <meta name="description" content="Your Daily Note dashboard" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{opacity: 0,y: 20}}
            animate={{opacity: 1,y: 0}}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-primary-800 mb-4">
              Welcome back,{user?.user_metadata?.firstName || 'Friend'}!
            </h1>
            <p className="text-xl text-gray-600">Your Daily Note Dashboard</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{opacity: 0,y: 20}}
                animate={{opacity: 1,y: 0}}
                transition={{delay: 0.2}}
                className="bg-white rounded-lg shadow-lg p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Quick Links</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickLinks.map((link,index)=> (
                    <motion.a
                      key={link.title}
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      initial={{opacity: 0,y: 20}}
                      animate={{opacity: 1,y: 0}}
                      transition={{delay: 0.3 + index * 0.1}}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${link.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <SafeIcon icon={link.icon} className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                          <p className="text-sm text-gray-600">{link.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0,y: 20}}
                animate={{opacity: 1,y: 0}}
                transition={{delay: 0.4}}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Episodes</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Latest Daily Note</h3>
                    <p className="text-gray-600 text-sm mb-3">New episode available - 90 seconds of daily wisdom</p>
                    <a href="/listen" className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                      Listen now →
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{opacity: 0,x: 20}}
                animate={{opacity: 1,x: 0}}
                transition={{delay: 0.6}}
              >
                <UserProfile />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard