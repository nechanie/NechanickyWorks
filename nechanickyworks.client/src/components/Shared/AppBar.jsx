import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, useTheme, Container, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DaneLogo from "../../assets/imgs/DaneLogo.png";

const drawerWidth = 240;

const CustomAppBar = ({ onThemeToggle }) => {

    const theme = useTheme();
    // State for handling the sub-menu visibility
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
    const [darkAppBar, setDarkAppBar] = useState((theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'));
    const isDarkMode = theme.palette.mode === 'dark';
    const settingsOpen = Boolean(settingsAnchorEl);
    const open = Boolean(anchorEl);
    const aboutOpen = Boolean(aboutAnchorEl);
    const [expandedProjects, setExpandedProjects] = useState(false);
    const [expandedAbout, setExpandedAbout] = useState(false);

    const handleExpandProjectsClick = () => {
        setExpandedProjects(!expandedProjects);
    };

    const handleExpandAboutClick = () => {
        setExpandedAbout(!expandedAbout);
    };

    React.useEffect(() => {
        setDarkAppBar((prevState) => {
            const background = (theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)');
            return background;
        });
    }, [theme.palette.mode]);


    

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handles opening the sub-menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handles closing the sub-menu
    const handleClose = () => {
        setAnchorEl(null);
    };


    // Handle opening the settings menu
    const handleSettingsClick = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    };


    // Handle closing the settings menu
    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };

    // Handle closing the about menu
    const handleAboutClose = () => {
        setAboutAnchorEl(null);
    }

    const handleAboutClick = (event) => {
        setAboutAnchorEl(event.currentTarget);
    }
    const drawer = (
        <Box
            role="presentation"
            sx={{ textAlign: 'center' }}
        >
            <Typography variant="h6" sx={{ my: 2 }}>
                Nechanicky Works
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding={true}>
                    <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding={true}>
                    <ListItemButton onClick={handleExpandProjectsClick}>
                        <ListItemText primary="Projects" />
                        {expandedProjects ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding={true}>
                    <Collapse in={expandedProjects} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItemButton sx={{ pl: 4 }} component={Link} to="/projects" onClick={handleDrawerToggle}>
                                <ListItemText primary='Browse Projects' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} to="/projects/TrustWorthyMachineLearning" onClick={handleDrawerToggle}>
                                <ListItemText primary='Trustworthy Machine Learning' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/GaussianQuadrature" onClick={handleDrawerToggle}>
                                <ListItemText primary='Gaussian Quadrature (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/OSUCapstoneProject" onClick={handleDrawerToggle}>
                                <ListItemText primary='OSU Senior Capstone (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/DiffusionDenoisedRobustification" onClick={handleDrawerToggle}>
                                <ListItemText primary='Diffusion Denoised Robustification (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/WarehouseRequestForm" onClick={handleDrawerToggle}>
                                <ListItemText primary='Warehouse Order Form (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/RecruitmentRequestForm" onClick={handleDrawerToggle}>
                                <ListItemText primary='New Hire Request Form (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/projects/MyFridgeApp" onClick={handleDrawerToggle}>
                                <ListItemText primary='MyFridge Android App (Coming Soon)' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </ListItem>
                <ListItem disablePadding={true}>
                    <ListItemButton onClick={handleExpandAboutClick}>
                        <ListItemText primary="About" />
                        {expandedAbout ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding={true}>
                    <Collapse in={expandedAbout} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/about-me" onClick={handleDrawerToggle}>
                                <ListItemText primary='About Me (Coming Soon)' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} disabled={true} to="/about-this-site" onClick={handleDrawerToggle}>
                                <ListItemText primary='About This Site (Coming Soon)' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </ListItem>
                <ListItem disablePadding={true}>
                    <ListItemButton component={Link} to="/contact" disabled={true} onClick={handleDrawerToggle}>
                        <ListItemText primary="Contact (Coming Soon)" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            <AppBar position="absolute" sx={{ background: darkAppBar, boxShadow: 'none' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={DaneLogo} alt="Logo" style={{ maxHeight: '64px' }} />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Nechanicky Works
                                </Link>
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block', marginLeft: 'auto' } }}>
                            {/* Navigation buttons for larger screens */}
                            <Button color="inherit" component={Link} variant="text" to="/">
                                Home
                            </Button>
                            {/* Projects button that opens a sub-menu */}
                            <Button color="inherit" component={Link} variant="text" onClick={handleMenu}>
                                Projects
                            </Button>
                            <Menu
                                disableScrollLock={true}
                                marginThreshold={null}
                                id="projects-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {/* Replace these with your actual navigation links */}
                                <MenuItem onClick={handleClose} component={Link} to="/projects">Browse Projects</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/projects/TrustWorthyMachineLearning">Trustworthy Machine Learning</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/GaussianQuadrature">Gaussian Quadrature (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/OSUCapstoneProject">OSU Senior Capstone (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/DiffusionDenoisedRobustification">Diffusion Denoised Robustification (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/WarehouseRequestForm">Warehouse Order Form (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/RecruitmentRequestForm">New Hire Request Form (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} disabled={true} to="/projects/MyFridgeApp">MyFridge Android App (Coming Soon)</MenuItem>
                            </Menu>


                            <Button color="inherit" variant="text" component={Link} onClick={handleAboutClick}>
                                About
                            </Button>
                            <Menu
                                disableScrollLock={true}
                                marginThreshold={null}
                                id="projects-menu"
                                anchorEl={aboutAnchorEl}
                                keepMounted
                                open={aboutOpen}
                                onClose={handleAboutClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                {/* Replace these with your actual navigation links */}
                                <MenuItem onClick={handleAboutClose} component={Link} disabled={true} to="/about-me">About Me (Coming Soon)</MenuItem>
                                <MenuItem onClick={handleAboutClose} component={Link} disabled={true} to="/about-this-site">About This Site (Coming Soon)</MenuItem>
                            </Menu>                            
                        </Box>
                        <IconButton
                            disableFocusRipple={true}
                            color="inherit"
                            aria-label="open settings"
                            aria-haspopup="true"
                            onClick={handleSettingsClick}>
                            <SettingsIcon />
                        </IconButton>
                        <Menu
                            disableScrollLock={true}
                            marginThreshold={null}
                            id="menu-appbar"
                            anchorEl={settingsAnchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={settingsOpen}
                            onClose={handleSettingsClose}
                        >
                            <MenuItem>
                                <FormGroup>
                                    <FormControlLabel control={<Switch checked={isDarkMode} onChange={onThemeToggle} />} label="Dark Mode" />
                                </FormGroup>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </React.Fragment>
    );
};

export default CustomAppBar;
