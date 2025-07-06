import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import RichTextEditor from './RichTextEditor'
import { createBlogPost, updateBlogPost, getCategories, generateSlug } from '../../services/blogAdminApi'
import SafeIcon from '../../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiSave, FiEye, FiX, FiLoader } = FiIcons

const PostEditor = ({ post = null, onSave, onCancel }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    meta_description: '',
    category_id: '',
    status: 'draft',
    featured_image: '',
    tags: []
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        meta_description: post.meta_description || '',
        category_id: post.category_id || '',
        status: post.status || 'draft',
        featured_image: post.featured_image || '',
        tags: Array.isArray(post.tags) ? post.tags : []
      })
    }
    fetchCategories()
  }, [post])

  const fetchCategories = async () => {
    const result = await getCategories()
    if (result.success) {
      setCategories(result.data)
    }
  }

  const handleTitleChange = (title) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleSave = async (status = 'draft') => {
    setLoading(true)
    setError(null)

    try {
      const postData = {
        ...formData,
        status,
        // Generate excerpt from content if not provided
        excerpt: formData.excerpt || formData.content.substring(0, 200) + '...'
      }

      let result
      if (post?.id) {
        result = await updateBlogPost(post.id, postData)
      } else {
        result = await createBlogPost(postData)
      }

      if (result.success) {
        if (onSave) {
          onSave(result.data)
        } else {
          navigate('/admin/blog')
        }
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTagsChange = (tagString) => {
    const tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag)
    setFormData(prev => ({ ...prev, tags }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {post ? 'Edit Post' : 'New Post'}
            </h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleSave('draft')}
                disabled={loading}
                className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <SafeIcon icon={FiLoader} className="w-4 h-4 animate-spin" />
                ) : (
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                )}
                <span>Save Draft</span>
              </button>
              
              <button
                onClick={() => handleSave('published')}
                disabled={loading}
                className="bg-primary-700 hover:bg-primary-800 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiEye} className="w-4 h-4" />
                <span>Publish</span>
              </button>
              
              <button
                onClick={onCancel || (() => navigate('/admin/blog'))}
                className="text-gray-600 hover:text-gray-800"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="url-friendly-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: /blog/{formData.slug}
            </p>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              placeholder="Write your post content here..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Brief description of the post..."
            />
          </div>

          {/* Category and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select category...</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description (SEO)
            </label>
            <textarea
              value={formData.meta_description}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={2}
              placeholder="SEO description for search engines..."
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.meta_description.length}/160 characters
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PostEditor