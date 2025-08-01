// src/components/Cards/CategoriesCard.js
import React from 'react';
import Card from '../Components/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Food', value: 35 },
  { name: 'House', value: 24 },
  { name: 'Car', value: 15 },
  { name: 'Gaiety', value: 12 },
  { name: 'Holiday', value: 9 },
  { name: 'Other', value: 5 },
];

// Ensure these colors match your Tailwind custom colors or use Tailwind classes directly where possible
const COLORS = ['#6a6efb', '#ea5886', '#ffc107', '#4caf50', '#00bcd4', '#a0a0a0'];

const CategoriesCard = () => {
  return (
    <Card title="Categories">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
        <div className="h-48 w-full sm:w-1/2"> {/* Adjust width for responsiveness */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                  value="100% expenses"
                  position="center"
                  fill="#e0e0e0"
                  fontSize={16}
                  fontWeight={600}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 flex flex-col gap-2 w-full sm:w-1/2">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2 text-sm text-text-dark-secondary">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="flex-grow">{entry.name}</span>
              <span className="font-semibold text-text-light">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategoriesCard;