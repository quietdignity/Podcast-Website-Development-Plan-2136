import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx'
import { useAdminUser } from '../hooks/useAdminUser.jsx'
import { getAdminBlogPosts } from '../services/blogAdminApi'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiFileText, FiPlus, FiUsers, FiEye, FiEdit2, FiSettings } = FiIcons

const AdminDashboard = () => {
  const { user } = useAuth()
  const { adminData } = useAdminUser()
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPosts: []
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const result = await getAdminBlogPosts()
    if (result.success) {
      const posts = result.data
      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        recentPosts: posts.slice(0, 5)
      })
    }
  }

  const quickActions = [
    {
      title: 'New Blog Post',
      description: 'Create a new blog post',
      icon: FiPlus,
      href: '/admin/blog/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Posts',
      description: 'View and edit all posts',
      icon: FiFileText,
      href: '/admin/blog',
      color: 'bg-green-500'
    },
    {
      title: 'Site Settings',
      description: 'Configure website settings',
      icon: FiSettings,
      href: '/admin/settings',
      color: 'bg-purple-500'
    }
  ]

  const statCards = [
    { title: 'Total Posts', value: stats.totalPosts, icon: FiFileText, color: 'text-blue-600' },
    { title: 'Published', value: stats.publishedPosts, icon: FiEye, color: 'text-green-600' },
    { title: 'Drafts', value: stats.draftPosts, icon: FiEdit2, color: 'text-yellow-600' }
  ]

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - The Daily Note</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.firstName || 'James'}!
          </h1>
          <p className="text-gray-600">
            Manage your blog and website content from here.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center">
                <SafeIcon icon={stat.icon} className={`w-8 h-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <SafeIcon icon={action.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
              <Link
                to="/admin/blog"
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            
            {stats.recentPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No posts yet</p>
                <Link
                  to="/admin/blog/new"
                  className="bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4" />
                  <span>Create First Post</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard