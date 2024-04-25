import React, {  useEffect, useState } from 'react';
import { Paper, Card, CardHeader, CardContent, Typography, Box, Button, CardActions, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Cover = ({ image, children, dynaColor=true }) => {
    const theme = useTheme();
    const [color, setColor] = useState((theme.palette.mode === 'dark' && dynaColor ? theme.palette.common.white : theme.palette.common.black));
    React.useEffect(() => {
        setColor((prevState) => {
            const newColor = theme.palette.mode === 'dark' && dynaColor ? theme.palette.common.white : theme.palette.common.black;
            return newColor;
        });
    }, [theme.palette.mode]);
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
            paddingTop: '64px',
            paddingBottom:'64px',
            width: '100%',
            height: '100vh',
            color: color,
            overflowY:'clip'
        }}>
            {children}
        </Box>
    );
}

export default Cover;
