import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks'
import { Layout } from './components/UI'
import { ProtectedRoute, Door } from './components/Auth'
import Home from './pages/Home'
import Listen from './pages/Listen'
import About from './pages/About'
import Education from './pages/Education'
import Speaking from './pages/Speaking'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes with layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/listen" element={<Layout><Listen /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/education" element={<Layout><Education /></Layout>} />
            <Route path="/speaking" element={<Layout><Speaking /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />

            {/* Auth routes without layout */}
            <Route path="/door" element={<Door />} />
            <Route path="/reset-password" element={<Door />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App