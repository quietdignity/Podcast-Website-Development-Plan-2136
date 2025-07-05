// SEO utility functions
export const generateStructuredData = {
  // Website Schema
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Daily Note with James Brown",
    "description": "Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become.",
    "url": "https://thedailynote.net",
    "author": {
      "@type": "Person",
      "name": "James Brown",
      "description": "Independent-thinking millennial who finds wisdom in everyday moments"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thedailynote.net/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }),

  // Person Schema (for About page)
  person: () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "James Brown",
    "description": "Independent-thinking millennial who finds wisdom in everyday moments",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg",
    "url": "https://thedailynote.net/about",
    "sameAs": [
      "https://twitter.com/jamesbrown",
      "https://linkedin.com/in/jamesbrown"
    ],
    "jobTitle": "Podcast Host, Author, Speaker",
    "worksFor": {
      "@type": "Organization",
      "name": "The Daily Note"
    }
  }),

  // Podcast Schema
  podcast: () => ({
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "The Daily Note with James Brown",
    "description": "90-second reflections on finding the extraordinary in ordinary moments",
    "url": "https://thedailynote.net/listen",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg",
    "author": {
      "@type": "Person",
      "name": "James Brown"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Daily Note"
    },
    "webFeed": "https://feeds.captivate.fm/the-james-brown-commentary/"
  }),

  // Course Schema
  course: () => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Know Your Power: How to Get What You Want From Government",
    "description": "The insider's guide to effective advocacy and getting what you want from government",
    "provider": {
      "@type": "Person",
      "name": "James Brown"
    },
    "offers": {
      "@type": "Offer",
      "price": "1497",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "url": "https://knowyourpowernow.com",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648259329-knowyourpower.jpg"
  }),

  // Organization Schema
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Daily Note",
    "description": "Daily wisdom about finding the extraordinary in ordinary moments",
    "url": "https://thedailynote.net",
    "logo": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob",
    "founder": {
      "@type": "Person",
      "name": "James Brown"
    },
    "sameAs": [
      "https://twitter.com/thedailynote",
      "https://linkedin.com/company/thedailynote"
    ]
  })
};

// Meta tag generators
export const generateMetaTags = {
  home: () => ({
    title: "The Daily Note with James Brown - Finding the extraordinary in ordinary moments",
    description: "Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become. James Brown finds meaning in ordinary life and asks the questions others are afraid to ask.",
    keywords: "daily wisdom, philosophy, ordinary moments, James Brown, independent thinking, meaningful life, podcast, life reflection",
    canonicalUrl: "/"
  }),

  about: () => ({
    title: "About James Brown - The Daily Note",
    description: "James Brown is an independent-thinking millennial who finds wisdom in the everyday, questioning modern life's trade-offs while honoring working-class roots.",
    keywords: "James Brown, biography, independent thinking, philosophy, podcast host, speaker",
    canonicalUrl: "/about"
  }),

  listen: () => ({
    title: "Listen to The Daily Note - All Episodes",
    description: "Listen to all episodes of The Daily Note with James Brown. 90-second reflections on finding the extraordinary in ordinary moments, Monday through Friday.",
    keywords: "podcast, episodes, daily wisdom, James Brown, listen, audio",
    canonicalUrl: "/listen"
  }),

  course: () => ({
    title: "Know Your Power Course - The Daily Note",
    description: "Learn the insider's guide to effective advocacy with James Brown's Know Your Power course. Get what you want from government with proven strategies.",
    keywords: "advocacy course, government relations, political influence, James Brown, training",
    canonicalUrl: "/know-your-power"
  }),

  speaking: () => ({
    title: "Speaking & Corporate Training - The Daily Note",
    description: "Book James Brown for speaking engagements and corporate training. Featured speaker at Advanced Learning Institute conferences on employee communications.",
    keywords: "speaking, corporate training, keynote speaker, James Brown, employee communications",
    canonicalUrl: "/speaking"
  }),

  contact: () => ({
    title: "Contact - The Daily Note",
    description: "Get in touch with James Brown and The Daily Note. Contact for feedback, business inquiries, course support, and advertising opportunities.",
    keywords: "contact, James Brown, business inquiries, speaking, course support",
    canonicalUrl: "/contact"
  })
};

// SEO Analytics tracking
export const trackPageView = (pageName) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

// Social media sharing
export const generateSocialShareUrls = (url, title, description) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
  };
};