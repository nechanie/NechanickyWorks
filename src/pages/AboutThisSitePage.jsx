import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Paper, useTheme, Stack, alpha } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Code, Build, Computer, TrendingUp, Timeline as TimelineIcon } from '@mui/icons-material';
import PageTitle from '../components/Shared/PageTitle';
import Cover from '../components/Display/Cover';
import AboutThisSiteBackground from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackground.webp";
import AboutThisSiteBackgroundDark from "../assets/imgs/backgrounds/AboutThisSite/AboutThisSiteBackgroundDark.webp";
import BackEndSectionLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/BackEndSectionLight.webp";
import BackEndSectionDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/BackEndSectionDark.webp";
import FrontEndSectionLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/FrontEndSectionLight.webp";
import FrontEndSectionDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/FrontEndSectionDark.webp";
import InspirationSectionLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/InspirationSectionLight.webp";
import InspirationSectionDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/InspirationSectionDark.webp";
import PlanningSectionLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/PlanningSectionLight.webp";
import PlanningSectionDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/PlanningSectionDark.webp";
import ReasoningLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/ReasoningLight.webp";
import ReasoningDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/ReasoningDark.webp";
import GoalsLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/GoalsLight.webp";
import GoalsDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/GoalsDark.webp";
import ContentLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/ContentLight.webp";
import ContentDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/ContentDark.webp";
import ProcessLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/ProcessLight.webp";
import ProcessDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/ProcessDark.webp";
import FormatLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/FormatLight.webp";
import FormatDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/FormatDark.webp";
import FeFrameworkLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/FeFrameworkLight.webp";
import FeFrameworkDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/FeFrameworkDark.webp";
import PlaceholderLight from "../assets/imgs/backgrounds/AboutThisSite/Sections/PlaceholderLight.webp";
import PlaceholderDark from "../assets/imgs/backgrounds/AboutThisSite/Sections/PlaceholderDark.webp";

import SiteFooter from '../components/Shared/Footer';
import AboutThisSiteSection, { AboutThisSiteSectionContentItem } from '../components/ContentSection';
import ChallengesTabs from '../components/Display/ChallengeTabs';
import Radial, { RadialContentItem } from '../components/Custom/Radial';

const Section = styled(AboutThisSiteSection)({
    minHeight: 'fit-content'
});


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
            setShowStickyToc(tocPosition < 0);

            const codeBlockPosition = codeBlockRef.current?.getBoundingClientRect();
            if (codeBlockPosition) {
                const inView = codeBlockPosition.top >= 0 && codeBlockPosition.bottom <= window.innerHeight;
                setIsCodeBlockVisible(inView);
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
            {/*<TocSpeedDial showStickyToc={showStickyToc} actions={AboutThisSiteActions} />*/}
            <Box align='center' sx={{ paddingTop: "2%", paddingBottom: "2%", color: theme.palette.secondary.contrastText }}>
                <Container maxWidth="lg">
                    
                    <Stack direction="column" spacing={9} useFlexGap >
                        <div ref={tocRef}>
                            {/*<TableOfContents bordering={highlights} background={transitionalBg} contents={AboutThisSiteTocContent} />*/}
                        </div>
                        <Section id="inspiration" title="Inspiration for the Site" spacing={3} images={{ light: InspirationSectionLight, dark: InspirationSectionDark }} >
                            <AboutThisSiteSectionContentItem id="reasoning" title="Reasoning" images={{light: ReasoningLight, dark: ReasoningDark}}>
                                <div ref={codeBlockRef} >
                                    {/*<AnimatedCodeBlock isVisible={isCodeBlockVisible} code={AboutThisSiteCodePrimary} codeType={ 'javascript' } />*/}
                                    <Typography>
                                        After graduating with my bachelor's in computer science from Oregon State University, I wanted to create a platform to publicly
                                        display the different projects that I have worked on during my time in school as well as professionally. This platform serves as a
                                        showcase for previous and future projects, allowing me to document and share my journey in the field. The primary expectation for the
                                        site is to function as a portfolio that displays my projects and experiences, offering insights into who I am and what I have done. Additionally,
                                        I envision this platform serving an educational role, not only showcasing my projects but also enabling people to learn from them and become more
                                        informed about the technologies utilized.
                                    </Typography>
                                </div>
                            </AboutThisSiteSectionContentItem>
                        </Section>
                        <Section id="planning" title="Planning of the Site" spacing={3} images={{ light: PlanningSectionLight, dark: PlanningSectionDark }} ltr={false}>
                            <AboutThisSiteSectionContentItem id="format" title="Format" images={{ light: FormatLight, dark: FormatDark }}>
                                <Typography>
                                    From the outset, I knew I wanted to create a website to expose this platform. Choosing a web format gave
                                    me full control over how people interact with and experience the content. Utilizing a web format also simplified
                                    the process of making the platform public, allowing for an incremental release structure. This enabled me to make
                                    the platform available for use as soon as possible while continuously adding and updating content.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="goals" title="Goals" images={{ light: GoalsLight, dark: GoalsDark }}>
                                <div style={{ width: '100%', height: '100%', border: `1px solid ${theme.palette.primary.contrastText}`, marginInline: 'auto' }}>
                                    <Radial color={ theme.palette.accent.secondary }>
                                        <RadialContentItem title='Content' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            My goal for the content of this site has been to include things that can be educational and interactive. I aimed for the content to be visually stimulating where possible to reduce level of intimidation stemming from the advanced nature of some of the topics.
                                        </RadialContentItem>
                                        <RadialContentItem title='Design' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            My goal for the design of this site has been to provide a semi-guided structure to facilitate basic understanding of the content while still leaving room for people to have their own unique experiences while exploring.
                                        </RadialContentItem>
                                    </Radial>
                                </div>
                                {/*<Typography>*/}
                                {/*    The goals for the site included making the project content educational and interactive, providing*/}
                                {/*    users with unique experiences that mirror my own when working on these projects. I aimed for the*/}
                                {/*    content to be visually stimulating to entice users to keep exploring. The site was designed to be*/}
                                {/*    semi-guided, allowing each user to have a personalized experience.*/}
                                {/*</Typography>*/}
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="content" title="Content Choices" images={{ light: ContentLight, dark: ContentDark }}>
                                <Typography>
                                    For the initial development, I chose projects based on how well they aligned with my goals and career
                                    aspirations of working primarily on machine learning technologies. This included a combination of advanced
                                    machine learning projects and a few web development projects from my time at ATI Materials. Additional projects,
                                    such as a mobile development project and a programmatic mathematical analysis project (Gaussian quadrature for
                                    integrating polynomials), were included to expand the content.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="process" title="Process" images={{ light: ProcessLight, dark: ProcessDark }}>
                                <Typography>
                                    The project development process followed an agile methodology, implementing incremental design practices, code-first
                                    development, and later, some test-driven design practices. Each page and feature were designed and developed with user
                                    stories and scenarios, following a standard sprint-focused development lifecycle.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                        </Section>
                        <Section id="frontend" title="Construction of the Site - Front End" spacing={3} images={{ light: FrontEndSectionLight, dark: FrontEndSectionDark }}>
                            <AboutThisSiteSectionContentItem id="feframework" title="Framework" images={{ light: FeFrameworkLight, dark: FeFrameworkDark }}>
                                <Typography>
                                    I chose to use a React-based front end due to its widespread use and standardization in web development. Additionally,
                                    integrating the Vite framework allowed for seamless integration with React and .NET Core runtime, which serves as the backend
                                    support for the website.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="felanguage" title="Languages" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <div style={{ width: '100%', height: '100%', border: `1px solid ${theme.palette.primary.contrastText}`, marginInline: 'auto' }}>
                                    <Radial color={theme.palette.accent.secondary}>
                                        <RadialContentItem title='HTML' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            Everything visible component on this website has been constructed or derived directly from the use of HTML. While this is very standard, it is worth acknowledging as a critical language in the front-end construction. 
                                        </RadialContentItem>
                                        <RadialContentItem title='CSS' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            The CSS is a bit more abstracted compared to the HTML portion of the front end. Due to a combination of the framework and libraries I used, there is a significant amount of css
                                            styling in place, but most of the custom defined CSS throughout the site is tied to either animations or visual fine-tuning. 
                                        </RadialContentItem>
                                        <RadialContentItem title='Javascript' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            Javascript plays a big part in the front end of this website due to the framework I used, i.e. React. Nearly every part of this site uses javascript to some degree. There are a hand full of
                                            items that do not, but those are very few. 
                                        </RadialContentItem>
                                    </Radial>
                                </div>
                                {/*<Typography>*/}
                                {/*    The front end utilized a mixture of HTML, CSS, JavaScript, and C#.*/}
                                {/*</Typography>*/}
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="fedesign" title="Design Choices" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    My design choices were initially focused on creating a
                                    functional interface, with plans to expand on UX/UI design concepts later. I adopted Material UI standards for the base design,
                                    providing a standardized structure with a modern aesthetic.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="fehosting" title="Hosting" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The core web application is hosted as a web app service through Microsoft Azure cloud services. Hosting the front end on Azure
                                    ensured dependable service and minimized the need for additional focus on ensuring consistent accessibility through custom hosting.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="fecost" title="Cost" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The overall cost of the front end was limited to the hosting costs on Azure
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="feresources" title="Tools, Libraries, and Resources" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <div style={{ width: '100%', height: '100%', border: `1px solid ${theme.palette.primary.contrastText}`, marginInline: 'auto' }}>
                                    <Radial color={theme.palette.accent.secondary}>
                                        <RadialContentItem title='React' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            The front end framework used to create this website is React. This has been outlined in the framework section as well, but since React is such a core part part of
                                            the application and is also a library, it is definitely worth mentioning on its own. 
                                        </RadialContentItem>
                                        <RadialContentItem title='Vite' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            Vite has been integrated into the front end application as the primary built tool. This tool is responsible for building the source into the running web application.
                                        </RadialContentItem>
                                        <RadialContentItem title='Visual Studio Community 2022' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            Visual Studio Community 2022 was the primary IDE used in the development of this website. The initial creation of the project was done through the provided React + .Net Core
                                            template offered in Visual Studio Code. This template generated a basic scaffolding of folders and configuration files for the site. Nearly all of the template content has been
                                            replaced with the exception of the linting configuration files and other config files, which have simply been added to. 
                                        </RadialContentItem>
                                        <RadialContentItem title='Open Source Libs' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            A list of the libraries used in the front end of this site can be seen below, with the library name, version, and primary role:
                                            <ul>
                                                <li>@emotion/react - 11.11.4 -> Base CSS styling for MUI components.</li>
                                                <li>@emotion/styled - 11.11.5 -> Custom CSS overrides for MUI components</li>
                                                <li>@fortawesome/fontawesome - 6.5.2 -> Access to various icons from the fortawesome library.</li>
                                                <li>@mui/icons-material: ^5.15.15 -> Provides easy access to various icons from the Material library.</li>
                                                <li>@mui/lab - 5.0.0-alpha.170 -> Extra components from the Material UI library for special use cases.</li>
                                                <li>@mui/material - 5.15.12 -> Core design library facilitating standard component architecture across the site.</li>
                                                <li>@mui/x-charts - 7.3.0 -> Used to create the charts that display demo data. </li>
                                                <li>@react-google-maps/api - 2.19.3 -> Used to integrate a google maps view in contact page.</li>
                                                <li>axios - 1.6.8 -> Used to make API calls to the backend.</li>
                                                <li>framer-motion - 11.2.6 -> Applies smooth orchestration of animations.</li>
                                                <li>katex - 0.16.10 -> Used to apply LaTeX formatting for things like math equations</li>
                                                <li>react - 18.2.0 -> Base react library.</li>
                                                <li>react-router-dom - 6.22.2 -> Facilitates routing for multipaged site.</li>
                                                <li>react-slick - 0.30.2 -> Carousel component support.</li>
                                                <li>react-use-websocket - 4.8.1 -> Websockets used to facilitate live responses in demos.</li>
                                            </ul>
                                        </RadialContentItem>
                                        <RadialContentItem title='Figma' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            When necessary, I used Figma to wireframe and design custom components and pages. This tool was especially useful in the construction of components that required multiple layers, for which the wireframe provided
                                            a clear component hierarchy for each layer.
                                        </RadialContentItem>
                                        <RadialContentItem title='Material UI' style={{ width: '100%', height: '100%', backgroundColor: theme.palette.surfaceSecondary.main, textAlign: 'center' }}>
                                            While Material UI is technically a library and design standard used in the front end of the application, I felt that it deserved its own spot as a primary resource in the front end development. 
                                            The material UI library has been used extensively across the entire application to create a standardized UI design, which helped keep the look and feel of the application consistent across all pages and 
                                            components. The material UI library also plays a key role in the thematic colors presented across the application, facilitating easy integration of both light and dark mode themes.
                                        </RadialContentItem>
                                    </Radial>
                                </div>
                                {/*<Typography>*/}
                                {/*    Development was done in Visual Studio Community 2022, using frameworks such as React, Vite, and .NET Core. Source control was managed*/}
                                {/*    through GitHub. Libraries and packages included:*/}
                                {/*</Typography>*/}
                            </AboutThisSiteSectionContentItem>
                        </Section>
                        <Section id="backend" title="Construction of the Site - Back End" spacing={3} images={{ light: BackEndSectionLight, dark: BackEndSectionDark }} ltr={false}>
                            <AboutThisSiteSectionContentItem id="beserver" title="Server and Server Specs" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The primary backend server for the web application's functionalities is a custom-made server housed in my home, which I built myself with the following specifications:
                                    GPU: Nvidia RTX 3080 Ti
                                    CPU: Ryzen 9 5950x
                                    RAM: 32GB
                                    OS: Ubuntu Server LTS
                                    Software Layer: Nginx, Python, Docker, Redis, PostGres, MiniConda
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="behosting" title="Hosting" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The backend is entirely hosted on this custom server, which hosts various APIs and databases containerized within Docker. This setup allows the backend to handle
                                    computationally intensive tasks, enabling users to run complex compute tasks without needing a machine that supports them explicitly.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="becontainerization" title="Containerization" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    All backend components are containerized through Docker, except for the global network and traffic routing mechanisms. These instances include the
                                    databases used by the interactive projects on the website and the project runtime APIs for computational tasks.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="beframework" title="API and Frameworks" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    A primary API created using Python FastAPI with Uvicorn acts as the communication bridge between the interactive projects and the backend execution. This API manages
                                    the exchange of information, handles resource queues for the GPU, and ensures efficient resource allocation.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="bedatabase" title="Databases" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    Redis facilitates shared memory between multiple processes, and a Postgres database supports backend storage for several interactive projects. 
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="becompute" title="Compute Resources" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    Given the GPU-intensive nature of machine learning tasks, I implemented a multifaceted queuing system to manage GPU resources efficiently.
                                    This system ensures that each user can run GPU-based tasks without significant delays and that resources are distributed fairly across users.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="beresources" title="Tools, Libraries, and Resources" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>List the tools, libraries, and resources used for the back end.</Typography>
                            </AboutThisSiteSectionContentItem>
                        </Section>
                        <Section id="challenges" title="Challenges" spacing={3}>
                            <ChallengesTabs />
                        </Section>
                        <Section id="product" title="Final/Current Product" spacing={3}>
                            <AboutThisSiteSectionContentItem id="architecture" title="System Architecture" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The system architecture includes a React-based front end hosted on Azure, a custom-built backend server hosting containerized services,
                                    and a robust API for communication and resource management. The architecture is designed to support complex compute tasks, provide educational
                                    content, and offer interactive experiences to users.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="analytics" title="System Analytics" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The system includes analytics to monitor user interactions, track resource usage, and ensure efficient performance. These analytics help identify
                                    areas for improvement and guide future development efforts.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                            <AboutThisSiteSectionContentItem id="roadmap" title="Roadmap" images={{ light: PlaceholderLight, dark: PlaceholderDark }}>
                                <Typography>
                                    The current roadmap includes completing the remaining core project pages, redesigning project layouts for better educational value, and introducing more
                                    visual aids such as diagrams, images, and video walkthroughs. The goal is to make the content easier to digest and more engaging for users.
                                </Typography>
                            </AboutThisSiteSectionContentItem>
                        </Section>
                    </Stack>
                </Container>
            </Box>
            <SiteFooter />
        </React.Fragment>
    );
};


export default AboutThisSitePage;
