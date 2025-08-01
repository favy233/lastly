import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Real-time Inventory Tracking",
      description: "Monitor your stock levels in real-time with automatic updates across all devices.",
      icon: "📊"
    },
    {
      title: "Barcode Scanning",
      description: "Quickly add items to your inventory using our built-in barcode scanner.",
      icon: "📷"
    },
    {
      title: "Multi-location Management",
      description: "Manage inventory across multiple warehouses or stores from a single dashboard.",
      icon: "🏬"
    },
    {
      title: "Automated Alerts",
      description: "Get notified when stock levels are low or items are about to expire.",
      icon: "🔔"
    },
    {
      title: "Reporting & Analytics",
      description: "Generate detailed reports and gain insights into your inventory performance.",
      icon: "📈"
    },
    {
      title: "Supplier Management",
      description: "Keep track of your suppliers and manage purchase orders efficiently.",
      icon: "🤝"
    }
  ];

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
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Powerful <span className="text-blue-400">Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how InventoryFlow can transform your inventory management process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/auth')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with InventoryFlow
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Features;