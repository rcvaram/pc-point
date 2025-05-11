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
    rating: '4.5',
    image: ''
  });

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        rating: product.rating,
        image: product.image,
        // Include the existing createdAt for updates
        createdAt: product.createdAt
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

  const uploadImage = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
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
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Product Management
          </Typography>
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Add />}
              onClick={() => handleOpen()}
              sx={{ mr: 2 }}
            >
              Add Product
            </Button>
            <Button 
              variant="outlined" 
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="center">Actions</TableCell>
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
                        sx={{ width: 50, height: 50, objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">LKR {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
                    <TableCell align="right">{product.rating}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        color="primary" 
                        onClick={() => handleOpen(product)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => handleDelete(product.id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <TextField
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    inputProps={{ step: '0.01', min: '0' }}
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
    </Container>
  );
}
