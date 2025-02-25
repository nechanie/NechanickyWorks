import React, { useState, useEffect } from 'react';
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { jwtDecode } from 'jwt-decode';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [signInAnchorEl, setSignInAnchorEl] = useState(null);


    const signInMenuOpen = Boolean(signInAnchorEl);

    // Check if there's a token in local storage and decode it to extract the email
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                // Adjust according to your token payload structure.
                setUserEmail(decoded.email || null);
                console.log("below is the email");
                console.log(userEmail);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handlers for the Sign In dropdown menu
    const handleSignInClick = (event) => {
        setSignInAnchorEl(event.currentTarget);
    };
    const handleSignInClose = () => {
        setSignInAnchorEl(null);
    };

    const handleSignOut = () => {
        // Remove the token (and any other user info) from local storage.
        handleMenuClose();
        localStorage.removeItem('access_token');
        setUserEmail(null);
    };

    // If the user is not logged in, display a Sign In button.
    if (!userEmail) {
        return (
            <>
                <Button color="inherit" variant="text" onClick={handleSignInClick}>
                    Sign In
                </Button>
                <Menu
                    anchorEl={signInAnchorEl}
                    open={signInMenuOpen}
                    onClose={handleSignInClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            // Get the current URL (or pathname) and encode it.
                            const currentLocation = encodeURIComponent(window.location.href);
                            // Redirect to the OAuth endpoint, passing the current location as "next".
                            window.location.href = `http://access.nechanickyworks.com/auth/oauth/google?next=${currentLocation}`;
                            handleSignInClose();
                        }}
                    >
                        Sign in with Google
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            // Get the current URL (or pathname) and encode it.
                            const currentLocation = encodeURIComponent(window.location.href);
                            // Redirect to the OAuth endpoint, passing the current location as "next".
                            window.location.href = `http://access.nechanickyworks.com/auth/oauth/microsoft?next=${currentLocation}`;
                            handleSignInClose();
                        }}
                    >
                        Sign in with Microsoft
                    </MenuItem>
                </Menu>
            </>
        );
    }

    // If the user is logged in, display an icon button with a dropdown menu.
    return (
        <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
            >
                <MenuItem disabled>
                    <Typography variant="body2">
                        Logged in as: {userEmail}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    Sign Out
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;