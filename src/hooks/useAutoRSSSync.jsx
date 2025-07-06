import { useState, useEffect } from 'react'

export const useAutoRSSSync = () => {
  const [lastSync, setLastSync] = useState(null)
  const [isAutoSyncing, setIsAutoSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState('idle')
  const [syncError, setSyncError] = useState(null)

  // Check if auto-sync should run (every 6 hours)
  useEffect(() => {
    const checkAutoSync = () => {
      const lastSyncTime = localStorage.getItem('lastRSSSync')
      const now = new Date().getTime()
      const sixHours = 6 * 60 * 60 * 1000 // 6 hours in milliseconds
      // For testing, reduce to 5 minutes: const fiveMinutes = 5 * 60 * 1000

      if (!lastSyncTime || (now - parseInt(lastSyncTime)) > sixHours) {
        console.log('⏰ Time for auto RSS sync')
        runAutoSync()
      }
    }

    // Check immediately and then every hour
    checkAutoSync()
    const interval = setInterval(checkAutoSync, 60 * 60 * 1000) // Check every hour

    return () => clearInterval(interval)
  }, [])

  const runAutoSync = async () => {
    try {
      setIsAutoSyncing(true)
      setSyncStatus('syncing')
      setSyncError(null)

      console.log('🔄 Running automatic RSS sync...')

      const response = await fetch('/.netlify/functions/auto-rss-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Check if response is ok first
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Check content type before parsing as JSON
      const contentType = response.headers.get('content-type')
      
      let result
      if (contentType && contentType.includes('application/json')) {
        result = await response.json()
      } else {
        // If not JSON, get as text and try to understand what went wrong
        const text = await response.text()
        console.error('❌ Non-JSON response received:', text.substring(0, 200))
        throw new Error('Server returned non-JSON response. Check function logs.')
      }

      console.log('📊 RSS sync response:', result)

      if (result.success) {
        console.log('✅ Auto RSS sync completed:', result.message)
        setSyncStatus('completed')
        setLastSync(new Date())
        localStorage.setItem('lastRSSSync', new Date().getTime().toString())

        // Show notification if new posts were added
        if (result.data && result.data.inserted > 0) {
          console.log(`🎉 ${result.data.inserted} new blog posts added from RSS!`)
          
          // Dispatch custom event for components that want to refresh
          window.dispatchEvent(new CustomEvent('rssSync', {
            detail: {
              newPosts: result.data.inserted,
              message: result.message
            }
          }))
        }
      } else {
        console.error('❌ Auto RSS sync failed:', result.error)
        setSyncStatus('failed')
        setSyncError(result.error)
      }

    } catch (error) {
      console.error('❌ Auto RSS sync error:', error)
      setSyncStatus('failed')
      setSyncError(error.message)
    } finally {
      setIsAutoSyncing(false)
      
      // Reset status after 10 seconds for better visibility
      setTimeout(() => {
        setSyncStatus('idle')
        setSyncError(null)
      }, 10000)
    }
  }

  const manualSync = async () => {
    await runAutoSync()
  }

  return {
    isAutoSyncing,
    syncStatus,
    syncError,
    lastSync,
    manualSync
  }
}