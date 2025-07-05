import React from 'react'
import { Helmet } from 'react-helmet-async'
import SpeakingForm from '../components/SpeakingForm'

const Speaking = () => {
  const speakingTopics = [
    {
      title: "The Future of Employee Communications",
      description: "Insights on workforce communication and distributed team management",
      details: [
        "Building connection in remote and hybrid environments",
        "Authentic communication in digital spaces",
        "Leading through uncertainty and change"
      ]
    },
    {
      title: "Finding Meaning in Modern Work",
      description: "Helping teams discover purpose beyond productivity",
      details: [
        "The extraordinary in ordinary work moments",
        "Building genuine workplace relationships",
        "Time as your most valuable currency"
      ]
    },
    {
      title: "Leadership in an Outsourced World",
      description: "Developing self-reliance and authentic leadership",
      details: [
        "Handling challenges without defaulting to outsourcing",
        "Building resilience in complex systems",
        "Independent thinking in connected organizations"
      ]
    }
  ]

  const trainingFormats = [
    "Keynote presentations",
    "Half-day workshops",
    "Executive coaching sessions",
    "Team communication training"
  ]

  return (
    <>
      <Helmet>
        <title>Speaking & Corporate Training - The Daily Note</title>
        <meta name="description" content="Book James Brown for speaking engagements and corporate training. Featured speaker at Advanced Learning Institute conferences on employee communications." />
        <link rel="canonical" href="https://thedailynote.net/speaking" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Speaking & Corporate Training
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Communication expertise for your organization
          </p>
        </div>

        {/* Quick Contact CTA */}
        <div className="bg-primary-700 text-white rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Book James?</h2>
          <p className="text-lg mb-6 text-primary-100">
            Get availability and pricing for your next event
          </p>
          <a
            href="#speaking-form"
            className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center space-x-2"
          >
            <span>📧</span>
            <span>Submit Speaking Inquiry</span>
          </a>
          <p className="text-primary-200 text-sm mt-4">
            Response within 24 hours • Include event date for priority response
          </p>
        </div>

        {/* Featured Speaking */}
        <div className="bg-bronze-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Featured Speaker</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-4">
                James has been a featured speaker at Advanced Learning Institute's premier employee communications conferences,
                sharing insights on the future of workforce communication and distributed team management.
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.aliconferences.com/events/the-future-of-employee-communications/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-bronze-600 hover:text-bronze-700 underline"
                >
                  The Future of Employee Communications
                </a>
                <a
                  href="https://www.aliconferences.com/events/3rd-annual-internal-communications-for-a-deskless-frontline-hybrid-workforce/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-bronze-600 hover:text-bronze-700 underline"
                >
                  Internal Communications for a Deskless, Frontline, Hybrid Workforce
                </a>
              </div>
            </div>
            <div>
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648125615-james%20brown%20speaking%20at%20a%20conference.jpg"
                alt="James Brown speaking at a conference"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Speaking Topics */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 mb-8 text-center">Speaking Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakingTopics.map((topic, index) => (
              <div key={topic.title} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">🎤</div>
                <h3 className="text-xl font-bold text-primary-700 mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <ul className="space-y-2">
                  {topic.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-start">
                      <span className="text-bronze-500 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Training Formats */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Training Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingFormats.map((format, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-bronze-500 text-xl">👥</span>
                <span className="text-gray-700">{format}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Discussion Photo */}
        <div className="text-center mb-12">
          <img
            src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751655293423-James%20brown%20on%20a%20panel%20at%20a%20conference.jpg"
            alt="James Brown on a panel at a conference"
            className="w-full max-w-4xl mx-auto h-80 object-cover rounded-lg shadow-lg"
          />
          <p className="text-gray-600 text-sm mt-4">James Brown (center right) speaking on panel</p>
        </div>

        {/* Speaking Form */}
        <div id="speaking-form" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-700 mb-4">Submit Speaking Inquiry</h2>
            <p className="text-gray-600">
              Tell us about your event and we'll get back to you within 24 hours with availability and pricing.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <SpeakingForm />
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-700 mb-3">✅ What's Included</h3>
            <ul className="text-green-600 text-sm space-y-1">
              <li>• Professional presentation materials</li>
              <li>• Custom content for your audience</li>
              <li>• Q&A session</li>
              <li>• Follow-up resources</li>
              <li>• Professional headshots and bio</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-700 mb-3">⏰ Response Times</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Initial Response:</span>
                <span className="font-medium text-blue-700">Same day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Detailed Proposal:</span>
                <span className="font-medium text-blue-700">24-48 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Contract & Materials:</span>
                <span className="font-medium text-blue-700">1 week</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-700 mb-3">💰 Investment</h3>
            <p className="text-purple-600 text-sm mb-2">
              Speaking fees vary based on:
            </p>
            <ul className="text-purple-600 text-sm space-y-1">
              <li>• Event type and duration</li>
              <li>• Audience size</li>
              <li>• Travel requirements</li>
              <li>• Custom content development</li>
            </ul>
            <p className="text-purple-700 font-medium text-sm mt-3">
              Contact for detailed pricing
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Speaking