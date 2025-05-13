import React from 'react';
import { Box, Typography } from '@mui/material';

const ComingSoonOverlay = ({ children }) => {
    return (
        <Box position="relative" width="100%" height="100%">
            {/* Render children components */}
            {children}

            {/* Overlay */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
                color="white"
                zIndex={99}
            >
                <Typography variant="h4">
                    Coming Soon
                </Typography>
            </Box>
        </Box>
    );
};

export default ComingSoonOverlay;
