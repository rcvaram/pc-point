import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const Layout = ({ children }) => {
  useEffect(() => {
    console.log('Layout - Children:', children);
    console.log('Layout - Children type:', typeof children);
    console.log('Layout - Children is array:', Array.isArray(children));
    console.log('Layout - Children keys:', Object.keys(children || {}));
  }, [children]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // Add background color for visibility
      }}
    >
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          p: 3,
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          m: 2,
          borderRadius: 1
        }}
      >
        {children || (
          <Box textAlign="center" p={4}>
            <Typography variant="h5" color="error">
              No content to display
            </Typography>
            <Typography variant="body1" mt={2}>
              The page content failed to load. Please check the console for errors.
            </Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
