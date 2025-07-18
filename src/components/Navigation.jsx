import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiMenu, FiX} = FiIcons

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    {name: 'Home', path: '/'},
    {name: 'Listen', path: '/listen'},
    {name: 'About', path: '/about'},
    {name: 'Education', path: '/education'},
    {name: 'Speaking & Training', path: '/speaking'},
    {name: 'Contact', path: '/contact'}
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
            <div className="text-xl font-bold text-primary-800">
              The Daily Note
            </div>
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
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            className="md:hidden bg-white border-t border-gray-200"
          >
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
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navigation