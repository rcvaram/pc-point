import React, { useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext.js';
import DiscountedProducts from '../components/products/DiscountedProducts.js';

// Fallback image in case the main image fails to load
const fallbackImage = 'https://placehold.co/600x400/eee/999999?text=No+Image';

// Function to handle image loading errors
const addDefaultImg = (e) => {
  e.target.src = fallbackImage;
};

const Home = () => {
  const navigate = useNavigate();
  const { discountedProducts, loading, error } = useProducts();

  useEffect(() => {
    // Removed debug logs
  }, [discountedProducts]);

  return (
    <Box>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to PC Point
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop shop for high-quality computer parts and accessories
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3 }}
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Special Offers Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              textAlign: 'center',
              mb: 6,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2
              }
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #00b0ff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Hot Deals & Discounts
            </Typography>
            <Typography 
              variant="h6" 
              component="p" 
              color="text.secondary" 
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mt: 2
              }}
            >
              Premium Computer Components at Unbeatable Prices
            </Typography>
          </Box>
          
          <Box sx={{ mb: 8 }}>
            <DiscountedProducts products={discountedProducts} maxItems={8} />
          </Box>
          
          {!loading && discountedProducts.length > 8 && (
            <Box 
              textAlign="center" 
              sx={{ 
                mt: 2,
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: 1,
                  bgcolor: 'divider',
                  zIndex: 1
                }
              }}
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/shop?discounted=true')}
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  px: 4,
                  py: 1.5,
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    boxShadow: 3
                  },
                  '& .MuiButton-endIcon': {
                    ml: 0.5,
                    transition: 'transform 0.3s',
                  },
                  '&:hover .MuiButton-endIcon': {
                    transform: 'translateX(4px)'
                  }
                }}
                endIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                }
              >
                View All Hot Deals
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Box bgcolor="grey.100" py={8}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                  🚚 Free Shipping
                </Typography>
                <Typography>
                  On all orders over LKR 10,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                  💯 Quality Products
                </Typography>
                <Typography>
                  From trusted brands
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                  🔄 Easy Returns
                </Typography>
                <Typography>
                  30-day return policy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
