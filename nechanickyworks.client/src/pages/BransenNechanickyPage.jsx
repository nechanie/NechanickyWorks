import React from 'react';
import { Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import SiteFooter from '../components/Shared/Footer';
import PageTitle from '../components/Shared/PageTitle';
import DCover from '../components/Dedication/DCover';
import DMemorial from '../components/Dedication/DMemorial';


const BransenNechanickyPage = () => {
    return (
        <React.Fragment>
            <PageTitle pageTitle='In Memory of Bransen Nechanicky' />
            <Stack sx={{width:'100%'}}>
                <Box sx={{ position: 'relative', width: '100%', maxHeight: '50%', paddingTop: '64px', background: "linear-gradient(90deg, rgba(172,221,216,1) 15%, rgba(186,224,215,1) 86%)" }}>
                    <Box sx={{position: 'absolute', left:0, top:0, width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 15%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0) 100%)', zIndex:5}} />
                    <Container maxWidth='lg' >
                        <DCover />
                    </Container>
                </Box>
                <Box sx={{ width: '100%', paddingBottom: '32px', backgroundColor: "#4b000f", paddingTop: '15px'}}>
                    <Container maxWidth='lg'>
                        <DMemorial/>
                    </Container>
                </Box>
            </Stack>

            <SiteFooter />
        </React.Fragment>
    );
};

export default BransenNechanickyPage;
