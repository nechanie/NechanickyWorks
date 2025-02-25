import React from 'react';
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import Stopwatch from '../utils/Stopwatch';


const FormQueueDisplay = ({ children, queuePosition, timeStart, isActive, estimatedTime = null }) => {
    return (
        <Box position="relative" width="100%" height="100%">
            {/* Render children components */}
            {children}

            {/* Conditional rendering of the overlay based on the service availability */}
            {(isActive && queuePosition !== null) && (
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
                    {
                        queuePosition === 1 ? (

                            <CircularProgress color='secondary' />
                        ) : (
                            <Stack direction='column'>
                                <Typography variant="h5" sx={{ textAlign: 'center', px: 2 }}>
                                    Your request has been queued.

                                    Position in queue: {queuePosition}
                                </Typography>
                                <Typography variant="h5" sx={{ textAlign: 'center', px: 2 }}>
                                    Your request has been queued for
                                </Typography>
                                <Stopwatch startTime={timeStart} />
                            </Stack>
                        )
                    }
                </Box>
            )}
        </Box>
    );
}

export default FormQueueDisplay;