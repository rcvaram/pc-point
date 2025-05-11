import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Alert,
  Avatar,
  Link,
  InputAdornment,
  IconButton,
  Fade,
  CircularProgress
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Failed to log in', err);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Paper 
            elevation={6} 
            sx={{ 
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              width: '100%',
              background: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main',
                  width: 60, 
                  height: 60,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <LockOutlined sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography 
                component="h1" 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 1,
                  background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                Admin Portal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to access your dashboard
              </Typography>
            </Box>
            
            {error && (
              <Fade in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 1,
                    boxShadow: '0 2px 8px rgba(211, 47, 47, 0.1)'
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}
            
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ 
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link 
                  href="#" 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Signing in...
                  </>
                ) : 'Sign In'}
              </Button>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} PC Point. All rights reserved.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
}
