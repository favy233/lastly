import React from 'react';
import Card from '../Components/Card';
import { MdShoppingCart, MdStorefront, MdFitnessCenter, MdRestaurant } from 'react-icons/md'; // Icons for categories

const Transactions= [
  { id: 1, name: 'Supermarket', date: '24 July', amount: -50.00, icon: MdShoppingCart, iconBg: '#6a6efb' },
  { id: 2, name: 'Boutique', date: '23 July', amount: -120.50, icon: MdStorefront, iconBg: '#ea5886' },
  { id: 3, name: 'Gym Membership', date: '22 July', amount: -45.00, icon: MdFitnessCenter, iconBg: '#4caf50' },
  { id: 4, name: 'Restaurant', date: '21 July', amount: -75.80, icon: MdRestaurant, iconBg: '#ffc107' },
//   { id: 5, name: 'Gas Station', date: '20 July', amount: -30.00, icon: MdDirectionsCar, iconBg: '#00bcd4' },
  { id: 6, name: 'Coffee Shop', date: '19 July', amount: -8.50, icon: MdShoppingCart, iconBg: '#6a6efb' },
];

const Transaction = ({ className }) => {
  return (
    <Card title="Translations" className={className}> {/* Title "Translations" as per image */}
      <div className="flex flex-col gap-4">
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl text-white"
                style={{ backgroundColor: t.iconBg }}
              >
                <t.icon />
              </div>
              <div>
                <div className="text-text-light font-medium">{t.name}</div>
                <div className="text-sm text-text-dark-secondary">{t.date}</div>
              </div>
            </div>
            <div className="text-text-light font-semibold text-lg">
              ${t.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Transactions;