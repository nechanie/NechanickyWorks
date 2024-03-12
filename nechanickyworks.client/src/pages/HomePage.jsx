import React from 'react';
import { Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import InfoGraphic from '../components/Display/InfoGraphic';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: '2%',
  background: theme.palette.background.paper,
}));

const HomePage = () => {
    return (
      <React.Fragment>
      <Container maxWidth="xl" sx={{ marginTop: "2%" } }>
        {/* Title Section */}
        <Typography variant="h2" align="center" component="h1" gutterBottom>
              Welcome to Nechanicky Works!
        </Typography>
        
        {/* Synthesis Section */}
        <Typography variant="h5" align="center" component="p" sx={{ margin: '20px 0' }}>
              Welcome to Nechanicky Works, the digital showcase of my journey in computer science.
              I'm Ethan, a computer science graduate of Oregon State University. My work spans academic challenges, professional achievements, and personal projects.
              This platform not only presents my accomplishments, but invites you to interact with live demos that provide the opportunity to truly engage with my work.
              Dive in and explore the various applications of technology and innovation.
        </Typography>
          <Stack direction="column" spacing={4}>
              <InfoGraphic title="Gaussian Quadrature" image="public/gauss.jpg" href="Projects/GaussQuad">
                  This is the simple description of Gaussian Quadrature and what to expect.
              </InfoGraphic>
              <InfoGraphic title="OSU Capstone Project" image="public/Capstone.jpg" href="/Capstone" rightJustify={true} >
                  This is the simple description of my capstone project and what to expect.
              </InfoGraphic>
              <InfoGraphic title="Diffusion Denoised Robustification" image="public/dds.jpg" href="/DiffusionDenoised">
                  This is the simple description of my Diffusion Denoised robustification method on attention based neural networks and what to expect.
              </InfoGraphic>
                    <InfoGraphic title="Warehouse Order Form" image="public/blank.jpg" href="/RequestForm" rightJustify={true}>
                  This is the simple description of blazor based web form for warehouse orders and what to expect.
              </InfoGraphic>
                    <InfoGraphic title="New Hire Requests Form" image="public/recruitment.jpg" href="/HRForm">
                  This is the simple description of Blazor based web form for new hire requests and what to expect.
              </InfoGraphic>
                    <InfoGraphic title="MyFridge Android App" image="public/Myfridge.jpg" href="/MyFridge" rightJustify={true}>
                  This is the simple description of the My Fridge android app developed with pure Kotlin and what to expect.
              </InfoGraphic>
          </Stack>    
    </Container>
    {/* Footer Section */ }
    <StyledFooter sx={{ width: "100%" }}>
        <Typography align="center" variant="h6">Quick Links</Typography>
        {/* Links to sections */}
        <Typography align="center" variant="h6">
            <Stack direction="column">
                <Button component={Link} href="#title">Title</Button>
                <Button component={Link} href="#product1">Product 1</Button>
            </Stack>
        </Typography>
        {/* Add more as needed */}

        {/* Other common footer content */}
        <Typography align="center">Contact Me | About Me</Typography>
    </StyledFooter>
    </React.Fragment>
    );
};

export default HomePage;
