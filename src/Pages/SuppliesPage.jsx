import React, { useState, useMemo, useEffect } from 'react';

// Status configuration for consistent styling and behavior
const statusConfig = {
  'In stock': { bg: 'bg-purple-100', text: 'text-purple-800' },
  'Delivered': { bg: 'bg-green-100', text: 'text-green-800' },
  'Canceled': { bg: 'bg-red-100', text: 'text-red-800' },
  'In processing': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  'On the way': { bg: 'bg-blue-100', text: 'text-blue-800' },
  default: { bg: 'bg-gray-100', text: 'text-gray-800' }
};

// Dummy data for the supplies table
const initialSuppliesData = [
  {
    id: 1,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=T',
    product: 'T-shirt "Sport"',
    orderId: 'ORD12345-6789',
    suppliers: 'Fashion Trends Co.',
    status: 'In stock',
    amount: 1800.00,
    quantity: 532,
    date: '2024-03-15'
  },
  {
    id: 2,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=J',
    product: 'Jeans "Slim Fit"',
    orderId: 'SUP20223-4567',
    suppliers: 'StyleMakers Apparel',
    status: 'Delivered',
    amount: 5700.00,
    quantity: 142,
    date: '2024-03-10'
  },
  {
    id: 3,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=D',
    product: 'Dress "Floral Print"',
    orderId: 'PO56789-0123',
    suppliers: 'Elite Fashion Suppliers',
    status: 'Delivered',
    amount: 5000.00,
    quantity: 678,
    date: '2024-03-05'
  },
  {
    id: 4,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=H',
    product: 'Hoodie "Cozy Comfy"',
    orderId: 'ORD98777-4321',
    suppliers: 'Glamour Couture Inc.',
    status: 'Canceled',
    amount: 5600.00,
    quantity: 855,
    date: '2024-02-28'
  },
  {
    id: 5,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=S',
    product: 'Skirt "A-line Midi"',
    orderId: 'SUP45678-9012',
    suppliers: 'Vogue Wear Ltd.',
    status: 'In processing',
    amount: 2600.00,
    quantity: 544,
    date: '2024-02-20'
  },
  {
    id: 6,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=B',
    product: 'Blouse "Silk Elegance"',
    orderId: 'PO34567-8901',
    suppliers: 'Chic Designs International',
    status: 'On the way',
    amount: 1800.00,
    quantity: 600,
    date: '2024-02-15'
  },
  {
    id: 7,
    image: 'https://placehold.co/40x40/E0E0E0/333333?text=S',
    product: 'Sweater "Chunky Knit"',
    orderId: 'ORD23456-7890',
    suppliers: 'Trendy Threads Wholesale',
    status: 'On the way',
    amount: 1600.00,
    quantity: 753,
    date: '2024-02-10'
  }
];

// Main App component
const SuppliesPage = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [activeFilter, setActiveFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [suppliesData, setSuppliesData] = useState(initialSuppliesData);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  // Handle checkbox change for individual items
  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Handle "select all" checkbox change
  const handleSelectAllChange = (e) => {
    setSelectedItems(e.target.checked ? suppliesData.map(item => item.id) : []);
  };

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Filter and sort data
  const sortedAndFilteredSupplies = useMemo(() => {
    let filteredData = [...suppliesData];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item =>
        item.product.toLowerCase().includes(term) ||
        item.orderId.toLowerCase().includes(term) ||
        item.suppliers.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filteredData = filteredData.filter(item => item.status === statusFilter);
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(dateRange.start) && itemDate <= new Date(dateRange.end);
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [suppliesData, searchTerm, statusFilter, dateRange, sortConfig]);

  // Action handlers
  const handleCreateSupply = () => {
    // In a real app, this would open a modal/form
    showNotification('Supply created successfully!', 'success');
  };

  const handleEditSelected = () => {
    if (selectedItems.length === 0) {
      showNotification('Please select items to edit', 'warning');
      return;
    }
    showNotification(`Editing ${selectedItems.length} items`, 'info');
  };

  const handleCopySelected = () => {
    if (selectedItems.length === 0) {
      showNotification('Please select items to copy', 'warning');
      return;
    }
    showNotification(`Copied ${selectedItems.length} items`, 'success');
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) {
      showNotification('Please select items to delete', 'warning');
      return;
    }
    setSuppliesData(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    showNotification(`Deleted ${selectedItems.length} items`, 'success');
  };

  // Status filter handlers
  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? null : status);
    setIsStatusOpen(false);
    showNotification(`Filtered by status: ${status}`, 'info');
  };

  // Date filter handlers
  const handleDateFilter = (range) => {
    setDateRange(range);
    setIsDateOpen(false);
    showNotification(`Filtered by date range: ${range.start} to ${range.end}`, 'info');
  };

  // Predefined date ranges
  const predefinedDateRanges = [
    { label: 'Last 7 days', value: { 
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0] 
    }},
    { label: 'This month', value: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
    }},
    { label: 'Last month', value: {
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0],
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split('T')[0]
    }}
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <h1 className="text-2xl font-bold text-gray-800 mr-4">Supplies</h1>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search supplies..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-300"
            onClick={handleCreateSupply}
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create supply
          </button>
        </header>

        {/* Notification */}
        {notification.message && (
          <div className={`mb-4 p-3 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
            {notification.message}
          </div>
        )}

        {/* Filters and Actions Section */}
        <section className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-0 relative">
            {/* General Filters Button */}
            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${isFilterOpen ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01.293.707V19a1 1 0 01-1 1H4a1 1 0 01-1-1V7.293a1 1 0 01.293-.707L3 4z" />
                </svg>
                Filters
                <svg className={`w-3 h-3 ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFilterOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">Advanced Filters</div>
                  <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">By Supplier</div>
                  <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">By Amount Range</div>
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${statusFilter ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                Status
                <svg className={`w-3 h-3 ml-1 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isStatusOpen && (
                <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {Object.keys(statusConfig).filter(k => k !== 'default').map(status => (
                    <div 
                      key={status}
                      className={`px-4 py-2 text-sm cursor-pointer ${statusFilter === status ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                      onClick={() => handleStatusFilter(status)}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Filter */}
            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${dateRange.start ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsDateOpen(!isDateOpen)}
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date
                <svg className={`w-3 h-3 ml-1 transition-transform ${isDateOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDateOpen && (
                <div className="absolute z-10 mt-2 w-64 bg-white rounded-md shadow-lg py-1 p-4">
                  <h4 className="font-medium mb-2">Predefined Ranges</h4>
                  {predefinedDateRanges.map(range => (
                    <div 
                      key={range.label}
                      className={`px-3 py-2 text-sm mb-1 rounded cursor-pointer ${dateRange.start === range.value.start ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                      onClick={() => handleDateFilter(range.value)}
                    >
                      {range.label}
                    </div>
                  ))}
                  <h4 className="font-medium mt-4 mb-2">Custom Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="date" 
                      className="border rounded p-1 text-sm" 
                      onChange={e => setDateRange(prev => ({...prev, start: e.target.value }))}
                      value={dateRange.start || ''}
                    />
                    <input 
                      type="date" 
                      className="border rounded p-1 text-sm" 
                      onChange={e => setDateRange(prev => ({...prev, end: e.target.value }))}
                      value={dateRange.end || ''}
                    />
                  </div>
                  <button 
                    className="mt-2 w-full bg-blue-500 text-white py-1 rounded text-sm"
                    onClick={() => {
                      if (dateRange.start && dateRange.end) {
                        handleDateFilter(dateRange);
                      } else {
                        showNotification('Please select both start and end dates', 'warning');
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            {(statusFilter || dateRange.start || searchTerm) && (
              <button
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setStatusFilter(null);
                  setDateRange({ start: null, end: null });
                  setSearchTerm('');
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Selected Items Actions */}
          {selectedItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-gray-700">
              <span className="font-semibold">{selectedItems.length} Items Selected</span>
              <button
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                onClick={handleEditSelected}
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </button>
              <button
                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                onClick={handleCopySelected}
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v4a1 1 0 001 1h3m-3-4h.01M12 16l-4-4m0 0l-4 4m4-4V4m0 0h.01M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2" />
                </svg>
                Copy
              </button>
              <button
                className="flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition"
                onClick={handleDeleteSelected}
              >
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </section>

        {/* Supplies Table Section */}
        <section className="bg-white shadow-md rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      onChange={handleSelectAllChange}
                      checked={selectedItems.length === sortedAndFilteredSupplies.length && sortedAndFilteredSupplies.length > 0}
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('product')}
                  >
                    Product
                    {sortConfig.key === 'product' && (
                      <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('orderId')}
                  >
                    Order ID
                    {sortConfig.key === 'orderId' && (
                      <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('suppliers')}
                  >
                    Suppliers
                    {sortConfig.key === 'suppliers' && (
                      <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('amount')}
                  >
                    Amount
                    {sortConfig.key === 'amount' && (
                      <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => requestSort('quantity')}
                  >
                    Quantity
                    {sortConfig.key === 'quantity' && (
                      <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredSupplies.length > 0 ? (
                  sortedAndFilteredSupplies.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                            <img
                              className="h-10 w-10 object-cover"
                              src={item.image}
                              alt={item.product}
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = `https://placehold.co/40x40/E0E0E0/333333?text=${item.product.charAt(0)}`; 
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.product}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.suppliers}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${statusConfig[item.status]?.bg || statusConfig.default.bg} 
                          ${statusConfig[item.status]?.text || statusConfig.default.text}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-500 hover:text-gray-900">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No supplies found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SuppliesPage;