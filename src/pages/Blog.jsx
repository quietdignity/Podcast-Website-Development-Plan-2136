import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getBlogPosts } from '../services/blogApi'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiArrowRight, FiHeadphones } = FiIcons

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [supascribeLoaded, setSupascribeLoaded] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  // Load Supascribe script with better error handling
  useEffect(() => {
    const loadSupascribeScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script[src*="supascribe.com"]')) {
        setSupascribeLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://js.supascribe.com/v1/loader/JcbfMjgYlVXRRM8knLW65wwz4Vk2.js'
      script.async = true
      
      script.onload = () => {
        console.log('✅ Supascribe script loaded')
        setSupascribeLoaded(true)
      }
      
      script.onerror = () => {
        console.warn('⚠️ Supascribe script failed to load')
        setSupascribeLoaded(false)
      }
      
      document.head.appendChild(script)
    }

    const timer = setTimeout(loadSupascribeScript, 500)
    return () => clearTimeout(timer)
  }, [])

  const fetchPosts = async () => {
    try {
      console.log('🔄 Fetching blog posts...')
      const result = await getBlogPosts()
      if (result.success) {
        // Show all posts (published and from RSS)
        console.log('✅ Blog posts fetched:', result.data.length)
        setPosts(result.data)
      } else {
        console.error('❌ Failed to fetch posts:', result.error)
      }
    } catch (error) {
      console.error('❌ Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content?.split(' ').length || 0
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Blog - The Daily Note</title>
        <meta
          name="description"
          content="Read James A. Brown's latest thoughts on finding the extraordinary in ordinary moments. Daily wisdom and reflections from The Daily Note."
        />
        <link rel="canonical" href="https://thedailynote.net/blog" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            The Daily Note Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Written reflections on finding the extraordinary in ordinary moments
          </p>
        </div>

        {/* Latest Episode Player */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">
              Latest Episode
            </h2>
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
            
            {/* Supascribe Feed Embed - Fallback */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-primary-700 mb-4 text-center">
                All Episodes & Updates
              </h3>
              <div 
                data-supascribe-embed-id="642789544605" 
                data-supascribe-feed
                className="w-full min-h-96"
              ></div>
              
              {/* Fallback if Supascribe doesn't load */}
              <div className="mt-4 text-center">
                <p className="text-gray-600 mb-4">
                  Can't see the episodes? Listen on your favorite platform:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://open.spotify.com/show/5Impg5m0ZPEuE9ezKFcP5A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    🎵 Spotify
                  </a>
                  <a 
                    href="https://podcasts.apple.com/us/podcast/the-daily-note-with-james-a-brown/id1679222021" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    🎵 Apple Podcasts
                  </a>
                  <Link 
                    to="/listen"
                    className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    🎧 All Episodes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts from Database */}
        {posts.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">
              Recent Episodes & Reflections
            </h2>
            <div className="space-y-8">
              {posts.slice(0, 10).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                        <span>{formatDate(post.published_date || post.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiClock} className="w-4 h-4" />
                        <span>{getReadingTime(post.content)}</span>
                      </div>
                      {post.source === 'rss' && (
                        <div className="flex items-center space-x-1">
                          <SafeIcon icon={FiHeadphones} className="w-4 h-4" />
                          <span>Podcast Episode</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-primary-800 mb-4 hover:text-primary-700 transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium transition-colors"
                      >
                        <span>Read More</span>
                        <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                      </Link>

                      {post.audio_url && (
                        <a
                          href={post.audio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-bronze-600 hover:text-bronze-700 font-medium transition-colors"
                        >
                          <SafeIcon icon={FiHeadphones} className="w-4 h-4" />
                          <span>Listen</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-6">
              Episodes are being synced from the RSS feed...
            </p>
            <div className="text-gray-500">
              <p className="mb-4">In the meantime, listen to the latest episode above!</p>
              <Link 
                to="/listen"
                className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                View All Episodes
              </Link>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-primary-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get New Posts in Your Inbox</h2>
          <p className="text-primary-100 mb-6">
            Subscribe to The Daily Note newsletter and never miss a reflection
          </p>
          <a
            href="https://jamesbrowntv.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </>
  )
}

export default Blog