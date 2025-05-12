import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Button, 
  Rating,
  styled 
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DiscountBadge from './DiscountBadge.js';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    '& .product-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ProductMedia = styled(Box)({
  position: 'relative',
  paddingTop: '100%',
  overflow: 'hidden',
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: 16,
    transition: 'transform 0.5s ease',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
  },
});

const ProductActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  opacity: 0,
  transform: 'translateY(10px)',
  transition: 'all 0.3s ease',
  boxShadow: theme.shadows[4],
  zIndex: 2,
  '&:hover': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const WhatsAppButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#25D366',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75, 2),
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#128C7E',
  },
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
  },
}));

const PriceWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  margin: '8px 0',
});

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const DiscountPrice = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 600,
  fontSize: '1.1rem',
}));

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = hasDiscount 
    ? (product.price - (product.price * (product.discount / 100))).toFixed(2)
    : product.price.toFixed(2);

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const phoneNumber = '94779439400'; // Your WhatsApp number
    const message = `Hi, I'm interested in this product: ${product.name} (${product.id})`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <ProductMedia>
        {hasDiscount && (
          <DiscountBadge discount={product.discount} size="medium" />
        )}
        <img
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          onError={(e) => {
            e.target.src = '/placeholder-product.jpg';
          }}
        />
      </ProductMedia>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          variant="subtitle1" 
          component="h3"
          sx={{
            fontWeight: 500,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3em',
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            ({product.reviewCount || 0})
          </Typography>
        </Box>

        <PriceWrapper>
          {hasDiscount ? (
            <>
              <DiscountPrice>LKR {finalPrice}</DiscountPrice>
              <OriginalPrice>LKR {product.price.toFixed(2)}</OriginalPrice>
            </>
          ) : (
            <DiscountPrice>LKR {finalPrice}</DiscountPrice>
          )}
        </PriceWrapper>
      </CardContent>

      <ProductActions className="product-actions">
        <WhatsAppButton 
          onClick={handleWhatsAppClick}
          startIcon={<WhatsAppIcon />}
          fullWidth
        >
          Contact
        </WhatsAppButton>
      </ProductActions>
    </StyledCard>
  );
};

export default ProductCard;
