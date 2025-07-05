import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const StickyBar = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-bronze-500 text-cream-50 h-10 flex items-center justify-center text-sm font-medium">
    <div className="flex items-center space-x-6">
      <span className="hidden sm:inline">New Episode Daily</span>
      <Link to="/listen" className="flex items-center space-x-2 hover:text-cream-200 transition-colors">
        <span>🎧</span>
        <span>Listen Now</span>
      </Link>
      <a 
        href="https://jamesbrowntv.substack.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center space-x-2 hover:text-cream-200 transition-colors"
      >
        <span>✉️</span>
        <span>Subscribe</span>
      </a>
    </div>
  </div>
)

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Listen', path: '/listen' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Speaking & Training', path: '/speaking' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-10 left-0 right-0 z-40 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751650292381-blob" 
              alt="The Daily Note Logo" 
              className="h-10 w-auto" 
            />
            <div className="text-xl font-bold text-primary-800">The Daily Note</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-bronze-500 border-b-2 border-bronze-500'
                    : 'text-charcoal-800 hover:text-bronze-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal-800 hover:text-bronze-500 focus:outline-none"
            >
              <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-bronze-500 bg-cream-100'
                      : 'text-charcoal-800 hover:text-bronze-500 hover:bg-cream-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const Footer = () => (
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
              <span>🎵</span>
              <a 
                href="https://open.spotify.com/show/6Syvs3L8YwsYEFAYb2bntF" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream-200 hover:text-cream-50 transition-colors"
              >
                Spotify
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>🎵</span>
              <a 
                href="https://podcasts.apple.com/us/podcast/the-james-brown-commentary/id1688955029" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cream-200 hover:text-cream-50 transition-colors"
              >
                Apple Podcasts
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <span>📡</span>
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
              📷
            </a>
            <a 
              href="https://x.com/dailynoteshow" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cream-200 hover:text-cream-50 transition-colors" 
              aria-label="Follow on X (Twitter)"
            >
              🐦
            </a>
            <a 
              href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cream-200 hover:text-cream-50 transition-colors" 
              aria-label="Follow on LinkedIn"
            >
              💼
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

const Layout = ({ children }) => (
  <div className="min-h-screen bg-cream-50">
    <StickyBar />
    <Navigation />
    <main className="pt-26">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout