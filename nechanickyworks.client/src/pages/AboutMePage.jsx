import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Button } from '@mui/material';
import MyPic from "../assets/imgs/me/MyPic.jpg";

const AboutMePage = () => {
    return (
        <Container maxWidth="lg">
            {/* Hero Section */}
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Avatar
                    alt="Ethan Nechanicky"
                    src={MyPic}
                    sx={{ width: 120, height: 120, mx: 'auto' }}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                    Ethan Nechanicky
                </Typography>
                <Typography variant="h5" color="textSecondary">
                    Your Professional Tagline
                </Typography>
            </Box>

            {/* Professional Summary */}
            <Grid container spacing={4} sx={{ my: 4 }}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        About Me
                    </Typography>
                    <Typography variant="body1">
                        Share your professional journey here. Talk about your passion, what drives you,
                        your expertise, and how you've evolved in your career. This is your story.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Skills & Expertise
                    </Typography>
                    {/* List your skills here. Consider using MUI Chips for technology names, or simple Typography for broader skills. */}
                    <Typography variant="body1">Skill 1, Skill 2, Skill 3, ...</Typography>
                </Grid>
            </Grid>

            {/* Call to Action to Projects Page */}
            <Box textAlign="center" sx={{ my: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Interested in seeing my work?
                </Typography>
                <Button variant="contained" color="primary" href="/">
                    View Projects
                </Button>
            </Box>

            {/* Optional: Personal Insights or Hobbies */}
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    A Bit More About Me
                </Typography>
                <Typography variant="body1">
                    Share something personal here: hobbies, interests, or fun facts. This helps humanize your profile
                    and connect with the reader on a personal level.
                </Typography>
            </Box>

            {/* You might also include a section for testimonials or endorsements if you have them. */}

        </Container>
    );
};

export default AboutMePage;

