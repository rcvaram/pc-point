import React from 'react';
import { Button as MuiButton, CircularProgress, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledButton = styled(MuiButton)(({ theme, variant, fullwidth, loading }) => ({
  borderRadius: '8px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  ...(variant === 'contained' && {
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    '&:hover': {
      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
    },
  }),
  ...(variant === 'outlined' && {
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: 'rgba(79, 70, 229, 0.04)',
    },
  }),
  ...(variant === 'text' && {
    '&:hover': {
      backgroundColor: 'rgba(79, 70, 229, 0.04)',
    },
  }),
  ...(fullwidth === 'true' && {
    width: '100%',
  }),
  ...(loading === 'true' && {
    '& .MuiButton-startIcon, & .MuiButton-endIcon': {
      opacity: 0,
    },
  }),
}));

const ButtonContent = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  opacity: 1,
  transition: 'opacity 0.3s ease',
});

const LoadingWrapper = styled('span')({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CustomButton = ({
  children,
  to,
  href,
  startIcon,
  endIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  onClick,
  ...props
}) => {
  const buttonProps = {
    variant,
    color,
    size,
    disabled: disabled || loading,
    fullwidth: fullWidth.toString(),
    loading: loading.toString(),
    startIcon: loading ? undefined : startIcon,
    endIcon: loading ? undefined : endIcon,
    onClick,
    ...props,
  };

  const content = (
    <>
      <ButtonContent style={{ opacity: loading ? 0 : 1 }}>
        {startIcon && React.cloneElement(startIcon, { fontSize: size === 'small' ? 'small' : 'medium' })}
        {children}
        {endIcon && React.cloneElement(endIcon, { fontSize: size === 'small' ? 'small' : 'medium' })}
      </ButtonContent>
      {loading && (
        <LoadingWrapper>
          <CircularProgress 
            size={size === 'small' ? 16 : 20} 
            color={variant === 'contained' ? 'inherit' : 'primary'} 
          />
        </LoadingWrapper>
      )}
    </>
  );

  if (to) {
    return (
      <StyledButton
        component={Link}
        to={to}
        {...buttonProps}
      >
        {content}
      </StyledButton>
    );
  }


  if (href) {
    return (
      <StyledButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...buttonProps}
      >
        {content}
      </StyledButton>
    );
  }

  return (
    <StyledButton {...buttonProps}>
      {content}
    </StyledButton>
  );
};

export default CustomButton;
