import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Grid, Typography, Tooltip, Popover, Card, CardContent, IconButton, Container, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SkillMatrixItem from './SkillMatrixItem';
import { faGithub, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faCode, faNetworkWired, faDatabase, faChartColumn, faServer, faCodeBranch, faMobileScreen, faCloud, faShieldVirus, faGlobe, faBrain, faPaintBrush, faSitemap, faTasks, faUsers, faBullhorn, faClock, faTools } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeSvgIcon from '../utils/FontAwesomeSvgIcon';
import WebIcon from '@mui/icons-material/Web';
import { NodeIcon, AdIcon, PythonIcon, CSharpIcon, TensorFlowIcon, PyTorchIcon, CppIcon, FastApiIcon, SqlIcon, KotlinIcon, MariaDbIcon, DevOpsIcon, ReactIcon, LinuxIcon, HTML5Icon, JsIcon, AndroidIcon } from '../MatrixIcons';
import { useCurrentBreakpointInverse } from '../utils/BreakpointTracker';

const SkillsMatrix = styled(Container)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default, // Soft background color
}));

const CategoryContainer = styled(Box)(({ theme, categoryColor }) => ({
    all: 'unset',
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius, // Added rounded corners
    overflow: 'hidden', // Ensures no overflow from the inner contents
    cursor: 'pointer',
    boxShadow: theme.shadows[1], // Softer shadow for a more subtle depth effect
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease',
    background: categoryColor, // Dynamic background based on category
    // Gradient overlay for a more dynamic look
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(145deg, transparent, rgba(255,255,255,0.1))',
        transition: 'opacity 0.3s ease',
        opacity: 0,
    },

    // Hover State
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0px 8px 16px ${theme.palette.grey[500]}`,
        '&::before': {
            opacity: 1, // Reveal the gradient overlay on hover
        },
    },

    // Active State
    '&:active': {
        transform: 'scale(0.95)',
        boxShadow: `0px 5px 10px ${theme.palette.grey[800]}`, // More prominent shadow when pressed
    },

    // Focus State
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
    }
}));


const IconWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem', // Ensure icons are large and visible
    color: theme.palette.text.primary, // Use primary text color for better visibility
}));

const SkillMatrixGrid = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const inverseBreakpoint = useCurrentBreakpointInverse();
    const theme = useTheme();

    const handlePopoverOpen = (event, category) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(category);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedCategory(null);
    };

    const open = Boolean(anchorEl);

    const categories = {
        'Software Development': faCode,
        'Data & AI': faBrain,
        'Cloud & Infrastructure': faCloud,
        'Database & Security': faShieldVirus,
        'Design & User Experience': faPaintBrush,
        'Project & Team Management': faTasks,
        'Version Control & Tools': faTools,
        'Soft Skills': faUsers,
        'Software Architecture': faSitemap,
    };
    const categoryColors = {
        'Software Development': theme.palette.primary.main, // Blue
        'Data & AI': theme.palette.secondary.main, // Red
        'Cloud & Infrastructure': theme.palette.primary.main, // Light Blue
        'Database & Security': theme.palette.secondary.main, // Orange
        'Design & User Experience': theme.palette.primary.main, // Pink
        'Project & Team Management': theme.palette.secondary.main, // Purple
        'Version Control & Tools': theme.palette.primary.main, // Green
        'Soft Skills': theme.palette.secondary.main, // Amber
        'Software Architecture': theme.palette.primary.main, // Brown
    };
    const skills = {
        'Software Development': [
            { name: 'Python', level: 4, icon: PythonIcon, description: 'Used for data analysis and backend development.', years: 5, months: 8 },
            { name: 'JavaScript', level: 3, icon: JsIcon, description: 'Experienced in building web applications.', years: 2, months: 0 },
            { name: 'C#', level: 3, icon: CSharpIcon, description: 'Used in .NET Core Razor-based applications.', years: 1, months: 3 },
            { name: 'C++', level: 3, icon: CppIcon, description: 'Applied in various university projects.', years: 0, months: 6 },
            { name: 'Kotlin', level: 2, icon: KotlinIcon, description: 'Used in Android application development.', years: 0, months: 5 },
            { name: 'React', level: 4, icon: ReactIcon, description: 'Built multiple front-end projects.', years: 1, months: 0 },
            { name: 'Node.js', level: 3, icon: NodeIcon, description: 'Used for server-side scripting and APIs.', years: 1, months: 0 },
        ],
        'Data & AI': [
            { name: 'TensorFlow', level: 3, icon: TensorFlowIcon, description: 'Applied in machine learning projects.', years: 3, months: 1 },
            { name: 'PyTorch', level: 4, icon: PyTorchIcon, description: 'Used in deep learning models.', years: 3, months: 1 },
            { name: 'Machine Learning', level: 3, icon: faBrain, description: 'Developed predictive models and algorithms.', years: 3, months: 1 },
        ],
        'Cloud & Infrastructure': [
            { name: 'AWS', level: 2, icon: faCloud, description: 'Managed cloud infrastructure and services.', years: 0, months: 2 },
            { name: 'Azure', level: 3, icon: faCloud, description: 'Deployed applications and managed services.', years: 2, months: 2 },
            { name: 'DevOps', level: 3, icon: DevOpsIcon, description: 'Applied DevOps practices in project deployments.', years: 0, months: 5 },
        ],
        'Database & Security': [
            { name: 'SQL', level: 4, icon: SqlIcon, description: 'Experienced in managing and optimizing databases.', years: 5, months: 8  },
            { name: 'MariaDB', level: 3, icon: MariaDbIcon, description: 'Utilized in various projects for data storage.', years: 3, months: 0 },
            { name: 'Security Protocols', level: 2, icon: faShieldVirus, description: 'Implemented and maintained security measures.', years: 0, months: 6 },
            { name: 'Penetration Testing', level: 1, icon: faShieldVirus, description: 'Conducted vulnerability and security assessments.', years: 0, months: 2 },
        ],
        'Design & User Experience': [
            { name: 'Figma', level: 3, icon: faPaintBrush, description: 'Designed UI prototypes and wireframes.', years: 1, months: 6 },
        ],
        'Project & Team Management': [
            { name: 'Agile Methodologies', level: 3, icon: faTasks, description: 'Led project teams using Agile practices to deliver timely results.', years: 2, months: 8 },
            { name: 'Scrum', level: 3, icon: faTasks, description: 'Managed projects and coordinated team efforts in a Scrum framework.', years: 2, months: 8 },
        ],
        'Version Control & Tools': [
            { name: 'Github', level: 4, icon: faGithub, description: 'Utilized for project version control and collaboration.', syears: 4, months: 0 },
            { name: 'Linux', level: 4, icon: LinuxIcon, description: 'Regular use in software development and testing.', years: 3, months: 6 },
            { name: 'Android Studio', level: 3, icon: AndroidIcon, description: 'Used for mobile app development.', years: 0, months: 8 },
        ],
        'Soft Skills': [
            { name: 'Communication', level: 5, icon: faBullhorn, description: 'Expert at verbal and written communication, with strong presentation skills.', years: 8, months: 4 },
            { name: 'Time Management', level: 4, icon: faClock, description: 'Efficient in managing time to prioritize and complete tasks within deadlines. Continuous area of improvement', years: 5, months: 8 },
            { name: 'Leadership', level: 4, icon: faUsers, description: 'Skilled at leading teams towards achieving organizational goals, fostering teamwork and growth.', years: 3, months: 2},
            { name: 'Problem Solving', level: 4, icon: faTasks, description: 'Proficient at identifying problems and brainstorming potential solutions.', years: 5, months: 8 },
        ],
        'Software Architecture': [
            { name: 'Microservices', level: 3, icon: faSitemap, description: 'Designed and implemented microservice architectures.', years: 0, months: 4 },
            { name: 'API Design', level: 4, icon: faSitemap, description: 'Developed robust and scalable APIs for various applications.', years: 4 , months: 3 },
        ],
    };

    return (
        <SkillsMatrix maxWidth='sm'>
            <Grid container spacing={1}>
                {Object.entries(categories).map(([category, icon]) => (
                    <Grid item xs={4} key={category}>
                        <Tooltip title={category} placement="top">
                            <CategoryContainer categoryColor={categoryColors[category]} onClick={(e) => handlePopoverOpen(e, category)} > {/*sx={{ borderWidth: { 'xs': '2px', 'sm': '3px', 'md': '4px', 'lg': '5px', 'xl': '6px' } } }*/}
                                <IconWrapper>
                                    <FontAwesomeSvgIcon icon={icon} style={{ maxHeight: '25%', maxWidth:'25%', width:'100%', height:'100%' }} />
                                </IconWrapper>
                            </CategoryContainer>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <IconButton aria-label="close" onClick={handlePopoverClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            {selectedCategory}
                        </Typography>
                        {selectedCategory && skills[selectedCategory].map((skill) => (
                            <SkillMatrixItem key={skill.name} skill={skill} />
                        ))}
                    </CardContent>
                </Card>
            </Popover>
        </SkillsMatrix>
    );
};


export default SkillMatrixGrid;
