import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 sm:text-6xl md:text-7xl"
          >
            The Story Behind TechInsights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-6"
          >
            Exploring the intersection of technology, innovation, and human experience
          </motion.p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 backdrop-blur-lg bg-opacity-80"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Our Voice</h2>
            </div>
            <p className="text-gray-600">
              We believe in delivering authentic, well-researched content that cuts through the noise. Every article is crafted to bring you meaningful insights and practical knowledge.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 backdrop-blur-lg bg-opacity-80"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Our Content</h2>
            </div>
            <p className="text-gray-600">
              From in-depth tech reviews to industry analysis, startup stories to coding tutorials, we cover diverse topics that matter to our tech-savvy readers.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 backdrop-blur-lg bg-opacity-80"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-pink-100 rounded-lg">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 ml-4">Our Community</h2>
            </div>
            <p className="text-gray-600">
              Join our growing community of developers, tech enthusiasts, and industry professionals. Share ideas, learn, and grow together.
            </p>
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-white rounded-2xl shadow-lg p-12 border border-gray-100 backdrop-blur-lg bg-opacity-80"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
            Join Our Newsletter
          </h2>
          <div className="max-w-xl mx-auto">
            <p className="text-gray-600 text-center text-lg">
              Stay updated with our latest articles, tech insights, and community highlights. Join 5,000+ tech enthusiasts who trust our content.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Subscribe Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About