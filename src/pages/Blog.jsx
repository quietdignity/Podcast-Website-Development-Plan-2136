import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getBlogPosts } from '../services/blogApi'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiArrowRight, FiSearch, FiHeadphones } = FiIcons

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  useEffect(() => {
    fetchPosts()
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
        // Only show published posts to public
        const publishedPosts = result.data.filter(post => post.status === 'published')
        setPosts(publishedPosts)
        setFilteredPosts(publishedPosts)
      } else {
        console.error('Failed to fetch posts:', result.error)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
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
        <meta name="description" content="Read James A. Brown's latest thoughts on finding the extraordinary in ordinary moments. Daily wisdom and reflections from The Daily Note." />
        <link rel="canonical" href="https://thedailynote.net/blog" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            The Daily Note Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Written reflections on finding the extraordinary in ordinary moments
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {searchTerm ? 'No posts found matching your search.' : 'No blog posts available yet.'}
            </p>
            {!searchTerm && (
              <div className="text-gray-500">
                <p>Check back soon for new reflections and insights.</p>
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