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
    product: 'MacBook Pro 16"',
    orderId: 'ORD-1234',
    suppliers: 'Apple Inc.',
    status: 'In stock',
    amount: 2499.99,
    quantity: 5,
    date: '2023-10-15',
    image: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=MBP'
  },
  {
    id: 2,
    product: 'Dell XPS 15',
    orderId: 'ORD-5678',
    suppliers: 'Dell Technologies',
    status: 'Delivered',
    amount: 1899.99,
    quantity: 3,
    date: '2023-10-10',
    image: 'https://placehold.co/40x40/10B981/FFFFFF?text=DXPS'
  },
  {
    id: 3,
    product: 'iPhone 15 Pro',
    orderId: 'ORD-9012',
    suppliers: 'Apple Inc.',
    status: 'Canceled',
    amount: 999.99,
    quantity: 10,
    date: '2023-10-05',
    image: 'https://placehold.co/40x40/EF4444/FFFFFF?text=IP15'
  },
  {
    id: 4,
    product: 'Samsung Galaxy S23',
    orderId: 'ORD-3456',
    suppliers: 'Samsung Electronics',
    status: 'In processing',
    amount: 899.99,
    quantity: 8,
    date: '2023-10-18',
    image: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=SGS23'
  },
  {
    id: 5,
    product: 'iPad Air',
    orderId: 'ORD-7890',
    suppliers: 'Apple Inc.',
    status: 'On the way',
    amount: 599.99,
    quantity: 12,
    date: '2023-10-12',
    image: 'https://placehold.co/40x40/6366F1/FFFFFF?text=IPA'
  },
  {
    id: 6,
    product: 'Microsoft Surface Pro',
    orderId: 'ORD-2345',
    suppliers: 'Microsoft Corporation',
    status: 'In stock',
    amount: 1299.99,
    quantity: 4,
    date: '2023-10-08',
    image: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=MS'
  },
  {
    id: 7,
    product: 'Sony WH-1000XM5',
    orderId: 'ORD-6789',
    suppliers: 'Sony Corporation',
    status: 'Delivered',
    amount: 349.99,
    quantity: 15,
    date: '2023-10-03',
    image: 'https://placehold.co/40x40/10B981/FFFFFF?text=SONY'
  },
  {
    id: 8,
    product: 'Logitech MX Keys',
    orderId: 'ORD-0123',
    suppliers: 'Logitech International',
    status: 'Canceled',
    amount: 99.99,
    quantity: 20,
    date: '2023-10-20',
    image: 'https://placehold.co/40x40/EF4444/FFFFFF?text=LMX'
  }
];

// Create Supply Modal Component
const CreateSupplyModal = ({ isOpen, onClose, onCreateSupply }) => {
  const [formData, setFormData] = useState({
    product: '',
    orderId: '',
    suppliers: '',
    status: 'In stock',
    amount: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupply = {
      id: Date.now(), // Generate a unique ID
      product: formData.product,
      orderId: formData.orderId,
      suppliers: formData.suppliers,
      status: formData.status,
      amount: parseFloat(formData.amount),
      quantity: parseInt(formData.quantity),
      date: formData.date,
      image: formData.image || `https://placehold.co/40x40/E0E0E0/333333?text=${formData.product.charAt(0)}`
    };
    onCreateSupply(newSupply);
    setFormData({
      product: '',
      orderId: '',
      suppliers: '',
      status: 'In stock',
      amount: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      image: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Create New Supply</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <input
              type="text"
              name="suppliers"
              value={formData.suppliers}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(statusConfig).filter(k => k !== 'default').map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Create Supply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuppliesPage = () => {
  const setCurrentPage = () => {}; // Temporary placeholder
  
  useEffect(() => {
    setCurrentPage('Supplies');
  }, [setCurrentPage]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [suppliesData, setSuppliesData] = useState(initialSuppliesData);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (e) => {
    setSelectedItems(e.target.checked ? suppliesData.map(item => item.id) : []);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const sortedAndFilteredSupplies = useMemo(() => {
    let filteredData = [...suppliesData];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredData = filteredData.filter(item =>
        item.product.toLowerCase().includes(term) ||
        item.orderId.toLowerCase().includes(term) ||
        item.suppliers.toLowerCase().includes(term)
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(item => item.status === statusFilter);
    }

    if (dateRange.start && dateRange.end) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        
        // Set time to beginning/end of day for proper date comparison
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

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

  const handleCreateSupply = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateNewSupply = (newSupply) => {
    setSuppliesData(prev => [newSupply, ...prev]);
    setIsCreateModalOpen(false);
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

  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? null : status);
    setIsStatusOpen(false);
    showNotification(`Filtered by status: ${status}`, 'info');
  };

  const handleDateFilter = (range) => {
    setDateRange(range);
    setIsDateOpen(false);
    showNotification(`Filtered by date range: ${range.start} to ${range.end}`, 'info');
  };

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

        {notification.message && (
          <div className={`mb-4 p-3 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
            {notification.message}
          </div>
        )}

        <section className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-0 relative">
            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${isFilterOpen ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-expanded={isFilterOpen}
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

            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${statusFilter ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                aria-expanded={isStatusOpen}
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

            <div className="relative">
              <button
                className={`flex items-center px-3 py-2 rounded-lg shadow-sm transition ${dateRange.start ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsDateOpen(!isDateOpen)}
                aria-expanded={isDateOpen}
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

        <CreateSupplyModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreateSupply={handleCreateNewSupply}
        />
      </div>
    </div>
  );
};

export default SuppliesPage;