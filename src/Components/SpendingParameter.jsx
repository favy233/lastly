import React from 'react';
import Card from '../Components/Card';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { MdFastfood, MdHome, MdDirectionsCar, MdTheaterComedy, MdFlight } from 'react-icons/md'; // Example icons

// Data for each spending parameter
const data = [
  { name: 'Food', value: 75, fill: '#6a6efb', icon: MdFastfood },
  { name: 'House', value: 60, fill: '#ea5886', icon: MdHome },
  { name: 'Car', value: 45, fill: '#ffc107', icon: MdDirectionsCar },
  { name: 'Gaiety', value: 80, fill: '#4caf50', icon: MdTheaterComedy },
  { name: 'Holiday', value: 95, fill: '#00bcd4', icon: MdFlight, newRate: true }, // Added newRate for the last one
];

const SpendingParameterItem = ({ name, value, fill, icon: Icon, newRate }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-24 h-24 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%" outerRadius="90%" data={[{ value: 100, fill: '#3b3d50' }, { value: value, fill: fill }]}
          startAngle={90} endAngle={-270}
        >
          {/* Background circle for the progress bar */}
          <RadialBar cornerRadius={10} dataKey="value" fill="#3b3d50" background />
          {/* Foreground progress bar */}
          <RadialBar cornerRadius={10} dataKey="value" fill={fill} isAnimationActive={true} animationDuration={500} />
          {/* This is a hacky way to place text in center, typically done with custom component or div */}
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-bold text-lg fill-text-light">
            {`${value}%`}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="text-3xl" style={{ color: fill }} /> {/* Icon in the center */}
      </div>
    </div>
    <span className="text-sm font-medium text-text-light mt-2">{name}</span>
    {newRate && <span className="text-xs text-accent-green bg-green-900/30 px-2 py-0.5 rounded-full">new rate</span>}
  </div>
);


const SpendingParameters = ({ className }) => {
  return (
    <Card title="Spending parameters" className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4 justify-items-center">
        {data.map((item, index) => (
          <SpendingParameterItem key={index} {...item} />
        ))}
      </div>
    </Card>
  );
};

export default SpendingParameters;