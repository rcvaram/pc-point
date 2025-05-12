import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  IconButton, 
  Paper, 
  Divider,
  CircularProgress,
  Rating
} from '@mui/material';
import { ArrowBack, WhatsApp, FavoriteBorder } from '@mui/icons-material';
import DiscountBadge from '../components/products/DiscountBadge.js';
import { useProducts } from '../contexts/ProductContext.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to 404 or shop page if product not found
        navigate('/shop');
      }
    }
  }, [id, products, navigate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/shop')}
          sx={{ mt: 2 }}
        >
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      
      <Paper elevation={2} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box 
                component="img"
                src={product.image || 'https://placehold.co/600x400/eee/999999?text=No+Image'}
                alt={product.name}
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
              {product.discount > 0 && (
                <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <DiscountBadge discount={product.discount} size="large" />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={product.rating || 0} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviewCount || 0} reviews)
              </Typography>
            </Box>
            
            <Box mb={3}>
              {product.discount > 0 ? (
                <>
                  <Typography variant="h5" color="error" component="span">
                    LKR {((product.price * (100 - product.discount)) / 100).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                  <Typography 
                    component="span" 
                    variant="h6" 
                    color="text.secondary"
                    sx={{
                      textDecoration: 'line-through',
                      ml: 2,
                      display: 'inline-block'
                    }}
                  >
                    LKR {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="error.main"
                    sx={{ ml: 1, display: 'inline-block' }}
                  >
                    (Save {product.discount}%)
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" color="primary">
                  LKR {product.price?.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </Typography>
              )}
            </Box>
            
            <Typography variant="body1" paragraph>
              {product.description || 'No description available.'}
            </Typography>
            
            <Box mt={4}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<WhatsApp />}
                onClick={() => {
                  const phoneNumber = '+94779439400';
                  const message = `Hi, I'm interested in this product: ${product.name} (${product.id})`;
                  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(url, '_blank');
                }}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#128C7E',
                  },
                  mr: 2,
                  mb: { xs: 2, sm: 0 }
                }}
              >
                Contact on WhatsApp
              </Button>
              
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<FavoriteBorder />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Add to Wishlist
              </Button>
            </Box>
            
            <Box mt={4}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Category: {product.category || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
