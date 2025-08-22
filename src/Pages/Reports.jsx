import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Area
} from "recharts";

const Reports = () => {
  // State for filters
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    status: "",
  });

  // State for inventory data
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data - simulate API
  useEffect(() => {
    setTimeout(() => {
      setInventoryData([
        { id: 1, name: "Wireless Headphones", category: "Electronics", stock: 42, status: "Adequate", value: 1260 },
        { id: 2, name: "Smart Watch", category: "Electronics", stock: 5, status: "Low", value: 750 },
        { id: 3, name: "Desk Lamp", category: "Furniture", stock: 18, status: "Moderate", value: 540 },
        { id: 4, name: "Cotton T-Shirt", category: "Clothing", stock: 0, status: "Out of Stock", value: 0 },
        { id: 5, name: "Bluetooth Speaker", category: "Electronics", stock: 25, status: "Adequate", value: 1250 },
        { id: 6, name: "Office Chair", category: "Furniture", stock: 8, status: "Low", value: 2400 },
        { id: 7, name: "Coffee Maker", category: "Appliances", stock: 15, status: "Moderate", value: 850 },
        { id: 8, name: "Running Shoes", category: "Clothing", stock: 32, status: "Adequate", value: 1920 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtered data
  const filteredData = useMemo(() => {
    return inventoryData.filter((item) => {
      const matchCategory = filters.category ? item.category.toLowerCase() === filters.category.toLowerCase() : true;
      const matchStatus = filters.status ? item.status.toLowerCase().includes(filters.status.toLowerCase()) : true;
      return matchCategory && matchStatus;
    });
  }, [filters, inventoryData]);

  // Stats
  const totalProducts = filteredData.length;
  const totalValue = filteredData.reduce((acc, item) => acc + item.value, 0);
  const lowStock = filteredData.filter((item) => item.status.toLowerCase().includes("low")).length;

  // Chart data
  const categoryData = Object.values(
    filteredData.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || { name: item.category, value: 0 };
      acc[item.category].value++;
      return acc;
    }, {})
  );

  const stockValueData = Object.values(
    filteredData.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || { category: item.category, value: 0 };
      acc[item.category].value += item.value;
      return acc;
    }, {})
  );

  const COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"];

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case "Low":
        return "badge bg-danger";
      case "Moderate":
        return "badge bg-warning text-dark";
      case "Adequate":
        return "badge bg-success";
      case "Out of Stock":
        return "badge bg-dark";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <div className="col-md-12 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Inventory Reports</h2>
            <div className="d-flex align-items-center">
              <span className="me-2">Hello, Admin</span>
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=3498db&color=fff"
                className="rounded-circle"
                width="40"
                height="40"
                alt="Admin"
              />
            </div>
          </div>

          {/* Report Filters */}
          <div className="card mb-4">
            <div className="card-body row">
              <div className="col-md-3 mb-2">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                </select>
              </div>
              <div className="col-md-3 mb-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Status</option>
                  <option value="Low">Low Stock</option>
                  <option value="Adequate">Adequate Stock</option>
                  <option value="Out">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="fas fa-boxes fs-1 text-primary mb-2"></i>
                  <h3 className="card-title">{totalProducts}</h3>
                  <p className="card-text text-muted">Total Products</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="fas fa-exclamation-triangle fs-1 text-primary mb-2"></i>
                  <h3 className="card-title">{lowStock}</h3>
                  <p className="card-text text-muted">Low Stock Items</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <i className="fas fa-dollar-sign fs-1 text-primary mb-2"></i>
                  <h3 className="card-title">${totalValue.toLocaleString()}</h3>
                  <p className="card-text text-muted">Total Inventory Value</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">Inventory by Category</div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {categoryData.map((_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header">Inventory Value by Category</div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stockValueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3498db" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="card">
            <div className="card-header">Inventory Status Report</div>
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>PRD-{item.id.toString().padStart(3, "0")}</td>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>{item.stock}</td>
                          <td>
                            <span className={getStatusClass(item.status)}>
                              {item.status}
                            </span>
                          </td>
                          <td>${item.value.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
