import React from 'react';
import { Box, Typography } from '@mui/material';

const ContentSectionTitle = ({ ...props }) => {
    return (
        <Typography variant='h3' {...props}>
            {props.children}
        </Typography>
    );
}

const ContentSection = ({ id, title, children, titleProps = {}, ...props }) => (
    <Box id={id} {...props}>
        <ContentSectionTitle {...titleProps}>{title}</ContentSectionTitle>
        {children}
    </Box>
);

export default ContentSection;