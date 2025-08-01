import React, { useState, useEffect } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
  Pagination,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Toolbar,
  AppBar,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

const InventoryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Sample inventory data with guaranteed IDs
  const initialInventory = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, quantity: 15, supplier: 'Tech Corp' },
    { id: 2, name: 'Desk Chair', category: 'Furniture', price: 149.99, quantity: 30, supplier: 'Furniture World' },
    { id: 3, name: 'Notebook', category: 'Office Supplies', price: 4.99, quantity: 200, supplier: 'Office Depot' },
    { id: 4, name: 'Monitor', category: 'Electronics', price: 199.99, quantity: 25, supplier: 'Tech Corp' },
    { id: 5, name: 'Pen Set', category: 'Office Supplies', price: 12.99, quantity: 150, supplier: 'Office Depot' },
    { id: 6, name: 'Desk', category: 'Furniture', price: 249.99, quantity: 18, supplier: 'Furniture World' },
  ];

  // State management with proper initialization
  const [inventory, setInventory] = useState(initialInventory);
  const [filteredInventory, setFilteredInventory] = useState(initialInventory);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    supplier: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = isMobile ? 5 : 10;

  // Safe category extraction with fallback
  const categories = ['all', ...new Set(inventory.map(item => item.category || '').filter(Boolean))];

  // Filter and sort inventory with error handling
  useEffect(() => {
    try {
      let result = [...inventory];
      
      // Apply search filter
      if (searchTerm) {
        result = result.filter(item => 
          (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.supplier || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply category filter
      if (categoryFilter !== 'all') {
        result = result.filter(item => item.category === categoryFilter);
      }
      
      // Apply sorting with null checks
      if (sortConfig?.key) {
        result.sort((a, b) => {
          const valA = a[sortConfig.key] || '';
          const valB = b[sortConfig.key] || '';
          
          if (valA < valB) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (valA > valB) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      
      setFilteredInventory(result);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering inventory:", error);
      setFilteredInventory(inventory);
      toast.error('Error filtering inventory');
    }
  }, [inventory, searchTerm, categoryFilter, sortConfig]);

  // Safe sort request
  const requestSort = (key) => {
    if (!key) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Dialog handling with validation
  const handleDialogOpen = (item = null) => {
    setCurrentItem(item ? { ...item } : {
      id: null,
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      supplier: ''
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Input change with type safety
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? 
        Math.max(0, parseFloat(value) || 0) : 
        value
    }));
  };

  // Save with proper ID generation
  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      if (!currentItem.name || !currentItem.category) {
        toast.error('Name and category are required');
        return;
      }

      if (currentItem.id) {
        // Update existing item
        setInventory(inventory.map(item =>
          item.id === currentItem.id ? currentItem : item
        ));
        toast.success('Item updated successfully');
      } else {
        // Generate new ID safely
        const newId = inventory.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
        setInventory([...inventory, { ...currentItem, id: newId }]);
        toast.success('Item added successfully');
      }
      handleDialogClose();
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error('Error saving item');
    } finally {
      setIsLoading(false);
    }
  };

  // Safe delete operation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setInventory(inventory.filter(item => item.id !== id));
        toast.success('Item deleted successfully');
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error('Error deleting item');
      }
    }
  };

  // Pagination with bounds checking
  const totalPages = Math.max(1, Math.ceil(filteredInventory.length / itemsPerPage));
  const paginatedItems = filteredInventory.slice(
    Math.max(0, (currentPage - 1) * itemsPerPage),
    Math.min(filteredInventory.length, currentPage * itemsPerPage)
  );

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen()}
            size={isMobile ? 'small' : 'medium'}
          >
            {isMobile ? 'Add' : 'Add Item'}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Search and Filter Bar */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            size={isMobile ? 'small' : 'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => requestSort('category')}
            size={isMobile ? 'small' : 'medium'}
            sx={{ mr: 1 }}
          >
            Sort by Category
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => requestSort('quantity')}
            size={isMobile ? 'small' : 'medium'}
          >
            Sort by Quantity
          </Button>
        </Grid>
      </Grid>

      {/* Inventory List */}
      {!isMobile ? (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="inventory table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell sx={{ fontWeight: 'bold' }} onClick={() => requestSort('name')}>
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} onClick={() => requestSort('category')}>
                  Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} onClick={() => requestSort('price')}>
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} onClick={() => requestSort('quantity')}>
                  Quantity {sortConfig.key === 'quantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDialogOpen(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {paginatedItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography color="text.secondary">{item.category}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">${item.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Quantity:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{item.quantity}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Supplier:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{item.supplier}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton color="primary" onClick={() => handleDialogOpen(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {filteredInventory.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={Math.min(currentPage, totalPages)}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          />
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentItem.id ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={currentItem.name}
                onChange={handleInputChange}
                margin="normal"
                required
                error={!currentItem.name}
                helperText={!currentItem.name ? "Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required error={!currentItem.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={currentItem.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.filter(c => c !== 'all').map(category => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {!currentItem.category && (
                  <Typography variant="caption" color="error">
                    Category is required
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={currentItem.price}
                onChange={handleInputChange}
                margin="normal"
                inputProps={{ 
                  step: "0.01",
                  min: "0"
                }}
                error={currentItem.price < 0}
                helperText={currentItem.price < 0 ? "Price cannot be negative" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={currentItem.quantity}
                onChange={handleInputChange}
                margin="normal"
                inputProps={{ 
                  min: "0"
                }}
                error={currentItem.quantity < 0}
                helperText={currentItem.quantity < 0 ? "Quantity cannot be negative" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={currentItem.supplier}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            color="primary" 
            variant="contained"
            disabled={!currentItem.name || !currentItem.category || isLoading}
            endIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryPage;