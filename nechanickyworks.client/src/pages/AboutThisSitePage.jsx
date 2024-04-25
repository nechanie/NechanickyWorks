import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, Divider, Grid, Card, CardContent, useTheme } from '@mui/material';

const AboutThisSitePage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: theme.palette.grey[100] }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    About This Site
                </Typography>

                <Divider sx={{ my: 3 }} />

                {/* Project Overview */}
                <Box mt={4}>
                    <Typography variant="h4" gutterBottom>
                        Project Overview
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This web application is the culmination of my cumulative learning and experiences. It's designed to showcase the integration of a React frontend with a .NET Core backend, hosted on Microsoft Azure for global accessibility. This project serves as a testament to my skills in developing and deploying full-stack web applications.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Technical Specifications */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Technical Specifications
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{ p: 2, backgroundColor: theme.palette.grey[200] }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Architecture & Hosting
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Frontend developed with React, offering a dynamic and responsive user interface." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Backend powered by .NET Core, providing robust server-side logic." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Hosted as a Web App Service on Microsoft Azure, ensuring scalability and reliability." />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{ p: 2, backgroundColor: theme.palette.grey[200] }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Compute Server & API
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Compute server built with an Nvidia RTX 3050 GPU and Ryzen 9 5950x CPU on Ubuntu Server OS." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Python FastAPI for efficient real-time communication via websockets, hosted in Docker containers." />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Challenges and Solutions */}
                <Box mt={4}>
                    <Typography variant="h4" gutterBottom>
                        Challenges and Solutions
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The project faced multiple challenges, especially in managing resource allocation for the compute server and ensuring real-time communication between the server and client. A queuing system was devised for the GPU to ensure fair and efficient processing of requests, and websockets were utilized over HTTP for more efficient communication, minimizing latency and enhancing user experience.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Reflections */}
                <Box mt={4}>
                    <Typography variant="h4" gutterBottom>
                        Reflections
                    </Typography>
                    <Typography variant="body1" paragraph>
                        This project reflects my journey and growth as a software engineer, showcasing my ability to not only conceptualize and develop a full-stack application but also tackle and overcome the various technical challenges encountered along the way. It stands as a portfolio piece that I am particularly proud of, demonstrating my skills, dedication, and passion for software development.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default AboutThisSitePage;
