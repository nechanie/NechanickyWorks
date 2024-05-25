import React, { useState } from 'react';
import { Grid, Typography, Box, Stack, useTheme, Button, Card, CardHeader, CardContent, IconButton } from '@mui/material';
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
        <Box component={motion.div} sx={[{ borderRadius: '10px', width: `calc(100% - ${theme.spacing(3)})`, height: '100%', backgroundImage: `url(${themedImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxSizing: 'border-box', padding:'inherit' }, sx] } {...props}/>
    );
}

export const AboutThisSiteSectionContentItem = ({ id, title, images, children, titleVariant = 'h4', titleProps = {}, ...props }) => {
    const { setSelectedItem } = useSelectedItem();

    const currentItem = {
        id: id,
        title: title,
        children: children,
        images: images
    }

    return (
        <Grid item component={motion.div} layoutId={ id } id={id} xs={6} {...props} align='left'>
            <Stack direction='column' spacing={2} justifyContent='space-between'>
                <Typography variant={titleVariant} {...titleProps}>{title}</Typography>
                {children}
                <Button onClick={() => setSelectedItem(currentItem)}>Read</Button>
            </Stack>
        </Grid>
    );
}

const AboutThisSiteSectionRoot = ({ id, title, children, images = null, ltr = true, mediaProps = {}, titleVariant = 'h3', titleProps = {}, ...props }) => {
    const { selectedItem, setSelectedItem } = useSelectedItem();

    const imageAnimationProps = {
        initial: { scale: 0, borderRadius: '50%' },
        animate: { scale: 1, borderRadius: ['50%', '50%', '10px'] },
        exit: { scale: 0, borderRadius: '50%' },
        transition: { duration: 0.8, ease: 'easeInOut' }
    };

    return (
        <Grid container id={id} justifyContent="center" {...props} >
        
            {(images && ltr) && (
                    <Grid item xs={0} sm={12} md={5} sx={{ position: 'relative' }}>
                        <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootBaseImage' images={images} {...mediaProps} sx={{ position: 'absolute', top: 0}} />

                        <AnimatePresence>
                            {selectedItem != null && (
                                <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootItemImage' images={selectedItem.images} {...mediaProps} sx={{ position: 'absolute', top: 0}} {...imageAnimationProps} />
                            )}
                        </AnimatePresence>
                    </Grid>
            )}
            <Grid item xs={12} md={7} sx={{ position: 'relative' } }>
                <Stack direction="column">
                    <Typography variant={titleVariant} {...titleProps}>{title}</Typography>
                    <Grid container component={motion.div} justifyContent={images ? 'left' : 'center'} sx={{ paddingTop: '3%', paddingBottom: '3%'}} spacing={2}>
                        {children}
                    </Grid>
                </Stack>
                <AnimatePresence>
                    {selectedItem && (
                        <Card component={motion.div} layoutId={selectedItem.id} sx={{ position: 'absolute', top: 0, left: 0, width:'100%', height:'100%' }}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="back" onClick={() => setSelectedItem(null)}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                                title={ selectedItem.title }
                            />
                            <CardContent>
                                {selectedItem.children}
                            </CardContent>
                        </Card>
                    )}
                </AnimatePresence>
            </Grid>
            {(images && !ltr) && (<Grid item xs={0} sm={12} md={5} sx={{ position: 'relative' }}>
                <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootBaseImage' images={images} {...mediaProps} sx={{ position: 'absolute', top: 0}} />

                <AnimatePresence>
                    {selectedItem != null && (
                        <AboutThisSiteSectionMedia key='AboutThisSiteSectionRootItemImage' images={selectedItem.images} {...mediaProps} sx={{ position: 'absolute', top: 0 }} {...imageAnimationProps} />
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