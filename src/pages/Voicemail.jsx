import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiHeadphones, FiArrowLeft, FiMic } = FiIcons

const Voicemail = () => {
  // Load SpeakPipe script
  useEffect(() => {
    const loadSpeakPipe = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = `
        (function(d){var app=d.createElement('script');app.type='text/javascript';app.async=true;app.src='https://www.speakpipe.com/loader/olcg9mh0oq0khilucima6zos4b3q0jua.js';var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(app,s);})(document);
      `
      document.head.appendChild(script)
    }

    const timer = setTimeout(loadSpeakPipe, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Helmet>
        <title>Leave a Voice Message - The Daily Note</title>
        <meta
          name="description"
          content="Leave James A. Brown a voice message about The Daily Note podcast. Your feedback helps make the show better."
        />
        <link rel="canonical" href="https://thedailynote.net/voicemail" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>Back to Contact</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiMic} className="w-8 h-8 text-primary-700" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Leave a Voice Message
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have feedback on The Daily Note? Share your thoughts directly with James A. Brown.
          </p>
        </div>

        {/* Voice Message Widget */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="text-center mb-6">
            <SafeIcon icon={FiHeadphones} className="w-12 h-12 mx-auto mb-4 text-primary-600" />
            <h2 className="text-2xl font-bold text-primary-700 mb-4">
              Record Your Message
            </h2>
            <p className="text-gray-600 mb-6">
              Your thoughts help make The Daily Note better. Share what resonates with you, 
              suggest topics, or just say hello.
            </p>
          </div>

          {/* SpeakPipe Widget */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="speakpipe-iframe-wrapper">
              <iframe
                src="https://www.speakpipe.com/widget/inline/olcg9mh0oq0khilucima6zos4b3q0jua"
                width="100%"
                height="300"
                frameBorder="0"
                title="SpeakPipe Voice Message Widget"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-primary-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-primary-800 mb-4">How to Leave a Message</h3>
          <ol className="list-decimal list-inside space-y-2 text-primary-700">
            <li>Click the record button above</li>
            <li>Allow microphone access when prompted</li>
            <li>Speak your message clearly</li>
            <li>Click stop when finished</li>
            <li>Preview your message and send</li>
          </ol>
          <p className="text-primary-600 text-sm mt-4">
            Your message will be sent directly to James. Response times vary, but all messages are listened to!
          </p>
        </div>

        {/* Alternative Contact Methods */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-primary-700 mb-4">Other Ways to Connect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="mailto:support@thedailynote.net?subject=Feedback on The Daily Note"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">📧</span>
              <div>
                <div className="font-medium text-gray-700">Email Feedback</div>
                <div className="text-sm text-gray-500">support@thedailynote.net</div>
              </div>
            </a>
            <Link
              to="/contact"
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">💬</span>
              <div>
                <div className="font-medium text-gray-700">Contact Form</div>
                <div className="text-sm text-gray-500">Full contact options</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Voicemail