import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products';

// Fallback image in case the main image fails to load
const fallbackImage = 'https://placehold.co/600x400/eee/999999?text=No+Image';

// Function to handle image loading errors
const addDefaultImg = (e) => {
  e.target.src = fallbackImage;
};

const Home = () => {
  const navigate = useNavigate();

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

      {/* Featured Products */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
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
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
                  On all orders over $50
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
