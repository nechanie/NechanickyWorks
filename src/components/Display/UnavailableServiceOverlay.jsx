import React from 'react';
import { Box, Typography } from '@mui/material';

const UnavailableServiceOverlay = ({ children, isServiceAvailable }) => {
    return (
        <Box position="relative" width="100%" height="100%">
            {/* Render children components */}
            {children}

            {/* Conditional rendering of the overlay based on the service availability */}
            {!isServiceAvailable && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="rgba(0, 0, 0, 0.75)" // Adjusted for a slightly darker semi-transparent black background
                    color="white"
                    zIndex={99} 
                >
                    <Typography variant="h5" sx={{ textAlign: 'center', px: 2 }}>
                        This service is currently unavailable, please check back later.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default UnavailableServiceOverlay;
