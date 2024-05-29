import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Stack, Divider, Paper, Avatar, useTheme } from '@mui/material';
import SiteFooter from '../components/Shared/Footer';
import Cover from '../components/Display/Cover';
import ContactBackground from '../assets/imgs/backgrounds/ContactPage/ContactBackground.webp';
import ContactBackgroundDark from '../assets/imgs/backgrounds/ContactPage/ContactBackgroundDark.webp';
import AccordionTabs from '../components/Display/AccordionTabs';
import ContactTabData from '../components/Display/data/ContactTabData';
import MyPic from '../assets/imgs/me/MyPic.jpg';
import GoogleMapsEmbed from '../components/Display/GoogleMapsEmbed';
import PageTitle from '../components/Shared/PageTitle';



const ContactPage = () => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <PageTitle pageTitle='Contact' />
            <Cover light={ContactBackground} dark={ContactBackgroundDark} sx={{height:'auto', minHeight: '100vh', backgroundRepeat:'repeat-y'} }>
                <Container maxWidth='xl' sx={{ width: '100%', height: '100%', my: '3%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h3' align='center' sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : 'inherit' } }>Contact Me</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                            <Stack direction='column' sx={{ height: '100%' }} justifyContent='center'>
                                <Box align='center' my='2%'>
                                    <Avatar
                                        alt='Ethan Nechanicky'
                                        src={MyPic}
                                        sx={{ width: { 'xs': 90, 'sm': 90, 'md': 175, 'lg': 175, 'xl': 225 }, height: { 'xs': 90, 'sm': 90, 'md': 175, 'lg': 175, 'xl': 225 } } }/>
                                </Box>
                                <Typography variant='h4' align='center' sx={{ color: theme.palette.mode === 'light' ? theme.palette.common.black : 'inherit' }}>Ethan Nechanicky</Typography>
                                <Divider orientation='horizontal' variant='middle'/>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <Paper variant='outlined'>
                                <Grid container p='3%' spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4} lg={12}>
                                                    <Stack>
                                                        <Typography variant='h5'><u>Location</u></Typography>
                                                        <Typography variant='body1'>City: Albany</Typography>
                                                        <Typography variant='body1'>State: Oregon</Typography>
                                                        <Typography variant='body1'>Country: United States</Typography>
                                                    </Stack>
                                            </Grid>
                                            <Grid item xs={8} lg={12}>
                                                <Box sx={{ height: { 'xs': '150px', 'sm': '200px', 'md': '250px', 'lg': '250px', 'xl': '300px' }, margin:'auto' }} >
                                                    <GoogleMapsEmbed/>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Stack>
                                            <Typography variant='h5'><u>Reaching Out</u></Typography>
                                            <Typography variant='body1'>
                                                Depending on what you would like to contact me about, certain methods may result in faster response times.
                                                To help with this, I have outlined the best methods of contact for several common intents. By referencing the
                                                provided contact structure, you will not only help keep contact efficient, but also help me by keeping it organized.
                                                Thanks!
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <AccordionTabs tabs={ContactTabData}/>
                        </Grid>
                    </Grid>
                </Container>
            </Cover>
            <SiteFooter/>
        </React.Fragment>
    );
};

export default ContactPage;
