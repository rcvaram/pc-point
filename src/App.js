import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link as RouterLink, 
  Outlet,
  useLocation 
} from 'react-router-dom';
import { 
  CssBaseline, 
  ThemeProvider, 
  CircularProgress, 
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import theme from './theme.js';
import Layout from './components/layout/Layout.js';
import { ProductProvider } from './contexts/ProductContext.js';
import { AuthProvider } from './contexts/AuthContext.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';

// Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={4}>
          <Typography variant="h5" color="error">
            Something went wrong
          </Typography>
          <Typography variant="body1" mt={2}>
            {this.state.error?.message}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Lazy load the pages for better performance
const Home = lazy(() => import('./pages/Home.js'));
const Shop = lazy(() => import('./pages/Shop.js'));
const About = lazy(() => import('./pages/About.js'));
const Contact = lazy(() => import('./pages/Contact.js'));
const Login = lazy(() => import('./pages/admin/Login.js'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.js'));

// Loading component for Suspense fallback
const Loading = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

// Simple wrapper component for potential future route logging
const RouteLogger = ({ children }) => children;

const AppRoutes = () => {
  // Removed console.log for production
  
  return (
    <ErrorBoundary>
      <RouteLogger>
        <Routes>
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="admin">
              <Route path="login" element={<Login />} />
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
            <Route path="*" element={
              <Box p={4}>
                <Typography variant="h4">404 - Page Not Found</Typography>
                <Typography>The page you're looking for doesn't exist.</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={RouterLink} 
                  to="/"
                  sx={{ mt: 2 }}
                >
                  Go to Home
                </Button>
              </Box>
            } />
          </Route>
        </Routes>
      </RouteLogger>
    </ErrorBoundary>
  );
};

function App() {
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ProductProvider>
            <Suspense fallback={<Loading />}>
              <AppRoutes />
            </Suspense>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
