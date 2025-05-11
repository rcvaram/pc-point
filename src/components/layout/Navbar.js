import React from 'react';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';

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
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

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
              mr: 3
            }}
          >
            <img 
              src="/logo.jpeg" 
              alt="PC Point Logo" 
              style={{
                height: '50px',
                width: 'auto',
              }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1 }} /> {/* This pushes everything after it to the right */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {currentUser ? (
              <>
                {isAdmin && <Link to="/admin/dashboard">Admin</Link>}
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  sx={{ ml: 1 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                component={RouterLink}
                to="/admin/login"
                color="inherit"
                variant="outlined"
                size="small"
                sx={{ ml: 1 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
