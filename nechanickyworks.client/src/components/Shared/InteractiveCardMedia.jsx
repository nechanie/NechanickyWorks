import React from 'react';
import { Box, Button, useTheme, Typography, Stack } from '@mui/material';

const InteractiveCardMedia = ({ text = 'Learn More', comingSoon=false, ...props }) => {
    const theme = useTheme();
    return (
            <Box className sx={{
                position: 'relative',
                width: 'inherit',  // width of the div
                minHeight: 'inherit', // height of the div
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                height: '100%'
        }}>
            <Box className='hover-overlay' sx={{
                position: 'absolute',
                width: '100%',  // width of the div
                minHeight: '100%', // height of the div
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                padding: '4%',
                transition: 'background-color 0.5s ease',
                color: theme.palette.common.white,
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                },
                '&:hover .exposed-text': {
                    opacity: 1,
                },
                zIndex: 100
            }}
            >
                {comingSoon && (<Typography className='exposed-text' sx={{
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    m: 'auto'
                }}>
                    Coming Soon
                </Typography>)}
                <Typography className='exposed-text' sx={{
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    m:'auto'
                    }}>
                        {text}
                    </Typography>
            </Box>
            <Box
                sx={{
                    width: 'inherit',  // width of the div
                    minHeight: 'inherit', // height of the div
                    height: '100%'
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default InteractiveCardMedia;
