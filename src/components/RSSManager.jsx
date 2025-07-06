import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { syncRSSFeed } from '../services/rssSync'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiRefreshCw, FiCheck, FiAlert, FiPlayCircle, FiClock, FiDatabase, FiRss } = FiIcons

const RSSManager = () => {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const [syncResult, setSyncResult] = useState(null)
  const [autoSync, setAutoSync] = useState(false)

  // Load last sync from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('lastRSSSync')
    if (stored) {
      setLastSync(new Date(stored))
    }
  }, [])

  // Auto sync every 30 minutes if enabled
  useEffect(() => {
    if (!autoSync) return

    const interval = setInterval(() => {
      handleManualSync()
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearInterval(interval)
  }, [autoSync])

  const handleManualSync = async () => {
    if (syncing) return

    setSyncing(true)
    setSyncResult(null)

    try {
      console.log('🔄 Starting manual RSS sync...')
      const result = await syncRSSFeed()
      
      setSyncResult(result)
      setLastSync(new Date())
      localStorage.setItem('lastRSSSync', new Date().toISOString())
      
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('rssSync', { 
        detail: result 
      }))
    } catch (error) {
      console.error('RSS sync error:', error)
      setSyncResult({
        success: false,
        error: error.message
      })
    } finally {
      setSyncing(false)
    }
  }

  const getStatusIcon = () => {
    if (syncing) return <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin text-blue-500" />
    if (syncResult?.success) return <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500" />
    if (syncResult && !syncResult.success) return <SafeIcon icon={FiAlert} className="w-5 h-5 text-red-500" />
    return <SafeIcon icon={FiRss} className="w-5 h-5 text-gray-500" />
  }

  const getStatusColor = () => {
    if (syncing) return 'border-blue-200 bg-blue-50'
    if (syncResult?.success) return 'border-green-200 bg-green-50'
    if (syncResult && !syncResult.success) return 'border-red-200 bg-red-50'
    return 'border-gray-200 bg-white'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-lg p-6 ${getStatusColor()}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-gray-900">RSS Sync Manager</h3>
            <p className="text-sm text-gray-600">
              {syncing ? 'Syncing RSS feed...' : 'Sync podcast episodes to blog'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="rounded"
            />
            <span>Auto-sync</span>
          </label>
          
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <SafeIcon icon={syncing ? FiRefreshCw : FiPlayCircle} className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Sync Status */}
      {syncResult && (
        <div className="mb-4 p-3 rounded-lg bg-white border">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon 
              icon={syncResult.success ? FiCheck : FiAlert} 
              className={`w-4 h-4 ${syncResult.success ? 'text-green-500' : 'text-red-500'}`} 
            />
            <span className={`font-medium ${syncResult.success ? 'text-green-700' : 'text-red-700'}`}>
              {syncResult.success ? 'Sync Completed' : 'Sync Failed'}
            </span>
          </div>
          
          {syncResult.success ? (
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>New posts added:</span>
                <span className="font-medium text-green-600">{syncResult.inserted || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Posts skipped (existing):</span>
                <span className="font-medium text-yellow-600">{syncResult.skipped || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Errors:</span>
                <span className="font-medium text-red-600">{syncResult.errors || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Total processed:</span>
                <span className="font-medium text-blue-600">{syncResult.total || 0}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-600">
              {syncResult.error || 'Unknown error occurred'}
            </p>
          )}
        </div>
      )}

      {/* Last Sync */}
      {lastSync && (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <SafeIcon icon={FiClock} className="w-4 h-4" />
          <span>
            Last sync: {lastSync.toLocaleDateString()} at {lastSync.toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* RSS Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <SafeIcon icon={FiDatabase} className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">RSS Feed Info</span>
        </div>
        <div className="text-xs text-blue-600 space-y-1">
          <div>Source: https://feeds.captivate.fm/jamesbrowninterviews/</div>
          <div>Target: blog_posts_daily_note_2024 table</div>
          <div>Method: Browser-based sync with CORS proxy</div>
        </div>
      </div>
    </motion.div>
  )
}

export default RSSManager