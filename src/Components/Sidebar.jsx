import React, { useState, useEffect } from 'react';
import {
  MdDashboard,
  MdWallet,
  MdAnalytics,
  MdPeople,
  MdSettings,
  MdNotifications,
  MdLogout,
  MdToggleOn,
  MdToggleOff,
  MdChevronLeft,
  MdChevronRight,
  MdSdStorage,
  MdProductionQuantityLimits,
  MdMenu,
  MdClose
} from 'react-icons/md';
import { FaDev } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/Firebase';

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const navItemClass = 'flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-200';
  const inactiveClass = 'text-text-dark-secondary hover:bg-dark-card hover:text-text-light';
  const activeClass = 'text-text-light bg-active-sidebar border-l-4 border-accent-blue pl-4';

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
    { to: '/supplies', label: 'Supplies', icon: <MdWallet /> },
    { to: '/StockInOutPage', label: 'StockInOutPage', icon: <MdSdStorage /> },
    { to: '/analytics', label: 'Analytics', icon: <MdAnalytics /> },
    { to: '/productPage', label: 'ProductPage', icon: <MdProductionQuantityLimits /> },
    { to: '/inventoryPage', label: 'InventoryPage', icon: <MdSdStorage /> },
    { to: '/customers', label: 'Customers', icon: <MdPeople /> },
  ];

  const settingsLinks = [
    { to: '/settings', label: 'Settings', icon: <MdSettings /> },
    {
      to: '/notifications',
      label: 'Notifications',
      icon: <MdNotifications />,
      hasNotification: true,
    },
  ];

  return (
    <>
      {/* Mobile menu button - always visible on mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md bg-dark-card text-text-light md:hidden ${
          mobileOpen ? 'left-64' : 'left-4'
        } transition-all duration-300`}
      >
        {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${collapsed ? 'w-20' : 'w-64'}
          ${isMobile ? (mobileOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          bg-dark-sidebar py-5 flex flex-col items-center border-r border-dark-border min-h-screen
          transition-all duration-300 fixed z-40
        `}
      >
        {/* Logo and Collapse Toggle */}
        <div className="flex items-center justify-between w-full px-4 mb-10">
          {!collapsed && (
            <div className="flex items-center gap-2 text-2xl font-semibold text-text-light">
              <FaDev className="text-3xl text-accent-blue" />
              <span>Develop</span>
            </div>
          )}
          {!isMobile && (
            <button
              className="text-text-dark-secondary text-xl hover:text-text-light"
              onClick={toggleSidebar}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="w-full flex-grow overflow-y-auto">
          <ul>
            {navLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={({ isActive }) =>
                    `${navItemClass} ${
                      isActive ? activeClass : inactiveClass
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                  title={collapsed ? label : ''}
                >
                  <span className="text-xl">{icon}</span>
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="w-4/5 h-px bg-dark-border mx-auto my-5"></div>

          <ul>
            {settingsLinks.map(({ to, label, icon, hasNotification }) => (
              <li className="relative" key={to}>
                <NavLink
                  to={to}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={({ isActive }) =>
                    `${navItemClass} ${
                      isActive ? activeClass : inactiveClass
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                  title={collapsed ? label : ''}
                >
                  <span className="text-xl">{icon}</span>
                  {!collapsed && <span>{label}</span>}
                  {hasNotification && !collapsed && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent-orange text-white text-xs px-1.5 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Options */}
        <div className="w-full flex flex-col items-center pt-5 gap-5">
          <div
            className={`flex items-center gap-4 px-4 py-3 cursor-pointer text-text-dark-secondary hover:text-text-light transition-colors duration-200 ${
              collapsed ? 'justify-center' : ''
            }`}
            onClick={handleLogout}
            title={collapsed ? 'Sign out' : ''}
          >
            <MdLogout className="text-xl" />
            {!collapsed && <span>Sign out</span>}
          </div>

          <div
            className="text-3xl text-text-dark-secondary cursor-pointer hover:text-text-light"
            onClick={toggleTheme}
            title={collapsed ? 'Toggle theme' : ''}
          >
            {isDarkMode ? <MdToggleOn /> : <MdToggleOff />}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;