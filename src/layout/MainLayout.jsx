import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from '../Layout/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 my-12">
        <ToastContainer />
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout