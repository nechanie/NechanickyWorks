import React from 'react';
import { Paper, Typography } from '@mui/material';

const GraphDescription = ({ title, description }) => (
    <Paper elevation={3} sx={{ my: '2%', p: '2%', backgroundColor: 'background.paperOpaqueContrast', mx: { xs:'4%', sm:'7%', md:'15%'} }}>
        <Typography variant="h6" gutterBottom>
            {title}
        </Typography>
        <Typography variant="body1">
            {description}
        </Typography>
    </Paper>
);

export default GraphDescription;
