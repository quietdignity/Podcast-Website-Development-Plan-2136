import React from 'react'
import { Helmet } from 'react-helmet-async'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMail, FiMic, FiBookOpen, FiClock, FiMessageSquare, FiHeadphones } = FiIcons

const Contact = () => {
  const quickContactMethods = [
    {
      icon: FiMail,
      title: 'Direct Email',
      description: 'For immediate contact',
      action: 'support@thedailynote.net',
      href: 'mailto:support@thedailynote.net',
      color: 'text-primary-700'
    },
    {
      icon: FiMic,
      title: 'Speaking Inquiries',
      description: 'Priority response for events',
      action: 'support@thedailynote.net',
      href: 'mailto:support@thedailynote.net?subject=Speaking Inquiry',
      color: 'text-bronze-600'
    },
    {
      icon: FiBookOpen,
      title: 'Course Support',
      description: 'Know Your Power help',
      action: 'Email with "Course Support"',
      href: 'mailto:support@thedailynote.net?subject=Course Support',
      color: 'text-green-600'
    }
  ]

  const responseTimeData = [
    { type: 'General Inquiries', time: '24-48 hours' },
    { type: 'Speaking Requests', time: 'Same day' },
    { type: 'Course Support', time: '24 hours' },
    { type: 'Media Requests', time: 'Same day' }
  ]

  return (
    <>
      <Helmet>
        <title>Contact - The Daily Note</title>
        <meta name="description" content="Get in touch with James A. Brown and The Daily Note. Direct email contact and voice messages for feedback on the show." />
        <link rel="canonical" href="https://thedailynote.net/contact" />
        
        {/* SpeakPipe Script */}
        <script type="text/javascript">
          {`
            (function(d){
              var app = d.createElement('script'); 
              app.type = 'text/javascript'; 
              app.async = true;
              app.src = 'https://www.speakpipe.com/loader/olcg9mh0oq0khilucima6zos4b3q0jua.js';
              var s = d.getElementsByTagName('script')[0]; 
              s.parentNode.insertBefore(app, s);
            })(document);
          `}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Choose the best way to connect below.
          </p>
        </div>

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickContactMethods.map((method, index) => (
            <div
              key={method.title}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <SafeIcon icon={method.icon} className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{method.description}</p>
              <a
                href={method.href}
                className={`${method.color} hover:underline font-medium`}
              >
                {method.action}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Voice Messages Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <SafeIcon icon={FiHeadphones} className="w-6 h-6 text-primary-700" />
              <h2 className="text-2xl font-bold text-primary-700">Leave a Voice Message</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Have feedback on the show? Leave James a voice message directly! Your thoughts help make The Daily Note better.
            </p>
            
            {/* SpeakPipe Widget Container */}
            <div id="speakpipe-widget" className="bg-gray-50 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <SafeIcon icon={FiMic} className="w-8 h-8 mx-auto mb-2" />
                <p>Voice message widget loading...</p>
                <p className="text-sm">Click to record your message for James</p>
              </div>
            </div>
          </div>

          {/* Comments & Feedback Section */}
          <div className="space-y-8">
            {/* Email Comments */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiMessageSquare} className="w-6 h-6 text-primary-700" />
                <h2 className="text-2xl font-bold text-primary-700">Comments on the Show</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Share your thoughts on recent episodes, suggest topics, or just say hello.
              </p>
              <a
                href="mailto:support@thedailynote.net?subject=Comments on The Daily Note"
                className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span>Email Your Comments</span>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Stay Connected</h2>
              <p className="text-gray-600 mb-4">Get episodes delivered to your inbox daily at 6 AM</p>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <iframe
                  src="https://jamesbrowntv.substack.com/embed"
                  width="100%"
                  height="240"
                  style={{ border: 'none', background: 'white' }}
                  frameBorder="0"
                  scrolling="no"
                  title="Subscribe to The Daily Note Newsletter"
                />
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-700" />
                <h3 className="text-lg font-bold text-primary-700">Response Times</h3>
              </div>
              <div className="space-y-3 text-sm">
                {responseTimeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{item.type}:</span>
                    <span className="font-medium text-primary-700">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary-700 mb-4">Follow The Daily Note</h2>
              <div className="flex space-x-6">
                <a
                  href="https://x.com/dailynoteshow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-bronze-600 transition-colors"
                  aria-label="Follow on X (Twitter)"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/the-daily-note-with-james-a-brown/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-bronze-600 transition-colors"
                  aria-label="Follow on LinkedIn"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/dailynoteshow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-bronze-600 transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297L3.182 14.754c-.49-.49-.49-1.297 0-1.787s1.297-.49 1.787 0l1.937 1.937c.49.49 1.297.49 1.787 0l7.744-7.744c.49-.49 1.297-.49 1.787 0s.49 1.297 0 1.787L9.48 16.691c-.49.49-1.297.49-1.787 0-.245-.245-.367-.613-.245-.98z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 bg-bronze-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">Other Ways to Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-primary-700 mb-2">📧 Email</h3>
              <p className="text-gray-600">support@thedailynote.net</p>
              <p className="text-gray-500">For all inquiries</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-700 mb-2">🎙️ Voice Messages</h3>
              <p className="text-gray-600">Use the widget above</p>
              <p className="text-gray-500">Share your thoughts directly</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-700 mb-2">📱 Social Media</h3>
              <p className="text-gray-600">@dailynoteshow</p>
              <p className="text-gray-500">Follow for updates</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact