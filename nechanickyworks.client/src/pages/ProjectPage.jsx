import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../components/Shared/PageTitle';
import PythonMLWebSocketTest from '../components/Demos/PythonMLWebsocketTest';
import ProjectBrowser from '../components/Display/ProjectBrowser';
import { Container, Paper, Typography, useTheme, Stack } from '@mui/material';
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
    const [backgroundImage, setBackgroundImage] = useState(null);

    React.useEffect(() => {
        setBackgroundImage((prevState) => {
            const background = theme.palette.mode === 'light' ? BackgroundLight : BackgroundDark;
            return background;
        });
    }, [theme.palette.mode]);

    return (
        <React.Fragment>
            <PageTitle pageTitle="Nechanicky Works" />
            <Cover image={ backgroundImage }>
                <Container maxWidth='xl' align='center' sx={{ py: "2%" }} >
                    <Stack direction='column'>
                        <Typography variant='h4' gutterBottom sx={{color: 'white'} }>Project Browser</Typography>
                        <Paper sx={{backgroundColor: theme.palette.background.paperOpaque}}>
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
