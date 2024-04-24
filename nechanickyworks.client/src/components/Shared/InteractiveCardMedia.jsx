import React from 'react';
import { Box, Button, useTheme, Typography } from '@mui/material';

const InteractiveCardMedia = ({ text = 'Learn More', ...props }) => {
    const theme = useTheme();
    return (
            <Box className sx={{
                position: 'relative',
                width: 'inherit',  // width of the div
                minHeight: 'inherit', // height of the div
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent'
        }}>
            <Box className='hover-overlay' sx={{
                position: 'absolute',
                width: '100%',  // width of the div
                minHeight: '100%', // height of the div
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                transition: 'background-color 0.5s ease',
                color: theme.palette.common.white,
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                },
                '&:hover .exposed-text': {
                    opacity: 1,
                }
            }}
            >
                <Typography className='exposed-text' sx={{
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                } }>
                    {text}
                </Typography>
            </Box>
            <Box className="inner-group"
                sx={{
                    width: 'inherit',  // width of the div
                    minHeight: 'inherit', // height of the div
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default InteractiveCardMedia;
