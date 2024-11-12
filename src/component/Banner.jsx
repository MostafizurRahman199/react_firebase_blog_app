import React from 'react'

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover amazing features and solutions that will transform your experience
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner