import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              PC Point
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for high-quality computer parts and accessories.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <MuiLink component={Link} to="/" color="inherit" display="block" mb={1}>
                Home
              </MuiLink>
              <MuiLink component={Link} to="/shop" color="inherit" display="block" mb={1}>
                Shop
              </MuiLink>
              <MuiLink href="#" color="inherit" display="block" mb={1}>
                About Us
              </MuiLink>
              <MuiLink href="#" color="inherit" display="block">
                Contact
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <Box component="span" fontWeight="medium">Email:</Box> info@pcpoint.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <Box component="span" fontWeight="medium">Phone:</Box> 0212250020
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Box component="span" fontWeight="medium">Address:</Box> No 132, Main Street, Chankanai
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} PC Point. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
