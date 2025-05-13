import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

function Stopwatch({ startTime }) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        // Set up an interval to update the elapsed time every second.
        const interval = setInterval(() => {
            const now = new Date();
            // Ensure startTime is a Date object.
            const start = startTime instanceof Date ? startTime : new Date(startTime);
            const elapsed = now - start;
            setElapsedTime(elapsed);
        }, 1000);

        // Clean up the interval when the component unmounts or startTime changes.
        return () => clearInterval(interval);
    }, [startTime]);

    // Convert elapsedTime (in milliseconds) to total seconds.
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format seconds with a leading zero if necessary.
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <Box>
            <Typography variant="h5" sx={{ textAlign: 'center', px: 2 }}>{minutes}:{formattedSeconds}</Typography>
        </Box>
    );
}

export default Stopwatch;