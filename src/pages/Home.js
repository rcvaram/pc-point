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

// Fallback image in case the main image fails to load
const fallbackImage = 'https://placehold.co/600x400/eee/999999?text=No+Image';

// Function to handle image loading errors
const addDefaultImg = (e) => {
  e.target.src = fallbackImage;
};

const Home = () => {
  const navigate = useNavigate();
  const { featuredProducts, loading, error } = useProducts();

  useEffect(() => {
    console.log('Home component mounted');
    console.log('Featured products:', featuredProducts);
  }, [featuredProducts]);

  return (
    <Box>
      {/* Debug Info */}
      <Box sx={{ p: 2, bgcolor: 'warning.light', mb: 2, borderRadius: 1 }}>
        <Typography variant="body2" color="warning.contrastText">
          Debug: Home component rendered
        </Typography>
      </Box>

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

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Products
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      maxHeight: '100%',
                      width: 'auto',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      p: 2,
                    }}
                    src={product.image}
                    alt={product.name}
                    onError={addDefaultImg}
                    loading="lazy"
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    LKR {product.price.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component="a"
                    href={`https://wa.me/94779439400?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#25D366',
                      '&:hover': {
                        backgroundColor: '#128C7E',
                      },
                      color: 'white',
                    }}
                    startIcon={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.5 14.4l-2.6-1.2c-.2-.1-.4-.1-.6 0l-1.3.8c-.2.1-.4.1-.6 0-1.5-.8-2.7-2.1-3.4-3.6 0-.2 0-.4.1-.6v-.6l.8-1.3c.1-.2.1-.4 0-.6l-2.6-4.8c-.1-.3-.4-.4-.6-.3l-3.7 1c-.2.1-.3.3-.3.5 0 8.6 7 15.5 15.5 15.5.2 0 .4-.1.5-.3l1-3.7c.1-.2 0-.5-.2-.6z"/>
                          <path d="M20.5 3.5c-1.2-1.2-2.8-1.9-4.5-1.9-3.6 0-6.5 2.9-6.5 6.5 0 .6.1 1.2.2 1.8l-1.4 2.5c-.1.2 0 .5.2.6 1.5.8 3.2 1.2 4.9 1.2 3.6 0 6.5-2.9 6.5-6.5 0-1.7-.7-3.3-1.9-4.5z"/>
                        </svg>
                      </Box>
                    }
                  >
                    Contact on WhatsApp
                  </Button>
                </CardActions>
              </Card>
            </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center" width="100%" my={4}>
                No featured products available
              </Typography>
            )}
          </Grid>
        )}
      </Container>

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
