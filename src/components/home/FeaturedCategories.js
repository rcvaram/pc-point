import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Memory as MemoryIcon,
  Storage as StorageIcon,
  DeveloperBoard as MoboIcon,
  SdStorage as StorageDriveIcon,
  Power as PowerSupplyIcon,
  SettingsEthernet as NetworkIcon
} from '@mui/icons-material';

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'block',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
    margin: '16px auto 0',
    borderRadius: '2px',
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
  color: 'white',
  '& svg': {
    fontSize: '2.5rem',
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const CategoryDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const ViewLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 500,
  marginTop: 'auto',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
  '& svg': {
    marginLeft: theme.spacing(0.5),
    transition: 'transform 0.2s ease',
  },
  '&:hover svg': {
    transform: 'translateX(4px)',
  },
}));

const categories = [
  {
    id: 1,
    name: 'Processors',
    description: 'High-performance CPUs for gaming and productivity',
    icon: <MemoryIcon />,
    link: '/shop?category=processors',
  },
  {
    id: 2,
    name: 'Graphics Cards',
    description: 'Powerful GPUs for gaming and creative work',
    icon: <MoboIcon />,
    link: '/shop?category=gpu',
  },
  {
    id: 3,
    name: 'Memory',
    description: 'High-speed RAM for better multitasking',
    icon: <MemoryIcon />,
    link: '/shop?category=ram',
  },
  {
    id: 4,
    name: 'Storage',
    description: 'SSDs and HDDs for all your storage needs',
    icon: <StorageDriveIcon />,
    link: '/shop?category=storage',
  },
  {
    id: 5,
    name: 'Power Supplies',
    description: 'Reliable power for your system',
    icon: <PowerSupplyIcon />,
    link: '/shop?category=psu',
  },
  {
    id: 6,
    name: 'Networking',
    description: 'Routers, switches, and network cards',
    icon: <NetworkIcon />,
    link: '/shop?category=networking',
  },
];

const FeaturedCategories = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          Shop by Category
        </SectionTitle>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4}>
              <CategoryCard elevation={0}>
                <CategoryIcon>
                  {category.icon}
                </CategoryIcon>
                <CardContent sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <CategoryTitle variant="h5" component="h3">
                    {category.name}
                  </CategoryTitle>
                  <CategoryDescription variant="body1">
                    {category.description}
                  </CategoryDescription>
                  <ViewLink to={category.link}>
                    View Products <ArrowForward fontSize="small" />
                  </ViewLink>
                </CardContent>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedCategories;
