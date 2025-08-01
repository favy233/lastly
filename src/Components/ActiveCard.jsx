import React from 'react';
import Card from '../Components/Card'; // Assuming Card.js is in the parent directory of Cards
import { FaWifi, FaCcVisa } from 'react-icons/fa'; // For the Wi-Fi icon and VISA logo
import { MdCreditCard } from 'react-icons/md'; // For a generic card icon if needed

const ActiveCards = () => {
  return (
    <Card title="Active cards" showDropdown={false}> {/* No dropdown for this card */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Credit Card Design */}
        <div className="relative w-full max-w-xs h-48 rounded-xl p-6 flex flex-col justify-between
                      bg-gradient-to-br from-accent-blue to-purple-600 shadow-xl overflow-hidden">
          {/* Card background patterns/dots (optional, can be done with SVG or more complex CSS) */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)' , backgroundSize: '10px 10px'}}></div>

          <div className="flex justify-between items-start">
            <span className="text-white font-bold text-lg">ProBank</span>
            <FaWifi className="text-white text-xl rotate-90" />
          </div>

          <div className="text-white text-2xl font-mono tracking-widest mt-4">
            •••• •••• •••• 1234
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="text-white text-sm">
              <span className="block opacity-75">Card Holder</span>
              <span className="block font-medium">Kristi K.</span>
            </div>
            <div className="text-white text-sm">
              <span className="block opacity-75">Expires</span>
              <span className="block font-medium">12/26</span>
            </div>
            <FaCcVisa className="text-white text-5xl" /> {/* VISA icon */}
          </div>
        </div>
        {/* You could add a carousel indicator or more cards here if it's a slider */}
        {/* <div className="flex gap-2 mt-4">
          <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
          <span className="w-2 h-2 bg-text-dark-secondary rounded-full"></span>
        </div> */}
      </div>
    </Card>
  );
};

export default ActiveCards;