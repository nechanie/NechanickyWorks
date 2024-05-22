import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Box, Paper, useTheme, List, ListItem, ListItemText, Stack, ListItemButton, alpha, Link as Mlink, Card, CardContent, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuBook, Code, Build, Computer, TrendingUp, Timeline as TimelineIcon, Panorama, Storage, EmojiObjects, DeveloperBoard, Troubleshoot, Hub } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import PageTitle from '../components/Shared/PageTitle';
import Cover from '../components/Display/Cover';
import AboutThisSiteBackground from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackground.webp";
import AboutThisSiteBackgroundDark from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackgroundDark.webp";
import SiteFooter from '../components/Shared/Footer';
import TocSpeedDial from '../components/utils/TocSpeedDial';
import TableOfContents from '../components/utils/Toc';
import AnimatedCodeBlock from '../components/Demos/CodeWriter';
import MotionSection from '../components/MotionSection';
import ContentSection from '../components/ContentSection';

const actions = [
    { icon: <EmojiObjects />, name: 'Inspiration', link: 'inspiration' },
    { icon: <DeveloperBoard />, name: 'Planning', link: 'planning' },
    { icon: <Panorama />, name: 'Front End', link: 'frontend' },
    { icon: <Storage />, name: 'Back End', link: 'backend' },
    { icon: <Troubleshoot />, name: 'Challenges', link: 'challenges' },
    { icon: <Hub />, name: 'Final Product', link: 'product' },
];

const tocContent = [
    { name: 'Inspiration for the Site', subcontent: [{ name: 'Reasoning', link: 'reasoning' }, { name: 'Expectation', link: 'expectation' }] },
    { name: 'Planning of the Site', subcontent: [{ name: 'Format', link: 'format' }, { name: 'Goals', link: 'goals' }, { name: 'Content Choices', link: 'content' }, { name: 'Process', link: 'process' }] },
    { name: 'Construction of the Site - Front End', subcontent: [{ name: 'Framework', link: 'feframework' }, { name: 'Languages', link: 'languages' }, { name: 'Design Choices', link: 'fedesign' }, { name: 'Hosting', link: 'fehosting' }, { name: 'Cost', link: 'fecost' }, { name: 'Tools, Libraries, and Resources', link: 'feresources' }] },
    { name: 'Construction of the Site - Back End', subcontent: [{ name: 'Server and Server Specs', link: 'beserver' }, { name: 'Hosting', link: 'behosting' }, { name: 'Containerization', link: 'becontainerization' }, { name: 'API and Frameworks', link: 'beframework' }, { name: 'Databases', link: 'bedatabase' }, { name: 'Compute Resources', link: 'becompute' }, { name: 'Network', link: 'benetwork' }, { name: 'Tools, Libraries, and Resources', link: 'beresources' }] },
    { name: 'Challenges', subcontent: [{ name: 'Affordability', link: 'challenges' }, { name: 'Networking', link: 'challenges' }, { name: 'Resource Allocation', link: 'challenges' }] },
    { name: 'Final/Current Product', subcontent: [{ name: 'System Achitecture', link: 'architecture' }, { name: 'System Analytics', link: 'analytics' }, { name: 'Roadmap', link: 'roadmap' }] }
]

var codeStringPrimary = `
import React from 'react';
import { Typography, Container, Box } from '@mui/material';


function WelcomeMessage() {
	return (
		<Container>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
				textAlign="center"
			>
				<Typography variant="h2">
					Welcome To NechanickyWorks
				</Typography>
			</Box>
		</Container>
	);
}

export default WelcomeMessage;
`;


const AboutThisSitePage = () => {
    const theme = useTheme();
    const [highlights, setHighlights] = useState(theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5));
    const [transitionalBg, setTransitionalBg] = useState(theme.palette.background.paper);
    const [showStickyToc, setShowStickyToc] = useState(false);
    const [isCodeBlockVisible, setIsCodeBlockVisible] = useState(false);
    const tocRef = useRef(null);
    const codeBlockRef = useRef(null);

    useEffect(() => {
        setHighlights((prevState) => {
            const newColor = theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5);
            return newColor;
        });
        setTransitionalBg(theme.palette.background.paper);
    }, [theme.palette.mode]);

    useEffect(() => {
        const handleScroll = () => {
            const tocPosition = tocRef.current?.getBoundingClientRect().bottom;
            if (tocPosition < 0) {
                setShowStickyToc(true);
            } else {
                setShowStickyToc(false);
            }

            const codeBlockPosition = codeBlockRef.current?.getBoundingClientRect();
            if (codeBlockPosition) {
                const inView = codeBlockPosition.top >= 0 && codeBlockPosition.bottom <= window.innerHeight;
                setIsCodeBlockVisible(inView);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <React.Fragment>
            <PageTitle pageTitle="About This Site" />
            <Cover light={AboutThisSiteBackground} dark={AboutThisSiteBackgroundDark} dynaColor={true}>
                <Container maxWidth='md' align='center' sx={{ py: '2%' }}>
                    <Stack direction='column' sx={{ height: '100%', justifyContent: 'space-around' }}>
                        <Typography variant='h3' gutterBottom>About This Site</Typography>
                        <Paper sx={{ backgroundColor: theme.palette.background.Paper, p: '2%' }}>
                            <Typography variant="body1" align="center" sx={{ margin: '20px 0', fontWeight: 'bold' }}>
                                Just like the other projects presented throughout this site, the website itself is a project worth exploring; and this page is dedicated to just that. Throughout this page you will
                                get to explore the various pieces that make up this site and all of its capabilities. The content of this page is meant to give you an inside look into the entire process of creating
                                and managing this site. The content on this page does not have to be explored sequentially, feel free to jump around and read about anything that sounds interesting. Additionally, if
                                you have questions or suggestions, do not hesitate to reach out. You can find any necessary contact information <Link to="/contact" rel="noopener noreferrer"><u>on the contact page</u></Link>.
                                My intention for this site is to provide an equally meaningful experience for all users, regardless of their previous level of knowledge around the topics. Contacting me with questions or
                                suggestions will often provide actionable insights on improvements for the site. With that said, take a look at the table of contents below and jump in!
                            </Typography>
                        </Paper>
                    </Stack>
                </Container>
            </Cover>
            <TocSpeedDial showStickyToc={showStickyToc} actions={actions} />
            <Box align='center' sx={{ paddingTop: "2%", color: theme.palette.secondary.contrastText }}>
                <div ref={tocRef}>
                    <TableOfContents bordering={highlights} background={transitionalBg} contents={tocContent} />
                </div>
                <MotionSection id="inspiration" title="Inspiration for the Site">
                    <ContentSection id="reasoning" title="Reasoning">
                        <div ref={codeBlockRef} >
                            <AnimatedCodeBlock isVisible={isCodeBlockVisible} code={codeStringPrimary} codeType={ 'javascript' } />
                        </div>
                    </ContentSection>
                    <ContentSection id="expectation" title="Expectation">
                        <Typography>Outline your expectations from creating the portfolio.</Typography>
                    </ContentSection>
                </MotionSection>
                <MotionSection id="planning" title="Planning of the Site" icon={<TimelineIcon />} backgroundColor="#ffecb3">
                    <ContentSection id="format" title="Format">
                        <Typography>Explain why you chose a web format for your portfolio.</Typography>
                    </ContentSection>
                    <ContentSection id="goals" title="Goals">
                        <Typography>Detail the goals you aimed to achieve with the portfolio.</Typography>
                    </ContentSection>
                    <ContentSection id="content" title="Content Choices">
                        <Typography>Describe why you chose the projects/content included in the portfolio.</Typography>
                    </ContentSection>
                    <ContentSection id="process" title="Process">
                        <Typography>Discuss the planning and implementation process of the portfolio.</Typography>
                    </ContentSection>
                </MotionSection>
                <MotionSection id="frontend" title="Construction of the Site - Front End" icon={<Code />} backgroundColor="#d1c4e9">
                    <ContentSection id="feframework" title="Framework">
                        <Typography>Explain the front end frameworks you used.</Typography>
                    </ContentSection>
                    <ContentSection id="felanguage" title="Languages">
                        <Typography>Detail the front end languages you used.</Typography>
                    </ContentSection>
                    <ContentSection id="fedesign" title="Design Choices">
                        <Typography>Describe the design choices for the front end.</Typography>
                    </ContentSection>
                    <ContentSection id="fehosting" title="Hosting">
                        <Typography>Explain the hosting solution for the front end.</Typography>
                    </ContentSection>
                    <ContentSection id="fecost" title="Cost">
                        <Typography>Detail the cost considerations for the front end.</Typography>
                    </ContentSection>
                    <ContentSection id="feresources" title="Tools, Libraries, and Resources">
                        <Typography>List the tools, libraries, and resources used for the front end.</Typography>
                    </ContentSection>
                </MotionSection>
                <MotionSection id="backend" title="Construction of the Site - Back End" icon={<Build />} backgroundColor="#b2dfdb">
                    <ContentSection id="beserver" title="Server and Server Specs">
                        <Typography>Describe the server and its specifications for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="behosting" title="Hosting">
                        <Typography>Explain the hosting solution for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="becontainerization" title="Containerization">
                        <Typography>Discuss the containerization strategy for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="beframework" title="API and Frameworks">
                        <Typography>Detail the API and frameworks used for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="bedatabase" title="Databases">
                        <Typography>Describe the databases used for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="becompute" title="Compute Resources">
                        <Typography>Explain the compute resources allocated for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="benetwork" title="Network">
                        <Typography>Discuss the network setup for the back end.</Typography>
                    </ContentSection>
                    <ContentSection id="beresources" title="Tools, Libraries, and Resources">
                        <Typography>List the tools, libraries, and resources used for the back end.</Typography>
                    </ContentSection>
                </MotionSection>
                <MotionSection id="challenges" title="Challenges" icon={<TrendingUp />} backgroundColor="#ffe0b2">
                    <ChallengesTabs />
                </MotionSection>
                <MotionSection id="product" title="Final/Current Product" icon={<Computer />} backgroundColor="#c8e6c9">
                    <ContentSection id="architecture" title="System Architecture">
                        <Typography>Describe the system architecture with an architecture map.</Typography>
                    </ContentSection>
                    <ContentSection id="analytics" title="System Analytics">
                        <Typography>Provide system analytics and full system specs across the entire architecture.</Typography>
                    </ContentSection>
                    <ContentSection id="roadmap" title="Roadmap">
                        <Typography>Outline the future plans and roadmap for the website.</Typography>
                    </ContentSection>
                </MotionSection>
            </Box>
            <SiteFooter />
        </React.Fragment>
    );
};

const ChallengesTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="GPU Resources" />
                <Tab label="Networking" />
                <Tab label="Other Challenges" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Typography>Details about GPU resource challenges.</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography>Details about networking challenges.</Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography>Details about other challenges.</Typography>
            </TabPanel>
        </Box>
    );
};

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && (
            <Box>
                {children}
            </Box>
        )}
    </div>
);

export default AboutThisSitePage;
