import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../Config/Firebase';
import { signOut, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Set session persistence first
      await setPersistence(auth, browserSessionPersistence);
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear all auth-related storage
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('userSession');
      localStorage.removeItem(`firebase:authUser:${auth.app.options.apiKey}:[DEFAULT]`);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Wait 2 seconds to show success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Hard redirect to ensure complete sign out
      window.location.href = '/login';
      
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err.message || 'Failed to sign out. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            <span className="text-indigo-600">Inventory</span> Management
          </h1>
          <p className="text-gray-600">Powering the next generation of inventory control</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-2xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaSignOutAlt className="mr-2 text-indigo-600" />
              Sign Out
            </h2>
            <div className="text-indigo-600 font-bold">inventory</div>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSignOut}
              >
                <p className="text-gray-600 mb-6">
                  Are you sure you want to sign out? You'll need to sign in again to access your inventory.
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${
                    isSubmitting
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing Out...
                    </span>
                  ) : (
                    'Sign Out'
                  )}
                </motion.button>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full py-2 px-4 rounded-lg font-medium text-indigo-600 hover:bg-indigo-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mt-4">Signed Out Successfully</h3>
                <p className="text-gray-600 mt-2">Redirecting to login page...</p>
                
                <div className="mt-6">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Secured with industry-standard encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignOut;