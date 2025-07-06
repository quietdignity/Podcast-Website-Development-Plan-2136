import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAutoRSSSync } from '../hooks/useAutoRSSSync'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiRefreshCw, FiCheck, FiAlert, FiRss, FiX } = FiIcons

const AutoRSSIndicator = () => {
  const { isAutoSyncing, syncStatus, syncError, manualSync } = useAutoRSSSync()

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <SafeIcon icon={FiRefreshCw} className="w-4 h-4 animate-spin text-blue-500" />
      case 'completed':
        return <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
      case 'failed':
        return <SafeIcon icon={FiAlert} className="w-4 h-4 text-red-500" />
      default:
        return <SafeIcon icon={FiRss} className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Syncing RSS...'
      case 'completed':
        return 'RSS synced ✅'
      case 'failed':
        return 'Sync failed ❌'
      default:
        return 'Auto RSS sync'
    }
  }

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'bg-blue-50 border-blue-200'
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <AnimatePresence>
      {(isAutoSyncing || syncStatus !== 'idle') && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 right-4 z-50 rounded-lg shadow-lg border p-4 max-w-xs ${getStatusColor()}`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon()}
            <span className="text-sm font-medium text-gray-700">
              {getStatusText()}
            </span>
          </div>
          
          {syncError && (
            <div className="text-xs text-red-600 mb-2 bg-red-100 p-2 rounded">
              <strong>Error:</strong> {syncError.substring(0, 100)}...
            </div>
          )}
          
          {syncStatus === 'idle' && (
            <button
              onClick={manualSync}
              className="w-full bg-primary-700 hover:bg-primary-800 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Manual Sync
            </button>
          )}
          
          {syncStatus === 'failed' && (
            <button
              onClick={manualSync}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors"
            >
              Retry Sync
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AutoRSSIndicator