import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar with Back Button */}
      <nav className="w-full bg-gray-800 shadow-lg fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center text-gray-300 hover:text-white mr-4"
              >
                <FaArrowLeft className="mr-2" />
                Back to Home
              </button>
              <span className="text-xl font-semibold text-white">InventoryFlow</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/features')}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigate('/auth')}
              className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            About <span className="text-blue-400">InventoryFlow</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing inventory management for businesses of all sizes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2023, InventoryFlow was born out of a need for simple yet powerful inventory management solutions. 
              Our team of logistics experts and software developers came together to create a platform that eliminates 
              the headaches of traditional inventory management.
            </p>
            <p className="text-gray-300">
              Today, we serve hundreds of businesses across various industries, helping them streamline their operations 
              and focus on what really matters - growing their business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Warehouse" 
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Inventory Management?</h2>
          <motion.button
            onClick={() => navigate('/auth')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default About;