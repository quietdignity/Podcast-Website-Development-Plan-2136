import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PostEditor from '../components/BlogEditor/PostEditor'
import { getBlogPost } from '../services/blogApi'

const AdminBlogEdit = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      // Get post by ID instead of slug
      try {
        const { data, error } = await supabase
          .from('blog_posts_daily_note_2024')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600">The post you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Edit: {post.title} - The Daily Note Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PostEditor post={post} />
      </div>
    </>
  )
}

export default AdminBlogEdit