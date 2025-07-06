import React from 'react'
import {Link} from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const {FiRss,FiMusic,FiInstagram}=FiIcons

const Footer=()=> {
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
style={{border: 'none',background: 'white'}}
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
Finding the extraordinary in the ordinary. 5 days a week,90 seconds a day,on-air and online from sea to shining sea.
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
href="https://open.spotify.com/show/5Impg5m0ZPEuE9ezKFcP5A"
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
href="https://podcasts.apple.com/us/podcast/the-daily-note-with-james-a-brown/id1679222021"
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
href="https://feeds.captivate.fm/jamesbrowninterviews/"
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
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
</svg>
</a>
<a
href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/"
target="_blank"
rel="noopener noreferrer"
className="text-cream-200 hover:text-cream-50 transition-colors"
aria-label="Follow on LinkedIn"
>
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>
</a>
</div>
</div>
</div>

<div className="border-t border-primary-700 mt-8 pt-8 text-center text-sm text-cream-300">
<p>&copy;2024 The Daily Note with James Brown. All rights reserved.</p>
</div>
</div>
</footer>
)
}

export default Footer