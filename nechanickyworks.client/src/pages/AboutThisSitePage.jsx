import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Collapse, Fab, Zoom, Tooltip, tooltipClasses, Backdrop, SpeedDial, SpeedDialAction, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Box, Paper, useTheme, List, ListItem, ListItemText, Stack, ListItemButton, alpha, Link as Mlink, Card, CardContent, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import PageTitle from '../components/Shared/PageTitle';
import Cover from '../components/Display/Cover';
import AboutThisSiteBackground from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackground.webp";
import AboutThisSiteBackgroundDark from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackgroundDark.webp";
import SiteFooter from '../components/Shared/Footer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TocIcon from '@mui/icons-material/Toc';
import PanoramaIcon from '@mui/icons-material/Panorama';
import StorageIcon from '@mui/icons-material/Storage';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import HubIcon from '@mui/icons-material/Hub';
import ShortcutIcon from '@mui/icons-material/Shortcut';

const ContentBox = styled(Box)({
    margin: '20px 0',
});

const TocLink = styled(Mlink)({
    color: 'inherit',
    '&:hover': {
        textDecoration: 'underline !important'
    }
});

const StyledCard = styled(Card)({
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
});

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
});

const AboutThisSitePage = () => {
    const theme = useTheme();
    const [highlights, setHighlights] = useState(theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5));
    const [transitionalBg, setTransitionalBg] = useState(theme.palette.background.Paper);
    const [showStickyToc, setShowStickyToc] = useState(false);
    const tocRef = useRef(null);

    useEffect(() => {
        setHighlights((prevState) => {
            const newColor = theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.5) : alpha(theme.palette.common.black, 0.5);
            return newColor;
        });
        setTransitionalBg(theme.palette.background.Paper);
    }, [theme.palette.mode]);

    useEffect(() => {
        const handleScroll = () => {
            const tocPosition = tocRef.current?.getBoundingClientRect().bottom;
            if (tocPosition < 0) {
                setShowStickyToc(true);
            } else {
                setShowStickyToc(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
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
            <StickyToc showStickyToc={showStickyToc} />
            <Container maxWidth="xl" align='center' sx={{ paddingTop: "2%", color: theme.palette.secondary.contrastText }}>
                <div ref={tocRef}>
                    <TableOfContents bordering={highlights} background={transitionalBg} />
                </div>
                <Section id="inspiration" title="Inspiration for the Site" icon={<MenuBookIcon />} backgroundColor="#f0f4c3">
                    <SubSection id="reasoning" title="Reasoning">
                        <Typography>Explain the reasoning behind creating the portfolio.</Typography>
                    </SubSection>
                    <SubSection id="expectation" title="Expectation">
                        <Typography>Outline your expectations from creating the portfolio.</Typography>
                    </SubSection>
                </Section>
                <Section id="planning" title="Planning of the Site" icon={<TimelineIcon />} backgroundColor="#ffecb3">
                    <SubSection id="format" title="Format">
                        <Typography>Explain why you chose a web format for your portfolio.</Typography>
                    </SubSection>
                    <SubSection id="goals" title="Goals">
                        <Typography>Detail the goals you aimed to achieve with the portfolio.</Typography>
                    </SubSection>
                    <SubSection id="content" title="Content Choices">
                        <Typography>Describe why you chose the projects/content included in the portfolio.</Typography>
                    </SubSection>
                    <SubSection id="process" title="Process">
                        <Typography>Discuss the planning and implementation process of the portfolio.</Typography>
                    </SubSection>
                </Section>
                <Section id="frontend" title="Construction of the Site - Front End" icon={<CodeIcon />} backgroundColor="#d1c4e9">
                    <SubSection id="feframework" title="Framework">
                        <Typography>Explain the front end frameworks you used.</Typography>
                    </SubSection>
                    <SubSection id="felanguage" title="Languages">
                        <Typography>Detail the front end languages you used.</Typography>
                    </SubSection>
                    <SubSection id="fedesign" title="Design Choices">
                        <Typography>Describe the design choices for the front end.</Typography>
                    </SubSection>
                    <SubSection id="fehosting" title="Hosting">
                        <Typography>Explain the hosting solution for the front end.</Typography>
                    </SubSection>
                    <SubSection id="fecost" title="Cost">
                        <Typography>Detail the cost considerations for the front end.</Typography>
                    </SubSection>
                    <SubSection id="feresources" title="Tools, Libraries, and Resources">
                        <Typography>List the tools, libraries, and resources used for the front end.</Typography>
                    </SubSection>
                </Section>
                <Section id="backend" title="Construction of the Site - Back End" icon={<BuildIcon />} backgroundColor="#b2dfdb">
                    <SubSection id="beserver" title="Server and Server Specs">
                        <Typography>Describe the server and its specifications for the back end.</Typography>
                    </SubSection>
                    <SubSection id="behosting" title="Hosting">
                        <Typography>Explain the hosting solution for the back end.</Typography>
                    </SubSection>
                    <SubSection id="becontainerization" title="Containerization">
                        <Typography>Discuss the containerization strategy for the back end.</Typography>
                    </SubSection>
                    <SubSection id="beframework" title="API and Frameworks">
                        <Typography>Detail the API and frameworks used for the back end.</Typography>
                    </SubSection>
                    <SubSection id="bedatabase" title="Databases">
                        <Typography>Describe the databases used for the back end.</Typography>
                    </SubSection>
                    <SubSection id="becompute" title="Compute Resources">
                        <Typography>Explain the compute resources allocated for the back end.</Typography>
                    </SubSection>
                    <SubSection id="benetwork" title="Network">
                        <Typography>Discuss the network setup for the back end.</Typography>
                    </SubSection>
                    <SubSection id="beresources" title="Tools, Libraries, and Resources">
                        <Typography>List the tools, libraries, and resources used for the back end.</Typography>
                    </SubSection>
                </Section>
                <Section id="challenges" title="Challenges" icon={<TrendingUpIcon />} backgroundColor="#ffe0b2">
                    <ChallengesTabs />
                </Section>
                <Section id="product" title="Final/Current Product" icon={<ComputerIcon />} backgroundColor="#c8e6c9">
                    <SubSection id="architecture" title="System Architecture">
                        <Typography>Describe the system architecture with an architecture map.</Typography>
                    </SubSection>
                    <SubSection id="analytics" title="System Analytics">
                        <Typography>Provide system analytics and full system specs across the entire architecture.</Typography>
                    </SubSection>
                    <SubSection id="roadmap" title="Roadmap">
                        <Typography>Outline the future plans and roadmap for the website.</Typography>
                    </SubSection>
                </Section>
            </Container>
            <SiteFooter />
        </React.Fragment>
    );
};

const Section = ({ id, title, children, icon, backgroundColor }) => (
    <ContentBox id={id} sx={{ backgroundColor: backgroundColor, borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
        <StyledCard>
            <StyledCardContent>
                <IconButton sx={{ marginRight: '16px' }}>
                    {icon}
                </IconButton>
                <Typography variant="h4" gutterBottom>{title}</Typography>
            </StyledCardContent>
            <CardContent>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </StyledCard>
    </ContentBox>
);

const SubSection = ({ id, title, children }) => (
    <Accordion sx={{ marginBottom: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
);

const AccordionSection = ({ title, children }) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
);

const AccordionDetailsContent = () => (
    <Box>
        <Typography>Details about frameworks, languages, design concepts, etc.</Typography>
    </Box>
);

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

const Timeline = () => (
    <Box>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Milestone 1</Typography>
            <Typography>Date and description of the milestone.</Typography>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Milestone 2</Typography>
            <Typography>Date and description of the milestone.</Typography>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Milestone 3</Typography>
            <Typography>Date and description of the milestone.</Typography>
        </Paper>
    </Box>
);

const TableOfContents = ({ bordering, background }) => (
    <Container maxWidth="sm">
        <Paper elevation={2} sx={{ border: `3px groove ${bordering}`, boxShadow: 'none', py: '2%', backgroundColor: background }}>
            <Typography variant="h4"><u>Table of Contents</u></Typography>
            <Box sx={{ width: '100%' }} >
                <List dense={true} sx={{ marginLeft: '10%', paddingRight: '10%' }}>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Inspiration for the Site" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#reasoning">
                            <ListItemText inset primary="Reasoning" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#expectation">
                            <ListItemText inset primary="Expectation" />
                        </ListItemButton>
                    </List>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Planning of the Site" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#format">
                            <ListItemText inset primary="Format" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#goals">
                            <ListItemText inset primary="Goals" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#content">
                            <ListItemText inset primary="Content Choices" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#process">
                            <ListItemText inset primary="Process" />
                        </ListItemButton>
                    </List>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Construction of the Site - Front End" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#feframework">
                            <ListItemText inset primary="Framework" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#felanguage">
                            <ListItemText inset primary="Languages" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#fedesign">
                            <ListItemText inset primary="Design Choices" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#fehosting">
                            <ListItemText inset primary="Hosting" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#fecost">
                            <ListItemText inset primary="Cost" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#feresources">
                            <ListItemText inset primary="Tools, Libraries, and Resources" />
                        </ListItemButton>
                    </List>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Construction of the Site - Back End" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#beserver">
                            <ListItemText inset primary="Server and Server Specs" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#behosting">
                            <ListItemText inset primary="Hosting" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#becontainerization">
                            <ListItemText inset primary="Containerization" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#beframework">
                            <ListItemText inset primary="API and Frameworks" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#bedatabase">
                            <ListItemText inset primary="Databases" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#becompute">
                            <ListItemText inset primary="Compute Resources" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#benetwork">
                            <ListItemText inset primary="Network" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#beresources">
                            <ListItemText inset primary="Tools, Libraries, and Resources" />
                        </ListItemButton>
                    </List>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Challenges" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#affordability">
                            <ListItemText inset primary="Affordability" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#networking">
                            <ListItemText inset primary="Networking" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#allocation">
                            <ListItemText inset primary="Resource Allocation" />
                        </ListItemButton>
                    </List>
                    <ListItem sx={{ display: 'list-item', listStyleType: 'circle' }}>
                        <ListItemText primary="Final/Current Product" sx={{ fontStyle: 'italic' }} />
                    </ListItem>
                    <List component="div" disablePadding dense={true}>
                        <ListItemButton component={TocLink} underline='hover' href="#architecture">
                            <ListItemText inset primary="System Architecture" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#analytics">
                            <ListItemText inset primary="System Analytics" />
                        </ListItemButton>
                        <ListItemButton component={TocLink} underline='hover' href="#roadmap">
                            <ListItemText inset primary="Roadmap" />
                        </ListItemButton>
                    </List>
                </List>
            </Box>
        </Paper>
    </Container>
);

const actions = [
    { icon: <EmojiObjectsIcon />, name: 'Inspiration', link: '#inspiration' },
    { icon: <DeveloperBoardIcon />, name: 'Planning', link: '#planning' },
    { icon: <PanoramaIcon />, name: 'Front End', link: '#frontend' },
    { icon: <StorageIcon />, name: 'Back End', link: '#backend' },
    { icon: <TroubleshootIcon />, name: 'Challenges', link: '#challenges' },
    { icon: <HubIcon />, name: 'Final Product', link: '#product' },
];

function CustomFabContent({ icon, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
            <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
    );
}

const StickyToc = ({ showStickyToc }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
            <Zoom in={showStickyToc}>
        <Box sx={{ position: 'fixed', top: 0, left: 0, transform: 'translateZ(0px)', width: '100vw', height: '100vh', zIndex: 10 }}>
            <Backdrop open={open} onClick={handleClose} />

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', top: theme.spacing(2), left: theme.spacing(2), marginTop: '64px' }}
                FabProps={{ sx: { position: 'relative', maxWidth: '56px', alignSelf: 'start' }, color: 'secondary' }}
                icon={<TocIcon />}
                onOpen={handleOpen}
                onClose={handleClose}
                open={open}
                direction='down'
            >
                {open && actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        onClick={handleClose}
                        icon={<CustomFabContent icon={action.icon} text={action.name} />}
                        FabProps={{ variant: 'extended', href: action.link }}
                    />
                ))}
                </SpeedDial>

            </Box>
            </Zoom>
    );
};
export default AboutThisSitePage;
