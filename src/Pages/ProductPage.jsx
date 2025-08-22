import React, { useState, useEffect } from 'react';

// Mock data to replace the DashboardContext
const initialStats = {
  products: [
    { id: 1, name: 'Wireless Headphones', image: 'https://placehold.co/60x60/E0E0E0/333333?text=WH', checked: false, price: 99.99, inventory: 55, status: 'Available', timeRange: '9:00-17:00' },
    { id: 2, name: 'Smartwatch', image: 'https://placehold.co/60x60/E0E0E0/333333?text=SW', checked: true, price: 199.99, inventory: 8, status: 'Low Stock', timeRange: '10:00-18:00' },
    { id: 3, name: 'Portable Charger', image: 'https://placehold.co/60x60/E0E0E0/333333?text=PC', checked: false, price: 29.99, inventory: 150, status: 'Available' },
    { id: 4, name: 'Bluetooth Speaker', image: 'https://placehold.co/60x60/E0E0E0/333333?text=BS', checked: true, price: 79.99, inventory: 0, status: 'Out of Stock' },
  ],
};

const ProductsPage = () => {
  const [stats, setStats] = useState(initialStats);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set current page on mount (removed since there's no setCurrentPage)
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const products = stats.products || [];

  const handleCheckboxChange = (id) => {
    try {
      const updatedProducts = products.map(product =>
        product.id === id ? { ...product, checked: !product.checked } : product
      );
      setStats(prev => ({ ...prev, products: updatedProducts }));
    } catch (err) {
      setError('Failed to update product selection');
      console.error(err);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 :
        name === 'inventory' ? parseInt(value) || 0 :
          value
    }));
  };

  const saveChanges = () => {
    if (!editedProduct.id || !selectedProduct) return;

    try {
      const updatedProducts = products.map(product =>
        product.id === editedProduct.id ? { ...product, ...editedProduct } : product
      );

      setStats(prev => ({ ...prev, products: updatedProducts }));
      setSelectedProduct(prev => prev ? { ...prev, ...editedProduct } : null);
      setEditMode(false);
    } catch (err) {
      setError('Failed to save changes');
      console.error(err);
    }
  };

  const addNewProduct = () => {
    const newProduct = {
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      name: 'New Product',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=NP',
      checked: false,
      price: 0,
      inventory: 0,
      status: 'Available'
    };

    setStats(prev => ({ ...prev, products: [...prev.products, newProduct] }));
    setSelectedProduct(newProduct);
    setEditedProduct(newProduct);
    setEditMode(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setStats(prev => ({
        ...prev,
        products: prev.products.filter(product => product.id !== id)
      }));
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'checked') return product.checked;
    if (activeFilter === 'unchecked') return !product.checked;
    return true;
  });

  const statsData = [
    { value: products.length, label: 'Total Products', change: '+15% Since last week' },
    { value: products.filter(p => p.status === 'Available').length, label: 'Available', change: '+10%' },
    { value: products.filter(p => p.inventory > 0).length, label: 'In Stock', change: '+5%' },
    { value: products.filter(p => p.inventory < 10).length, label: 'Low Stock', change: '+2%' },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
        <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products Management</h1>
          <button
            onClick={addNewProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Add New Product
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products List */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Products List</h2>
              <div className="flex space-x-2">
                {['all', 'checked', 'unchecked'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 text-xs rounded-md ${
                      activeFilter === filter ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {filter === 'all' ? 'All' : filter === 'checked' ? 'Selected' : 'Unselected'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedProduct?.id === product.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <img
                      src={product.image || `https://placehold.co/60x60/E0E0E0/333333?text=${product.name.charAt(0)}`}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover mr-3"
                      onError={(e) => {
                        const target = e.target;
                        target.onerror = null;
                        target.src = `https://placehold.co/60x60/E0E0E0/333333?text=${product.name.charAt(0)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
                      <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-2 gap-y-1">
                        {product.timeRange && <span>{product.timeRange}</span>}
                        <span>${product.price.toFixed(2)}</span>
                        <span className={product.inventory < 10 ? 'text-red-500' : ''}>
                          {product.inventory} in stock
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${
                          product.status === 'Available' ? 'bg-green-100 text-green-800' :
                            product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={product.checked}
                        onChange={() => handleCheckboxChange(product.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProduct(product.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No products found. Click "Add New Product" to create one.
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-96 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>
              {selectedProduct && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`text-sm ${editMode ? 'text-gray-600' : 'text-blue-600'} hover:text-blue-800`}
                  >
                    {editMode ? 'Cancel' : 'Edit'}
                  </button>
                  {editMode && (
                    <button
                      onClick={saveChanges}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Save
                    </button>
                  )}
                </div>
              )}
            </div>

            {selectedProduct ? (
              <div>
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedProduct.image || `https://placehold.co/120x120/E0E0E0/333333?text=${selectedProduct.name.charAt(0)}`}
                    alt={selectedProduct.name}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                </div>

                {editMode ? (
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={editedProduct.image || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={editedProduct.status || 'Available'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Discontinued">Discontinued</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price || 0}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inventory</label>
                      <input
                        type="number"
                        name="inventory"
                        value={editedProduct.inventory || 0}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                      <input
                        type="text"
                        name="timeRange"
                        value={editedProduct.timeRange || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="e.g. 9:00-17:00"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-center font-medium text-gray-800 mb-2">{selectedProduct.name}</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          selectedProduct.status === 'Available' ? 'bg-green-100 text-green-800' :
                            selectedProduct.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedProduct.status}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Price:</span>
                        <span className="text-sm text-gray-600">${selectedProduct.price.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Inventory:</span>
                        <span className={`text-sm ${
                          selectedProduct.inventory < 10 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {selectedProduct.inventory} units
                        </span>
                      </div>

                      {selectedProduct.timeRange && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Time Range:</span>
                          <span className="text-sm text-gray-600">{selectedProduct.timeRange}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a product to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;