import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase.js';

const categories = [
  'Processors',
  'Graphics Cards',
  'RAM',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cases',
  'Cooling',
  'Accessories'
];

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    discount: '0',
    rating: '4.5',
    image: ''
  });

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login', { replace: true });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (err) {
        console.error('Error fetching products: ', err);
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        stock: product.stock?.toString() || '',
        discount: product.discount?.toString() || '0',
        rating: product.rating?.toString() || '4.5',
        image: product.image || ''
      });
      setPreviewUrl(product.image);
      setEditingProduct(product.id);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        discount: '0',
        rating: '4.5',
        image: ''
      });
      setPreviewUrl('');
      setEditingProduct(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageFile(null);
    setPreviewUrl('');
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let imageUrl = formData.image || '';

      // Upload new image if a file is selected
      if (imageFile) {
        try {
          const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
          const snapshot = await uploadBytes(storageRef, imageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        } catch (storageError) {
          console.error('Error uploading image:', storageError);
          throw new Error('Failed to upload image');
        }
      }

      // Create base product data
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        discount: parseFloat(formData.discount) || 0,
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      };

      // Only set createdAt for new products
      if (!editingProduct) {
        productData.createdAt = new Date().toISOString();
      }
      // For updates, we don't include createdAt in the update operation at all

      if (editingProduct) {
        // Update existing product - explicitly specify fields to update
        const { createdAt, ...updateData } = productData; // Remove createdAt if it exists
        await updateDoc(doc(db, 'products', editingProduct), updateData);
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), productData);
      }

      // Refresh products list
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
      
      handleClose();
    } catch (err) {
      console.error('Error saving product: ', err);
      setError('Failed to save product');
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        console.error('Error deleting product: ', err);
        setError('Failed to delete product');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        p: { xs: 1, sm: 2, md: 3 },
        backgroundColor: '#f5f7fa',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          flex: '1 1 auto',
          py: { xs: 1, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          '& > * + *': { mt: 2 },
          p: { xs: 0, sm: 1 },
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 2
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Product Management
          </Typography>
          {currentUser && (
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => handleOpen()}
              size="medium"
              sx={{
                width: { xs: '100%', sm: 'auto' },
                minWidth: '140px',
                '& .MuiButton-startIcon': {
                  mr: 1
                }
              }}
            >
              Add Product
            </Button>
          )}
        </Box>

        {error && <Alert severity="error">{error}</Alert>}
        
        <Paper 
          elevation={2}
          sx={{ 
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            width: '100%',
            overflow: 'hidden',
            '& .MuiTableContainer-root': {
              flex: '1 1 auto',
              minHeight: 0,
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
              },
              '& .MuiTable-root': {
                minWidth: 'max-content',
                width: '100%',
              },
              '& .MuiTableCell-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px',
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.5 }
              },
              '& .MuiTableHead-root .MuiTableCell-root': {
                fontWeight: '600',
                backgroundColor: 'background.paper',
              }
            },
            '& .MuiTablePagination-root': {
              borderTop: '1px solid rgba(224, 224, 224, 1)',
              flexShrink: 0
            }
          }}
        >
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: '80px' }}>Image</TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>Name</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Category</TableCell>
                  <TableCell align="right" sx={{ minWidth: '120px' }}>Price</TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Stock</TableCell>
                  <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Rating</TableCell>
                  <TableCell align="center" sx={{ minWidth: '120px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box 
                        component="img"
                        src={product.image} 
                        alt={product.name}
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          objectFit: 'contain',
                          display: 'block',
                          mx: 'auto'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {product.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ display: { sm: 'none' } }}
                      >
                        {product.category}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {product.category}
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          LKR {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ display: { sm: 'none' } }}
                        >
                          Stock: {product.stock}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {product.stock}
                    </TableCell>
                    <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {product.rating}
                    </TableCell>
                    <TableCell align="center">
                      {currentUser && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1 } }}>
                          <IconButton 
                            color="primary" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpen(product);
                            }}
                            size="small"
                            sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(product.id);
                            }}
                            size="small"
                            sx={{ '&:hover': { bgcolor: 'error.lighter' } }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        fullScreen={window.innerWidth < 600}
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 2 },
            width: { xs: 'calc(100% - 16px)', sm: 'auto' },
            maxHeight: { xs: 'calc(100% - 32px)', sm: '90vh' },
            '& .MuiDialogContent-root': {
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              p: { xs: 1, sm: 3 },
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '3px',
              },
            }
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    inputProps={{ step: '0.01', min: '0' }}
                    sx={{ flex: '1 1 200px' }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    inputProps={{ min: '0' }}
                    sx={{ flex: '1 1 150px' }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Discount %"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                    inputProps={{ min: '0', max: '100', step: '1' }}
                    sx={{ flex: '1 1 120px' }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Rating"
                    name="rating"
                    type="number"
                    value={formData.rating}
                    onChange={handleInputChange}
                    inputProps={{ step: '0.1', min: '0', max: '5' }}
                    sx={{ flex: '1 1 120px' }}
                  />
                </Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {imageFile ? 'Change Image' : 'Upload Image'}
                  </Button>
                </label>
              </Box>
              <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box 
                  sx={{
                    width: '100%',
                    height: 200,
                    border: '1px dashed grey',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    overflow: 'hidden'
                  }}
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain' 
                      }} 
                    />
                  ) : (
                    <Typography color="textSecondary">
                      Image Preview
                    </Typography>
                  )}
                </Box>
                <Typography variant="caption" color="textSecondary" align="center">
                  {imageFile ? imageFile.name : 'No image selected'}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
