import React from 'react';
import { MdSearch, MdMenu } from 'react-icons/md';

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 py-4 text-text-light">
      {/* Left side - Greeting and menu button (mobile) */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="text-xl sm:text-2xl font-semibold">Hello, Kristi welcome back</div>
        <button className="sm:hidden text-2xl">
          <MdMenu />
        </button>
      </div>

      {/* Right side - Search and profile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        {/* Search bar */}
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="bg-dark-card border-none rounded-lg py-2 px-4 pr-10 text-text-light text-base outline-none w-full sm:w-64 focus:bg-active-sidebar transition-colors duration-200"
          />
          <MdSearch className="absolute right-4 text-text-dark-secondary text-xl" />
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <span className="font-medium text-text-light hidden sm:inline">Kristi Kamilylova</span>
          <img
            src="https://via.placeholder.com/40/6a6efb/ffffff?text=K"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-accent-blue"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;