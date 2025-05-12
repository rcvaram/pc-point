import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  Divider,
  Stack,
  Link as MuiLink
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: <LocationIcon sx={{ mr: 1 }} />, text: 'No 132, Main Street, Chankanai, Jaffna' },
    { icon: <PhoneIcon sx={{ mr: 1 }} />, text: '021 225 0020' },
    { icon: <EmailIcon sx={{ mr: 1 }} />, text: 'info@pcpoint.lk' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/logo.jpeg" 
                alt="PC Point Logo" 
                style={{ height: '50px', width: 'auto', borderRadius: '8px' }}
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  ml: 2,
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PC Point
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '500px' }}>
              Your trusted destination for high-performance computer parts and accessories. 
              We provide top-quality components to build your dream PC.
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Information
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {React.cloneElement(item.icon, { sx: { mt: 0.5, mr: 1.5, color: 'primary.main' } })}
                  <Typography variant="body1" color="text.secondary">
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} PC Point. All rights reserved.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: { xs: 2, sm: 0 },
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}>
            <MuiLink href="#" color="text.secondary" variant="body2">
              Privacy Policy
            </MuiLink>
            <MuiLink href="#" color="text.secondary" variant="body2">
              Terms of Service
            </MuiLink>
            <MuiLink href="#" color="text.secondary" variant="body2">
              Cookie Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
