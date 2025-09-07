import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ user, onLogout, quantity }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-gray-800">Flone.</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="text-gray-600 hover:text-black transition-colors duration-300">
                Products
              </Link>
              {/* You can add more static links here like in the HTML example */}
              <a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Collection</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">About</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors duration-300">Contact</a>
            </div>
          </div>

          {/* Right Side Icons & Auth */}
          <div className="hidden md:flex items-center space-x-5">
            {user ? (
              <>
                <span className="text-gray-700">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-600 hover:text-black transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-black transition-colors duration-300">Login</Link>
                <Link to="/signup" className="text-gray-600 hover:text-black transition-colors duration-300">Signup</Link>
              </>
            )}
             <Link to="/cart" className="relative text-gray-600 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {quantity > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center h-5 w-5 bg-black text-white text-xs rounded-full">
                  {quantity}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open */}
              <svg className={`h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {/* Icon for menu close */}
              <svg className={`h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Products</Link>
          <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Cart ({quantity || 0})</Link>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
             {user ? (
              <div className="px-2 space-y-1">
                <p className="px-3 py-2 font-medium text-gray-800">Hi, {user.name}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Login</Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
