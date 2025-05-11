import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Sample featured products data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: 1,
    name: 'Gaming PC Pro',
    price: 1299.99,
    image: 'https://via.placeholder.com/300x200?text=Gaming+PC',
    description: 'High-performance gaming PC with RTX 3080 and Ryzen 9 5900X',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: 'https://via.placeholder.com/300x200?text=Mechanical+Keyboard',
    description: 'RGB Mechanical Keyboard with Cherry MX switches',
  },
  {
    id: 3,
    name: '4K Gaming Monitor',
    price: 499.99,
    image: 'https://via.placeholder.com/300x200?text=4K+Monitor',
    description: '27" 4K UHD Gaming Monitor with 144Hz refresh rate',
  },
];

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
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
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
