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
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20">
        <div className="w-10/12 mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 rounded-lg mb-8">
              <img 
                src="image2.png" 
                alt="Motivational" 
                className="w-full h-[400px] object-contain transform group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-300 hover:scale-110 hover:text-yellow-300 cursor-pointer">
            Never Give Up
          </h1>
          <p className="text-xl text-white/80 font-light transform transition-all duration-300 hover:scale-105 hover:text-white cursor-pointer">
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