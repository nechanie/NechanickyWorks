import React, {  useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const Cover = ({ light, dark, children, dynaColor = true, sx = {}, ...props }) => {
    const theme = useTheme();
    const [color, setColor] = useState((theme.palette.mode === 'dark' && dynaColor ? theme.palette.common.white : theme.palette.common.black));
    const [themedImage, setThemedImage] = useState((theme.palette.mode === 'light' ? light : dark));

    React.useEffect(() => {
        setThemedImage((theme.palette.mode === 'light' ? light : dark));
    }, [theme.palette.mode, light, dark]);

    React.useEffect(() => {
        setColor((prevState) => {
            const newColor = theme.palette.mode === 'dark' && dynaColor ? theme.palette.common.white : theme.palette.common.black;
            return newColor;
        });
    }, [theme.palette.mode]);

    const CoverBox = styled(Box)({
        backgroundImage: `url(${themedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: '64px',
        paddingBottom: '64px',
        width: '100%',
        minHeight: '100vh',
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
