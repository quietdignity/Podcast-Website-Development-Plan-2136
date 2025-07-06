import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getBlogPosts } from '../services/blogApi'
import AutoRSSIndicator from '../components/AutoRSSIndicator'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiArrowRight, FiSearch, FiRefreshCw, FiHeadphones, FiTestTube } = FiIcons

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [testing, setTesting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    fetchPosts()

    // Listen for auto RSS sync events
    const handleRSSSync = (event) => {
      console.log('🔄 Auto RSS sync detected:', event.detail)
      fetchPosts() // Refresh posts when auto-sync completes
    }

    window.addEventListener('rssSync', handleRSSSync)
    return () => window.removeEventListener('rssSync', handleRSSSync)
  }, [])

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchTerm, posts])

  const fetchPosts = async () => {
    try {
      const result = await getBlogPosts()
      if (result.success) {
        setPosts(result.data)
        setFilteredPosts(result.data)
      } else {
        console.error('Failed to fetch posts:', result.error)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Test if Netlify Functions are working at all
  const testNetlifyFunctions = async () => {
    setTesting(true)
    try {
      console.log('🧪 Testing Netlify Functions...')
      
      const response = await fetch('/.netlify/functions/test', {
        method: 'GET'
      })

      console.log('📊 Test response status:', response.status)
      console.log('📊 Test response URL:', response.url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Netlify Functions test result:', result)
      
      alert(`✅ Netlify Functions Working!\n\nStatus: ${response.status}\nMessage: ${result.message}`)

    } catch (error) {
      console.error('❌ Netlify Functions test error:', error)
      alert(`❌ Netlify Functions Test Failed!\n\nError: ${error.message}\n\nThis means the functions aren't deployed or accessible.`)
    } finally {
      setTesting(false)
    }
  }

  const handleManualRSSSync = async () => {
    setSyncing(true)
    try {
      console.log('🔄 Starting manual RSS sync...')
      
      const response = await fetch('/.netlify/functions/auto-rss-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('📊 RSS sync response status:', response.status)
      console.log('📊 RSS sync response URL:', response.url)

      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Check content type before parsing as JSON
      const contentType = response.headers.get('content-type')
      console.log('📄 Response content type:', contentType)

      let result
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        // If not JSON, get as text and try to understand what went wrong
        const text = await response.text()
        console.error('❌ Non-JSON response received:', text.substring(0, 200))
        throw new Error('Server returned non-JSON response. Check function logs.')
      }

      console.log('📊 Manual sync result:', result)

      if (result.success) {
        const message = `✅ RSS Sync Complete!\n\nInserted: ${result.data.inserted} new posts\nErrors: ${result.data.errors}\nTotal processed: ${result.data.total}\nNew posts: ${result.data.newPosts}`
        alert(message)
        
        // Refresh the posts
        await fetchPosts()
      } else {
        alert(`❌ RSS Sync Failed: ${result.error}`)
      }

    } catch (error) {
      console.error('RSS sync error:', error)
      alert(`❌ RSS Sync Error: ${error.message}`)
    } finally {
      setSyncing(false)
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
        <meta name="description" content="Read James A. Brown's latest thoughts on finding the extraordinary in ordinary moments. Daily wisdom and reflections from The Daily Note." />
        <link rel="canonical" href="https://thedailynote.net/blog" />
      </Helmet>

      {/* Auto RSS Sync Indicator */}
      <AutoRSSIndicator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            The Daily Note Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Written reflections on finding the extraordinary in ordinary moments
          </p>

          {/* Admin Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="max-w-md relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Test Netlify Functions Button */}
            <button
              onClick={testNetlifyFunctions}
              disabled={testing}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiTestTube} className={`w-5 h-5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Functions'}</span>
            </button>

            {/* Manual RSS Sync Button */}
            <button
              onClick={handleManualRSSSync}
              disabled={syncing}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiRefreshCw} className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing RSS...' : 'Manual Sync'}</span>
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              🤖 <strong>Auto RSS Sync:</strong> New episodes are automatically imported every 6 hours • {posts.length} posts available • Manual sync available above
            </p>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {searchTerm ? 'No posts found matching your search.' : 'No blog posts available yet.'}
            </p>
            {!searchTerm && (
              <div className="space-y-4">
                <button
                  onClick={testNetlifyFunctions}
                  disabled={testing}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
                >
                  {testing ? 'Testing Functions...' : 'Test Netlify Functions First'}
                </button>
                <button
                  onClick={handleManualRSSSync}
                  disabled={syncing}
                  className="bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {syncing ? 'Syncing...' : 'Import from RSS Feed'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post, index) => (
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
                      <span>{formatDate(post.published_date)}</span>
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