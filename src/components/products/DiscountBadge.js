import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const DiscountBadge = ({ discount, size = 'medium' }) => {
  // Return null if discount is not a valid number or less than 1
  if (typeof discount !== 'number' || discount < 1) {
    return null;
  }
  const sizes = {
    small: {
      width: 40,
      height: 40,
      fontSize: '0.75rem',
    },
    medium: {
      width: 50,
      height: 50,
      fontSize: '0.875rem',
    },
    large: {
      width: 60,
      height: 60,
      fontSize: '1rem',
    }
  };

  const StyledBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: sizes[size].width,
    height: sizes[size].height,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: theme.shadows[2],
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '50%',
      border: `2px dashed ${theme.palette.error.contrastText}40`,
      animation: 'rotate 10s linear infinite',
    },
    '@keyframes rotate': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  }));

  return (
    <StyledBadge>
      <Typography variant="caption" fontSize={sizes[size].fontSize} fontWeight="bold">
        {discount}%
      </Typography>
      <Typography variant="caption" fontSize={sizes[size].fontSize * 0.6}>
        OFF
      </Typography>
    </StyledBadge>
  );
};

export default DiscountBadge;
