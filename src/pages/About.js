import React from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { Computer, LocalShipping, SupportAgent, Security } from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          About PC Point
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          Your trusted partner for high-quality computer parts and exceptional service
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Our Story</Typography>
        <Typography paragraph>
          Founded in 2000, PC Point has grown from a small local shop to a leading computer parts retailer in the region. 
          Our passion for technology and commitment to customer satisfaction have been the driving forces behind our success.
        </Typography>
        <Typography paragraph>
          We understand that every customer has unique needs, which is why we offer a wide range of products from top brands 
          to help you build or upgrade your perfect PC.
        </Typography>
      </Paper>

      <Box my={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={6} lg={3}>
            <Box textAlign="center" p={2}>
              <Computer color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Quality Products</Typography>
              <Typography variant="body2" color="text.secondary">
                We source only the highest quality components from trusted manufacturers.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box textAlign="center" p={2}>
              <LocalShipping color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Fast Shipping</Typography>
              <Typography variant="body2" color="text.secondary">
                Quick and reliable delivery to your doorstep.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box textAlign="center" p={2}>
              <SupportAgent color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Expert Support</Typography>
              <Typography variant="body2" color="text.secondary">
                Our team of experts is here to help you with any questions.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box textAlign="center" p={2}>
              <Security color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>Secure Shopping</Typography>
              <Typography variant="body2" color="text.secondary">
                Your security is our top priority. Shop with confidence.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Our Mission</Typography>
        <Typography paragraph>
          At PC Point, our mission is to provide our customers with the best computer components and accessories at competitive prices, 
          along with exceptional customer service and technical support.
        </Typography>
        <Typography>
          We believe in building lasting relationships with our customers by being transparent, reliable, and always putting your needs first.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
