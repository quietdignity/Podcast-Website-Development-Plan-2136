import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeadphones, FiMail } = FiIcons;

const Listen = () => {
  const platforms = [
    { 
      name: 'Spotify', 
      url: 'https://open.spotify.com/show/6Syvs3L8YwsYEFAYb2bntF', 
      icon: '🎵' 
    },
    { 
      name: 'Apple Podcasts', 
      url: 'https://podcasts.apple.com/us/podcast/the-james-brown-commentary/id1688955029', 
      icon: '🎵' 
    },
    { 
      name: 'RSS Feed', 
      url: 'https://feeds.captivate.fm/the-james-brown-commentary/', 
      icon: '📡' 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Listen to The Daily Note - All Episodes</title>
        <meta name="description" content="Listen to all episodes of The Daily Note with James Brown. 90-second reflections on finding the extraordinary in ordinary moments, Monday through Friday." />
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
            All episodes in one place
          </p>
        </motion.div>

        {/* Podcast Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div style={{ width: '100%', height: '600px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden' }}>
              <iframe 
                style={{ width: '100%', height: '600px' }} 
                frameBorder="no" 
                scrolling="no" 
                allow="clipboard-write" 
                seamless 
                src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
                title="The Daily Note - All Episodes"
              />
            </div>
          </div>
        </motion.div>

        {/* About the Show */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary-700 mb-4">About the Show</h2>
          <p className="text-gray-600 text-lg mb-6">
            The Daily Note offers 90-second reflections on finding the extraordinary in ordinary moments. James explores the tension between 
            convenience and meaning, the sacred in the mundane, and the small choices that reveal who we're becoming. 
            New episodes Monday through Friday.
          </p>
        </motion.div>

        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
            <iframe 
              src="https://jamesbrowntv.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: '1px solid #EEE', background: 'white', borderRadius: '8px' }} 
              frameBorder="0" 
              scrolling="no"
              title="Email Subscription"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Listen;