import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Grid, Typography, Box, CardContent, CardMedia, CardActions, Button, Paper, Stack, useTheme, Card, CardActionArea, Divider, alpha } from '@mui/material';
import { styled } from '@mui/system';
import InfoGraphic from '../components/Display/InfoGraphic';
import GaussImage from "../assets/imgs/gauss.jpg";
import CapstoneImage from "../assets/imgs/Capstone.jpg";
import DdsImage from "../assets/imgs/dds.jpg";
import RequestImage from "../assets/imgs/requestform.jpg";
import RecruitmentImage from "../assets/imgs/recruitment.jpg";
import MyFridgeImage from "../assets/imgs/Myfridge.jpg";
import TMLImage from "../assets/imgs/TML.jpg";
import ComingSoonOverlay from '../components/Display/ComingSoonOverlay';
import Cover from '../components/Display/Cover';
import bgImage from '../assets/imgs/backgrounds/LandingBackground.webp';
import bgImageDark from '../assets/imgs/backgrounds/LandingBackgroundDark.webp';
import learningImage from '../assets/imgs/CardImgs/Learning.webp';
import interactiveDemo from '../assets/imgs/CardImgs/InteractiveDemo.webp';
import allProjects from '../assets/imgs/CardImgs/AllProjects.webp';
import presentation from '../assets/imgs/CardImgs/Presentation.webp';
import InteractiveCardMedia from '../components/Shared/InteractiveCardMedia';
import SiteFooter from '../components/Shared/Footer';
import DoubleRippleButton from '../components/Custom/DoubleRippleButton';
import PageTitle from '../components/Shared/PageTitle';


const HomePageReImagined = () => {
    const theme = useTheme();
    const exploreSectionRef = useRef(null); 
    const navigate = useNavigate();

    const handleExploreClick = () => {
        exploreSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleProjectCardClick = (tag) => {
        tag !== null ? navigate(`/projects?tag=${tag}`) : navigate(`/projects`);
    };

    return (
        <React.Fragment>
            <PageTitle pageTitle='Nechanicky Works' />
            <Cover light={bgImage} dark={bgImageDark} dynaColor={false}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    px: '15%',
                    paddingBottom: '15%',
                    color:'inherit'
                }}>
                    <Stack direction='column' spacing={2} justifyContent='space-around' flexGrow={1} >
                        <Typography variant='h2' color='white' align='center'>Nechanicky Works</Typography>
                        <Stack spacing={2} align='center' alignItems='center'>
                            <Typography sx={{ fontSize: {xs: '3rem'}, fontWeight: 'bold', fontSynthesisWeight: 'auto', letterSpacing: '0.1rem' }} variant="h6"  color='white'>Ethan Nechanicky Portfolio</Typography>
                            <DoubleRippleButton size='large' addBackground={alpha(theme.palette.background.paper, 0.2)} component={Link} rippleColor={alpha(theme.palette.primary.dark, 0.5)} hoverColor={theme.palette.common.white} sx={{ fontWeight: 'bold', fontSynthesisWeight: 'auto', letterSpacing: '0.1rem', fontSize: { xs: '1.2rem' } }} startingColor='transparent' onClick={handleExploreClick} variant='outlined'>Explore</DoubleRippleButton>
                        </Stack>
                    </Stack>
                </Box>
            </Cover>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: 'fit-content',
                p: '5%',
                my: 10,
                color: theme.palette.text.primary
            }} align='center' ref={exploreSectionRef}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography align='center' variant='h3'>Explore Projects by Content</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardActionArea onClick={()=>handleProjectCardClick('ed') }>
                                <InteractiveCardMedia>
                                    <CardMedia
                                        component={Box}
                                        sx={{ minHeight: 250, maxWidth: 'inherit' }}
                                        image={learningImage}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Educational
                                        </Typography>
                                    </CardContent>
                                </InteractiveCardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardActionArea onClick={() => handleProjectCardClick('demo')}>
                                <InteractiveCardMedia>
                                    <CardMedia
                                        component={Box}
                                        sx={{ minHeight: 250, maxWidth: 'inherit'}}
                                        image={interactiveDemo}
                                    />                               
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Interactive
                                        </Typography>
                                    </CardContent>
                                </InteractiveCardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardActionArea onClick={() => handleProjectCardClick('pres')}>
                                <InteractiveCardMedia>
                                    <CardMedia
                                        component={Box}
                                        sx={{ minHeight: 250, maxWidth: 'inherit' }}
                                        image={presentation}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Presentations
                                        </Typography>
                                    </CardContent>
                                </InteractiveCardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardActionArea onClick={() => handleProjectCardClick(null)}>
                                <InteractiveCardMedia>
                                    <CardMedia
                                        component={Box}
                                        sx={{ minHeight: 250, maxWidth: 'inherit' }}
                                        image={allProjects}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            All Projects
                                        </Typography>
                                    </CardContent>
                                    </InteractiveCardMedia>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{

                position: 'relative',
                minHeight: 400,
                m: '3%',
                height: 'fit-content',
                color: theme.palette.text.primary
            }}>
                <Container maxWidth='md' align='center' sx={{ py: '5%', px: 0, border: 'solid', borderColor: theme.palette.secondary.dark, borderWidth: 'thick', borderStyle: 'double', borderRadius: "10px" }}>
                    <Stack direction='column' spacing={2} sx={{ mx: 10 }}>
                        <Typography variant='h3' align='center'>Who Am I?</Typography>
                        <Typography variant='p' align='center'>
                            My name is Ethan and I am a computer science graduate of Oregon State University. I am 24 years old, and I live in Albany, OR.
                            I have been acting as a professional software engineer for the last 5+ years, and have experience with a variety of platforms.
                            Visit the 'About Me' page to read all about who I am and how I got to where I am today.
                        </Typography>
                        <Box sx={{
                            width:'100%'
                        }} align='center'>
                            <DoubleRippleButton size="large" variant='outlined' rippleColor={ alpha(theme.palette.accent.alternate, 0.5) } startingColor='transparent' sx={{ width: 'fit-content', color: theme.palette.text.primary, borderColor: theme.palette.text.primary }} component={Link} to="/about-me">Read About Me</DoubleRippleButton>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{

                position: 'relative',
                minHeight: 400,
                m:'3%',
                height: 'fit-content',
                color: theme.palette.text.primary
            }}>
                <Container maxWidth='lg' align='center' sx={{ py: '5%', px: 0, border: 'solid', borderColor: theme.palette.primary.dark, borderWidth: 'thick', borderStyle: 'double', borderRadius: "10px" } }>
                    <Stack direction='column' spacing={2} sx={{mx:10}}>
                        <Typography variant='h3' align='center'>Read about this site.</Typography>
                        <Typography variant='p' align='center'>My work spans academic challenges, professional achievements, and personal projects.
                            This platform not only presents my accomplishments, but invites you to interact with live demos that provide the opportunity to truly engage with my work.
                            You can read more about the development process and other aspects of this website using the link below.</Typography>
                        <Box sx={{
                            width: '100%'
                        }} align='center'>
                            <Button size="large" variant='outlined' sx={{ width: 'fit-content', color: theme.palette.text.primary, borderColor: theme.palette.text.primary }} component={Link} disabled>Learn About this Site (Coming Soon)</Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            {/* Footer Section */}
            <SiteFooter/>
        </React.Fragment>
    );
};

export default HomePageReImagined;
