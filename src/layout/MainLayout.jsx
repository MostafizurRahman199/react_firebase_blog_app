import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from '../Layout/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet-async';

const MainLayout = () => {
  return (
    <>
      <Helmet>
        <title>Your Site Name</title>
        <meta name="description" content="Your site description" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow w-full mt-16">
          <Outlet/>
          <ToastContainer />
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default MainLayout