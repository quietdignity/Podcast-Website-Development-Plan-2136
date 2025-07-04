import React, { useEffect } from 'react';

const SitemapGenerator = () => {
  useEffect(() => {
    // Generate sitemap data
    const sitemapData = {
      pages: [
        { url: '/', priority: 1.0, changefreq: 'daily' },
        { url: '/about', priority: 0.8, changefreq: 'monthly' },
        { url: '/listen', priority: 0.9, changefreq: 'daily' },
        { url: '/know-your-power', priority: 0.8, changefreq: 'monthly' },
        { url: '/speaking', priority: 0.7, changefreq: 'monthly' },
        { url: '/contact', priority: 0.6, changefreq: 'monthly' }
      ]
    };

    // Store in localStorage for build process
    localStorage.setItem('sitemapData', JSON.stringify(sitemapData));
  }, []);

  return null;
};

export default SitemapGenerator;