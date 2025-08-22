import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiPieChart, FiUsers, FiTruck, FiBox, FiBell, FiSettings, 
  FiLogOut, FiMenu, FiSearch, FiChevronDown, FiPlus, FiFilter, 
  FiEdit, FiTrash2, FiShoppingCart, FiDollarSign, FiTrendingUp, 
  FiPackage, FiFileText, FiAlertCircle, FiCreditCard, FiBarChart2 
} from 'react-icons/fi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, 
  AreaChart, Area 
} from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [newItemModalOpen, setNewItemModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received #1234', time: '2 min ago', read: false },
    { id: 2, message: 'Inventory low for Product B', time: '15 min ago', read: false },
    { id: 3, message: 'Monthly sales report ready', time: '1 hour ago', read: true }
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active page from URL path
  const activePage = location.pathname.split('/').pop() || 'dashboard';

  // Sample data for charts
  const inventoryData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 }
  ];
  
  const categoryData = [
    { name: 'Electronics', value: 400, color: '#4F46E5' },
    { name: 'Clothing', value: 300, color: '#10B981' },
    { name: 'Food', value: 300, color: '#F59E0B' },
    { name: 'Furniture', value: 200, color: '#EF4444' },
  ];
  
  const revenueData = [
    { month: 'Jan', revenue: 4000, profit: 2400 },
    { month: 'Feb', revenue: 3000, profit: 1398 },
    { month: 'Mar', revenue: 9800, profit: 6000 },
    { month: 'Apr', revenue: 3908, profit: 2800 },
    { month: 'May', revenue: 4800, profit: 3200 },
    { month: 'Jun', revenue: 3800, profit: 2500 },
    { month: 'Jul', revenue: 5300, profit: 3800 }
  ];

  // Stats cards data
  const statsData = [
    { title: 'Total Revenue', value: '$24,582', change: '+12%', icon: <FiDollarSign className="text-2xl" />, color: 'bg-blue-500' },
    { title: 'Total Sales', value: '1,248', change: '+8%', icon: <FiShoppingCart className="text-2xl" />, color: 'bg-green-500' },
    { title: 'Growth', value: '24.3%', change: '+4%', icon: <FiTrendingUp className="text-2xl" />, color: 'bg-amber-500' },
    { title: 'Inventory', value: '4,862', change: '-2%', icon: <FiPackage className="text-2xl" />, color: 'bg-purple-500' },
  ];

  // Initialize inventory data
  useEffect(() => {
    const sampleInventory = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', stock: 42, price: '$1,299', status: 'In Stock', lowStock: false },
      { id: 2, name: 'Wireless Headphones', category: 'Electronics', stock: 18, price: '$159', status: 'Low Stock', lowStock: true },
      { id: 3, name: 'Office Chair', category: 'Furniture', stock: 12, price: '$249', status: 'In Stock', lowStock: false },
      { id: 4, name: 'Desk Lamp', category: 'Furniture', stock: 5, price: '$49', status: 'Low Stock', lowStock: true },
      { id: 5, name: 'T-Shirt', category: 'Clothing', stock: 124, price: '$29', status: 'In Stock', lowStock: false },
      { id: 6, name: 'Coffee Maker', category: 'Electronics', stock: 22, price: '$89', status: 'In Stock', lowStock: false },
      { id: 7, name: 'Energy Drink', category: 'Food', stock: 3, price: '$3', status: 'Out of Stock', lowStock: true },
      { id: 8, name: 'Jeans', category: 'Clothing', stock: 67, price: '$59', status: 'In Stock', lowStock: false }
    ];
    
    setInventoryItems(sampleInventory);
    setLowStockItems(sampleInventory.filter(item => item.lowStock));
  }, []);

  // Filter inventory based on search and category
  const filteredInventory = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle notification click
  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Handle navigation to different pages
  const handleNavigation = (page) => {
    navigate(`/${page}`);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  // Handle sign out
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('User signed out');
    navigate('/login'); // Redirect to login page
  };

  // Handle generating report
  const handleGenerateReport = () => {
    navigate('/reports');
  };

  // Handle viewing all transactions
  const handleViewAllTransactions = () => {
    navigate('/transactions');
  };

  // Handle viewing low stock items
  const handleViewLowStockItems = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    // Filter to show only low stock items
    setInventoryItems(inventoryItems);
    navigate('/inventory');
  };

  // Handle adding new inventory item
  const handleAddNewItem = () => {
    // In a real app, this would submit to an API
    console.log('Adding new inventory item');
    setNewItemModalOpen(false);
    alert('New item would be added to inventory');
  };

  // Handle editing inventory item
  const handleEditItem = (itemId) => {
    console.log('Editing item:', itemId);
    // Navigate to edit page or open edit modal
    alert(`Edit functionality for item ${itemId} would be implemented here`);
  };

  // Handle deleting inventory item
  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Deleting item:', itemId);
      // Remove item from inventory
      setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    }
  };

  // Render page content based on active page
  const renderPageContent = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                      <p className={`text-xs font-medium mt-2 ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Revenue & Profit</h2>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="profit" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Inventory Chart */}
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Category Chart */}
              <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} units`, 'Inventory']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Low Stock Alert */}
            {lowStockItems.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800 mr-3">
                    <FiAlertCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">Low Stock Alert</h3>
                    <p className="text-sm text-amber-700">{lowStockItems.length} items are running low on stock</p>
                  </div>
                  <button 
                    onClick={handleViewLowStockItems}
                    className="ml-auto bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                  >
                    View Items
                  </button>
                </div>
              </div>
            )}

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-6">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                <button 
                  onClick={handleViewAllTransactions}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all <FiChevronDown className="ml-1 transform rotate-270" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#ORD-1289</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">$249.99</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#ORD-1288</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emma Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 14, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">$159.99</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">#ORD-1287</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Michael Brown</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 13, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">$899.99</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case 'inventory':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Inventory Management</h2>
              <button 
                onClick={() => setNewItemModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center"
              >
                <FiPlus className="mr-2" /> Add New Item
              </button>
            </div>
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
              </select>
              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center">
                <FiFilter className="mr-2" /> Filters
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
                            {item.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">SKU: {`SKU-${item.id.toString().padStart(4, '0')}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock} units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEditItem(item.id)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FiEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-blue-100 p-3 rounded-lg inline-block mb-3">
                  <FiBarChart2 className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-medium text-gray-800">Sales Report</h3>
                <p className="text-sm text-gray-500 mt-1">Detailed analysis of sales performance</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-green-100 p-3 rounded-lg inline-block mb-3">
                  <FiPackage className="text-green-600 text-xl" />
                </div>
                <h3 className="font-medium text-gray-800">Inventory Report</h3>
                <p className="text-sm text-gray-500 mt-1">Current inventory status and trends</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-amber-100 p-3 rounded-lg inline-block mb-3">
                  <FiUsers className="text-amber-600 text-xl" />
                </div>
                <h3 className="font-medium text-gray-800">Customer Report</h3>
                <p className="text-sm text-gray-500 mt-1">Customer demographics and behavior</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed md:relative z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Heritage</h1>
            <p className="text-sm text-gray-400 mt-1">Inventory Management System</p>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-400">Hello,</p>
              <h2 className="text-lg font-semibold">Kristi</h2>
            </div>
          </div>
        </div>
        
        <nav className="p-4 mt-2">
          <ul className="space-y-1">
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('dashboard')}
            >
              <FiHome className="mr-3 text-lg" />
              <span className="font-medium">Dashboard</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'analytics' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('analytics')}
            >
              <FiPieChart className="mr-3 text-lg" />
              <span className="font-medium">Analytics</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'customers' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('customers')}
            >
              <FiUsers className="mr-3 text-lg" />
              <span className="font-medium">Customers</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('inventory')}
            >
              <FiBox className="mr-3 text-lg" />
              <span className="font-medium">Inventory</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'supplies' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('supplies')}
            >
              <FiTruck className="mr-3 text-lg" />
              <span className="font-medium">Supplies</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'reports' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('reports')}
            >
              <FiFileText className="mr-3 text-lg" />
              <span className="font-medium">Reports</span>
            </li>
            <li 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 cursor-pointer ${activePage === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              onClick={() => handleNavigation('settings')}
            >
              <FiSettings className="mr-3 text-lg" />
              <span className="font-medium">Settings</span>
            </li>
            <li 
              className="flex items-center p-3 hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer mt-6"
              onClick={handleSignOut}
            >
              <FiLogOut className="mr-3 text-lg" />
              <span className="font-medium">Sign Out</span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-30 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <FiMenu className="text-xl" />
              </button>
              <div className="relative ml-4">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-colors duration-200"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 relative">
                  <FiBell className="text-xl text-gray-700" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">Kristi</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <FiChevronDown className="ml-1 hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Title and Actions */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">{activePage}</h1>
              {activePage === 'dashboard' && (
                <button 
                  onClick={handleGenerateReport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <FiTrendingUp className="mr-2" />
                  Generate Report
                </button>
              )}
            </div>
            
            {renderPageContent()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* New Item Modal */}
      {newItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Add New Inventory Item</h3>
              <button onClick={() => setNewItemModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Food</option>
                    <option>Furniture</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setNewItemModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddNewItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;