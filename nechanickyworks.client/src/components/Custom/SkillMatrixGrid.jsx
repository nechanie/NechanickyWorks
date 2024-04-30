import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Grid, Typography, Tooltip, Popover, Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SkillMatrixItem from './SkillMatrixItem';
import { faGithub, faWindows } from '@fortawesome/free-brands-svg-icons';
import { faCode, faNetworkWired, faDatabase, faChartColumn, faServer, faCodeBranch, faMobileScreen, faCloud, faShieldVirus, faGlobe, faBrain, faPaintBrush, faSitemap, faTasks, faUsers, faBullhorn, faClock } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeSvgIcon from '../utils/FontAwesomeSvgIcon';
import WebIcon from '@mui/icons-material/Web';
import { NodeIcon, AdIcon, PythonIcon, CSharpIcon, TensorFlowIcon, PyTorchIcon, CppIcon, FastApiIcon, SqlIcon, KotlinIcon, MariaDbIcon, DevOpsIcon, ReactIcon, LinuxIcon, HTML5Icon, JsIcon, AndroidIcon } from '../MatrixIcons';


const SkillsMatrix = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
}));

const CategoryContainer = styled(Box)(({ theme }) => ({
    width: theme.spacing(10), // control the size of the tiles
    height: theme.spacing(10), // makes the tile square
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.action.hover, // hover effect
    }
}));


const SkillMatrixGrid = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
        'Programming Languages': faCode,
        'Web Development': WebIcon,
        'Data Science & Machine Learning': faChartColumn,
        'Backend Development': faServer,
        'Database Management': faDatabase,
        'Operating Systems & Tools': faWindows,
        'Version Control': faCodeBranch,
        'Networking & Infrastructure': faNetworkWired,
        'Mobile Development': faMobileScreen,
        'Cloud Computing': faCloud,
        'Cybersecurity': faShieldVirus,
        'Internet of Things (IoT)': faGlobe,
        'Artificial Intelligence': faBrain,
        'User Interface / User Experience (UI/UX)': faPaintBrush,
        'Software Architecture': faSitemap,
        'Project Management': faTasks,
    };

    const skills = {
        'Programming Languages': [
            { name: 'Python', level: 4, icon: PythonIcon, description: 'Used for data analysis and backend development.', startDate: "2019-07-01" },
            { name: 'JavaScript', level: 4, icon: JsIcon, description: 'Experienced in building web applications.', startDate: "2020-01-01" },
            { name: 'C#', level: 3, icon: CSharpIcon, description: 'Used in .NET Core Razor-based applications.', startDate: "2019-04-01" },
            { name: 'C++', level: 3, icon: CppIcon, description: 'Applied in various university projects.', startDate: "2019-01-01" },
            { name: 'Kotlin', level: 2, icon: KotlinIcon, description: 'Used in Android application development.', startDate: "2021-01-01" },
        ],
        'Web Development': [
            { name: 'React', level: 4, icon: ReactIcon, description: 'Built multiple front-end projects.', startDate: "2022-02-01" },
            { name: 'HTML/JavaScript', level: 4, icon: HTML5Icon, description: 'Used for creating interactive web pages.', startDate: "2020-01-01" },
        ],
        'Data Science & Machine Learning': [
            { name: 'TensorFlow', level: 3, icon: TensorFlowIcon, description: 'Applied in machine learning projects.', startDate: "2021-06-01" },
            { name: 'PyTorch', level: 4, icon: PyTorchIcon, description: 'Used in deep learning models.', startDate: "2022-01-01" },
        ],
        'Backend Development': [
            { name: 'Node.js', level: 3, icon: NodeIcon, description: 'Used for server-side scripting and APIs.', startDate: "2022-04-01" },
            { name: 'FastAPI', level: 3, icon: FastApiIcon, description: 'Designed RESTful APIs for internal tools.', startDate: "2022-05-01" },
        ],
        'Database Management': [
            { name: 'SQL', level: 4, icon: SqlIcon, description: 'Experienced in managing and optimizing databases.', startDate: "2019-04-01" },
            { name: 'MariaDB', level: 3, icon: MariaDbIcon, description: 'Utilized in various projects for data storage.', startDate: "2020-05-01" },
        ],
        'Operating Systems & Tools': [
            { name: 'Linux', level: 4, icon: LinuxIcon, description: 'Regular use in software development and testing.', startDate: "2019-01-01" },
            { name: 'Android Studio', level: 3, icon: AndroidIcon, description: 'Used for mobile app development.', startDate: "2021-01-01" },
        ],
        'Version Control': [
            { name: 'Github', level: 4, icon: faGithub, description: 'Utilized for project version control and collaboration.', startDate: "2019-01-01" },
        ],
        'Networking & Infrastructure': [
            { name: 'DevOps', level: 3, icon: DevOpsIcon, description: 'Applied DevOps practices in project deployments.', startDate: "2021-08-01" },
            { name: 'Active Directory', level: 2, icon: AdIcon, description: 'Managed user access and security settings.', startDate: "2021-10-01" },
        ],
        'Soft Skills': [
            { name: 'Communication', level: 5, icon: faBullhorn, description: 'Expert at verbal and written communication, with strong presentation skills.', startDate: "2018-01-01" },
            { name: 'Time Management', level: 4, icon: faClock, description: 'Efficient in managing time to prioritize and complete tasks within deadlines.', startDate: "2018-01-01" },
            { name: 'Leadership', level: 4, icon: faUsers, description: 'Skilled at leading teams towards achieving organizational goals, fostering teamwork and growth.', startDate: "2019-01-01" },
            { name: 'Problem Solving', level: 4, icon: faTasks, description: 'Proficient at identifying problems and brainstorming potential solutions.', startDate: "2018-01-01" },
        ],
        'Cloud Computing': [
            { name: 'AWS', level: 2, icon: faCloud, description: 'Managed cloud infrastructure and services.', startDate: "2021-05-01" },
            { name: 'Azure', level: 3, icon: faCloud, description: 'Deployed applications and managed services.', startDate: "2022-02-01" },
        ],
        'Cybersecurity': [
            { name: 'Security Protocols', level: 3, icon: faShieldVirus, description: 'Implemented and maintained security measures.', startDate: "2020-10-01" },
            { name: 'Penetration Testing', level: 2, icon: faShieldVirus, description: 'Conducted vulnerability and security assessments.', startDate: "2021-11-01" },
        ],
        'Internet of Things (IoT)': [
            { name: 'MQTT', level: 3, icon: faNetworkWired, description: 'Developed messaging solutions for IoT devices.', startDate: "2020-06-01" },
            { name: 'Node-RED', level: 3, icon: faNetworkWired, description: 'Implemented IoT workflows and automations.', startDate: "2021-07-01" },
        ],
        'Artificial Intelligence': [
            { name: 'Machine Learning', level: 4, icon: faBrain, description: 'Developed predictive models and algorithms.', startDate: "2019-08-01" },
            { name: 'Data Modeling', level: 3, icon: faBrain, description: 'Structured data for analysis and machine learning applications.', startDate: "2020-03-01" },
        ],
        'User Interface / User Experience (UI/UX)': [
            { name: 'Figma', level: 3, icon: faPaintBrush, description: 'Designed UI prototypes and wireframes.', startDate: "2021-02-01" },
        ],
        'Software Architecture': [
            { name: 'Microservices', level: 3, icon: faSitemap, description: 'Designed and implemented microservice architectures.', startDate: "2020-01-01" },
            { name: 'API Design', level: 4, icon: faSitemap, description: 'Developed robust and scalable APIs for various applications.', startDate: "2019-06-01" },
        ],
        'Project Management': [
            { name: 'Agile Methodologies', level: 3, icon: faTasks, description: 'Led project teams using Agile practices to deliver timely results.', startDate: "2020-02-01" },
            { name: 'Scrum', level: 3, icon: faTasks, description: 'Managed projects and coordinated team efforts in a Scrum framework.', startDate: "2020-08-01" },
        ],
    };

    return (
        <SkillsMatrix>
            <Grid container spacing={2}>
                {Object.entries(categories).map(([category, icon]) => (
                    <Grid item xs={3} key={category}>
                        <Tooltip title={category} placement="top">
                            <CategoryContainer onClick={(e) => handlePopoverOpen(e, category)}>
                                <FontAwesomeSvgIcon icon={icon} size="2x" />
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
}


export default SkillMatrixGrid;
