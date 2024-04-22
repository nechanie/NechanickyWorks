import React, { useState, useRef } from 'react';
import { Container, Grid, Typography, Box, CardContent, CardMedia, CardActions, Button, Link, Paper, Stack, useTheme, Card } from '@mui/material';
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

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const HomePageReImagined = () => {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const theme = useTheme();
    const exploreSectionRef = useRef(null); 

    React.useEffect(() => {
        setBackgroundImage((prevState) => {
            const background = theme.palette.mode === 'light' ? bgImage : bgImageDark;
            return background;
        });
    }, [theme.palette.mode]);

    const handleExploreClick = () => {
        exploreSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <React.Fragment>
            <Cover image={backgroundImage}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    px: '15%',
                    paddingBottom: '15%'
                }}>
                    <Stack direction='column' spacing={2 }>
                        <Typography variant='h2'>Nechanicky Works</Typography>
                        <Typography>Ethan Nechanicky Portfolio</Typography>
                        <Button onClick={handleExploreClick} variant='outlined' sx={{ width: 'fit-content', color: theme.palette.primary.contrastText, borderColor: theme.palette.primary.contrastText }}>Explore</Button>
                    </Stack>
                </Box>
            </Cover>
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: 'fit-content',
                p: '5%',
                color: theme.palette.text.primary
            }} align='center' ref={exploreSectionRef}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography align='center' variant='h3'>Explore Projects by Content</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight:120 }}>
                            <CardMedia
                                component={Box}
                                sx={{minHeight: 250, display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}
                                align='center'
                                image={learningImage}
                            >
                                <Button size="medium" variant='outlined' sx={{ width: 'fit-content', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.4)', color: theme.palette.primary.contrastText, borderColor: theme.palette.primary.contrastText }} component={Link}>Learn More</Button>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Educational
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardMedia
                                component={Box}
                                sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}
                                align='center'
                                image={interactiveDemo}
                            >
                                <Button size="medium" variant='outlined' sx={{ width: 'fit-content', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.4)', color: theme.palette.primary.contrastText, borderColor: theme.palette.primary.contrastText }} component={Link}>Learn More</Button>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Interactive
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardMedia
                                component={Box}
                                sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}
                                align='center'
                                image={presentation}
                            >
                                <Button size="medium" variant='outlined' sx={{ width: 'fit-content', margin: 'auto', backgroundColor: 'rgba(0,0,0,0.4)', color: theme.palette.primary.contrastText, borderColor: theme.palette.primary.contrastText }} component={Link}>Learn More</Button>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Presentations
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Card sx={{ maxWidth: 345, minHeight: 120 }}>
                            <CardMedia
                                component={Box}
                                sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}
                                align='center'
                                image={allProjects}
                            >
                                <Button size="medium" variant='outlined' sx={{ width: 'fit-content', margin: 'auto', backgroundColor:'rgba(0,0,0,0.4)', color: theme.palette.primary.contrastText, borderColor: theme.palette.primary.contrastText }} component={Link}>Learn More</Button>
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    All Projects
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{

                position: 'relative',
                width: '100%',
                minHeight:400,
                height: 'fit-content',
                color: theme.palette.text.primary
            }}>
                <Container maxWidth='md' align='center'>
                    <Stack direction='column' spacing={2}>
                        <Typography variant='h3' align='center'>Who Am I?</Typography>
                        <Typography variant='p' align='center'>Give a short intro of who I am and prompt user to explore my projects and use the link provided to read more about me.</Typography>
                        <Box sx={{
                            width:'100%'
                        }} align='center'>
                            <Button size="large" variant='outlined' sx={{ width: 'fit-content', color: theme.palette.text.primary, borderColor: theme.palette.text.primary }} component={Link}>Read About Me</Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            {/* Footer Section */}
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

export default HomePageReImagined;
