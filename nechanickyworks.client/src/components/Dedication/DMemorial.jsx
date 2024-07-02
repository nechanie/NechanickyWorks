import React from 'react';
import { Container, Typography, Box, Stack, Grid, Paper, Divider } from '@mui/material';
import FamilyData from './Data/FamilyData';
import DCard from './DCard';
import Photos from './Photos';

const DMemorial = () => {

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={7}>
                            <Grid container spacing={3}>
                                {
                                    FamilyData.map((item, index) => (
                                        <Grid item xs={6} key={index}>
                                            <DCard images={item.images} title={item.relationship} elevation={3} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', paddingTop: '32px' }}>
                <Photos/>
            </Box>


            <Paper elevation={3} sx={{ width: '100%', height: '100%', padding:2 }}>
                <Stack>
                    <Typography>TODO: add bio and other info.</Typography>
                    <Divider />
                    <Typography>TODO: add stories from friends and family.</Typography>
                    <Divider />
                    <Typography>TODO: add info on how to add to the page (more photos, more stories from people, etc.).</Typography>
                    <Divider />
                    <Typography>TODO: better design/coloring can be saved for last. (visual design, also functional -- make images expandable for viewing)</Typography>
                </Stack>
            </Paper>
        </React.Fragment>
    );
}

export default DMemorial;