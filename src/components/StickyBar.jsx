import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeadphones, FiMail } = FiIcons

const StickyBar = () => {
  return (
    <motion.div 
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bronze-500 text-cream-50 h-10 flex items-center justify-center text-sm font-medium"
    >
      <div className="flex items-center space-x-6">
        <span className="hidden sm:inline">New Episode Daily</span>
        <Link to="/listen" className="flex items-center space-x-2 hover:text-cream-200 transition-colors">
          <SafeIcon icon={FiHeadphones} className="w-4 h-4" />
          <span>Listen Now</span>
        </Link>
        <Link to="/contact" className="flex items-center space-x-2 hover:text-cream-200 transition-colors">
          <SafeIcon icon={FiMail} className="w-4 h-4" />
          <span>Subscribe</span>
        </Link>
      </div>
    </motion.div>
  )
}

export default StickyBar