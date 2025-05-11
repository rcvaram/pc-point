import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        lineHeight: 1.6,
      }}
    >
      <CssBaseline />
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          pt: { xs: '64px', sm: '76px' }, // Account for fixed navbar
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{
            py: { xs: 3, md: 4 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
