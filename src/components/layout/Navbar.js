import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Custom Link component to handle active state
const Link = React.forwardRef(({ to, children, ...props }, ref) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Button
      component={RouterLink}
      to={to}
      ref={ref}
      color="inherit"
      sx={{
        fontWeight: isActive ? 'bold' : 'normal',
        borderBottom: isActive ? '2px solid white' : 'none',
        borderRadius: 0,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

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
          
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            
            {/* Debug info */}
            <Box sx={{ ml: 2, p: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
              <Typography variant="caption" color="inherit">
                v1.0.0
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
