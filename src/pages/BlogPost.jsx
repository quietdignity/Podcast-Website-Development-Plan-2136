import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { getBlogPost } from '../services/blogApi'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiCalendar, FiClock, FiArrowLeft, FiShare2, FiHeadphones } = FiIcons

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      const result = await getBlogPost(slug)
      if (result.success) {
        setPost(result.data)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
        <Link
          to="/blog"
          className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - The Daily Note</title>
        <meta name="description" content={post.excerpt || post.title} />
        <link rel="canonical" href={`https://thedailynote.net/blog/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://thedailynote.net/blog/${post.slug}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-800 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiCalendar} className="w-5 h-5" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-5 h-5" />
                <span>{getReadingTime(post.content)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {post.audio_url && (
                <a
                  href={post.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-bronze-100 text-bronze-700 hover:bg-bronze-200 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <SafeIcon icon={FiHeadphones} className="w-4 h-4" />
                  <span>Listen</span>
                </a>
              )}

              <button
                onClick={sharePost}
                className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiShare2} className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {post.excerpt && (
            <div className="bg-primary-50 rounded-lg p-6 border-l-4 border-primary-500">
              <p className="text-lg text-primary-800 italic leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-gray-800 leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-primary-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Enjoyed this post?</h2>
            <p className="text-primary-100 mb-6">
              Get The Daily Note delivered to your inbox every morning at 6 AM
            </p>
            <a
              href="https://jamesbrowntv.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Subscribe to The Daily Note
            </a>
          </div>

          {/* Back to Blog */}
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back to All Posts</span>
            </Link>
          </div>
        </motion.footer>
      </article>
    </>
  )
}

export default BlogPost