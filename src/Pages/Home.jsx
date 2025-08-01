import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const welcomeMessage =
    "Welcome to InventoryFlow! Efficiently manage your inventory, track stock, and streamline your operations with ease.";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ------------------ Navbar Component ------------------
  const Navbar = () => {
    return (
      <nav className="w-full bg-gray-800 shadow-lg fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <div className="flex-shrink-0 flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ rotate: 10 }}
                className="flex items-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    IF
                  </motion.span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:block">InventoryFlow</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <button
                  onClick={() => navigate('/features')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Features
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  About
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  navigate('/features');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                Features
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                About
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    );
  };

  // ------------------ Modal Component ------------------
  const Modal = React.memo(({ message, onClose, onConfirm, showConfirmButton = false }) => {
    if (!message) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white max-w-sm w-full mx-4">
          <p className="text-lg mb-4 text-center">{message}</p>
          <div className="flex justify-center space-x-4">
            {showConfirmButton && (
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
              >
                Confirm
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  });

  // ------------------ Talking Avatar Component ------------------
  const TalkingAvatar = React.memo(({ message }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    // Load available voices
    useEffect(() => {
      const loadVoices = () => {
        const synthVoices = window.speechSynthesis.getVoices();
        if (synthVoices.length) {
          setVoices(synthVoices);
          setSelectedVoice(synthVoices.find(voice => voice.lang.startsWith("en")) || synthVoices[0]);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }, []);

    const speakMessage = useCallback(() => {
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.voice = selectedVoice;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
          console.error('SpeechSynthesisUtterance.onerror', event);
          setModalMessage('Speech synthesis failed: ' + event.error);
          setIsSpeaking(false);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setModalMessage("Speech synthesis not supported in this browser.");
      }
    }, [message, selectedVoice]);

    return (
      <div className="flex flex-col items-center mt-8">
        <div
          className={`w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300
            ${isSpeaking ? 'animate-pulse-subtle' : ''}`}
          onClick={speakMessage}
          aria-label="Listen to welcome message"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && speakMessage()}
        >
          <img
            src="https://ui-avatars.com/api/?name=AI&background=60A5FA&color=FFFFFF&size=96"
            alt="AI Avatar"
            className="w-full h-full object-cover"
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="%2360A5FA"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="12">AI</text></svg>';
            }}
          />
        </div>

        <button
          onClick={speakMessage}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300"
          aria-label={isSpeaking ? 'Stop speaking' : 'Hear welcome message'}
        >
          {isSpeaking ? 'Speaking...' : 'Hear Welcome'}
        </button>

        {voices.length > 0 && (
          <div className="mt-4">
            <label htmlFor="voice-select" className="sr-only">Select voice</label>
            <select
              id="voice-select"
              className="px-4 py-2 rounded-md bg-gray-700 text-white shadow-inner"
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
            >
              {voices.map((voice, i) => (
                <option key={i} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}

        <Modal
          message={modalMessage}
          onClose={() => setModalMessage('')}
        />
      </div>
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Navbar />
      
      {/* Main content with padding to account for fixed navbar */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-24 md:pt-16">
        <motion.div 
          className="w-full max-w-4xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Welcome to <span className="text-blue-400">InventoryFlow</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-10 mx-auto max-w-2xl">
            {welcomeMessage}
          </p>

          <TalkingAvatar message={welcomeMessage} />

          <motion.button
            onClick={() => navigate('/auth')}
            className="mt-10 px-8 py-3 sm:px-10 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started with InventoryFlow"
          >
            Get Started
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;