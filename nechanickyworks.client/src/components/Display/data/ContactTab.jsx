import React, { useState } from 'react';
import { Typography, Box, CardMedia, useTheme } from '@mui/material';

const ContactTab = ({ title, light, dark }) => {
    const theme = useTheme();
    const [themedImage, setThemedImage] = useState((theme.palette.mode === 'light' ? light : dark));

    React.useEffect(() => {
        setThemedImage((theme.palette.mode === 'light' ? light : dark));
    }, [theme.palette.mode, light, dark]);


    return (
        <React.Fragment>
            <Box className sx={{
                position: 'relative',
                width: 'inherit',
                minHeight: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                height: '100%'
            }}>
                <Box sx={{
                    position: 'absolute',
                    width: '100%',
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.palette.common.black,
                    padding: '4%',
                    opacity:0.5,
                    color: theme.palette.common.white,
                }}/>
                <Box sx={{
                    position: 'absolute',
                    width: '100%',  
                    minHeight: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    padding: '4%',
                    color: theme.palette.common.white,
                }}
                >
                    <Typography variant='h4' align='center' sx={{
                        fontWeight: '900',
                        fontSynthesisWeight: 'auto',
                        m: 'auto'
                    }}>
                        {title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: 'inherit',  
                        minHeight: 'inherit', 
                        height: '100%',
                    }}
                >
                    <CardMedia
                        component={Box}
                        sx={{ minHeight: 200, maxWidth: 'inherit', imageSize:'cover' }}
                        image={themedImage}
                    />
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ContactTab;