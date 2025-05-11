import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  Divider, 
  IconButton,
  Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook', url: '#' },
    { icon: <TwitterIcon />, label: 'Twitter', url: '#' },
    { icon: <InstagramIcon />, label: 'Instagram', url: '#' },
  ];

  const quickLinks = [
    { text: 'Home', to: '/' },
    { text: 'Shop', to: '/shop' },
    { text: 'About Us', to: '/about' },
    { text: 'Contact', to: '/contact' },
  ];

  const contactInfo = [
    { icon: <LocationIcon sx={{ mr: 1 }} />, text: '123 Tech Street, Colombo, Sri Lanka' },
    { icon: <PhoneIcon sx={{ mr: 1 }} />, text: '+94 76 123 4567' },
    { icon: <EmailIcon sx={{ mr: 1 }} />, text: 'info@pcpoint.lk' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    const email = e.target.elements.email.value;
    console.log('Subscribed with email:', email);
    // You can add your subscription logic here
  };

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
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/logo.jpeg" 
                alt="PC Point Logo" 
                style={{ height: '40px', width: 'auto', borderRadius: '8px' }}
              />
              <Typography 
                variant="h6" 
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted destination for high-performance computer parts and accessories. 
              We provide top-quality components to build your dream PC.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <IconButton 
                  key={social.label} 
                  component="a" 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  color="primary"
                  sx={{ 
                    backgroundColor: 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <MuiLink 
                  key={link.text}
                  component={Link} 
                  to={link.to} 
                  color="text.secondary" 
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none',
                    },
                    transition: 'color 0.2s',
                  }}
                >
                  {link.text}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={1.5}>
              {contactInfo.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {item.icon}
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates and offers.
            </Typography>
            <Box 
              component="form" 
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: 'flex',
                gap: 1,
                '& .MuiInputBase-root': {
                  backgroundColor: 'background.paper',
                },
              }}
            >
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4338CA'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4F46E5'}
              >
                Subscribe
              </button>
            </Box>
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
