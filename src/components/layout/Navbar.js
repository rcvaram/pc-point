import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount = 0 }) => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            PC Point
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button>
            <Button color="inherit">
              About
            </Button>
            <Button color="inherit">
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
