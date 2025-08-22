import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel,
  FormControl, useMediaQuery, useTheme, Pagination, Grid, Card, CardContent, CardActions, Divider,
  Toolbar, AppBar, CircularProgress, Alert
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  Search as SearchIcon, FilterList as FilterIcon
} from '@mui/icons-material';
import { toast, Toaster } from 'react-hot-toast';

// Mock data to replace DashboardContext
const initialStats = {
  products: [
    { id: 1, name: 'Laptop', category: 'electronics', price: 1200.00, quantity: 50, supplier: 'Tech Corp' },
    { id: 2, name: 'Desk Chair', category: 'furniture', price: 250.50, quantity: 150, supplier: 'Office Solutions' },
    { id: 3, name: 'Monitor', category: 'electronics', price: 300.75, quantity: 75, supplier: 'View Displays' },
    { id: 4, name: 'Keyboard', category: 'accessories', price: 75.00, quantity: 200, supplier: 'Input Masters' },
    { id: 5, name: 'Coffee Mug', category: 'kitchen', price: 10.99, quantity: 300, supplier: 'Drinkware Co.' },
    { id: 6, name: 'Mousepad', category: 'accessories', price: 15.00, quantity: 180, supplier: 'Input Masters' },
    { id: 7, name: 'Standing Desk', category: 'furniture', price: 450.00, quantity: 80, supplier: 'Office Solutions' },
    { id: 8, name: 'External Hard Drive', category: 'electronics', price: 90.00, quantity: 120, supplier: 'Data Storage Inc.' },
    { id: 9, name: 'Headphones', category: 'electronics', price: 150.00, quantity: 90, supplier: 'Audio Pro' },
    { id: 10, name: 'Pencil Holder', category: 'stationery', price: 5.50, quantity: 500, supplier: 'Office Supplies' },
    { id: 11, name: 'Notebook', category: 'stationery', price: 8.00, quantity: 450, supplier: 'Paper Goods' },
    { id: 12, name: 'Table Lamp', category: 'lighting', price: 35.00, quantity: 60, supplier: 'Brighter Homes' },
  ]
};

const InventoryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Using useState to manage the inventory data
  const [stats, setStats] = useState(initialStats);
  const inventory = stats.products || [];

  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null, name: '', category: '', price: 0, quantity: 0, supplier: ''
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = isMobile ? 5 : 10;

  const categories = useMemo(() => ['all', ...new Set(inventory.map(item => item.category || '').filter(Boolean))], [inventory]);

  // Memoized and optimized filter and sort logic
  const filteredAndSortedInventory = useMemo(() => {
    let result = [...inventory];

    if (searchTerm) {
      result = result.filter(item =>
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.supplier || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(item => item.category === categoryFilter);
    }

    if (sortConfig?.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        return 0;
      });
    }

    return result;
  }, [inventory, searchTerm, categoryFilter, sortConfig]);

  // Paginated items
  const paginatedItems = useMemo(() => filteredAndSortedInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [filteredAndSortedInventory, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedInventory.length / itemsPerPage));

  // Handlers using useCallback for performance
  const requestSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const handleDialogOpen = useCallback((item = null) => {
    setCurrentItem(item ? { ...item } : {
      id: null, name: '', category: '', price: 0, quantity: 0, supplier: ''
    });
    setOpenDialog(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: ['price', 'quantity'].includes(name) ? Math.max(0, parseFloat(value) || 0) : value
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!currentItem.name || !currentItem.category) {
        toast.error('Name and category are required');
        setIsLoading(false);
        return;
      }

      let updatedProducts = [];

      if (currentItem.id) {
        updatedProducts = inventory.map(item => item.id === currentItem.id ? currentItem : item);
        toast.success('Item updated successfully!');
      } else {
        const newId = inventory.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1;
        updatedProducts = [...inventory, { ...currentItem, id: newId }];
        toast.success('Item added successfully!');
      }

      setStats(prev => ({ ...prev, products: updatedProducts }));
      handleDialogClose();
    } catch (error) {
      console.error("Save error:", error);
      toast.error('Save failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentItem, inventory, handleDialogClose]);

  const handleDelete = useCallback((id) => {
    setItemToDelete(id);
    setOpenDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    try {
      const updated = inventory.filter(item => item.id !== itemToDelete);
      setStats(prev => ({ ...prev, products: updated }));
      toast.success('Item deleted successfully!');
    } catch (error) {
      console.error("Delete error:", error);
      toast.error('Delete failed. Please try again.');
    } finally {
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    }
  }, [inventory, itemToDelete]);

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
      <Toaster position="top-right" />
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 2, borderRadius: 2 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Inventory Dashboard
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

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            InputProps={{ startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} /> }}
            size={isMobile ? 'small' : 'medium'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
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
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" startIcon={<FilterIcon />} onClick={() => requestSort('category')} size={isMobile ? 'small' : 'medium'}>
            Sort Category
          </Button>
          <Button variant="outlined" startIcon={<FilterIcon />} onClick={() => requestSort('quantity')} size={isMobile ? 'small' : 'medium'}>
            Sort Quantity
          </Button>
        </Grid>
      </Grid>

      {!isMobile ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                <TableCell onClick={() => requestSort('name')} sx={{ cursor: 'pointer' }}><b>Name</b></TableCell>
                <TableCell onClick={() => requestSort('category')} sx={{ cursor: 'pointer' }}><b>Category</b></TableCell>
                <TableCell onClick={() => requestSort('price')} sx={{ cursor: 'pointer' }}><b>Price</b></TableCell>
                <TableCell onClick={() => requestSort('quantity')} sx={{ cursor: 'pointer' }}><b>Quantity</b></TableCell>
                <TableCell><b>Supplier</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No items found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid container spacing={2}>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                    <Typography color="text.secondary" variant="body2">{item.category}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Grid container spacing={1}>
                      <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Price:</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2">${item.price.toFixed(2)}</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Quantity:</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2">{item.quantity}</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Supplier:</Typography></Grid>
                      <Grid item xs={6}><Typography variant="body2">{item.supplier}</Typography></Grid>
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
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">No items found matching your criteria.</Alert>
            </Grid>
          )}
        </Grid>
      )}

      {filteredAndSortedInventory.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          />
        </Box>
      )}

      {/* Add/Edit Item Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentItem.id ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Name" name="name" value={currentItem.name}
                onChange={handleInputChange} required
                error={!currentItem.name}
                helperText={!currentItem.name ? "Required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!currentItem.category}>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={currentItem.category} onChange={handleInputChange} label="Category">
                  {categories.filter(c => c !== 'all').map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Price" name="price" type="number"
                value={currentItem.price} onChange={handleInputChange}
                inputProps={{ step: '0.01', min: '0' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Quantity" name="quantity" type="number"
                value={currentItem.quantity} onChange={handleInputChange}
                inputProps={{ min: '0' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Supplier" name="supplier" value={currentItem.supplier}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isLoading}>Cancel</Button>
          <Button
            onClick={handleSave} color="primary" variant="contained"
            disabled={!currentItem.name || !currentItem.category || isLoading}
            endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryPage;
