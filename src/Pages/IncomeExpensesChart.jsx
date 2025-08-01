import React from 'react';
import Card from '../Components/Card'; // Assuming Card.js is in the parent directory of Charts
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', income: 400, expenses: 240 },
  { name: 'Tue', income: 300, expenses: 139 },
  { name: 'Wed', income: 200, expenses: 980 },
  { name: 'Thu', income: 278, expenses: 390 },
  { name: 'Fri', income: 189, expenses: 480 },
  { name: 'Sat', income: 239, expenses: 380 },
  { name: 'Sun', income: 349, expenses: 430 },
];

const IncomeExpensesChart = ({ className }) => { // Component name matches file
  return (
    <Card title="Income and expenses" className={className}>
      <div className="h-72 w-full"> {/* Adjust height as needed */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3c4a" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-text-dark-secondary" />
            <YAxis
              tickFormatter={(value) => `${value}K`}
              axisLine={false}
              tickLine={false}
              className="text-text-dark-secondary"
              domain={[0, 1000]}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              contentStyle={{
                backgroundColor: '#3a3c4a',
                border: 'none',
                borderRadius: '8px',
                color: '#e0e0e0'
              }}
              itemStyle={{ color: '#e0e0e0' }}
              labelStyle={{ color: '#e0e0e0' }}
            />
            <Area type="monotone" dataKey="income" stroke="#6a6efb" fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expenses" stroke="#ea5886" fill="url(#colorExpenses)" />

            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6a6efb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6a6efb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ea5886" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ea5886" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IncomeExpensesChart; // Export name matches component name