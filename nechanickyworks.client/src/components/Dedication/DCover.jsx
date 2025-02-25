import React from 'react';
import { Container, Typography, Box, Stack } from '@mui/material';
import DCoverPicture from '../../assets/imgs/Dedication/Cover/DCoverPicture.webp';

const DCover = () => {
    return (
        <React.Fragment>
            <Box sx={{ backgroundImage: `url(${DCoverPicture})`, width: '100%', height: '100%', paddingTop: '3%', paddingBottom: '3%', backgroundSize: 'cover', backgroundPosition: 'center'} }>
                <Container maxWidth='md' align='center' sx={{position:"relative", zIndex:10} }>
                    <Stack direction='column' spacing={8}>
                        <Stack direction='column' spacing={1}>
                            <Typography variant='h3'>
                                In loving memory
                            </Typography>
                            <Typography variant='h5'>and Celebrating the life of</Typography>
                            <Typography variant='h2'>Bransen Norval Nechanicky</Typography>
                        </Stack>
                        <Stack direction='column' spacing={1}>
                            <Typography variant='h4'>A life lived with strength, determination, dreams, and love.</Typography>
                            <Typography variant='h4'>A life that inspired, motivated, and brought smiles to every encounter.</Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default DCover;