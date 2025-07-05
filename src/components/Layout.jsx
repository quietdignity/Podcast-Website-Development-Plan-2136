import React from 'react'
import StickyBar from './StickyBar'
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => (
  <div className="min-h-screen bg-cream-50">
    <StickyBar />
    <Navigation />
    <main className="pt-20">
      {children}
    </main>
    <Footer />
  </div>
)

export default Layout