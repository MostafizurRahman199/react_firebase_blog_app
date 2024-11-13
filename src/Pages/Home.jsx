import React from 'react'
import Banner from '../component/Banner'
import Gallery from '../components/Gallery'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Banner/> */}
      
      {/* Featured Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover insightful articles on technology, lifestyle, and more. Stay updated with the latest trends and knowledge.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Stay updated with our latest articles and news.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-gray-900 w-full sm:w-96"
            />
            <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home