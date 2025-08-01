import React from 'react';
import Card from '../Components/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'JAN', val1: 400, val2: 240 },
  { name: 'FEB', val1: 300, val2: 139 },
  { name: 'MAR', val1: 200, val2: 980 },
  { name: 'APR', val1: 278, val2: 390 },
  { name: 'MAY', val1: 189, val2: 480 },
  { name: 'JUN', val1: 239, val2: 380 },
  { name: 'JUL', val1: 349, val2: 430 },
  { name: 'AUG', val1: 280, val2: 320 },
  { name: 'SEP', val1: 300, val2: 250 },
  { name: 'OCT', val1: 350, val2: 400 },
  { name: 'NOV', val1: 400, val2: 300 },
  { name: 'DEC', val1: 380, val2: 450 },
];

const DissectionChart = ({ className }) => { // Accept className prop
  return (
    <Card title="Dissection" className={className}>
      <div className="h-72 w-full"> {/* Adjust height as needed */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barCategoryGap="20%"
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
            <Bar dataKey="val1" stackId="a" fill="#ea5886" radius={[4, 4, 0, 0]} />
            <Bar dataKey="val2" stackId="a" fill="#6a6efb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DissectionChart;