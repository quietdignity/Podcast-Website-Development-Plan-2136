import React from 'react'
import { Link } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiRss, FiTwitter, FiLinkedin, FiInstagram, FiMusic } = FiIcons

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section at Top */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-cream-50 mb-4">
            Get The Daily Note in Your Email Daily at 6 a.m.
          </h3>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://jamesbrowntv.substack.com/embed" 
              width="100%" 
              height="200" 
              style={{border: 'none', background: 'white'}} 
              frameBorder="0" 
              scrolling="no" 
              title="Subscribe to The Daily Note Newsletter"
            />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob" 
                alt="The Daily Note Logo" 
                className="h-8 w-auto" 
              />
              <h3 className="text-lg font-bold">The Daily Note</h3>
            </div>
            <p className="text-cream-200 text-sm">
              Finding the extraordinary in the ordinary. 5 days a week, 90 seconds a day, on-air and online from sea to shining sea.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listen" className="text-cream-200 hover:text-cream-50 transition-colors">Listen</Link></li>
              <li><Link to="/about" className="text-cream-200 hover:text-cream-50 transition-colors">About</Link></li>
              <li><Link to="/education" className="text-cream-200 hover:text-cream-50 transition-colors">Education</Link></li>
              <li><Link to="/speaking" className="text-cream-200 hover:text-cream-50 transition-colors">Speaking</Link></li>
              <li><Link to="/contact" className="text-cream-200 hover:text-cream-50 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Listen</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiMusic} className="w-4 h-4" />
                <a 
                  href="https://open.spotify.com/show/4EygeQPe0pyQHQs3i2Lf7j" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream-200 hover:text-cream-50 transition-colors"
                >
                  Spotify
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiMusic} className="w-4 h-4" />
                <a 
                  href="https://podcasts.apple.com/us/podcast/the-daily-note-with-james-brown/id1760569557" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream-200 hover:text-cream-50 transition-colors"
                >
                  Apple Podcasts
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiRss} className="w-4 h-4" />
                <a 
                  href="https://feeds.captivate.fm/the-james-brown-commentary/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cream-200 hover:text-cream-50 transition-colors"
                >
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/dailynoteshow" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream-200 hover:text-cream-50 transition-colors" 
                aria-label="Follow on Instagram"
              >
                <SafeIcon icon={FiInstagram} className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/dailynoteshow" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream-200 hover:text-cream-50 transition-colors" 
                aria-label="Follow on X (Twitter)"
              >
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream-200 hover:text-cream-50 transition-colors" 
                aria-label="Follow on LinkedIn"
              >
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-sm text-cream-300">
          <p>&copy; 2024 The Daily Note with James Brown. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer