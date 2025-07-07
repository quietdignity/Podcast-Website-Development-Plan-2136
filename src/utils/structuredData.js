// Structured Data (Schema.org) generators for better SEO

export const generateStructuredData = {
  // Website Schema
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Daily Note with James A. Brown",
    "description": "Finding the extraordinary in ordinary moments. Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become.",
    "url": "https://thedailynote.net",
    "author": {
      "@type": "Person",
      "name": "James A. Brown",
      "description": "Independent-thinking millennial who finds wisdom in everyday moments"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Daily Note",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://thedailynote.net/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }),

  // Person Schema (James A. Brown)
  person: () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "James A. Brown",
    "description": "Independent-thinking millennial who finds wisdom in everyday moments. Host of The Daily Note podcast.",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg",
    "url": "https://thedailynote.net/about",
    "sameAs": [
      "https://x.com/dailynoteshow",
      "https://www.linkedin.com/company/the-daily-note-with-james-a-brown/",
      "https://instagram.com/dailynoteshow"
    ],
    "jobTitle": "Podcast Host, Author, Speaker",
    "worksFor": {
      "@type": "Organization",
      "name": "The Daily Note"
    },
    "knowsAbout": [
      "Philosophy",
      "Daily Wisdom",
      "Independent Thinking",
      "Government Communications",
      "Advocacy"
    ]
  }),

  // Podcast Schema
  podcast: () => ({
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "The Daily Note with James A. Brown",
    "description": "Finding the extraordinary in ordinary moments. 90-second reflections on daily wisdom, Monday through Friday.",
    "url": "https://thedailynote.net/listen",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg",
    "author": {
      "@type": "Person",
      "name": "James A. Brown"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Daily Note"
    },
    "webFeed": "https://feeds.captivate.fm/jamesbrowninterviews/",
    "genre": ["Philosophy", "Self-Help", "Daily Wisdom"],
    "inLanguage": "en-US"
  }),

  // Course Schema
  course: () => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Know Your Power: How to Get What You Want From Government",
    "description": "The insider's guide to effective advocacy and getting what you want from government. Learn proven strategies from a former government communications professional.",
    "provider": {
      "@type": "Person",
      "name": "James A. Brown"
    },
    "offers": {
      "@type": "Offer",
      "price": "1497",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://knowyourpowernow.com"
    },
    "url": "https://knowyourpowernow.com",
    "image": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648259329-knowyourpower.jpg",
    "courseMode": "online",
    "educationalLevel": "intermediate",
    "teaches": [
      "Government Relations",
      "Advocacy Strategies",
      "Political Communication",
      "Coalition Building"
    ]
  }),

  // Organization Schema
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Daily Note",
    "description": "Daily wisdom about finding the extraordinary in ordinary moments",
    "url": "https://thedailynote.net",
    "logo": {
      "@type": "ImageObject",
      "url": "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob"
    },
    "founder": {
      "@type": "Person",
      "name": "James A. Brown"
    },
    "sameAs": [
      "https://x.com/dailynoteshow",
      "https://www.linkedin.com/company/the-daily-note-with-james-a-brown/",
      "https://instagram.com/dailynoteshow",
      "https://open.spotify.com/show/5Impg5m0ZPEuE9ezKFcP5A",
      "https://podcasts.apple.com/us/podcast/the-daily-note-with-james-a-brown/id1679222021"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service",
      "email": "support@thedailynote.net"
    }
  }),

  // FAQ Schema for common questions
  faq: () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is The Daily Note?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Daily Note is a daily commentary podcast that finds deeper meaning in everyday moments. Host James A. Brown explores how our world really works through thoughtful observation and authentic storytelling in 90-second episodes."
        }
      },
      {
        "@type": "Question",
        "name": "How often are new episodes released?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "New episodes are released Monday through Friday, 5 days a week. Each episode is approximately 90 seconds long."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I listen to The Daily Note?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can listen on Spotify, Apple Podcasts, or any podcast app using our RSS feed. You can also listen directly on our website."
        }
      }
    ]
  })
}