import React, {  useEffect, useState } from 'react';
import { Paper, Card, CardHeader, CardContent, Typography, Box, Button, CardActions, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const Cover = ({ light, dark, children, dynaColor = true, sx = {}, ...props }) => {
    const theme = useTheme();
    const color = theme.palette.common.white;
    const [themedImage, setThemedImage] = useState((theme.palette.mode === 'light' ? light : dark));

    React.useEffect(() => {
        setThemedImage((theme.palette.mode === 'light' ? light : dark));
    }, [theme.palette.mode, light, dark])

    const CoverBox = styled(Box)({
        backgroundImage: `url(${themedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: '64px',
        paddingBottom: '64px',
        width: '100%',
        height: '100vh',
        color: color,
        overflowY: 'clip',
        'a': {
            color: color,
            borderColor: color,
            '&:hover': {
                color: theme.palette.secondary.main,
            }
        }
    })

    return (
        
        <CoverBox {...props }>
            {children}
        </CoverBox>
    );
}

export default Cover;
