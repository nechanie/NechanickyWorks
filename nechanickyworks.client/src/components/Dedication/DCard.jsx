import React from 'react';
import { Card, CardContent, CardMedia, Box, Stack, Typography } from '@mui/material';

const MultiMediaBox = ({ images, maxHeight=null, ...props }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', maxHeight: maxHeight }} {...props}>
            <Stack direction='column' sx={{height: "100%", width:"100%"} }>
                {images.map((item, index) => (
                    <Box sx={{ width: '100%', height: '100%', backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPosition: 'top' }} key={index} />
                )) }
            </Stack>
        </Box>
    );
}

const CardMultiMedia = ({images, ...props}) => {
    return (
        <CardMedia component={MultiMediaBox} images={images} {...props}/>
    );
}

const DCard = ({images, title, mediaProps, contentProps, titleProps, ...props}) => {
    var media = null;
    if (images.length >= 2) {
        media = (<CardMultiMedia images={images} sx={{height: '300px'}} {...mediaProps} />);
    }
    else {
        media = (<CardMedia sx={{height:'300px', backgroundPosition: 'top'}} image={images[0]} {...mediaProps}/>);
    }
    return (
        <Card {...props}>
            {media}
            <CardContent {...contentProps}>
                <Typography align='center' variant='h4' {...titleProps}>{ title }</Typography>
            </CardContent>
        </Card>
    );
}

export default DCard;