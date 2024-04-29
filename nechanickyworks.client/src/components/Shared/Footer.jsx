import React, { useState, useRef } from 'react';
import { Container, Grid, Typography, Box, CardContent, CardMedia, IconButton, Button, Paper, Stack, useTheme, Card, CardActionArea, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import DaneLogo from "../../assets/imgs/DaneLogo.png";
// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    background: theme.palette.background.footer,
    color: theme.palette.primary.main,
    'a': {
        fontWeight: 'inherit',
        color: "inherit",
        textDecoration: "none",
        width: 'fit-content',
        cursor: 'pointer'
    },
    'a:hover:not([disabled])': {
        color: 'rgb(0 159 164)',
        textDecoration: 'underline',
    },
    'a:is([disabled])': {
        cursor: 'default',
        color: '#9d9d9d'
    }
}));

const SiteFooter = () => {

    return (
        <StyledFooter sx={{ width: "100%" }}>
            <Container maxWidth='xl' align='center'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} alignItems='center'>
                        <Stack direction='column'>
                            <Box sx={{
                                maxHeight: 100,
                                height: '100%'
                            }}>
                                <img style={{ maxHeight: 'inherit' }} src={DaneLogo} />
                            </Box>
                            <Typography variant='h4'>NechanickyWorks</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: "3%" }}>
                        <Stack direction='column' alignItems='center'>
                            <Typography variant='body1'><u>Projects</u></Typography>
                            <Typography component={Link} to='/projects' variant='overline'>Project Browser</Typography>
                            <Typography component={Link} to='/projects/TrustworthyMachineLearning' variant='overline'>Trustworthy Machine Learning</Typography>
                            <Typography component={Link} to='/projects/GaussianQuadrature' variant='overline'>Gaussian Quadrature</Typography>
                            <Typography component={Link} disabled={true} variant='overline'>OSU Senior Capstone (Coming Soon)</Typography>{/*'/projects/OSUCapstoneProject'*/}
                            <Typography component={Link} disabled={true} variant='overline'>Diffusion Denoised Robustification (Coming Soon)</Typography>{/*'/projects/DiffusionDenoisedRobustification'*/}
                            <Typography component={Link} disabled={true} variant='overline'>Warehouse Order Form (Coming Soon)</Typography>
                            <Typography component={Link} disabled={true} variant='overline'>New Hire Request Form (Coming Soon)</Typography>
                            <Typography component={Link} disabled={true} variant='overline'>MyFridge Android App (Coming Soon)</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Stack direction='column' sx={{ marginBottom: "3%" }} alignItems='center'>
                            <Typography variant='body1'><u>About</u></Typography>
                            <Typography component={Link} disabled={true} variant='overline'>About Me (Coming Soon)</Typography>
                            <Typography component={Link} disabled={true} variant='overline'>About This Website (Coming Soon)</Typography>
                        </Stack>
                        <Stack direction='column' alignItems='center'>
                            <Typography variant='body1'><u>Contact</u></Typography>
                            <Typography component={Link} to='/contact' variant='overline'>Contact Information</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
            <Divider orientation='horizontal' variant='middle' sx={{ marginBottom: "3%" }} />
            <Container maxWidth='md' align='center'>
                <Grid container spacing={1} justifyContent='center'>
                    <Grid item xs={4} sm={2} md={2}>
                        <IconButton aria-label='Github' href="https://github.com/nechanie" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={2} md={2}>
                        <IconButton aria-label='Email' href='mailto:ethan.nechanicky@gmail.com' target="_blank" rel="noopener noreferrer">
                            <AlternateEmailIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={2} md={2}>
                        <IconButton aria-label='LinkedIn' href="https://www.linkedin.com/in/ethan-nechanicky-492127259" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} sm={2} md={2}>
                        <IconButton aria-label='Facebook' href="https://www.facebook.com/ethan.nechanicky/" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </StyledFooter>
    );
}

export default SiteFooter;