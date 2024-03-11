import React from 'react';
import { Container, Grid, Typography, Box, Button, Link, Paper } from '@mui/material';
import { styled } from '@mui/system';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
}));

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4} sx={{ textAlign: 'center' }}>
        {/* Title Section */}
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Site
        </Typography>
        
        {/* Synthesis Section */}
        <Typography variant="h5" component="p" sx={{ margin: '20px 0' }}>
          Discover what we offer, from innovative products to insightful articles. Dive into our world.
        </Typography>
        
        {/* Product Sections - Example for 2 products */}
        <Grid container spacing={4}>
          {/* Product 1 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Product 1</Typography>
            <Typography>Simplified Description for Product 1.</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/path-to-screenshot-1.jpg" alt="Product 1" style={{ maxWidth: '100%', height: 'auto' }} />
            <Button component={Link} href="/product-1-page">Learn More</Button>
          </Grid>
          
          {/* Product 2 - Order Reversed */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: { md: 2 } }}>
            <img src="/path-to-screenshot-2.jpg" alt="Product 2" style={{ maxWidth: '100%', height: 'auto' }} />
            <Button component={Link} href="/product-2-page">Learn More</Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ order: { md: 1 } }}>
            <Typography variant="h6">Product 2</Typography>
            <Typography>Simplified Description for Product 2.</Typography>
          </Grid>
        </Grid>
        
        {/* Footer Section */}
        <StyledFooter>
          <Typography variant="h6">Quick Links</Typography>
          {/* Links to sections */}
          <Button component={Link} href="#title">Title</Button>
          <Button component={Link} href="#product1">Product 1</Button>
          {/* Add more as needed */}
          
          {/* Other common footer content */}
          <Typography>Contact Us | About Us</Typography>
        </StyledFooter>
      </Box>
    </Container>
  );
};

export default HomePage;
