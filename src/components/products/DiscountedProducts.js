import React from 'react';
import { Box, Typography, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ProductCard from './ProductCard.js';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '50%',
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
    borderRadius: 2,
  },
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
}));

const DiscountedProducts = ({ products, maxItems = 8 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Filter, sort by discount (highest first), and limit the number of discounted products
  const discountedProducts = products
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount) // Sort by discount in descending order
    .slice(0, maxItems);

  if (discountedProducts.length === 0) return null;

  return (
    <Box sx={{ mt: 8, mb: 6 }}>
      <SectionHeader>
        <Box>
          <SectionTitle variant="h4" component="h2">
            Hot Deals & Discounts
          </SectionTitle>
        </Box>
        <ViewAllButton
          color="primary"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          onClick={() => navigate('/shop?discounted=true')}
        >
          View All Deals
        </ViewAllButton>
      </SectionHeader>

      <Grid container spacing={3}>
        {discountedProducts.map((product) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={product.id}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscountedProducts;
