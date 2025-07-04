import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import Home from './pages/Home'
import Listen from './pages/Listen'
import About from './pages/About'
import Education from './pages/Education'
import Speaking from './pages/Speaking'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App