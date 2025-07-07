import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const usePageTracking = () => {
  const location = useLocation()
  
  useEffect(() => {
    // Track page changes if Google Analytics is available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-RQPRMSTT5E', {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title
      })
      
      console.log('📊 Page view tracked:', location.pathname)
    }
  }, [location])
  
  return null
}

export default usePageTracking