import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name */}
          <div className="text-2xl font-bold text-gray-800">
            <a href="#home">Your Name</a>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="focus:outline-none"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out"></span>
                <span className="block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out"></span>
                <span className="block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ease-in-out"></span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } md:flex md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out`}
          >
            <li className="border-t md:border-0 border-gray-200">
              <a
                href="#home"
                className="block py-3 px-4 text-gray-700 hover:text-blue-500 transition-colors duration-200 text-center text-lg"
                onClick={toggleMobileMenu}
              >
                Home
              </a>
            </li>
            <li className="border-t md:border-0 border-gray-200">
              <a
                href="#about"
                className="block py-3 px-4 text-gray-700 hover:text-blue-500 transition-colors duration-200 text-center text-lg"
                onClick={toggleMobileMenu}
              >
                About
              </a>
            </li>
            <li className="border-t md:border-0 border-gray-200">
              <a
                href="#projects"
                className="block py-3 px-4 text-gray-700 hover:text-blue-500 transition-colors duration-200 text-center text-lg"
                onClick={toggleMobileMenu}
              >
                Projects
              </a>
            </li>
            <li className="border-t md:border-0 border-gray-200">
              <a
                href="#skills"
                className="block py-3 px-4 text-gray-700 hover:text-blue-500 transition-colors duration-200 text-center text-lg"
                onClick={toggleMobileMenu}
              >
                Skills
              </a>
            </li>
            <li className="border-t md:border-0 border-gray-200">
              <a
                href="#contact"
                className="block py-3 px-4 text-gray-700 hover:text-blue-500 transition-colors duration-200 text-center text-lg"
                onClick={toggleMobileMenu}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;