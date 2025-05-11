import React from 'react';
import { Box, Container, Typography, Button, Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  background: 'linear-gradient(135deg, #f5f7ff 0%, #e8ecff 100%)',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  maxWidth: 600,
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
    margin: '0 auto',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(3),
  lineHeight: 1.2,
  background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  lineHeight: 1.7,
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    '& > *': {
      width: '100%',
    },
  },
}));

const HeroImage = styled('img')(({ theme }) => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '16px',
  boxShadow: theme.shadows[10],
  transform: 'rotate(3deg)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotate(0deg) scale(1.02)',
  },
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <ContentWrapper>
              <Typography 
                variant="overline" 
                color="primary" 
                sx={{ 
                  display: 'inline-block',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  mb: 1,
                }}
              >
                Welcome to PC Point
              </Typography>
              <Title variant="h2">
                Build Your Dream PC with Premium Components
              </Title>
              <Subtitle>
                Discover the latest processors, graphics cards, and accessories to create the ultimate gaming or productivity setup. Quality parts at competitive prices.
              </Subtitle>
              <ButtonGroup>
                <Button 
                  component={Link} 
                  to="/shop" 
                  variant="contained" 
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Shop Now
                </Button>
                <Button 
                  component={Link} 
                  to="/about" 
                  variant="outlined" 
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                    },
                  }}
                >
                  Learn More
                </Button>
              </ButtonGroup>
            </ContentWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                mt: { xs: 6, md: 0 },
              }}
            >
              <HeroImage 
                src="/hero-pc.jpg" 
                alt="Custom Gaming PC"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
