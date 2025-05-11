import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  CircularProgress,
  useTheme,
  Rating,
  Chip,
  IconButton,
  Pagination,
  Alert
} from '@mui/material';
import { 
  Star,
  StarBorder,
  WhatsApp,
  Close
} from '@mui/icons-material';
import { useProducts } from '../contexts/ProductContext.js';
import { styled } from '@mui/material/styles';

// Fallback image for product thumbnails
const FALLBACK_IMAGE = 'https://placehold.co/600x400/eee/999999?text=No+Image';

// Styled Components
const StyledShopContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: theme.spacing(0.5, 1),
  height: 'auto',
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  '& img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: theme.spacing(2),
    transition: 'all 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.secondary.main,
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.neutral.light,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.secondary.light,
  },
}));

const StyledPageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& h1': {
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  },
  '& p': {
    color: theme.palette.text.secondary,
  },
}));

const StyledProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.neutral.light}`,
  '&:hover': {
    borderColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
  },
  position: 'relative',
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    '& .MuiTypography-h6': {
      fontWeight: 500,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(1),
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    '& .MuiTypography-body2': {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(1),
      fontSize: '0.875rem',
    },
    '& .MuiTypography-h5': {
      fontWeight: 600,
      marginTop: 'auto',
      paddingTop: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  '& .MuiCardMedia-root': {
    paddingTop: '56.25%', // 16:9 aspect ratio
    height: 0,
    position: 'relative',
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}));

function Shop() {
  const theme = useTheme();
  const { 
    products = [], 
    loading, 
    error
  } = useProducts();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 12;
  
  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(1); // Reset to first page when search changes
  }, [products, searchQuery]);

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle empty state
  if (filteredProducts.length === 0 && !loading) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          {searchQuery
            ? `No products found matching "${searchQuery}"`
            : 'No products available at the moment.'
          }
        </Typography>
      </Box>
    );
  }

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fontSize="inherit" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarBorder key={i} fontSize="inherit" />);
      } else {
        stars.push(<StarBorder key={i} fontSize="inherit" style={{ color: theme.palette.text.disabled }} />);
      }
    }
    return stars;
  };

  return (
    <StyledShopContainer maxWidth="xl">
      <StyledPageHeader>
        <Typography variant="h4" component="h1">
          Shop Computer Parts
        </Typography>
        <Typography variant="subtitle1">
          Find the perfect components for your next build
        </Typography>
      </StyledPageHeader>

      {/* Main content */}
      <Grid container spacing={3}>

        {/* Products grid */}
        <Grid item xs={12}>
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={3}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
                  <StyledProductCard onClick={() => handleProductClick(product.id)}>
                    <ImageContainer>
                      <img 
                        src={product.image || FALLBACK_IMAGE} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = FALLBACK_IMAGE;
                        }}
                      />
                    </ImageContainer>
                    <CardContent>
                      <Typography 
                        gutterBottom 
                        variant="subtitle1" 
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '3em',
                        }}
                      >
                        {product.name}
                      </Typography>
                      
                      <Box display="flex" alignItems="center" mb={1.5}>
                        <Box display="flex" alignItems="center" mr={1}>
                          {renderStars(product.rating || 0)}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviewCount || 0} reviews)
                        </Typography>
                      </Box>
                      
                      <Box mt="auto">
                        <Typography variant="h6" color="primary" fontWeight={700} mb={2}>
                          ${product.price?.toFixed(2) || '0.00'}
                          {product.originalPrice && (
                            <Typography 
                              component="span" 
                              variant="body2" 
                              color="text.secondary"
                              sx={{
                                textDecoration: 'line-through',
                                ml: 1,
                                display: 'inline-block'
                              }}
                            >
                              ${product.originalPrice.toFixed(2)}
                            </Typography>
                          )}
                        </Typography>
                        
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          size="medium"
                          startIcon={<WhatsApp />}
                          onClick={() => {
                            const phoneNumber = '+94779439400'; // WhatsApp number
                            const message = `Hi, I'm interested in this product: ${product.name} (${product.id})`;
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                          }}
                          sx={{
                            mt: 'auto',
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            backgroundColor: '#25D366',
                            '&:hover': {
                              backgroundColor: '#128C7E',
                              transform: 'translateY(-1px)',
                              boxShadow: 2,
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          Contact on WhatsApp
                        </Button>
                      </Box>
                    </CardContent>
                  </StyledProductCard>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4} width="100%">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton 
                showLastButton
              />
            </Box>
          )}
          



        </Grid>
      </Grid>
    </StyledShopContainer>
  );
}

export default Shop;
