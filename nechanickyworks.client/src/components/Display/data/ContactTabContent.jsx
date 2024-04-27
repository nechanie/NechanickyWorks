import React, { useState } from 'react';
import { Container, Box, Grid, useTheme, IconButton, Typography, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const ContactMethodDisplay = ({ method, label, href }) => {
    let icon = null;
    switch (method) {
        case 'email':
            icon = <AlternateEmailIcon/>;
            break;
        case 'phone':
            icon = <ContactPhoneIcon />;
            break;
        case 'github':
            icon = <GitHubIcon />;
            break;
        case 'linkedin':
            icon = <LinkedInIcon />;
            break;
    }

    return (
        <Box align='center' justify='center'>
            <IconButton aria-label={label} href={href} target="_blank" rel="noopener noreferrer">
            {icon}
            </IconButton>
        </Box>
    );
}

const ContactTabContent = ({ statement, methods }) => {
    return (
        <Container maxWidth='xl'>
            <Grid container spacing={2} p='1%' justifyContent='center'>
                <Grid item xs={12}>
                    {statement}
                </Grid>
                <Grid item xs={12}>
                    <Typography align='center' variant="h6"><u>Best Methods of Contact</u></Typography>
                </Grid>
                {methods.map((method, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Stack direction='row' justifyContent='center' alignItems='center'>
                            <ContactMethodDisplay method={method.name} label={method.label} href={method.location} />
                            <Typography align='center' height='fit-content' variant='body1'>{method.label}</Typography>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ContactTabContent;