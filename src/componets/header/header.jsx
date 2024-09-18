import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">CoolBlog</div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/" className="hover:text-gray-200">Categories</Link>
            <Link to="/" className="hover:text-gray-200">About</Link>
            <Link to="/" className="hover:text-gray-200">Contact</Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white bg-opacity-20 text-white placeholder-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-200" />
            </div>
            <Link to={"login"} className="bg-white text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
              Login
            </Link>
            <Link to={"signup"} className="bg-white text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
              Sign up
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/categories" className="hover:text-gray-200">Categories</a>
            <a href="/about" className="hover:text-gray-200">About</a>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </nav>
          <div className="flex flex-col space-y-4 px-4 py-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-200" />
            </div>
            <button className="bg-white text-purple-500 px-4 py-2 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;