import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/useAuth.jsx'
import ProtectedAdminRoute from './components/Auth/ProtectedAdminRoute'
import './App.css'

// Components
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Listen from './pages/Listen'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Education from './pages/Education'
import Speaking from './pages/Speaking'
import Contact from './pages/Contact'
import DoorPage from './pages/Door'
import Dashboard from './pages/Dashboard'

// Admin Pages
import AdminDashboard from './pages/AdminDashboard'
import AdminBlog from './pages/AdminBlog'
import AdminBlogNew from './pages/AdminBlogNew'
import AdminBlogEdit from './pages/AdminBlogEdit'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/listen" element={<Listen />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/education" element={<Education />} />
              <Route path="/speaking" element={<Speaking />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/door" element={<DoorPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/blog" element={
                <ProtectedAdminRoute>
                  <AdminBlog />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/blog/new" element={
                <ProtectedAdminRoute>
                  <AdminBlogNew />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/blog/edit/:id" element={
                <ProtectedAdminRoute>
                  <AdminBlogEdit />
                </ProtectedAdminRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App