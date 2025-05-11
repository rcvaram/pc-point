import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip, IconButton } from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Favorite, Share } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductImage = styled(CardMedia)({
  paddingTop: '75%', // 4:3 aspect ratio
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 70%,rgba(0,0,0,0.1) 100%)',
  },
});

const ProductTitle = styled(Typography)({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  minHeight: '4.5em', // Adjust based on your typography
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  margin: '8px 0',
});

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  zIndex: 1,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 'bold',
}));

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const { id, name, price, originalPrice, image, category, rating, stock } = product;
  
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <StyledCard elevation={2}>
      <Box sx={{ position: 'relative' }}>
        <ProductImage
          image={image || '/placeholder-product.jpg'}
          title={name}
          component={Link}
          to={`/product/${id}`}
        />
        {hasDiscount && (
          <DiscountBadge 
            size="small" 
            label={`${discountPercentage}% OFF`} 
          />
        )}
        <IconButton 
          aria-label="add to favorites"
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          {isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Chip 
          label={category} 
          size="small" 
          sx={{ mb: 1, fontSize: '0.7rem' }} 
        />
        <ProductTitle variant="subtitle1" component="h3" gutterBottom>
          {name}
        </ProductTitle>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {Array(5).fill().map((_, i) => (
            <Box 
              key={i} 
              component="span" 
              sx={{
                color: i < Math.floor(rating || 0) ? 'gold' : 'action.disabled',
                fontSize: '1.2rem',
                lineHeight: 1,
              }}
            >
              ★
            </Box>
          ))}
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            ({rating?.toFixed(1) || '0.0'})
          </Typography>
        </Box>
        
        <PriceContainer>
          <Typography variant="h6" color="primary" fontWeight={700}>
            ${price?.toFixed(2) || '0.00'}
          </Typography>
          {hasDiscount && (
            <OriginalPrice variant="body2">
              ${originalPrice.toFixed(2)}
            </OriginalPrice>
          )}
        </PriceContainer>
        
        <Typography variant="caption" color={stock > 0 ? 'success.main' : 'error'}>
          {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddShoppingCart />}
          disabled={stock === 0}
          sx={{
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: (theme) => theme.shadows[4],
            },
            transition: 'all 0.2s ease',
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ProductCard;
