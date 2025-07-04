import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listen from './pages/Listen';
import About from './pages/About';
import Course from './pages/Course';
import Speaking from './pages/Speaking';
import Contact from './pages/Contact';
import GoogleAnalytics from './components/Analytics/GoogleAnalytics';
import SitemapGenerator from './components/SEO/SitemapGenerator';
import { usePageTracking } from './hooks/useSEO';
import './App.css';

function App() {
  usePageTracking();

  return (
    <HelmetProvider>
      <Router>
        <GoogleAnalytics trackingId={process.env.REACT_APP_GA_TRACKING_ID} />
        <SitemapGenerator />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listen" element={<Listen />} />
            <Route path="/about" element={<About />} />
            <Route path="/know-your-power" element={<Course />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;