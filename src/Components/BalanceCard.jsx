import React from 'react';
import Card from '../Components/Card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { pv: 4000 }, { pv: 2400 }, { pv: 1398 }, { pv: 4800 }, { pv: 3800 }, { pv: 4300 },
  { pv: 2100 }, { pv: 3000 }, { pv: 2500 }, { pv: 4000 }, { pv: 3200 }, { pv: 4500 }
];

const BalanceCard = () => {
  return (
    <Card title="Total balance">
      <div className="flex flex-col gap-2">
        <div className="text-4xl font-bold text-text-light">$857,850</div>
        <div className="text-sm text-text-dark-secondary">
          <span className="text-accent-green font-semibold">+26.3%</span> last month
        </div>
        <div className="mt-4 h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="pv" stroke="#4caf50" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;