import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Stack,
  Collapse,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { useProducts } from '../../contexts/ProductContext.js';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { products } = useProducts();
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isShopPage = location.pathname === '/shop';
  
  // Menu items
  const menuItems = [
    { text: 'Home', to: '/' },
    { text: 'Shop', to: '/shop' },
    { text: 'About', to: '/about' },
    { text: 'Contact', to: '/contact' },
  ];
  
  // Check if current route matches menu item
  const isActive = (path) => location.pathname === path;
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      // Filter products where name starts with search term (case insensitive)
      const results = products.filter(product => 
        product.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  
  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };
  
  // Handle search result click
  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    if (isShopPage) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      navigate(`/shop?${params.toString()}`);
    }
  };
  
  // Close search results when clicking away
  const handleClickAway = () => {
    setShowResults(false);
  };
  
  // Profile menu handlers
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      handleProfileMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Set initial search term from URL if on shop page
  useEffect(() => {
    if (isShopPage && searchParams.has('q')) {
      setSearchTerm(searchParams.get('q'));
    }
  }, [location.search, isShopPage, searchParams]);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 2,
                flexShrink: 0,
                height: 40,
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              <img 
                src="/logo.jpeg" 
                alt="PC Point Logo" 
                style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: 4
                }}
              />
              <Typography
                variant="h5"
                component="span"
                sx={{
                  ml: 1.5,
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                PC Point
              </Typography>
            </Box>
          
          {/* Mobile menu button */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          

          
          {/* Search Bar - Center */}
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: 600,
            position: 'relative',
            mx: { xs: 0, md: 2 }
          }}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box>
                <form onSubmit={handleSearchSubmit}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => searchTerm.trim() && setShowResults(true)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color={searchTerm ? 'primary' : 'action'} />
                        </InputAdornment>
                      ),
                      endAdornment: searchTerm && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={handleClearSearch}
                            edge="end"
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        bgcolor: 'background.paper',
                        '& fieldset': {
                          borderColor: 'divider',
                        },
                      },
                    }}
                  />
                </form>
                
                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <Paper 
                    elevation={3} 
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      zIndex: 1200,
                      mt: 1,
                      maxHeight: 300,
                      overflow: 'auto',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <List dense>
                      {searchResults.map((product) => (
                        <ListItem 
                          key={product.id} 
                          button 
                          onClick={() => handleResultClick(product.id)}
                          sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                        >
                          <ListItemText 
                            primary={product.name} 
                            secondary={`$${product.price?.toFixed(2) || '0.00'}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>
          
          {/* Navigation Links - Right of Search */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 'auto' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.to}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: isActive(item.to) ? 600 : 400,
                  minWidth: 'auto',
                  px: 2,
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {/* User Account */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentUser ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={profileAnchorEl}
                  open={isProfileMenuOpen}
                  onClose={handleProfileMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/admin/dashboard">
                    Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/admin/login"
                  color="inherit"
                  startIcon={<AccountCircle />}
                  sx={{ 
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
        
        {/* Mobile Menu */}
        <Collapse in={mobileMenuOpen} timeout="auto" unmountOnExit>
          <Box sx={{ pb: 2, display: { md: 'none' } }}>
            <Stack spacing={1}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.to}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    color: isActive(item.to) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(item.to) ? 600 : 400,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
