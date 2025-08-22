import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const welcomeMessage =
    "Welcome to InventoryFlow! The ultimate inventory management solution for businesses of all sizes. Track stock, manage suppliers, and streamline operations with our powerful platform.";
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
                  onClick={() => navigate('/pricing')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Pricing
                </button>
                <button
                  onClick={() => navigate('/testimonials')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => navigate('/resources')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Resources
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Auth buttons */}
            <div className="hidden md:block ml-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium text-white bg-transparent border border-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
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
                  navigate('/pricing');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  navigate('/testimonials');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                Testimonials
              </button>
              <button
                onClick={() => {
                  navigate('/resources');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                Resources
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
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-base font-medium text-white bg-transparent border border-blue-500 rounded-md hover:bg-blue-600 transition duration-300 mb-2"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Sign Up
                </button>
              </div>
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

  // ------------------ Testimonial Component ------------------
  const Testimonials = () => {
    const testimonials = [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Retail Store Owner",
        content: "InventoryFlow has transformed how we manage our stock. We've reduced waste by 30% and improved our order accuracy significantly.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Warehouse Manager",
        content: "The real-time tracking and reporting features have saved us countless hours. Our team can now focus on strategic tasks instead of manual counts.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        role: "E-commerce Entrepreneur",
        content: "As a small business, we needed an affordable solution that could scale with us. InventoryFlow was the perfect fit with its flexible pricing.",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg"
      }
    ];

    return (
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Businesses Worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Don't just take our word for it. Here's what our customers say.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.split(' ').join('+')}&background=random&size=128`;
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ------------------ Features Component ------------------
  const Features = () => {
    const features = [
      {
        title: "Real-time Tracking",
        description: "Monitor your inventory levels in real-time across multiple locations.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        title: "Automated Reports",
        description: "Generate detailed reports with just a few clicks to make data-driven decisions.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: "Barcode Scanning",
        description: "Use your smartphone or scanner to quickly update inventory levels.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        )
      },
      {
        title: "Multi-user Access",
        description: "Collaborate with your team with different permission levels.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: "Low Stock Alerts",
        description: "Get notified before you run out of critical items.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      },
      {
        title: "Mobile App",
        description: "Manage your inventory on the go with our iOS and Android apps.",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      }
    ];

    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Powerful Features for Your Business
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to take control of your inventory
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ------------------ Pricing Component ------------------
  const Pricing = () => {
    const plans = [
      {
        name: "Starter",
        price: "$19",
        period: "per month",
        description: "Perfect for small businesses getting started",
        features: [
          "Up to 100 products",
          "Basic reporting",
          "Email support",
          "1 user included"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Professional",
        price: "$49",
        period: "per month",
        description: "For growing businesses with more complex needs",
        features: [
          "Up to 1,000 products",
          "Advanced reporting",
          "Priority email support",
          "Up to 5 users",
          "Barcode scanning"
        ],
        cta: "Start Free Trial",
        popular: true
      },
      {
        name: "Enterprise",
        price: "$99",
        period: "per month",
        description: "For large businesses with high-volume needs",
        features: [
          "Unlimited products",
          "Advanced analytics",
          "24/7 phone support",
          "Unlimited users",
          "API access",
          "Custom integrations"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ];

    return (
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              No hidden fees. Start with a 14-day free trial.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-700 rounded-lg shadow-lg overflow-hidden ${plan.popular ? "ring-2 ring-blue-500 transform scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-sm font-bold py-1 px-4 text-center">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="ml-1 text-gray-300">{plan.period}</span>
                  </div>
                  <p className="text-gray-300 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate(plan.name === "Enterprise" ? '/contact' : '/signup')}
                    className={`w-full py-3 px-4 rounded-md font-medium ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-500"} text-white transition duration-300`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-300">
              Need something custom? <button onClick={() => navigate('/contact')} className="text-blue-400 hover:text-blue-300">Contact our sales team</button> for enterprise solutions.
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  // ------------------ Trust Badges Component ------------------
  const TrustBadges = () => {
    const badges = [
      {
        name: "SSL Secure",
        icon: (
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        name: "GDPR Compliant",
        icon: (
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
      },
      {
        name: "99.9% Uptime",
        icon: (
          <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        name: "24/7 Support",
        icon: (
          <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      }
    ];

    return (
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-300">TRUSTED BY THOUSANDS OF BUSINESSES</h3>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="mb-2">
                  {badge.icon}
                </div>
                <span className="text-white font-medium">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ------------------ Support & Resources Component ------------------
  const SupportResources = () => {
    const resources = [
      {
        title: "Help Center",
        description: "Find answers to common questions in our comprehensive knowledge base.",
        link: "/help",
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Community Forum",
        description: "Connect with other users and share tips and best practices.",
        link: "/community",
        icon: (
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: "Video Tutorials",
        description: "Watch step-by-step guides to get the most out of InventoryFlow.",
        link: "/tutorials",
        icon: (
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 01221 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "API Documentation",
        description: "Integrate InventoryFlow with your other business systems.",
        link: "/api-docs",
        icon: (
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        )
      }
    ];

    return (
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Support & Resources
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to succeed with InventoryFlow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full mb-4">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 mb-4">{resource.description}</p>
                <button
                  onClick={() => navigate(resource.link)}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ------------------ Visual Demo Component ------------------
  const VisualDemo = () => {
    return (
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              See InventoryFlow in Action
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              A quick glimpse of what you can do with our platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Mock browser chrome */}
            <div className="flex items-center px-4 py-3 bg-gray-700 border-b border-gray-600">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-600 rounded-md py-1 px-3 text-sm text-gray-300">
                app.inventoryflow.com/dashboard
              </div>
            </div>
            
            {/* Mock dashboard */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-blue-500 rounded w-1/2"></div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-green-500 rounded w-1/3"></div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-purple-500 rounded w-2/3"></div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4 h-64 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-4 bg-gray-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/6"></div>
                </div>
                <div className="h-40 bg-gray-600 rounded"></div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="h-4 bg-gray-600 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-8 w-8 bg-gray-600 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-600 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                      </div>
                      <div className="h-3 bg-gray-600 rounded w-1/6"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate('/demo')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            >
              Request a Live Demo
            </button>
          </motion.div>
        </div>
      </section>
    );
  };

  // ------------------ CTA Section ------------------
  const CTASection = () => {
    return (
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that trust InventoryFlow to streamline their operations and grow their business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={() => navigate('/signup')}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Trial
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // ------------------ Footer Component ------------------
  const Footer = () => {
    return (
      <footer className="bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/features')} className="hover:text-white transition duration-300">Features</button></li>
                <li><button onClick={() => navigate('/pricing')} className="hover:text-white transition duration-300">Pricing</button></li>
                <li><button onClick={() => navigate('/demo')} className="hover:text-white transition duration-300">Demo</button></li>
                <li><button onClick={() => navigate('/updates')} className="hover:text-white transition duration-300">Updates</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/blog')} className="hover:text-white transition duration-300">Blog</button></li>
                <li><button onClick={() => navigate('/guides')} className="hover:text-white transition duration-300">Guides</button></li>
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition duration-300">Help Center</button></li>
                <li><button onClick={() => navigate('/api-docs')} className="hover:text-white transition duration-300">API Docs</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition duration-300">About</button></li>
                <li><button onClick={() => navigate('/careers')} className="hover:text-white transition duration-300">Careers</button></li>
                <li><button onClick={() => navigate('/press')} className="hover:text-white transition duration-300">Press</button></li>
                <li><button onClick={() => navigate('/partners')} className="hover:text-white transition duration-300">Partners</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/privacy')} className="hover:text-white transition duration-300">Privacy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-white transition duration-300">Terms</button></li>
                <li><button onClick={() => navigate('/security')} className="hover:text-white transition duration-300">Security</button></li>
                <li><button onClick={() => navigate('/compliance')} className="hover:text-white transition duration-300">Compliance</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-2">
                IF
              </div>
              <span className="text-white font-bold">InventoryFlow</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} InventoryFlow, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center pt-16 pb-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <motion.div 
          className="w-full max-w-4xl text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Streamline Your <span className="text-blue-400">Inventory</span> Management
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-10 mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {welcomeMessage}
          </motion.p>

          <TalkingAvatar message={welcomeMessage} />

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 sm:px-10 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get started with InventoryFlow"
            >
           
              Request Demo
            </motion.button>
          </motion.div>

          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {["Forbes", "TechCrunch", "Wired", "Business Insider"].map((logo, i) => (
              <div key={i} className="text-gray-400 font-medium text-lg opacity-80 hover:opacity-100 transition duration-300">
                {logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Main sections */}
      <Features />
      <VisualDemo />
      <Pricing />
      <Testimonials />
      <TrustBadges />
      <SupportResources />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;