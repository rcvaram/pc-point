import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount = 0 }) => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box 
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <img 
              src="/logo.jpeg" 
              alt="PC Point Logo" 
              style={{
                height: '50px',
                width: 'auto',
                marginRight: '10px',
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/cart"
              startIcon={
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              }
            >
              Cart
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
