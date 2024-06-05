import React, { useState } from 'react';
import { Grid, Typography, Box, Stack, useTheme, Button, Card, CardHeader, CardContent, IconButton, CardActionArea, CardMedia } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AboutThisSiteAnimationItemProvider, { useSelectedItem } from './AboutThisSiteAnimationIdContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AboutThisSiteSectionMedia = ({ images, sx = {}, ...props }) => {
    const theme = useTheme();
    const [themedImage, setThemedImage] = useState((theme.palette.mode === 'light' ? images.light : images.dark));

    React.useEffect(() => {
        setThemedImage((theme.palette.mode === 'light' ? images.light : images.dark));
    }, [theme.palette.mode, images.dark, images.light]);
    return (
        <Box component={motion.div} sx={[{maxHeight: "70vh", borderRadius: '10px', width: `calc(100% - 24px)`, height: '100%', backgroundImage: `url(${themedImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxSizing: 'border-box', padding:'inherit' }, sx] } {...props}/>
    );
}

export const AboutThisSiteSectionContentItem = ({ id, title, images, children, titleVariant = 'h4', titleProps = {}, ...props }) => {
    const theme = useTheme();
    const { setSelectedItem } = useSelectedItem();
    const [themedImage, setThemedImage] = useState((theme.palette.mode === 'light' ? images.light : images.dark));

    React.useEffect(() => {
        setThemedImage((theme.palette.mode === 'light' ? images.light : images.dark));
    }, [theme.palette.mode, images.dark, images.light]);
    const currentItem = {
        id: id,
        title: title,
        children: children,
        images: images
    }

    return (
        <Grid item component={motion.div} layoutId={ id } id={id} xs={6} {...props} align='center' sx={{width:'100%'} }>
            <Card sx={{ height: '100%'} }>
                <CardActionArea onClick={() => setSelectedItem(currentItem)} sx={{height: '100%', display: 'flex', flexDirection: 'column'} }>
                    <CardMedia
                        sx={{ height: 140, width: "100%" }}
                        image={themedImage}
                        title={title }
                    />
                    <CardContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'stretch', flexGrow: 1} }>
                        <Typography gutterBottom variant="h5" component="div" sx={{wordBreak: 'break-word', height: 'fit-content', width: "100%", alignSelf:'center', justifySelf: 'center'} }>
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

const AboutThisSiteSectionRoot = ({ id, title, children, images = null, ltr = true, mediaProps = {}, titleVariant = 'h3', titleProps = {}, ...props }) => {
    const { selectedItem, setSelectedItem } = useSelectedItem();
    const theme = useTheme();
    const imageAnimationProps = {
        initial: { scale: 0, borderRadius: '50%' },
        animate: { scale: 1, borderRadius: ['50%', '50%', '10px'] },
        exit: { scale: 0, borderRadius: '50%' },
        transition: { duration: 0.5, ease: 'easeInOut' }
    };

    return (
        <Grid container id={id} justifyContent="center" {...props} >
        
            {(images && ltr) && (
                <Grid item md={5} sx={{ position: 'relative', display: {xs: 'none', md:'flex', flexDirection: 'column', justifyContent: 'center'} }}>
                        <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootBaseImage' images={images} {...mediaProps} sx={{ position: 'absolute'}} />

                        <AnimatePresence>
                            {selectedItem != null && (
                                <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootItemImage' images={selectedItem.images} {...mediaProps} sx={{ position: 'absolute'}} {...imageAnimationProps} />
                            )}
                        </AnimatePresence>
                </Grid>
            )}
            <Grid item xs={12} md={7} sx={{ position: 'relative' } }>
                <Stack direction="column" sx={{ padding: '2%' }} useFlexGap>
                    <Typography variant={titleVariant} {...titleProps}>{title}</Typography>
                    <Grid container component={motion.div} justifyContent={'center'} sx={{ paddingTop: '3%', paddingBottom: '3%'}} spacing={2}>
                        {children}
                    </Grid>
                </Stack>
                <Box>
                    <AnimatePresence style={{height: '100%', width:'100%'} }>
                    {selectedItem && (
                            <Card component={motion.div} layoutId={selectedItem.id} elevation={0} sx={{ position: 'absolute', top: 0, width: 'calc(100% - 24px)', height: '100%', padding: '3%' }}>
                            <Stack direction='column' height='100%'>
                            <CardHeader
                                action={
                                    <IconButton aria-label="back" onClick={() => setSelectedItem(null)}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                                title={ selectedItem.title }
                            />
                                <CardContent sx={{height:'100%', width:'100%'} }>
                                {selectedItem.children}
                                    </CardContent>
                                </Stack>
                        </Card>

                    )}
                    </AnimatePresence>
                </Box>
            </Grid>
            {(images && !ltr) && (<Grid item md={5} sx={{ position: 'relative', display: {xs: 'none', md:'flex', flexDirection: 'column', justifyContent: 'center'} }}>
                <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootBaseImage' images={images} {...mediaProps} sx={{ position: 'absolute'}} />

                <AnimatePresence>
                    {selectedItem != null && (
                        <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootItemImage' images={selectedItem.images} {...mediaProps} sx={{ position: 'absolute' }} {...imageAnimationProps} />
                    )}
                </AnimatePresence>
            </Grid>)}
        </Grid>
    );
}

const AboutThisSiteSection = ({ id, title, children, images = null, ltr = true, mediaProps = {}, titleVariant = 'h3', titleProps = {}, ...props }) => (
    <AboutThisSiteAnimationItemProvider>
        <AboutThisSiteSectionRoot id={id} title={title} images={images} ltr={ltr} mediaProps={mediaProps} titleVariant={titleVariant} titleProps={titleProps} {...props}>
            {children} 
        </AboutThisSiteSectionRoot>
    </AboutThisSiteAnimationItemProvider>
)

export default AboutThisSiteSection;