import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Stack, Chip, Box, Switch, FormControlLabel, Divider } from '@mui/material';
import InteractiveCardMedia from '../Shared/InteractiveCardMedia';
import ComingSoonOverlay from './ComingSoonOverlay';

const CardTableItemTag = ({ tag, ...props }) => {
    let tagColor = null;
    switch (tag.ref) {
        case 'ed':
            tagColor = 'error';
            break;
        case 'demo':
            tagColor = 'info';
            break;
        case 'ml':
            tagColor = 'success';
            break;
        case 'pres':
            tagColor = 'warning';
            break;
    }
    return (
        <Chip variant="outlined" label={tag.text} color={tagColor} size="small" {...props} />
    );
};

const CardTableItem = ({ projectData, ...props }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(projectData.href);
    };
    return (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} {...props}>
            <Card sx={{ maxWidth: 345, minHeight: 300}}>
                <CardActionArea onClick={(projectData.comingSoon ? null : handleCardClick)} sx={{minHeight:"inherit"} }>
                    <InteractiveCardMedia text={projectData.description} sx={{ height: '100%' }} comingSoon={projectData.comingSoon}>
                        {projectData.comingSoon ? (<ComingSoonOverlay>
                            <CardMedia
                                component={Box}
                                sx={{ minHeight: 200, maxWidth: 'inherit' }}
                                image={projectData.image}
                            />
                        </ComingSoonOverlay>) : (
                                <CardMedia
                                    component={Box}
                                    sx={{ minHeight: 200, maxWidth: 'inherit' }}
                                    image={projectData.image}
                                />
                        )}
                        <CardContent sx={{ width: 'fit-content' }}>
                            <Stack alignItems='center'>
                                <Typography gutterBottom align='center' variant="Caption" sx={{width:'fit-content'} }>
                                    {projectData.name}
                                </Typography>
                                <Box sx={{ width: 'fit-content' }}>
                                {projectData.tags.map((tag) => (
                                    <CardTableItemTag key={tag.id} tag={tag} />
                                ))}
                                </Box>
                            </Stack>
                        </CardContent>
                    </InteractiveCardMedia>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

const CardTable = ({ projectList = null, defaultFilter=null }) => {

   

    const [activeTags, setActiveTags] = useState((defaultFilter !== null ? [defaultFilter] : []));

    const toggleTag = (tag) => {
        setActiveTags((currentTags) => currentTags.includes(tag) ? currentTags.filter(t => t !== tag) : [...currentTags, tag]);
    };

    const filteredData = projectList.filter(project =>
        activeTags.length === 0 || project.tags.some(tag => activeTags.includes(tag.ref))
    );
    return (
        <React.Fragment>
            <Stack direction='column' spacing={2} sx={{height:"100%"} } >
                <Grid container spacing={0} sx={{ p: "2%", height: "fit-content", width: "100%" }}>
                    <Grid item sx={{my:'auto', mx: "4%"} }>
                        <Typography>Project Categories:</Typography>
                    </Grid>
                    {[{
                        id: 1, color: 'error', text: 'Educational', ref: 'ed'
                    }, { id: 2, color: 'info', text: 'Interactive Demo', ref: 'demo' }, { id: 3, color: 'success', text: 'Machine Learning', ref: 'ml' }, { id: 4, color: 'warning', text: 'Presentation', ref: 'pres' }].map((tag) => (
                        <Grid item key={tag.id}>
                            <FormControlLabel
                                control={<Switch checked={activeTags.includes(tag)} onChange={() => toggleTag(tag.ref)} sx={{display:'none'}} />}
                                label={<Chip label={tag.text} color={activeTags.includes(tag.ref) ? tag.color : 'default'} />}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Divider variant='middle' oreientation='horizontal' />
                <Grid container spacing={2} sx={{px:"2%", maxHeight:'100%', height: "100%", width:"100%", overflowY:'scroll'} }>
                    {filteredData.map((project) => (
                        <CardTableItem key={project.id} projectData={project} />
                    ))}
                </Grid>
            </Stack>
        </React.Fragment>
    );
}

export default CardTable;