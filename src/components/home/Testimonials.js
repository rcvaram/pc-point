import React from 'react';
import { Box, Container, Typography, Avatar, Card, CardContent, Grid, Rating, styled } from '@mui/material';
import { Quote } from '@mui/icons-material';

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

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 3),
  borderRadius: '12px',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'visible',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const QuoteIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -20,
  left: 20,
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '& svg': {
    fontSize: '2rem',
  },
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
  lineHeight: 1.7,
  position: 'relative',
  zIndex: 1,
}));

const AuthorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 'auto',
}));

const AuthorAvatar = styled(Avatar)(({ theme }) => ({
  width: '56px',
  height: '56px',
  marginRight: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.main}`,
}));

const AuthorInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.2,
}));

const AuthorTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const testimonials = [
  {
    id: 1,
    text: "I've built several PCs in my life, but the components from PC Point took my build to the next level. The performance is outstanding, and the prices are very competitive.",
    rating: 5,
    author: {
      name: 'Alex Johnson',
      title: 'Gaming Enthusiast',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  },
  {
    id: 2,
    text: "The customer service at PC Point is exceptional. They helped me pick the perfect components for my video editing workstation. Couldn't be happier with my purchase!",
    rating: 5,
    author: {
      name: 'Sarah Williams',
      title: 'Video Editor',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  },
  {
    id: 3,
    text: "Fast shipping, well-packaged components, and great prices. I'll definitely be a returning customer for all my PC building needs.",
    rating: 4,
    author: {
      name: 'Michael Chen',
      title: 'Software Developer',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    },
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SectionTitle variant="h3" component="h2">
          What Our Customers Say
        </SectionTitle>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <TestimonialCard elevation={0}>
                <QuoteIcon>
                  <Quote />
                </QuoteIcon>
                <TestimonialText variant="body1">
                  {testimonial.text}
                </TestimonialText>
                <Box sx={{ mb: 2 }}>
                  <Rating 
                    value={testimonial.rating} 
                    readOnly 
                    precision={0.5}
                    size="small"
                  />
                </Box>
                <AuthorContainer>
                  <AuthorAvatar 
                    src={testimonial.author.avatar} 
                    alt={testimonial.author.name}
                  />
                  <AuthorInfo>
                    <AuthorName variant="subtitle2">
                      {testimonial.author.name}
                    </AuthorName>
                    <AuthorTitle variant="caption">
                      {testimonial.author.title}
                    </AuthorTitle>
                  </AuthorInfo>
                </AuthorContainer>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
