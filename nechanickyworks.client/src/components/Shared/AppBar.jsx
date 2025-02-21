import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    useTheme,
    Container,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    IconButton,
    FormGroup,
    FormControlLabel,
    Switch
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import DaneLogo from "../../assets/imgs/DaneLogo.png";
import AccountMenu from '../OAuth/AccountMenu';

const drawerWidth = 240;

const CustomAppBar = ({ onThemeToggle }) => {
    const theme = useTheme();

    // State for handling various menus and mobile drawer
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const isDarkMode = theme.palette.mode === 'dark';
    const settingsOpen = Boolean(settingsAnchorEl);
    const open = Boolean(anchorEl);
    const aboutOpen = Boolean(aboutAnchorEl);

    const [expandedProjects, setExpandedProjects] = useState(false);
    const [expandedAbout, setExpandedAbout] = useState(false);
    const [darkAppBar, setDarkAppBar] = useState(
        theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
    );

    React.useEffect(() => {
        const background =
            theme.palette.mode === 'light'
                ? 'rgba(255,255,255,0.5)'
                : 'rgba(0,0,0,0.5)';
        setDarkAppBar(background);
    }, [theme.palette.mode]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // Handles opening and closing the Projects sub-menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handles opening and closing the Settings menu
    const handleSettingsClick = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    };
    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };

    // Handles opening and closing the About menu
    const handleAboutClick = (event) => {
        setAboutAnchorEl(event.currentTarget);
    };
    const handleAboutClose = () => {
        setAboutAnchorEl(null);
    };

    // Handles toggling dark mode
    const handleOnThemeToggle = () => {
        onThemeToggle();
        setSettingsAnchorEl(null);
    };

    // Handles expanding the Projects section in the drawer
    const handleExpandProjectsClick = () => {
        setExpandedProjects(!expandedProjects);
    };

    // Handles expanding the About section in the drawer
    const handleExpandAboutClick = () => {
        setExpandedAbout(!expandedAbout);
    };

 

    // Drawer content for mobile view
    const drawer = (
        <Box role="presentation" sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Nechanicky Works
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleExpandProjectsClick}>
                        <ListItemText primary="Projects" />
                        {expandedProjects ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <Collapse in={expandedProjects} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItemButton sx={{ pl: 4 }} component={Link} to="/projects" onClick={handleDrawerToggle}>
                                <ListItemText primary="Browse Projects" />
                            </ListItemButton>
                            {/* ...other project links... */}
                        </List>
                    </Collapse>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleExpandAboutClick}>
                        <ListItemText primary="About" />
                        {expandedAbout ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <Collapse in={expandedAbout} timeout="auto" unmountOnExit>
                        <List component="div">
                            <ListItemButton sx={{ pl: 4 }} component={Link} to="/about-me" onClick={handleDrawerToggle}>
                                <ListItemText primary="About Me" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component={Link} to="/about-this-site" onClick={handleDrawerToggle}>
                                <ListItemText primary="About This Site" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/contact" onClick={handleDrawerToggle}>
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            <AppBar
                position="absolute"
                sx={{
                    background: darkAppBar,
                    boxShadow: 'none',
                    color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        {/* Mobile menu button */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Logo and Title */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={DaneLogo} alt="Logo" style={{ maxHeight: '64px' }} />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Nechanicky Works
                                </Link>
                            </Typography>
                        </Box>

                        {/* Navigation buttons for larger screens */}
                        <Box sx={{ display: { xs: 'none', md: 'block', marginLeft: 'auto' } }}>
                            <Button color="inherit" component={Link} variant="text" to="/">
                                Home
                            </Button>
                            <Button color="inherit" component={Link} variant="text" onClick={handleMenu}>
                                Projects
                            </Button>
                            <Menu
                                disableScrollLock
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
                                <MenuItem onClick={handleClose} component={Link} to="/projects">Browse Projects</MenuItem>
                                {/* ...other project menu items... */}
                            </Menu>

                            <Button color="inherit" variant="text" component={Link} onClick={handleAboutClick}>
                                About
                            </Button>
                            <Menu
                                disableScrollLock
                                marginThreshold={null}
                                id="about-menu"
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
                                <MenuItem onClick={handleAboutClose} component={Link} to="/about-me">About Me</MenuItem>
                                <MenuItem onClick={handleAboutClose} component={Link} to="/about-this-site">About This Site</MenuItem>
                            </Menu>

                            <Button color="inherit" variant="text" component={Link} to='/contact'>
                                Contact Me
                            </Button>
                        </Box>

                        {/* Sign In / User info area */}
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            <AccountMenu/>

                            {/* Settings Icon */}
                            <IconButton
                                disableFocusRipple
                                color="inherit"
                                aria-label="open settings"
                                aria-haspopup="true"
                                onClick={handleSettingsClick}
                            >
                                <SettingsIcon />
                            </IconButton>
                            <Menu
                                disableScrollLock
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
                                        <FormControlLabel
                                            control={<Switch checked={isDarkMode} onChange={handleOnThemeToggle} />}
                                            label="Dark Mode"
                                        />
                                    </FormGroup>
                                </MenuItem>
                            </Menu>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
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
