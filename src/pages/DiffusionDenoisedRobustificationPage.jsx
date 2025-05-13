import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Paper, Box, Grid, Link, Stack, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../assets/imgs/ddrp/ddrp1.jpg";
import slide2 from "../assets/imgs/ddrp/ddrp2.jpg";
import slide3 from "../assets/imgs/ddrp/ddrp3.jpg";
import slide4 from "../assets/imgs/ddrp/ddrp4.jpg";
import slide5 from "../assets/imgs/ddrp/ddrp5.jpg";
import slide6 from "../assets/imgs/ddrp/ddrp6.jpg";
import slide7 from "../assets/imgs/ddrp/ddrp7.jpg";
import slide8 from "../assets/imgs/ddrp/ddrp8.jpg";
import slide9 from "../assets/imgs/ddrp/ddrp9.jpg";
import slide10 from "../assets/imgs/ddrp/ddrp10.jpg";
import slide11 from "../assets/imgs/ddrp/ddrp11.jpg";
import slide12 from "../assets/imgs/ddrp/ddrp12.jpg";
import slide13 from "../assets/imgs/ddrp/ddrp13.jpg";
import slide14 from "../assets/imgs/ddrp/ddrp14.jpg";
import slide15 from "../assets/imgs/ddrp/ddrp15.jpg";
import fig1a from "../assets/imgs/ddrp/fig1a.jpg";
import fig1b from "../assets/imgs/ddrp/fig1b.jpg";
import fig2a from "../assets/imgs/ddrp/fig2a.jpg";
import fig2b from "../assets/imgs/ddrp/fig2b.jpg";

const paperLink = "https://github.com/nechanie/Safeguarding-Attention-With-Diffusion-Denoised-Smoothing/blob/main/Safeguarding-Attention-With-Diffusion-Denoised-Smoothing.pdf";
const carliniPaperLink = "https://arxiv.org/abs/2206.10550";
const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15];

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const DiffusionDenoisedRobustificationPage = () => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" align='center' sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to the Diffusion Denoising Robustification Project Page.
                </Typography>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h5" gutterBottom>Overview</Typography>
                        <Typography paragraph>
                            In the digital age, ensuring the accuracy of image recognition technologies, especially against subtle,
                            misleading changes (known as adversarial attacks), is paramount. Our study introduces an innovative approach,
                            leveraging diffusion denoising, to strengthen these models against such challenges.
                        </Typography>
                        <Typography paragraph>
                            This work is inspired by and builds upon the groundbreaking research by Carlini et al. (2022), titled <Link href={carliniPaperLink} target="_blank" rel="noopener noreferrer">"Certified! Adversarial Robustness for Free!"</Link>. Their methodology set the stage for our exploration into the realm of diffusion denoised smoothing techniques and their applicability across various attention-based image classification models.
                        </Typography>
                        <Typography variant="h5" gutterBottom>The Heart of Our Research</Typography>
                        <Typography paragraph>
                            We focused on attention-based models; a cutting-edge in image classification that concentrates on the most informative
                            parts of an image. Our key finding? Applying diffusion denoising not only makes these models more robust against adversarial
                            attacks but also retains their high accuracy.
                        </Typography>

                        <Container maxWidth='md' align="center" sx={{ margin: '20px 0' }}>
                            <Typography variant="h5" gutterBottom>Presentation</Typography>
                            <Slider
                                asNavFor={nav2}
                                ref={slider => (sliderRef1 = slider)}
                                {...settings}
                            >
                                {slides.map((slide, index) => (
                                    <div key={index}>
                                        <img src={slide} alt={`Insight ${index + 1}`} style={{ margin: 'auto', display: 'block', maxWidth: '100%', maxHeight: '500px' }} />
                                    </div>
                                ))}
                            </Slider>
                            <Slider
                                asNavFor={nav1}
                                className="center"
                                centerPadding="50px"
                                ref={slider => (sliderRef2 = slider)}
                                slidesToShow={5}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                centerMode={true}
                                infinite={false}
                                dots={true}
                            >
                                {slides.map((slide, index) => (
                                    <div key={index}>
                                        <img src={slide} alt={`Insight ${index + 1}`} style={{ display: 'block', margin: "auto", paddingInline: "5px", maxWidth: '100%', maxHeight: '500px' }} />
                                    </div>
                                ))}
                            </Slider>

                        </Container>
                    </Paper>

                    <Container maxWidth="md" align='center' sx={{ mt: 4, mb: 4 }}>
                        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                            <Typography variant="h5" gutterBottom>Results at a Glance</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Box component="img" src={fig2a} sx={{ width: '100%', height: '100%' }} role='img' alt="Impact of Diffusion Denoising on Model Accuracy" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box component="img" src={fig2b} sx={{ width: '100%', height: '100%' }} role='img' alt="Impact of Diffusion Denoising on Model Accuracy" />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" display="block" gutterBottom>Impact of diffusion denoising on model accuracy against adversarial attacks.</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Box component="img" src={fig2a} sx={{ width: '100%', height: '100%' }} role='img' alt="Comparison: Attention-based vs. Traditional Models" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box component="img" src={fig2b} sx={{ width: '100%', height: '100%' }} role='img' alt="Comparison: Attention-based vs. Traditional Models" />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="caption" display="block" gutterBottom>Comparing the resilience of attention-based and traditional models.</Typography>
                                </Grid>
                            </Grid>

                            <Typography paragraph>
                                Dive deeper into our methodology, detailed analyses, and comprehensive findings in the full paper:
                                <Link href={paperLink} target="_blank" rel="noopener noreferrer"> Read the Technical Paper</Link>.
                            </Typography>
                        </Paper>
                    </Container>
                </Container>
            </Container>
            {/* Footer Section */}
            <StyledFooter sx={{ width: "100%" }}>
                <Typography align="center" variant="h6">Research Presentation</Typography>
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
}

export default DiffusionDenoisedRobustificationPage;