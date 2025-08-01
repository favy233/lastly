import React from 'react';
import Card from '../Components/Card'; // Assuming Card.js is in the parent directory of Cards
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Dummy data for the sparkline (simulating a downward trend)
const data = [
  { pv: 4500 }, { pv: 3200 }, { pv: 4000 }, { pv: 2500 }, { pv: 3000 }, { pv: 2100 },
  { pv: 4300 }, { pv: 3800 }, { pv: 4800 }, { pv: 1398 }, { pv: 2400 }, { pv: 1980 }
];

const ExpensesCard = () => {
  return (
    <Card title="Total expenses">
      <div className="flex flex-col gap-2">
        <div className="text-4xl font-bold text-text-light">$198,110</div>
        <div className="text-sm text-text-dark-secondary">
          <span className="text-accent-red font-semibold">-12.7%</span> last month
        </div>
        <div className="mt-4 h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {/* Use red color for expenses trend */}
              <Line type="monotone" dataKey="pv" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ExpensesCard;