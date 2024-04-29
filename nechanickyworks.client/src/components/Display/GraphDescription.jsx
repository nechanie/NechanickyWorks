import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';

const GraphDescription = ({ title, description, note = null }) => (
    <Paper elevation={3} sx={{ my: '2%', p: '2%', backgroundColor: 'background.paperOpaqueContrast', mx: { xs:'4%', sm:'7%', md:'15%'} }}>
        <Stack direction='column' spacing={1}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1">
                {description}
            </Typography>
            {note && (
                <React.Fragment>
                    <Typography variant="h6" color="red" gutterBottom>
                        <u>NOTE</u>
                    </Typography>
                    <Typography variant='body1' color="red">
                        {note}
                    </Typography>
                </React.Fragment>
            )}
        </Stack>
    </Paper>
);

export default GraphDescription;
