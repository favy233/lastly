import React, { useState } from 'react';

const ProductsPage = () => {
  // State for product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Hamedica SoundSleep',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=HS',
      checked: false,
      timeRange: null
    },
    {
      id: 2,
      name: 'Orangemonkka Fotilo360',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=OF',
      checked: false,
      timeRange: '9:00-5:55'
    },
    {
      id: 3,
      name: 'Katsibant - 3 V2 Sn-Kit & 3 Inch',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=KV',
      checked: false,
      timeRange: '8:00-6:54'
    },
    {
      id: 4,
      name: 'Katsibant - 3 V2 3D Printer Kit All',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=KP',
      checked: false,
      timeRange: '9:00-7:45'
    },
    {
      id: 5,
      name: 'DIY Crafts As Image',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=DC',
      checked: false,
      timeRange: '10:00-11:30'
    },
    {
      id: 6,
      name: 'Giffawa & In I',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=GI',
      checked: false,
      timeRange: '11:00-12:45'
    },
    {
      id: 7,
      name: 'Pries',
      image: 'https://placehold.co/60x60/E0E0E0/333333?text=PR',
      checked: false,
      timeRange: '12:00-13:45'
    }
  ]);

  // State for selected filter
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, checked: !product.checked } : product
    ));
  };

  // Filter products based on active filter
  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'checked') return product.checked;
    if (activeFilter === 'unchecked') return !product.checked;
    return true;
  });

  // Stats data
  const stats = [
    { value: '25,430', label: 'Total Products', change: '+15% Since last week' },
    { value: '20,120', label: 'Available', change: '+15% Since last week' },
    { value: '15,650', label: 'In Stock', change: '+15% Since last week' },
    { value: '10,340', label: 'Low Stock', change: '+15% Since last week' }
  ];

  // Handle product selection for details view
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xs text-green-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products List */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Products List</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 text-xs rounded-md ${activeFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('checked')}
                  className={`px-3 py-1 text-xs rounded-md ${activeFilter === 'checked' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Selected
                </button>
                <button
                  onClick={() => setActiveFilter('unchecked')}
                  className={`px-3 py-1 text-xs rounded-md ${activeFilter === 'unchecked' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  Unselected
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${selectedProduct?.id === product.id ? 'bg-blue-50 border border-blue-200' : ''}`}
                  onClick={() => handleProductSelect(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 rounded-md object-cover mr-3"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = `https://placehold.co/60x60/E0E0E0/333333?text=${product.name.charAt(0)}`; 
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    {product.timeRange && (
                      <p className="text-xs text-gray-500">{product.timeRange}</p>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => handleCheckboxChange(product.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-80 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h2>
            
            {selectedProduct ? (
              <div>
                <div className="flex justify-center mb-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-24 h-24 rounded-md object-cover"
                  />
                </div>
                <h3 className="text-center font-medium text-gray-800 mb-2">{selectedProduct.name}</h3>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Available</option>
                      <option>Out of Stock</option>
                      <option>Discontinued</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
                      placeholder="$0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inventory</label>
                    <input 
                      type="number" 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" 
                      placeholder="0"
                    />
                  </div>
                  
                  {selectedProduct.timeRange && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                      <p className="text-sm text-gray-600">{selectedProduct.timeRange}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700">
                      Save Changes
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md text-sm hover:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a product to view details
              </div>
            )}
          </div>
        </div>

        {/* Additional Product Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Produce List */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Produce List</h2>
            <div className="space-y-3">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-10 h-10 rounded-md object-cover mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                  </div>
                  <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Time-based Products */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Time-based Products</h2>
            <div className="space-y-3">
              {products.filter(p => p.timeRange).map((product) => (
                <div key={product.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-20 text-xs text-gray-500">{product.timeRange}</div>
                  <div className="flex-1 text-sm font-medium text-gray-800">{product.name}</div>
                  <input
                    type="checkbox"
                    checked={product.checked}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;