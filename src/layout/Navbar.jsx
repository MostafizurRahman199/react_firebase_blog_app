import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { FiFeather } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {signOutUser, user} = useFirebase();

  // Add this console.log to debug
  console.log('Current user:', user);

  // Define routes array
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
   
  
  ];

  // Create reusable NavLink component
  const NavItem = ({ to, children, isMobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isMobile ? 'block ' : ''}px-3 py-2 rounded-md text-${isMobile ? 'base' : 'sm'} font-medium ${
          isActive
            ? 'text-blue-600 bg-blue-50'
            : 'text-white hover:text-blue-600 hover:bg-blue-50'
        }`
      }
    >
      {children}
    </NavLink>
  );

  // Replace links fragment with mapped routes
  const desktopLinks = routes.map(route => (
    <NavItem key={route.path} to={route.path}>
      {route.label}
    </NavItem>
  ));

  return (
    <nav className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-xl font-bold text-white">
              Article<FiFeather className="h-8 w-8" />
            </NavLink>

            {/* Sign Out Button */}
         
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {desktopLinks}
            {
                user?.uid ? (
                    <>
                    <NavItem to="/blogs">Blogs</NavItem>
                    <NavItem to="/write-blogs">Write Blogs</NavItem>
                    <button onClick={signOutUser} className="text-white hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium">
                        Sign Out
                    </button>
                
                </>
                ) : (
                    <>
                    <NavItem to="/login">Login</NavItem>
                    <NavItem to="/register">Register</NavItem>
                    </>
                )
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map(route => (
              <NavItem key={route.path} to={route.path} isMobile>
                {route.label}
              </NavItem>
            ))}

            {
                user?.uid ? (
                    <button onClick={signOutUser} className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium">
                        Sign Out
                    </button>
                ) : (
                    <NavItem to="/login">Login</NavItem>
                )
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;