import React from 'react'
import {Helmet} from 'react-helmet-async'

const Listen = () => {
  const platforms = [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/show/4EygeQPe0pyQHQs3i2Lf7j',
      icon: '🎵'
    },
    {
      name: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/us/podcast/the-daily-note-with-james-brown/id1760569557',
      icon: '🎵'
    },
    {
      name: 'RSS Feed',
      url: 'https://feeds.captivate.fm/the-james-brown-commentary/',
      icon: '📡'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Listen to The Daily Note - All Episodes</title>
        <meta name="description" content="Listen to all episodes of The Daily Note with James A. Brown. Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea." />
        <link rel="canonical" href="https://thedailynote.net/listen" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Listen to The Daily Note
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
          </p>
        </div>

        {/* Main Podcast Player */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">All Episodes - 200+ and counting</h2>
              <div style={{width: '100%', height: '600px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden'}}>
                <iframe
                  style={{width: '100%', height: '600px'}}
                  frameBorder="no"
                  scrolling="no"
                  allow="clipboard-write"
                  seamless
                  src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
                  title="The Daily Note - All Episodes"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About the Show */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">About the Show</h2>
          <p className="text-gray-600 text-lg mb-6">
            The Daily Note is a daily commentary podcast that finds deeper meaning in everyday moments. Host James A. Brown explores how our world really works through thoughtful observation and authentic storytelling.
          </p>
          <p className="text-gray-600 text-lg mb-6">
            Each short-form episode starts with something specific James noticed while walking downtown, a conversation overheard in a coffee shop, or a small detail that revealed something larger about modern life. These aren't political hot takes or partisan commentary. The Daily Note offers genuine reflection and systems thinking for busy professionals.
          </p>
          <p className="text-gray-600 text-lg">
            The Daily Note delivers smart commentary, personal storytelling, and practical insights in bite-sized episodes that respect your time and intelligence. New episodes Monday through Friday.
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-primary-700 mb-6 flex items-center">
              <span className="mr-2">🎧</span>
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
            <h3 className="text-xl font-bold text-primary-700 mb-6">
              Get Episodes by Email
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <iframe
                src="https://jamesbrowntv.substack.com/embed"
                width="100%"
                height="280"
                style={{border: 'none', background: 'white'}}
                frameBorder="0"
                scrolling="no"
                title="Subscribe to The Daily Note Newsletter"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listen