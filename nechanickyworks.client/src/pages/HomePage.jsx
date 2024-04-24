import React from 'react';
import { Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
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
import SiteFooter from '../components/Shared/Footer';


const HomePage = () => {
    return (
        <React.Fragment>
            <Container maxWidth="lg" sx={{ marginTop: "2%" }}>
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
                    <InfoGraphic title="Trustworthy Machine Learning" image={TMLImage} href="projects/TrustworthyMachineLearning" rightJustify={true}>
                        Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.
                    </InfoGraphic>  
                    <InfoGraphic title="Gaussian Quadrature" image={ GaussImage } href="projects/GaussianQuadrature">
                        Discover the computational power of Gaussian Quadrature which surpasses traditional methods in numerical integration.
                    </InfoGraphic>
                    <InfoGraphic title="OSU Capstone Project" image={CapstoneImage} href="projects/OSUCapstoneProject" rightJustify={true} >
                        Experience real-world applications of advanced NLP and vector database technology, and understand how these modern technologies can identify and analyze patterns in vast datasets.
                    </InfoGraphic>
                    <InfoGraphic title="Diffusion Denoised Robustification" image={DdsImage} href="projects/DiffusionDenoisedRobustification">
                        Dive into an exploration of cutting-edge diffusion denoising techniques and their effectiveness in improving the securty of constantly evolving deep learning technologies. 
                    </InfoGraphic>
                    <ComingSoonOverlay>
                        <InfoGraphic title="Warehouse Order Form" image={RequestImage} href="projects/WarehouseRequestForm" rightJustify={true}>
                            Explore the real-world application of Blazor Web Forms in an industry setting to bring outdated enterprise applications back to life. 
                        </InfoGraphic>
                    </ComingSoonOverlay>
                    <ComingSoonOverlay>
                        <InfoGraphic title="New Hire Requests Form" image={RecruitmentImage} href="projects/RecruitmentRequestForm">
                            Explore the real-world application of Blazor Web Forms in an industry setting to streamline hiring processes. 
                        </InfoGraphic>
                    </ComingSoonOverlay>
                    <ComingSoonOverlay>
                        <InfoGraphic title="MyFridge Android App" image={MyFridgeImage} href="projects/MyFridgeApp" rightJustify={true}>
                            Immerse yourself in a fully functional android application designed to assist with grocery shopping and tracking.
                        </InfoGraphic>
                    </ComingSoonOverlay>
                </Stack>    
            </Container>
            <SiteFooter/>
        </React.Fragment>
    );
};

export default HomePage;
