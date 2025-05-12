import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button,
  CircularProgress,
  useTheme,
  Chip,
  IconButton,
  Pagination,
  Alert,
  Drawer,
  Checkbox,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  TextField,
  Divider,
  useMediaQuery,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  Close,
  FilterList,
  FilterAltOff,
  Search as SearchIcon,
  Tune as TuneIcon
} from '@mui/icons-material';
import ProductCard from '../components/products/ProductCard.js';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 300,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
    },
  },
}));

const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ProductGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    marginLeft: theme.spacing(2),
  },
}));

const PaginationWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2, 0),
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

// Removed duplicate StyledPageHeader component

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

// Available categories
const categories = [
  'Processors',
  'Graphics Cards',
  'RAM',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cases',
  'Cooling',
  'Accessories',
  'Monitors',
  'Keyboards',
  'Mice',
  'Laptops'
];

// Format price for display
const formatPrice = (price) => {
  return price.toLocaleString('en-US');
};

function Shop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { 
    products = [], 
    loading, 
    error
  } = useProducts();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Calculate min and max prices from products
  const priceRange = React.useMemo(() => {
    if (products.length === 0) return [0, 100000];
    
    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices) / 1000) * 1000; // Round down to nearest 1000
    const maxPrice = Math.ceil(Math.max(...prices) / 1000) * 1000;  // Round up to nearest 1000
    
    return [Math.max(0, minPrice), Math.max(10000, maxPrice)]; // Ensure minimum range of 0-10,000
  }, [products]);

  // Filters state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: priceRange,
    minRating: 0,
    inStock: false,
    showDiscountedOnly: false
  });
  
  // Update price range when products change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: priceRange
    }));
  }, [priceRange]);
  
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

  // Filter products based on search query and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter(product => 
        product.rating >= filters.minRating
      );
    }
    
    // Apply in-stock filter
    if (filters.inStock) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Apply discount filter
    if (filters.showDiscountedOnly) {
      result = result.filter(product => product.discount > 0);
    }
    
    setFilteredProducts(result);
    setPage(1); // Reset to first page when filters change
  }, [products, searchQuery, filters]);

  // Get query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const discounted = params.get('discounted') === 'true';
    
    if (q) {
      setSearchQuery(q);
    }
    
    if (discounted) {
      setFilters(prev => ({
        ...prev,
        showDiscountedOnly: true
      }));
    }
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // No need for early return - we'll handle empty state within the main render

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} fontSize="inherit" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarBorderIcon key={i} fontSize="inherit" />);
      } else {
        stars.push(<StarBorderIcon key={i} fontSize="inherit" style={{ color: theme.palette.text.disabled }} />);
      }
    }
    return stars;
  };

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleMinPriceChange = (e) => {
    let value = Number(e.target.value);
    // Ensure value is not negative
    value = Math.max(0, value);
    // Ensure min doesn't exceed max
    value = Math.min(value, filters.priceRange[1]);
    
    setFilters(prev => ({
      ...prev,
      priceRange: [value, prev.priceRange[1]]
    }));
  };

  const handleMaxPriceChange = (e) => {
    let value = Number(e.target.value);
    // Ensure value is not negative
    value = Math.max(0, value);
    // Ensure max is not less than min
    value = Math.max(value, filters.priceRange[0]);
    
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], value]
    }));
  };
  
  const handlePriceBlur = () => {
    // Ensure min is not greater than max
    if (filters.priceRange[0] > filters.priceRange[1]) {
      setFilters(prev => ({
        ...prev,
        priceRange: [prev.priceRange[1], prev.priceRange[1]]
      }));
    }
  };

  const handleRatingChange = (newRating) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === newRating ? 0 : newRating
    }));
  };

  const handleStockChange = (event) => {
    setFilters(prev => ({
      ...prev,
      inStock: event.target.checked
    }));
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(window.location.search);
    const discounted = params.get('discounted') === 'true';
    
    setFilters({
      categories: [],
      priceRange: priceRange,
      minRating: 0,
      inStock: false,
      showDiscountedOnly: discounted
    });
    setSearchQuery('');
  };

  const FilterSectionComponent = ({ title, children }) => (
    <FilterSection>
      <SectionTitle variant="subtitle1">
        {title}
      </SectionTitle>
      {children}
    </FilterSection>
  );

  const renderFilters = () => (
    <Box sx={{ '& > * + *': { mt: 3 }, width: 280, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">Filters</Typography>
        <Button 
          size="small" 
          onClick={clearAllFilters}
          startIcon={<FilterAltOff />}
          color="error"
        >
          Clear All
        </Button>
      </Box>
      
      <FilterSectionComponent title="Search">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </FilterSectionComponent>
      
      <FilterSectionComponent title="Categories">
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox 
                  size="small"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </FilterSectionComponent>
      
      <FilterSectionComponent title="Price Range (LKR)">
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Min"
            type="number"
            size="small"
            value={filters.priceRange[0]}
            onChange={handleMinPriceChange}
            onBlur={handlePriceBlur}
            inputProps={{
              min: 0,
              step: 100
            }}
            sx={{ 
              width: '100%',
              '& input[type=number]': {
                '-moz-appearance': 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
            }}
          />
          <Box sx={{ width: '10px', borderTop: '1px solid', opacity: 0.5 }} />
          <TextField
            label="Max"
            type="number"
            size="small"
            value={filters.priceRange[1]}
            onChange={handleMaxPriceChange}
            onBlur={handlePriceBlur}
            inputProps={{
              min: 0,
              step: 100
            }}
            sx={{ 
              width: '100%',
              '& input[type=number]': {
                '-moz-appearance': 'textfield',
              },
              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
            }}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Min: {filters.priceRange[0].toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Max: {filters.priceRange[1].toLocaleString()}
          </Typography>
        </Box>
      </FilterSectionComponent>
      
      <FilterSectionComponent title="Rating">
        <Box>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Box 
              key={rating} 
              onClick={() => handleRatingChange(rating)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
                bgcolor: filters.minRating === rating ? 'action.selected' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Rating 
                value={rating} 
                readOnly 
                icon={<StarIcon />}
                emptyIcon={<StarBorderIcon />}
              />
              <Typography variant="body2" ml={1}>
                {rating === 5 ? '5.0' : `${rating} & Up`}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSectionComponent>
      
      <FilterSectionComponent title="Availability">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                checked={filters.inStock}
                onChange={handleStockChange}
              />
            }
            label="In Stock Only"
          />
        </FormGroup>
      </FilterSectionComponent>
      
      <FilterSectionComponent title="Discounts">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                checked={filters.showDiscountedOnly}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  showDiscountedOnly: e.target.checked
                }))}
              />
            }
            label="Discounted Items Only"
          />
        </FormGroup>
      </FilterSectionComponent>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <StyledAppBar position="sticky" color="default">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap>
              {filteredProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
              {filters.showDiscountedOnly && ' (Discounted)'}
            </Typography>
          </Box>
          <FilterButton
            startIcon={<TuneIcon />}
            onClick={() => setMobileFilterOpen(true)}
          >
            Filters
          </FilterButton>
        </Toolbar>
      </StyledAppBar>
      
      <StyledShopContainer maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, pt: 3 }}>
          {/* Mobile Filter Drawer */}
          <StyledDrawer
            anchor="right"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={() => setMobileFilterOpen(false)}>
                <Close />
              </IconButton>
            </Box>
            {renderFilters()}
          </StyledDrawer>
          
          {/* Desktop Filters */}
          <Box sx={{ 
            display: { xs: 'none', md: 'block' },
            width: 300,
            flexShrink: 0,
            pr: 2,
          }}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {renderFilters()}
            </Box>
          </Box>
          
          {/* Main Content */}
          <Box sx={{ flexGrow: 1 }}>
            <Box mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                Shop Computer Parts
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Find the best deals on high-quality computer components
              </Typography>
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" my={4} width="100%">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : filteredProducts.length === 0 ? (
              <Box textAlign="center" py={6} width="100%">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {searchQuery
                    ? `No products found matching "${searchQuery}"`
                    : 'No products match the selected filters'
                  }
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Try adjusting your search or filter criteria
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={clearAllFilters}
                  startIcon={<FilterAltOff />}
                  sx={{ mt: 2 }}
                >
                  Clear All Filters
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={product.id}>
                      <ProductCard product={{
                        ...product,
                        finalPrice: product.discount > 0 
                          ? (product.price - (product.price * (product.discount / 100))).toFixed(2)
                          : product.price.toFixed(2)
                      }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          size="small"
                          component="a"
                          href={`https://wa.me/94779439400?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={
                            <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.5 14.4l-2.6-1.2c-.2-.1-.4-.1-.6 0l-1.3.8c-.2.1-.4.1-.6 0-1.5-.8-2.7-2.1-3.4-3.6 0-.2 0-.4.1-.6v-.6l.8-1.3c.1-.2.1-.4 0-.6l-2.6-4.8c-.1-.3-.4-.4-.6-.3l-3.7 1c-.2.1-.3.3-.3.5 0 8.6 7 15.5 15.5 15.5.2 0 .4-.1.5-.3l1-3.7c.1-.2 0-.5-.2-.6z" />
                                <path d="M20.5 3.5c-1.2-1.2-2.8-1.9-4.5-1.9-3.6 0-6.5 2.9-6.5 6.5 0 .6.1 1.2.2 1.8l-1.4 2.5c-.1.2 0 .5.2.6 1.5.8 3.2 1.2 4.9 1.2 3.6 0 6.5-2.9 6.5-6.5 0-1.7-.7-3.3-1.9-4.5z" />
                              </svg>
                            </Box>
                          }
                          sx={{
                            mt: 1,
                            backgroundColor: '#25D366',
                            '&:hover': {
                              backgroundColor: '#128C7E',
                            },
                            color: 'white',
                          }}
                        >
                          Contact on WhatsApp
                        </Button>
                      </ProductCard>
                    </Grid>
                  ))}
                </Grid>
                
                {totalPages > 1 && (
                  <PaginationWrapper>
                    <Pagination 
                      count={totalPages} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary" 
                      sx={{ '& .MuiPagination-ul': { flexWrap: 'nowrap' } }}
                    />
                  </PaginationWrapper>
                )}
              </>
            )}
          </Box>
        </Box>
      </StyledShopContainer>
    </Box>
  );
}

export default Shop;
