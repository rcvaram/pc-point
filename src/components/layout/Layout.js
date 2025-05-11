import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          '& > *': {
            width: '100%',
            maxWidth: '100%',
          }
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
