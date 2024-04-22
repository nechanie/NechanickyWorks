import React from 'react';
import { Paper, Card, CardHeader, CardContent, Typography, Box, Button, CardActions, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Cover = ({ image, children }) => {

    return (
        
        <Box sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop:'64px',
            width: '100%',
            height: '100vh'
        }}>
            {children}
        </Box>
    );
}

export default Cover;
