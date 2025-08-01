import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import { FiChevronDown, FiShare2, FiPlus, FiMoreVertical, FiSearch, FiBell } from 'react-icons/fi'; // Changed to react-icons/fi

// Helper function to generate random data for charts
const generateLineData = (start, end, count, valueRange) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(start.getTime() + (end.getTime() - start.getTime()) / count * i);
    data.push({
      name: `${date.getMonth() + 1}/${date.getDate()}`,
      value: Math.floor(Math.random() * (valueRange[1] - valueRange[0] + 1)) + valueRange[0],
    });
  }
  return data;
};

const generateBarData = (labels, valueRange) => {
  return labels.map(label => ({
    name: label,
    value: Math.floor(Math.random() * (valueRange[1] - valueRange[0] + 1)) + valueRange[0],
  }));
};

const generatePieData = (labels) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28'];
  return labels.map((label, index) => ({
    name: label,
    value: Math.floor(Math.random() * 100) + 50,
    color: colors[index % colors.length],
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [dailyPageviewsData, setDailyPageviewsData] = useState([]);
  const [averageLoadTimeData, setAverageLoadTimeData] = useState([]);
  const [conversionsData, setConversionsData] = useState([]);
  const [trafficSourcesData, setTrafficSourcesData] = useState([]);
  const [topCountriesData, setTopCountriesData] = useState([]);
  const [mostPopularPagesData, setMostPopularPagesData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    setDailyPageviewsData(generateLineData(thirtyDaysAgo, new Date(), 5, [100, 500]));
    setAverageLoadTimeData(generateLineData(thirtyDaysAgo, new Date(), 5, [5, 15]));
    setConversionsData(generateLineData(thirtyDaysAgo, new Date(), 5, [5000, 10000]));
    setTrafficSourcesData(generatePieData(['Twitter', 'LinkedIn', 'Google', 'Facebook', 'Web', 'Email']));
    setTopCountriesData(generateBarData(['US', 'UK', 'France', 'Germany', 'Japan', 'Canada', 'Australia'], [20, 100]));
    setMostPopularPagesData(generateBarData(['Homepage', 'Jmenswear', 'Jshoes', 'Jreturns', 'Jblog', 'Jcheckout'], [10, 80]));
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white rounded-md shadow-md text-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RadialBarChart = ({ percent, color, label }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percent}%</span>
          <span className="text-sm text-gray-500">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Analytics Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <FiBell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-blue-600" />
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">
            <FiShare2 className="w-4 h-4 mr-2" /> Share
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition">
            <FiPlus className="w-4 h-4 mr-2" /> New Metric
          </button>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Daily Pageviews */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Daily Pageviews</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            2902 <span className="text-sm font-normal text-red-500 ml-2">36% <FiChevronDown className="inline w-4 h-4" /> v last month</span>
          </p>
          <div className="flex-grow h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyPageviewsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickFormatter={(value, index) => {
                  const date = new Date(new Date().setDate(new Date().getDate() - (dailyPageviewsData.length - 1 - index) * 7));
                  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
                }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Session Time */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-lg font-medium text-gray-700">Average Session Time</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span> New visitor
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Returning visitor
            </div>
          </div>
          <div className="flex flex-col items-center">
            <RadialBarChart percent={67} color="text-green-500" label="Returning" />
            <p className="text-4xl font-bold text-gray-900 mt-4">190.2 <span className="text-base text-gray-500">seconds</span></p>
            <p className="text-sm text-gray-500 mt-1">27% <span className="text-green-500">↑</span> v last month</p>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-lg font-medium text-gray-700">Bounce Rate</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            62% <span className="text-sm font-normal text-red-500 ml-2">36% <FiChevronDown className="inline w-4 h-4" /> v last month</span>
          </p>
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: 'Bounce', value: 62 }, { name: 'Non-Bounce', value: 38 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell key={`cell-0`} fill="#00C49F" />
                  <Cell key={`cell-1`} fill="#e0e0e0" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-4xl font-bold text-gray-900 mt-4">62%</p>
        </div>

        {/* Conversions */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Conversions</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            16.06% <span className="text-sm font-normal text-red-500 ml-2">24% <FiChevronDown className="inline w-4 h-4" /> v last month</span>
          </p>
          <div className="flex-grow h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conversionsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickFormatter={(value, index) => {
                  const date = new Date(new Date().setDate(new Date().getDate() - (conversionsData.length - 1 - index) * 7));
                  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
                }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Traffic Sources</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex-grow h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: -20, top: '50%', transform: 'translateY(-50%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {trafficSourcesData.map((source, index) => (
              <div key={index} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: source.color }}></span>
                  {source.name}
                </span>
                <span>{source.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Top Countries</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">560 <span className="text-base text-gray-500">clicks</span></p>
          <div className="flex justify-end text-xs text-gray-500 mb-4">
            <span>June</span> <span className="ml-2">May</span>
          </div>
          <div className="flex-grow h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCountriesData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Popular Pages */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Most Popular Pages</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex-grow">
            {mostPopularPagesData.map((page, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
                  <span>{page.name}</span>
                  <span>{page.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${page.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Twitter Mentions */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Twitter Mentions</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <div className="space-y-4 flex-grow">
            <div className="flex items-start">
              <img
                src="https://placehold.co/40x40/E0E7FF/4F46E5?text=L"
                alt="Louis Praise"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">Louis Praise <span className="text-gray-500 font-normal text-sm ml-1">mentioned you • Just now</span></p>
                <p className="text-gray-600 text-sm">"I think this minisite I got from @futurapp is a birthday gift to me and believe me, I've never received this much compliments! I got it for a long time!"</p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src="https://placehold.co/40x40/D1FAE5/065F46?text=TJ"
                alt="Tochi Joel"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-800">Tochi Joel <span className="text-gray-500 font-normal text-sm ml-1">mentioned you • 2 hours ago</span></p>
                <p className="text-gray-600 text-sm">"So excited to get started on this novel! The prose and style of it is absolutely gorgeous, and its moving and philosophy is something to truly cherish. Thanks @futurapp for the opportunity."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Average Load Time */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-700">Average Load Time</h2>
            <FiMoreVertical className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            5 <span className="text-base text-gray-500">seconds</span> <span className="text-sm font-normal text-red-500 ml-2">0.3s <FiChevronDown className="inline w-4 h-4" /></span>
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Homepage
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Product
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span> Return
            </div>
          </div>
          <div className="flex-grow h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={averageLoadTimeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickFormatter={(value, index) => {
                  const date = new Date(new Date().setDate(new Date().getDate() - (averageLoadTimeData.length - 1 - index) * 7));
                  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`;
                }} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
