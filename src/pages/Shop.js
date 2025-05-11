import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  TextField, 
  MenuItem, 
  InputAdornment, 
  Pagination, 
  Select, 
  FormControl, 
  InputLabel, 
  Chip, 
  Stack,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useProducts } from '../contexts/ProductContext.js';
import { sortOptions } from '../data/categories.js';

// Fallback image in case the main image fails to load
const fallbackImage = 'https://placehold.co/600x400/eee/999999?text=No+Image';

const Shop = () => {
  const { 
    products, 
    loading, 
    error,
    categories,
    loadProductsByCategory,
    setError
  } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle category change - works with both direct category string and event object
  const handleCategoryChange = (categoryOrEvent) => {
    const category = categoryOrEvent?.target?.value || categoryOrEvent;
    setSelectedCategory(category);
    setPage(1);
    if (category === 'All Categories') {
      setFilteredProducts(products);
    } else {
      loadProductsByCategory(category);
    }
  };

  // Filter and sort products when filters change or products update
  useEffect(() => {
    if (!products || products.length === 0) return;

    let result = [...products];

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category is now handled by the context
    if (selectedCategory !== 'All Categories') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Sort by ID (assuming higher IDs are newer)
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default: // 'featured'
        // No sorting or default sorting
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  // Handle sort change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Handle close error alert
  const handleCloseError = () => {
    setError('');
  };

  // Calculate pagination
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shop Computer Parts
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find the perfect components for your next build
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ minWidth: 300, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
            disabled={loading}
            startAdornment={
              <InputAdornment position="start">
                <FilterList fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
            disabled={loading}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Active Filters */}
      {(searchTerm || selectedCategory !== 'All Categories') && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Active Filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {searchTerm && (
              <Chip
                label={`Search: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                size="small"
              />
            )}
            {selectedCategory !== 'All Categories' && (
              <Chip
                label={`Category: ${selectedCategory}`}
                onDelete={() => setSelectedCategory('All Categories')}
                size="small"
              />
            )}
            <Button 
              size="small" 
              color="error" 
              variant="text" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setSortBy('featured');
              }}
              sx={{ ml: 1 }}
            >
              Clear All
            </Button>
          </Stack>
        </Box>
      )}

      {/* Product Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress size={60} />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box textAlign="center" my={8} width="100%">
          <Typography variant="h6" color="textSecondary">
            No products found. Try adjusting your search or filters.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ 
                    height: 200, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    bgcolor: 'background.default',
                    p: 2
                  }}>
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: '100%',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                      src={product.image || fallbackImage}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                      loading="lazy"
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" noWrap>
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 1,
                        minHeight: '2.8em'
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
                      ${product.price?.toFixed(2) || '0.00'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span 
                            key={i} 
                            style={{ 
                              color: i <= (product.rating || 0) ? '#ffc107' : '#e0e0e0',
                              fontSize: '1.2rem'
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({(product.rating || 0).toFixed(1)})
                      </Typography>
                    </Box>
                    <Chip 
                      label={product.stock > 0 ? 'In Stock' : 'Out of Stock'} 
                      size="small" 
                      color={product.stock > 0 ? 'success' : 'default'}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      color="primary"
                      component="a"
                      href={`https://wa.me/94771234567?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      variant="contained"
                      disabled={!product.stock}
                      sx={{
                        backgroundColor: product.stock > 0 ? '#25D366' : 'grey.400',
                        '&:hover': {
                          backgroundColor: product.stock > 0 ? '#128C7E' : 'grey.500',
                        },
                        color: 'white',
                        textTransform: 'none',
                        py: 1,
                      }}
                      startIcon={
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.5 14.4l-2.6-1.2c-.2-.1-.4-.1-.6 0l-1.3.8c-.2.1-.4.1-.6 0-1.5-.8-2.7-2.1-3.4-3.6 0-.2 0-.4.1-.6v-.6l.8-1.3c.1-.2.1-.4 0-.6l-2.6-4.8c-.1-.3-.4-.4-.6-.3l-3.7 1c-.2.1-.3.3-.3.5 0 8.6 7 15.5 15.5 15.5.2 0 .4-.1.5-.3l1-3.7c.1-.2 0-.5-.2-.6z"/>
                            <path d="M20.5 3.5c-1.2-1.2-2.8-1.9-4.5-1.9-3.6 0-6.5 2.9-6.5 6.5 0 .6.1 1.2.2 1.8l-1.4 2.5c-.1.2 0 .5.2.6 1.5.8 3.2 1.2 4.9 1.2 3.6 0 6.5-2.9 6.5-6.5 0-1.7-.7-3.3-1.9-4.5z"/>
                          </svg>
                        </Box>
                      }
                    >
                      {product.stock > 0 ? 'Contact on WhatsApp' : 'Out of Stock'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
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
        </>
      )}

      {/* Error Snackbar */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Shop;
