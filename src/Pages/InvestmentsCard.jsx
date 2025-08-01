import React from 'react';
import Card from '../Components/Card'; // Assuming Card.js is in the parent directory of Cards
import { MdSchool, MdCurrencyBitcoin, MdSavings, MdTrendingUp, MdHomeWork } from 'react-icons/md'; // Icons

const investments = [
  { id: 1, name: 'Studies', amount: 50000, icon: MdSchool, iconColor: '#6a6efb' },
  { id: 2, name: 'Cryptocurrency', amount: 25000, icon: MdCurrencyBitcoin, iconColor: '#ffc107' },
  { id: 3, name: 'Contributions', amount: 15000, icon: MdSavings, iconColor: '#ea5886' },
  { id: 4, name: 'Stocks and bonds', amount: 30000, icon: MdTrendingUp, iconColor: '#4caf50' },
  { id: 5, name: 'Assets', amount: 100000, icon: MdHomeWork, iconColor: '#00bcd4' },
];

const InvestmentsCard = ({ className }) => { // Component name matches the file
  return (
    <Card title="Investments" className={className}>
      <div className="flex flex-col gap-4">
        {investments.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <item.icon className="text-3xl" style={{ color: item.iconColor }} />
              <div className="text-text-light font-medium">{item.name}</div>
            </div>
            <div className="text-text-light font-semibold text-lg">
              ${item.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InvestmentsCard; // Export name matches component name