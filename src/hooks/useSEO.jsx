import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/seo'

export const useSEO = (pageData) => {
  const location = useLocation()

  useEffect(() => {
    // Track page view
    trackPageView(pageData.title)

    // Update document title
    document.title = pageData.title

    // Add structured data
    if (pageData.structuredData) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(pageData.structuredData)
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [location, pageData])
}

export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page changes
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
        page_location: window.location.href
      })
    }
  }, [location])
}