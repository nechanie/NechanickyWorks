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
    const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

    const settingsOpen = Boolean(settingsAnchorEl);
    const open = Boolean(anchorEl);

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
        event.currentTarget.blur();
    };


    // Handle closing the settings menu
    const handleSettingsClose = () => {
        setSettingsAnchorEl(null);
    };


    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar sx={{display: "flex", justifyContent:"space-between"} }>
                        {/* Logo and Name, assuming the logo is text. If you have an image, use <img src="path/to/logo" alt="logo" /> */}
                    <img src={ DaneLogo } />

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
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {/* Replace these with your actual navigation links */}
                        <MenuItem onClick={handleClose} component={Link} to="/project1">Project 1</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/project2">Project 2</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/project3">Project 3</MenuItem>
                    </Menu>

                    
                    <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Nechanicky Works
                        </Link>
                    </Typography>
                    {/* About Me button for navigation */}
                    <Button color="inherit" variant="text" component={Link} to="/about-me">
                        About Me
                    </Button>
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
