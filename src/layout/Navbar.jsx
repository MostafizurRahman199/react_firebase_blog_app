import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { FiFeather, FiHome, FiInfo, FiBook, FiEdit, FiBookmark, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {signOutUser, user} = useFirebase();

  // Add this console.log to debug
  console.log('Current user:', user);

  // Define routes array with icons
  const routes = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/about', label: 'About', icon: <FiInfo /> },
    // Add any other public routes here
  ];

  // Create reusable NavLink component
  const NavItem = ({ to, children, icon, isMobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isMobile ? 'block ' : ''}px-3 py-2 rounded-md text-${isMobile ? 'base' : 'sm'} font-medium transition duration-300 ease-in-out ${
          isActive
            ? 'text-blue-600 bg-blue-50'
            : 'text-white hover:text-blue-600 hover:bg-blue-50'
        }`
      }
    >
      <span className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </NavLink>
  );

  // Replace links fragment with mapped routes
  const desktopLinks = routes.map(route => (
    <NavItem key={route.path} to={route.path} icon={route.icon}>
      {route.label}
    </NavItem>
  ));

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-gray-300 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-xl font-bold text-white">
              Article<FiFeather className="h-8 w-8" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {desktopLinks}
            <NavItem to="/blogs" icon={<FiBook />}>Blogs</NavItem>
            <NavItem to="/write-blogs" icon={<FiEdit />}>Write Blogs</NavItem>
            {
                user?.uid ? (
                    <>
                    <NavItem to="/bookmarks" icon={<FiBookmark />}>Bookmarks</NavItem>
                    <button onClick={signOutUser} className="text-white hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                        <FiLogOut className="inline-block mr-2" /> Sign Out
                    </button>
                </>
                ) : (
                  <>
                    <NavItem to="/login" icon={<FiLogIn />}>Login</NavItem>
                    <NavItem to="/register" icon={<FiUserPlus />}>Register</NavItem>
                  </>
                )
            }
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition duration-300 ease-in-out"
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
              <NavItem key={route.path} to={route.path} icon={route.icon} isMobile>
                {route.label}
              </NavItem>
            ))}

            {
                user?.uid ? (
                    <>
                    <NavItem to="/blogs" icon={<FiBook />} isMobile>Blogs</NavItem>
                    <NavItem to="/write-blogs" icon={<FiEdit />} isMobile>Write Blogs</NavItem>
                    <NavItem to="/bookmarks" icon={<FiBookmark />} isMobile>Bookmarks</NavItem>
                    <button onClick={signOutUser} className="w-full text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                        <FiLogOut className="inline-block mr-2" /> Sign Out
                    </button>
                    </>
                ) : (
                    <>
                    <NavItem to="/login" icon={<FiLogIn />} isMobile>Login</NavItem>
                    <NavItem to="/register" icon={<FiUserPlus />} isMobile>Register</NavItem>
                    </>
                )
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;