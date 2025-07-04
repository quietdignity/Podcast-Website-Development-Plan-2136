import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiClock, FiHeart, FiUsers, FiThumbsUp } = FiIcons;

const Home = () => {
  const valueProps = [
    {
      icon: FiClock,
      title: "Time as Your Most Valuable Asset",
      description: "Wisdom about protecting your hours and owning your day"
    },
    {
      icon: FiHeart,
      title: "Real Connection Over Digital Noise",
      description: "Thoughts on friendship, loneliness, and what we've lost"
    },
    {
      icon: FiThumbsUp,
      title: "Extraordinary in the Ordinary",
      description: "Finding philosophy in dogs, weather, and everyday moments"
    },
    {
      icon: FiUsers,
      title: "Independent Thinking",
      description: "Questions that help you build the life you actually want"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Daily Note with James Brown",
    "description": "Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become. James Brown finds meaning in ordinary life.",
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
  };

  return (
    <>
      <Helmet>
        <title>The Daily Note with James Brown - Finding the extraordinary in ordinary moments</title>
        <meta name="description" content="Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become. James Brown finds meaning in ordinary life and asks the questions others are afraid to ask." />
        <meta name="keywords" content="daily wisdom, philosophy, ordinary moments, James Brown, independent thinking, meaningful life, podcast, life reflection" />
        <meta name="author" content="James Brown" />
        <link rel="canonical" href="https://thedailynote.net/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="The Daily Note with James Brown - Finding the extraordinary in ordinary moments" />
        <meta property="og:description" content="Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thedailynote.net/" />
        <meta property="og:image" content="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Daily Note with James Brown" />
        <meta name="twitter:description" content="Finding the extraordinary in ordinary moments" />
        <meta name="twitter:image" content="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg" />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-cream-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              The Daily Note with James Brown
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-cream-200"
            >
              Finding the extraordinary in ordinary moments
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-12 text-cream-300 max-w-4xl mx-auto"
            >
              Daily wisdom about the small moments, hard choices, and quiet truths that shape who we become. 
              James Brown finds meaning in ordinary life and asks the questions others are afraid to ask.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/listen" 
                className="bg-bronze-500 hover:bg-bronze-600 text-cream-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Listen to Today's Episode</span>
              </Link>
              <a 
                href="https://knowyourpowernow.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-cream-50 hover:bg-cream-50 hover:text-primary-800 text-cream-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Get Know Your Power Course ($397)
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg border border-cream-300 hover:shadow-lg transition-shadow bg-cream-500"
              >
                <div className="bg-bronze-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={prop.icon} className="w-8 h-8 text-bronze-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary-800">{prop.title}</h3>
                <p className="text-charcoal-800">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Today's Episode</h2>
            <p className="text-charcoal-800 text-lg">90-second reflections on finding meaning in the everyday</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream-500 rounded-lg shadow-lg p-8">
              <div style={{ width: '100%', height: '200px', marginBottom: '20px', borderRadius: '6px', overflow: 'hidden' }}>
                <iframe 
                  style={{ width: '100%', height: '200px' }} 
                  frameBorder="no" 
                  scrolling="no" 
                  allow="clipboard-write" 
                  seamless 
                  src="https://player.captivate.fm/show/b56182bf-22f2-42e4-b14d-6eb32f52dd81"
                  title="The Daily Note Podcast Player"
                />
              </div>
              <div className="text-center">
                <Link 
                  to="/listen" 
                  className="bg-primary-800 hover:bg-primary-900 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  View All Episodes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Promotion */}
      <section className="py-20 bg-bronze-500 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Action?</h2>
            <p className="text-xl mb-8 text-cream-100">
              Learn the insider strategies that actually work when you need to influence change
            </p>
            <div className="bg-cream-500 text-primary-800 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="mb-6">
                <img 
                  src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648259329-knowyourpower.jpg" 
                  alt="Know Your Power Course" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">Know Your Power Course</h3>
              <p className="text-lg mb-6">
                The complete guide to effective advocacy and getting what you want from government
              </p>
              <div className="text-3xl font-bold mb-6">$397</div>
              <a 
                href="https://knowyourpowernow.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-bronze-500 hover:bg-bronze-600 text-cream-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-block"
              >
                Get Instant Access
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About James Brief */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">About James Brown</h2>
              <p className="text-lg text-charcoal-800 mb-6">
                James Brown is an independent-thinking millennial who honors his working-class roots while questioning modern life's trade-offs. 
                With experience as an award-winning journalist and government communications professional, he brings both professional insight 
                and personal authenticity to daily reflections on finding the extraordinary in ordinary moments.
              </p>
              <p className="text-lg text-charcoal-800 mb-6">
                In a world optimized for productivity and performance, James offers something different: permission to pause and find meaning 
                in the moments others overlook. Not tips for optimization, but wisdom for discovering what's already extraordinary about your ordinary life.
              </p>
              <Link 
                to="/about" 
                className="bg-primary-800 hover:bg-primary-900 text-cream-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More About James
              </Link>
            </div>
            <div className="text-center">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648064783-JamesBrown.jpg" 
                alt="James Brown" 
                className="w-80 h-80 rounded-full mx-auto object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Themes */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">Recent Themes</h2>
            <p className="text-charcoal-800 text-lg">What James has been exploring lately</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-cream-500 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">The courage to be ordinary</h3>
              <p className="text-charcoal-800">Finding peace in routine and embracing the beauty of unexceptional moments</p>
            </div>
            <div className="bg-cream-500 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">Loneliness as a systems problem</h3>
              <p className="text-charcoal-800">Why isolation isn't a personal failing but a reflection of how we've structured society</p>
            </div>
            <div className="bg-cream-500 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">Lost dinner table debates</h3>
              <p className="text-charcoal-800">What we lose when families stop having conversations that matter</p>
            </div>
            <div className="bg-cream-500 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">Handling your own problems</h3>
              <p className="text-charcoal-800">Discovering self-reliance in an outsourced world</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-primary-800 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
            <p className="text-cream-200 text-lg">Get episodes delivered to your inbox</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <iframe 
              src="https://jamesbrowntv.substack.com/embed" 
              width="100%" 
              height="320" 
              style={{ border: '1px solid #EEE', background: 'white', borderRadius: '8px' }} 
              frameBorder="0" 
              scrolling="no"
              title="Newsletter Signup"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;