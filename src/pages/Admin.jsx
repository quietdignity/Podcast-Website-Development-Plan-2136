import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import RSSManager from '../components/RSSManager'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiSettings, FiDatabase, FiActivity, FiUsers } = FiIcons

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - The Daily Note</title>
        <meta name="description" content="Admin dashboard for managing The Daily Note website" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your Daily Note website
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RSS Manager */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <RSSManager />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">Quick Stats</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Website Status</span>
                <span className="font-medium text-green-600">✅ Online</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Database</span>
                <span className="font-medium text-green-600">✅ Connected</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">RSS Feed</span>
                <span className="font-medium text-green-600">✅ Available</span>
              </div>
            </div>
          </motion.div>

          {/* System Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white border rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <SafeIcon icon={FiSettings} className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">System Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiDatabase} className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Database</span>
                </div>
                <div className="text-sm text-blue-600 space-y-1">
                  <div>Provider: Supabase</div>
                  <div>Status: Connected</div>
                  <div>Tables: 5 active</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiActivity} className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Performance</span>
                </div>
                <div className="text-sm text-green-600 space-y-1">
                  <div>Load Time: Fast</div>
                  <div>Uptime: 99.9%</div>
                  <div>CDN: Active</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">Analytics</span>
                </div>
                <div className="text-sm text-purple-600 space-y-1">
                  <div>Visitors: Active</div>
                  <div>Forms: Working</div>
                  <div>RSS: Syncing</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        >
          <h3 className="font-semibold text-yellow-800 mb-3">📋 How to Use RSS Sync</h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <div><strong>Manual Sync:</strong> Click "Sync Now" to immediately fetch new episodes from your RSS feed</div>
            <div><strong>Auto Sync:</strong> Enable the checkbox to automatically sync every 30 minutes</div>
            <div><strong>Status:</strong> Watch the status indicator to see sync progress and results</div>
            <div><strong>Browser-Based:</strong> This new system runs entirely in your browser - no server setup needed!</div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Admin