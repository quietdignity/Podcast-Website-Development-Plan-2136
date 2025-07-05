import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Education = () => {
  const courseModules = [
    "How government actually makes decisions (not the textbook version)",
    "The real power players and how to reach them",
    "Communication strategies that work with officials",
    "How to build coalitions that create change",
    "Crisis management when advocacy goes public",
    "Digital tools for modern advocacy campaigns"
  ]

  const courseIncludes = [
    "6 comprehensive audio modules (3+ hours)",
    "Complete toolkit with templates and worksheets",
    "Power mapping exercises",
    "Message crafting frameworks",
    "Coalition building strategies",
    "Digital advocacy templates"
  ]

  const targetAudience = [
    "Professionals advocating for business interests",
    "Community leaders driving local change",
    "Non-profit professionals seeking policy change",
    "Citizens wanting to effectively engage government",
    "Anyone tired of feeling powerless in complex systems"
  ]

  return (
    <>
      <Helmet>
        <title>Education - Know Your Power Course - The Daily Note</title>
        <meta name="description" content="Learn the insider's guide to effective advocacy with James Brown's Know Your Power course. Get what you want from government with proven strategies." />
        <link rel="canonical" href="https://thedailynote.net/education" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-700 mb-6">
            Education
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Know Your Power: How to Get What You Want From Government
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The insider's guide to effective advocacy
          </p>
        </div>

        {/* Course Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751648259329-knowyourpower.jpg" 
                alt="Know Your Power Course" 
                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <div className="bg-green-600 text-white text-3xl font-bold py-4 px-8 rounded-lg inline-block mb-6">
                $1,497 - Complete Course
              </div>
              <div className="text-center">
                <a
                  href="https://knowyourpowernow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block mb-4"
                >
                  Get Instant Access
                </a>
                <p className="text-gray-600">
                  Questions? <Link to="/contact" className="text-bronze-600 hover:text-bronze-700 underline">Contact us</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseModules.map((module, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">{module}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Includes */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Course Includes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseIncludes.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-bronze-500 text-xl">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who This Is For */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">Who This Is For</h2>
          <div className="space-y-4">
            {targetAudience.map((audience, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-primary-600 text-xl">🎯</span>
                <span className="text-gray-700">{audience}</span>
              </div>
            ))}
          </div>
        </div>

        {/* James's Promise */}
        <div className="bg-bronze-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-primary-700 mb-6">James's Promise</h2>
          <blockquote className="text-lg text-gray-700 italic">
            "This isn't theory. These are the strategies I've used and seen work from inside government communications. You'll learn what officials actually respond to, not what you think they should respond to."
          </blockquote>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary-700 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Know Your Power?</h2>
          <p className="text-xl mb-8">
            Get instant access to the complete course and start making real change
          </p>
          <div className="text-center">
            <a
              href="https://knowyourpowernow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-block mb-6"
            >
              Get Instant Access - $1,497
            </a>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <span>✉️</span>
            <span>Questions? <Link to="/contact" className="text-cream-200 hover:text-cream-100 underline">Contact us</Link></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Education