import React, { createContext, useContext } from 'react'
import { Helmet } from 'react-helmet-async'

const SEOContext = createContext()

export const useSEO = () => {
  const context = useContext(SEOContext)
  if (!context) {
    throw new Error('useSEO must be used within SEOProvider')
  }
  return context
}

const SEOProvider = ({ children }) => {
  const siteUrl = 'https://thedailynote.net'
  const siteName = 'The Daily Note'
  const defaultImage = 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg'
  
  const generateMetaTags = (pageData) => {
    const {
      title,
      description,
      keywords,
      canonicalUrl,
      ogImage,
      ogType = 'website',
      structuredData,
      noIndex = false
    } = pageData

    return (
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="author" content="James A. Brown" />
        <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={`${siteUrl}${canonicalUrl || ''}`} />
        <meta property="og:image" content={ogImage || defaultImage} />
        <meta property="og:site_name" content={siteName} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage || defaultImage} />
        <meta name="twitter:site" content="@dailynoteshow" />
        <meta name="twitter:creator" content="@jamesbrown" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#1a2238" />
        <meta name="msapplication-TileColor" content="#1a2238" />
        
        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//player.captivate.fm" />
        <link rel="dns-prefetch" href="//jamesbrowntv.substack.com" />
        <link rel="dns-prefetch" href="//quest-media-storage-bucket.s3.us-east-2.amazonaws.com" />
        
        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>
    )
  }

  const value = {
    generateMetaTags,
    siteUrl,
    siteName,
    defaultImage
  }

  return (
    <SEOContext.Provider value={value}>
      {children}
    </SEOContext.Provider>
  )
}

export default SEOProvider