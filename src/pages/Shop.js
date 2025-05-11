import React, { useState } from 'react';
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
} from '@mui/material';
import { Search, FilterList, ShoppingCart } from '@mui/icons-material';

// Sample product data - in a real app, this would come from an API
const categories = [
  'All Categories',
  'Processors',
  'Graphics Cards',
  'Memory',
  'Storage',
  'Motherboards',
  'Power Supplies',
  'Cases',
  'Cooling',
  'Accessories',
];

const products = [
  {
    id: 1,
    name: 'Intel Core i9-12900K',
    category: 'Processors',
    price: 599.99,
    image: 'https://via.placeholder.com/300x200?text=Intel+i9-12900K',
    description: '16-Core, 24-Thread, 3.2 to 5.2 GHz, LGA 1700',
    stock: 15,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'NVIDIA GeForce RTX 4080',
    category: 'Graphics Cards',
    price: 1199.99,
    image: 'https://via.placeholder.com/300x200?text=RTX+4080',
    description: '16GB GDDR6X, 2.51 GHz Boost Clock',
    stock: 8,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Samsung 980 Pro 1TB',
    category: 'Storage',
    price: 129.99,
    image: 'https://via.placeholder.com/300x200?text=Samsung+980+Pro',
    description: 'PCIe 4.0 NVMe M.2 Internal SSD',
    stock: 25,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Corsair Vengeance RGB Pro 32GB',
    category: 'Memory',
    price: 149.99,
    image: 'https://via.placeholder.com/300x200?text=Corsair+RAM',
    description: 'DDR4 3600MHz, CL18',
    stock: 12,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'ASUS ROG Strix Z690-E',
    category: 'Motherboards',
    price: 429.99,
    image: 'https://via.placeholder.com/300x200?text=ASUS+Z690',
    description: 'LGA 1700, Intel Z690, ATX',
    stock: 7,
    rating: 4.6,
  },
  {
    id: 6,
    name: 'NZXT H510 Elite',
    category: 'Cases',
    price: 159.99,
    image: 'https://via.placeholder.com/300x200?text=NZXT+H510',
    description: 'ATX Mid Tower Case, Tempered Glass',
    stock: 10,
    rating: 4.5,
  },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // 'featured' - keep original order
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to first page when searching
          }}
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
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1); // Reset to first page when changing category
            }}
            label="Category"
            startAdornment={
              <InputAdornment position="start">
                <FilterList fontSize="small" />
              </InputAdornment>
            }
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="featured">Featured</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="name-asc">Name: A to Z</MenuItem>
            <MenuItem value="name-desc">Name: Z to A</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
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
      {paginatedProducts.length > 0 ? (
        <>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {paginatedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f9f9f9' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: '2.8em',
                    }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ color: 'warning.main', display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < Math.floor(product.rating) ? 'orange' : '#ddd' }}>★</span>
                        ))}
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.rating.toFixed(1)})
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      size="small" 
                      color="primary" 
                      variant="contained" 
                      fullWidth
                      startIcon={<ShoppingCart />}
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found matching your criteria.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
              setSortBy('featured');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Shop;
