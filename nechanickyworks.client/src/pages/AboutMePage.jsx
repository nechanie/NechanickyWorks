import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Button, CardContent, Card, Paper, Stack, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';
import MyPic from "../assets/imgs/me/MyPic.jpg";
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import HorizontalTimeline from '../components/Display/HorizontalTimeline';
import VerticalTimeline from '../components/Display/VerticalTimeline';
import useCurrentBreakpoint from '../components/utils/BreakpointTracker';
import SkillMatrixGrid from '../components/Custom/SkillMatrixGrid';
import SiteFooter from '../components/Shared/Footer';
import Cover from '../components/Display/Cover';
import AboutMeBackground from '../assets/imgs/backgrounds/AboutMe/AboutMeBackground.webp';
import AboutMeBackgroundDark from '../assets/imgs/backgrounds/AboutMe/AboutMeBackgroundDark.webp';
import DoubleRippleButton from '../components/Custom/DoubleRippleButton';

const AboutMePage = () => {
    let breakpoint = useCurrentBreakpoint();
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
    const theme = useTheme();

    const timelineEvents = [
        {
            dates: ["Jan 2019", null],
            title: "Enrolled in Linn-Benton Community College",
            details: "Started as a student at Linn-Benton Community College in Albany, OR., where I began my path in Computer Science.",
        },
        {
            dates: ["Apr 2019", "Ongoing"],
            title: "Student Applications Engineer",
            details: "Worked primarily in the role of a full stack web developer to develope web applications, RESTful APIs, and managed SQL databases improving operational efficiencies across various departments enterprise-wide.",
        },
        {
            dates: ['Sept 2021', null],
            title: "Enrolled in Oregon State University",
            details: 'Started as a student at Oregon State University in Corvallis, OR., where I would continue on to finish my B.S. in Computer Science.'
        },
        {
            dates: ["Oct 2022", "Jun 2023"],
            title: "OSU Capstone Project",
            details: "Part of a cross-functional team for a 9-month period to develop an NLP-based recommendation system. The final product implemented Python text embedding deep learning models and Pinecone™ vector database technologies.",
        },
        {
            dates: ["Apr 2023", "Jun 2023"],
            title: "Research Project",
            details: "Worked with a team of fellow OSU students on a research project. The project focused on determining the impact on robustness of attention-based neural networks when applying recently proposed diffusion denoised smoothing techniques.",
        },
        {
            dates: ["Mar 2024", null],
            title: "Graduated from OSU",
            details: "Graduated Oregon State University with a B.S. in Computer Science. Specialized in Artificial Intelligence with a GPA of 3.54.",
        },
        {
            dates: ["Mar 2024", "Ongoing"],
            title: "NechanickyWorks Portfolio",
            details: "After graduating from OSU, I started development of my online portfolio which took the form of NechanickyWorks.com, a site dedicated to showcasing the skills I have developed throughout my career in computer science. The portfolio includes a culmination of both education and professional skills and experience, and will continue to be updated as a long term project."
        },

    ];
    return (
        <React.Fragment>
            <Cover light={AboutMeBackground} dark={AboutMeBackgroundDark }>
                <Container maxWidth='sm' align='center'>
                    <Box sx={{ my: 4, textAlign: 'center' }} align='center'>
                        <Avatar
                            alt="Ethan Nechanicky"
                            src={MyPic}
                            sx={{ width: 120, height: 120, mx: 'auto' }}
                        />
                        <Typography variant="h3" component="h1" color="textSecondary" gutterBottom>
                            Ethan Nechanicky
                        </Typography>
                        <Typography variant="h6" align='center' color="textSecondary">
                            Innovative Computer Science Graduate Specializing in AI and Full-Stack Development
                        </Typography>
                    </Box>
                </Container>
                {/* Professional Summary */}

                <Container maxWidth='md' align='center'>
                    <Paper sx={{ padding: '3%' }}>
                        <Typography variant="h4" align='center' gutterBottom>
                            <u>About Me</u>
                        </Typography>
                        <Typography align='center' variant="body1">
                            I am Ethan Nechanicky, a Computer Science graduate from Oregon State University, specializing in Artificial Intelligence with a strong foundation
                            in full-stack development. Since beginning my studies in January 2019, I have been deeply involved in leveraging technology to solve practical problems.
                            My passion lies in not just understanding complex systems but in applying that knowledge to create innovative software solutions that improve efficiency
                            and effectiveness across various industries.

                            My academic and professional projects range from developing deep learning-based recommendation systems to enhancing neural network robustness using diffusion
                            denoised smoothing techniques. Through my role as a Student Applications Engineer at ATI Materials, I have gained extensive experience in full-stack web
                            development and database management, crafting tailored solutions that enhance organizational processes and user experience.

                            My journey is characterized by a relentless pursuit of knowledge and excellence, demonstrated through my hands-on approach to learning and problem-solving.
                            I am always eager to take on new challenges and am committed to contributing to the advancement of technology in the business world.
                        </Typography>
                    </Paper>
                </Container>

                </Cover>
                <Stack spacing={4} sx={{ my: 4, padding: '5%' }} alignItems='center'>

                    <Container maxWidth="xl">
                        <Paper sx={{padding: '3%', width:'100%'}} >
                            <Typography variant="h4" align='center' gutterBottom>
                                <u>My Timeline</u>
                        </Typography>
                            <Container maxWidth='md'>
                        <Typography variant='h6' align='center' component='div' paddingBottom='2%' gutterBottom>The timeline below provides you with the opportunity to explore some of the milestones and experiences that define my professional and educational background.</Typography>
                        </Container>
                            <VerticalTimeline timelineEvents={timelineEvents} />
                        </Paper>
                    </Container>
                    
                    <Container maxWidth="lg" sx={{ paddingTop: '64px' }}>
                        <Paper sx={{ padding: '3%', paddingInline: '10%', width:'100%'}}>
                            <Typography variant="h4" align='center' gutterBottom>
                                <u>Skills & Expertise</u>
                        </Typography>
                        <Typography variant='h6' align='center' component='div' paddingBottom='2%' gutterBottom>
                            Dive into my skillset: A visual breakdown of my capabilities in computer science and technology.
                        </Typography>
                            <SkillMatrixGrid />
                        </Paper>

                    </Container>
                </Stack>

            {/* Call to Action to Projects Page */}
            <Container maxWidth="xs" align='center' sx={{ paddingBottom: '64px'}}>
                <Paper sx={{ padding: '3%', paddingInline: '10%', width: '100%' }}>
                    <Typography variant="h6" align='center' gutterBottom>
                        <u>Interested in seeing my work?</u>
                    </Typography>
                    <DoubleRippleButton rippleColor={theme.palette.primary.dark} startingColor={theme.palette.primary.main} variant="contained" href="/projects">
                        Browse My Projects
                    </DoubleRippleButton>
                </Paper>
                </Container>

                {/* Optional: Personal Insights or Hobbies */}
                {/*<Box sx={{ my: 4 }}>*/}
                {/*    <Typography variant="h4" align='center' gutterBottom>*/}
                {/*        A Bit More About Me*/}
                {/*    </Typography>*/}
                {/*    <Typography variant="body1" align='center'>*/}
                {/*        Share something personal here: hobbies, interests, or fun facts. This helps humanize your profile*/}
                {/*        and connect with the reader on a personal level.*/}
                {/*    </Typography>*/}
                {/*</Box>*/}

                {/* You might also include a section for testimonials or endorsements if you have them. */}

            <SiteFooter />
        </React.Fragment>
    );
};

export default AboutMePage;

