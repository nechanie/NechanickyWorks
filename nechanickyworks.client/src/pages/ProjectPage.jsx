import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../components/Shared/PageTitle';
import PythonMLWebSocketTest from '../components/Demos/PythonMLWebsocketTest';
import ProjectBrowser from '../components/Display/ProjectBrowser';
import { Container, Paper, Typography, useTheme, Stack, Divider } from '@mui/material';
import CardTable from '../components/Display/CardTable';
import SiteFooter from '../components/Shared/Footer';
import BackgroundDark from '../assets/imgs/backgrounds/ProjectPage/ProjectPageBackground.webp';
import BackgroundLight from '../assets/imgs/backgrounds/ProjectPage/ProjectPageBackgroundLight.webp';
import Cover from '../components/Display/Cover';
import ProjectDataList from '../components/Shared/Data/ProjectData';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ProjectPage = () => {
    const theme = useTheme();
    let query = useQuery();
    let tag = query.get('tag');

    return (
        <React.Fragment>
            <PageTitle pageTitle="Nechanicky Works" />
            <Cover light={BackgroundLight} dark={BackgroundDark }>
                <Container maxWidth='xl' align='center' sx={{ py: "2%", height: '100%' }} >
                    <Stack direction='column' sx={{height:'100%'}}>
                        <Typography variant='h4' gutterBottom sx={{ color: 'white' }}>Project Browser</Typography>
                        <Paper sx={{backgroundColor: theme.palette.background.paperOpaque, height:'100%', overflow:'hidden', paddingBottom: '2%'}}>
                            <CardTable projectList={ProjectDataList} defaultFilter={ tag } />
                        </Paper>
                    </Stack>
                </Container>
            </Cover>
            <SiteFooter/>
        </React.Fragment>
    );
}

export default ProjectPage;
