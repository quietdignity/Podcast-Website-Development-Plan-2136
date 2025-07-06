import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './App.css'

// Components
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Listen from './pages/Listen'
import About from './pages/About'
import Education from './pages/Education'
import Speaking from './pages/Speaking'
import Contact from './pages/Contact'
import Voicemail from './pages/Voicemail'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/voicemail" element={<Voicemail />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App