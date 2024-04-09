import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, useTheme} from '@mui/material';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DaneLogo from "../../assets/imgs/DaneLogo.svg"

const CustomAppBar = ({ onThemeToggle }) => {

    const theme = useTheme();
    // State for handling the sub-menu visibility
    const [anchorEl, setAnchorEl] = useState(null);
    const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const settingsOpen = Boolean(settingsAnchorEl);
    const open = Boolean(anchorEl);
    const aboutOpen = Boolean(aboutAnchorEl);

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


    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar sx={{display: "flex", justifyContent:"space-between"} }>
                        {/* Logo and Name, assuming the logo is text. If you have an image, use <img src="path/to/logo" alt="logo" /> */}
                    <img src={ DaneLogo } />
                    <Button sx={{ height: '100%', marginLeft: "1%" }} color="inherit" component={Link} variant="text" to="/">
                        Home
                    </Button>
                    {/* Projects button that opens a sub-menu */}
                    <Button sx={{height:'100%', marginLeft:"1%"}} color="inherit" component={Link} variant="text" onClick={handleMenu}>
                        Projects
                    </Button>
                    <Menu
                        disableScrollLock={true}
                        marginThreshold={ null }
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
                        <MenuItem onClick={handleClose} component={Link} to="/projects/TrustWorthyMachineLearning">Trustwirthy Machine Learning</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/GaussianQuadrature">Gaussian Quadrature</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/OSUCapstoneProject">OSU Senior Capstone</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/DiffusionDenoisedRobustification">Diffusion Denoised Robustification</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/WarehouseRequestForm">Warehouse Order Form</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/RecruitmentRequestForm">New Hire Request Form</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/projects/MyFridgeApp">MyFridge Android App</MenuItem>
                    </Menu>

                    
                    <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Nechanicky Works
                        </Link>
                    </Typography>
                    {/* About Me button for navigation */}
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
                        <MenuItem onClick={handleAboutClose} component={Link} to="/about-me">About Me</MenuItem>
                        <MenuItem onClick={handleAboutClose} component={Link} to="/about-this-site">About This Site</MenuItem>
                    </Menu>
                    <IconButton
                        disableFocusRipple={true}
                        color="inherit"
                        aria-label="open settings"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleSettingsClick}
                        edge="end">
                        <SettingsIcon/>
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
                                <FormControlLabel control={<Switch onChange={onThemeToggle}/>} label="Dark Mode"/>
                            </FormGroup>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    );
};

export default CustomAppBar;
