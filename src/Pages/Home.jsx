import React from 'react'
import Banner from '../component/Banner'
import Gallery from '../components/Gallery'
import MasonryGridGallery from '../component/MasonryGridGallery'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner/>
      
      {/* Featured Section */}


      {/* Gallery Section */}
      <Gallery />
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 h-96 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight">
            Never Give Up
          </h1>
          <p className="text-xl text-center text-white/80 font-light">
            Every step forward is a step closer to your dreams
          </p>
        </div>
      </div>
      <MasonryGridGallery/>

      {/* Newsletter Section */}
      {/* <section className="bg-blue-600 text-white py-16 px-4 w-full">
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
      </section> */}
   
    </div>
  )
}

export default Home