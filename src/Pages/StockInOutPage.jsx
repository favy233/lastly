import React, { useState } from 'react';

const StockInOutPage = () => {
  // State for active tab (stock in or stock out)
  const [activeTab, setActiveTab] = useState('stockIn');
  
  // State for form data
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    supplier: '',
    notes: '',
    reference: '',
    unitPrice: '',
    totalValue: ''
  });

  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState([
    { id: 'P001', name: 'Hamedica SoundSleep', currentStock: 120, category: 'Health' },
    { id: 'P002', name: 'Orangemonkka Fotilo360', currentStock: 85, category: 'Electronics' },
    { id: 'P003', name: 'Katsibant 3D Printer Kit', currentStock: 42, category: 'Manufacturing' },
    { id: 'P004', name: 'DIY Crafts Kit', currentStock: 210, category: 'Hobby' },
    { id: 'P005', name: 'Giffawa Smart Watch', currentStock: 75, category: 'Electronics' },
  ]);

  // State for transaction history
  const [transactions, setTransactions] = useState([
    { id: 'T001', type: 'in', productId: 'P001', productName: 'Hamedica SoundSleep', quantity: 50, date: '2023-05-15', reference: 'PO-2023-001', value: 1250 },
    { id: 'T002', type: 'out', productId: 'P002', productName: 'Orangemonkka Fotilo360', quantity: 15, date: '2023-05-16', reference: 'SO-2023-002', value: 375 },
    { id: 'T003', type: 'in', productId: 'P003', productName: 'Katsibant 3D Printer Kit', quantity: 20, date: '2023-05-17', reference: 'PO-2023-003', value: 1000 },
    { id: 'T004', type: 'out', productId: 'P001', productName: 'Hamedica SoundSleep', quantity: 30, date: '2023-05-18', reference: 'SO-2023-004', value: 750 },
  ]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate total value if quantity or unit price changes
    if (name === 'quantity' || name === 'unitPrice') {
      const quantity = name === 'quantity' ? value : formData.quantity;
      const unitPrice = name === 'unitPrice' ? value : formData.unitPrice;
      if (quantity && unitPrice) {
        setFormData(prev => ({
          ...prev,
          totalValue: (parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2)
        }));
      }
    }
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    setFormData(prev => ({
      ...prev,
      productId: product.id,
      productName: product.name
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new transaction
    const newTransaction = {
      id: `T${(transactions.length + 1000).toString().slice(1)}`,
      type: activeTab === 'stockIn' ? 'in' : 'out',
      productId: formData.productId,
      productName: formData.productName,
      quantity: parseInt(formData.quantity),
      date: formData.date,
      reference: formData.reference,
      value: parseFloat(formData.totalValue) || 0,
      notes: formData.notes
    };

    // Update transactions
    setTransactions(prev => [newTransaction, ...prev]);

    // Update inventory
    setInventoryItems(prev => prev.map(item => {
      if (item.id === formData.productId) {
        return {
          ...item,
          currentStock: activeTab === 'stockIn' 
            ? item.currentStock + parseInt(formData.quantity)
            : item.currentStock - parseInt(formData.quantity)
        };
      }
      return item;
    }));

    // Reset form
    setFormData({
      productId: '',
      productName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      supplier: '',
      notes: '',
      reference: '',
      unitPrice: '',
      totalValue: ''
    });

    alert(`${activeTab === 'stockIn' ? 'Stock In' : 'Stock Out'} recorded successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-600">Manage your stock in and stock out operations</p>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'stockIn' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('stockIn')}
          >
            Stock In
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'stockOut' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('stockOut')}
          >
            Stock Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {activeTab === 'stockIn' ? 'Stock In Form' : 'Stock Out Form'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Product Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Search or select product"
                    value={formData.productName}
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => document.getElementById('productModal').showModal()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter quantity"
                  required
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              {/* Reference */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'stockIn' ? 'Purchase Order' : 'Sales Order'} #
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder={`Enter ${activeTab === 'stockIn' ? 'PO' : 'SO'} number`}
                  required
                />
              </div>

              {/* Unit Price and Total Value */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Value ($)</label>
                  <input
                    type="text"
                    name="totalValue"
                    value={formData.totalValue}
                    readOnly
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50"
                  />
                </div>
              </div>

              {/* Additional Fields */}
              {activeTab === 'stockIn' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter supplier name"
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Additional notes"
                  rows="2"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
              >
                {activeTab === 'stockIn' ? 'Record Stock In' : 'Record Stock Out'}
              </button>
            </form>
          </div>

          {/* Transaction History */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value ($)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.type === 'in' ? 'IN' : 'OUT'}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.productName}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.quantity}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.reference}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{transaction.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Inventory</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{item.currentStock}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.currentStock > 50 ? 'bg-green-100 text-green-800' :
                        item.currentStock > 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.currentStock > 50 ? 'In Stock' : item.currentStock > 10 ? 'Low Stock' : 'Critical'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Selection Modal */}
      <dialog id="productModal" className="w-full max-w-md rounded-lg shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Product</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {inventoryItems.map(item => (
              <div
                key={item.id}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${formData.productId === item.id ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  handleProductSelect(item);
                  document.getElementById('productModal').close();
                }}
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">ID: {item.id} | Stock: {item.currentStock}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => document.getElementById('productModal').close()}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default StockInOutPage;