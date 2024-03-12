import React from 'react';
import { Paper, Card, CardHeader, CardContent, Typography, Box, Button, CardActions, useTheme } from '@mui/material';

const InfoGraphic = ({ title, image, href, rightJustify = false, bdColor = "#373737", children }) => {
    const theme = useTheme();
    // Card section with conditional styling for alignment
    const cardSection = (
        <Card raised={false} sx={{
            minWidth: "20%",
            minHeight: "20vh",
            maxWidth: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
            m: 10, // Margin around the card for some spacing
            // Conditional alignment based on graphicFirst
            alignSelf: rightJustify ? 'flex-end' : 'flex-start',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
        }}>
            <CardHeader title={title} />
            <CardContent>
                <Typography>{children}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" href={href} sx={{ mt: 2 }}>Learn More</Button>
            </CardActions>
        </Card>
    );

    return (
        <Paper elevation={1} square={false} sx={{
            position: 'relative',
            backgroundColor: "#000",
            backgroundRepeat: "space",
            height: "100%", // Set a fixed height for the container, adjust as needed
            backgroundImage: `url(${image})`,
            backgroundSize: 'auto',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: rightJustify ? 'row-reverse' : 'row', // Adjust the direction based on graphicFirst
            marginLeft: rightJustify ? "0 !important" : "4% !important",
            marginRight: rightJustify ? "4% !important" : "0 !important",
            alignItems: 'center', // Vertically center the card
        }}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: bdColor, // Apply backdrop color with opacity
                opacity: 0.5, // Adjust backdrop opacity
                zIndex: 1, // Ensure the backdrop is below the card content
            }} />
            <Box sx={{
                position: 'relative',
                zIndex: 2, // Ensure the card is above the backdrop
                width: '100%', // Take the full width to utilize flex positioning
                display: 'flex',
                justifyContent: rightJustify ? 'flex-end' : 'flex-start', // Conditional justification for the card
            }}>
                {cardSection}
            </Box>
        </Paper>
    );
}

export default InfoGraphic;
