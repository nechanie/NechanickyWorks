import React from 'react';
import PageTitle from '../components/Shared/PageTitle';
import PythonMLWebSocketTest from '../components/Demos/PythonMLWebsocketTest';
import ProjectBrowser from '../components/Display/ProjectBrowser';
import { Container, Paper, Typography } from '@mui/material';
import CardTable from '../components/Display/CardTable';
import SiteFooter from '../components/Shared/Footer';

const ProjectPage = () => {
    return (
        <React.Fragment>
            <PageTitle pageTitle="Nechanicky Works" />

            <Container maxWidth='lg' align='center' sx={{ paddingTop: '7vh' }}>
                <Typography variant='h4' sx={{color: 'white', p:'5%'} }>Project Browser</Typography>
                <Paper sx={{p:'3%'} }>
                    <CardTable />
                </Paper>
            </Container>
            <SiteFooter/>
        </React.Fragment>
    );
}

export default ProjectPage;
