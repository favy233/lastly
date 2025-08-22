import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
} from '@mui/material';

// Mock data to replace context
const initialStats = {
  products: [
    { id: 'P001', name: 'Product A', category: 'Electronics', currentStock: 75 },
    { id: 'P002', name: 'Product B', category: 'Home Goods', currentStock: 15 },
    { id: 'P003', name: 'Product C', category: 'Tools', currentStock: 5 },
    { id: 'P004', name: 'Product D', category: 'Electronics', currentStock: 40 }
  ],
  transactions: [
    { id: 'T001', type: 'in', productId: 'P001', productName: 'Product A', quantity: 50, value: 5000, date: '2024-08-01', reference: 'PO-123', notes: '' },
    { id: 'T002', type: 'out', productId: 'P002', productName: 'Product B', quantity: 10, value: 1500, date: '2024-08-02', reference: 'SO-456', notes: '' },
  ],
  income: 1500,
  expenses: 5000,
};

const StockInOutPage = () => {
  const [activeTab, setActiveTab] = useState('stockIn');
  const [stats, setStats] = useState(initialStats);
  const { transactions, products: inventoryItems } = stats;

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    reference: '',
    unitPrice: '',
    totalValue: '',
    notes: ''
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({
      productId: '',
      productName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      reference: '',
      unitPrice: '',
      totalValue: '',
      notes: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'productId') {
      const selectedProduct = inventoryItems.find(p => p.id === value);
      updatedData.productName = selectedProduct?.name || '';
    }

    if (name === 'unitPrice' || name === 'quantity') {
      const quantity = name === 'quantity' ? value : formData.quantity;
      const unitPrice = name === 'unitPrice' ? value : formData.unitPrice;
      if (!isNaN(quantity) && !isNaN(unitPrice)) {
        updatedData.totalValue = (parseFloat(unitPrice) * parseFloat(quantity)).toFixed(2);
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const updatedProducts = inventoryItems.map(item => {
      if (item.id === formData.productId) {
        return {
          ...item,
          currentStock: activeTab === 'stockIn'
            ? item.currentStock + parseInt(formData.quantity)
            : item.currentStock - parseInt(formData.quantity)
        };
      }
      return item;
    });

    // Calculate financial impact
    const amount = parseFloat(formData.totalValue) || 0;
    const isIncome = activeTab === 'stockOut';
    
    setStats(prev => ({
      ...prev,
      products: updatedProducts,
      transactions: [newTransaction, ...prev.transactions],
      income: isIncome ? prev.income + amount : prev.income,
      expenses: !isIncome ? prev.expenses + amount : prev.expenses
    }));

    setFormData({
      productId: '',
      productName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      reference: '',
      unitPrice: '',
      totalValue: '',
      notes: ''
    });

    alert(`${activeTab === 'stockIn' ? 'Stock In' : 'Stock Out'} recorded successfully!`);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Stock In" value="stockIn" />
        <Tab label="Stock Out" value="stockOut" />
      </Tabs>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Product</InputLabel>
          <Select
            name="productId"
            value={formData.productId}
            label="Product"
            onChange={handleChange}
          >
            {inventoryItems.map(item => (
              <MenuItem key={item.id} value={item.id}>
                {item.name} (Stock: {item.currentStock || 0})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ min: 1 }}
        />

        <Box display="flex" gap={2}>
          <TextField
            name="unitPrice"
            label="Unit Price (₦)"
            type="number"
            value={formData.unitPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ step: "0.01", min: 0 }}
          />
          <TextField
            name="totalValue"
            label="Total Value (₦)"
            value={formData.totalValue}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
        </Box>

        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          name="reference"
          label={activeTab === 'stockIn' ? 'Purchase Order #' : 'Sales Order #'}
          value={formData.reference}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="notes"
          label="Notes"
          value={formData.notes}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large" 
          fullWidth 
          sx={{ mt: 2 }}
        >
          {activeTab === 'stockIn' ? 'Record Stock In' : 'Record Stock Out'}
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        Recent Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Value (₦)</TableCell>
              <TableCell>Reference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0, 5).map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.productName}</TableCell>
                <TableCell>
                  <Box 
                    component="span" 
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: txn.type === 'in' ? 'success.light' : 'error.light',
                      color: txn.type === 'in' ? 'success.contrastText' : 'error.contrastText',
                    }}
                  >
                    {txn.type.toUpperCase()}
                  </Box>
                </TableCell>
                <TableCell>{txn.quantity}</TableCell>
                <TableCell>{txn.value?.toFixed(2)}</TableCell>
                <TableCell>{txn.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom>
        Current Inventory
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.currentStock || 0}</TableCell>
                <TableCell>
                  <Box 
                    component="span" 
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: item.currentStock > 50 
                        ? 'success.light' 
                        : item.currentStock > 10 
                          ? 'warning.light' 
                          : 'error.light',
                      color: item.currentStock > 50 
                        ? 'success.contrastText' 
                        : item.currentStock > 10 
                          ? 'warning.contrastText' 
                          : 'error.contrastText',
                    }}
                  >
                    {item.currentStock > 50 ? 'In Stock' : item.currentStock > 10 ? 'Low Stock' : 'Critical'}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockInOutPage;