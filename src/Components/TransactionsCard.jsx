import React from 'react';
import Card from '../Components/Card';
import {
  MdShoppingCart,
  MdStorefront,
  MdFitnessCenter,
  MdRestaurant,
  MdDirectionsCar
} from 'react-icons/md'; // Icons for categories

const transactions = [
  { id: 1, name: 'Supermarket', date: '24 July', amount: -50.0, icon: MdShoppingCart, iconBg: '#6a6efb' },
  { id: 2, name: 'Boutique', date: '23 July', amount: -120.5, icon: MdStorefront, iconBg: '#ea5886' },
  { id: 3, name: 'Gym Membership', date: '22 July', amount: -45.0, icon: MdFitnessCenter, iconBg: '#4caf50' },
  { id: 4, name: 'Restaurant', date: '21 July', amount: -75.8, icon: MdRestaurant, iconBg: '#ffc107' },
  { id: 5, name: 'Gas Station', date: '20 July', amount: -30.0, icon: MdDirectionsCar, iconBg: '#00bcd4' },
  { id: 6, name: 'Coffee Shop', date: '19 July', amount: -8.5, icon: MdShoppingCart, iconBg: '#6a6efb' }
];

const TransactionsCard = ({ className }) => {
  return (
    <Card title="Transactions" className={className}> {/* Fixed typo: Translations → Transactions */}
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
              ${Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionsCard;
