import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

// Receive a `className` prop to allow parent components to add more Tailwind classes
const Card = ({ title, children, showDropdown = true, className = '' }) => {
  return (
    <div className={`bg-dark-card rounded-xl p-5 shadow-lg flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-text-light m-0">{title}</h3>
        {showDropdown && (
          <div className="flex items-center gap-1 text-sm text-text-dark-secondary cursor-pointer">
            <span>last month</span>
            <MdOutlineKeyboardArrowDown className="text-lg" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;