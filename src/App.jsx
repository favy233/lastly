import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Config/Firebase';

// Import all your components
import Home from "./Pages/Home";
import About from "./Pages/About";
import Features from "./Pages/Features";
import Contact from "./Pages/Contact";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import SuppliesPage from "./Pages/SuppliesPage";
import ProductPage from "./Pages/ProductPage";
import Analytics from "./Pages/Analytics";
import Customers from "./Pages/Customers";
import StockInOutPage from "./Pages/StockInOutPage";
import Settings from "./Pages/Settings";
import Notification from "./Pages/Notification";
import SignOut from "./Pages/SignOut";
import Auth from './Components/Auth';
import InventoryPage from './Pages/InventoryPage';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-lg">
      <p className="font-bold">Something went wrong:</p>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth state listener with proper sign-out handling
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthChecked(true);
      
      // Pages where we don't want to redirect
      const publicPages = ['/', '/auth', '/login', '/sign-out', '/features', '/about', '/contact'];
      
      // Only redirect if not authenticated AND not on a public page
      if (!user && !publicPages.includes(location.pathname)) {
        navigate('/login');
      }
    });
    
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const hideLayoutRoutes = ['/', '/auth', '/login', '/features', '/about', '/contact'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-bg text-text-light font-sans overflow-hidden">
      {!shouldHideLayout && <Sidebar />}

      <div className="flex-1 flex flex-col p-5 gap-5 overflow-y-auto custom-scrollbar">
        {!shouldHideLayout && <Header />}

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/supplies" element={<SuppliesPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/stockInOutPage" element={<StockInOutPage />} />
            <Route path="/inventoryPage" element={<InventoryPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sign-out" element={<SignOut />} />
            <Route path="/productPage" element={<ProductPage />} />
            <Route path="/notifications" element={<Notification />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;