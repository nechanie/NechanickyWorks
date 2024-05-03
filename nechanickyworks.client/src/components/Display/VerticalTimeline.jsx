import React, { useState } from 'react';
import { Typography, Box, ListItem, Radio, Stack, Collapse, Fade, Grid } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineOppositeContent, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { styled } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';


const VerticalTimelineDot = styled(Radio)({
    flexDirection: 'column',
    alignSelf: 'center',
})

const VerticalTimelineItem = styled(TimelineItem)({
    '&::before': {
        display:'none'
    }
})
const VerticalTimeline = ({ timelineEvents=[] }) => {
    const [firstRender, setFirstRender] = useState(true);
    const [activeItem, setActiveItem] = useState(0);
    const [hasExited, setHasExited] = useState(true);

    const handleChange = (event) => {
        if (!firstRender) {
            setFirstRender(false);
        }
        setHasExited(false);
        setActiveItem(event.target.value);
    };
    return (
        <Stack direction='row' spacing={1}>
            <Timeline position='left' sx={{ maxWidth: { 'xs': 'unset', 'sm': "25%", 'lg': '20%' }, minWidth: { 'xs': 'unset', 'sm': "25%", 'lg': '20%' } }}>
                    {timelineEvents.map((data, index) => (
                        <VerticalTimelineItem key={index}>
                            <TimelineSeparator>
                                <VerticalTimelineDot value={index} checkedIcon={<CircleIcon color="secondary" />} icon={<CircleIcon />} color="secondary" size="small" checked={parseInt(activeItem) === index} onChange={handleChange} />
                                {index !== timelineEvents.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                { data.dates[0] }
                            </TimelineContent>
                        </VerticalTimelineItem>
                    ))}
                </Timeline>
                <Box sx={{height:'100%', padding:'2%'} }>
                    {timelineEvents.map((data, index) => (
                        <Fade key={index} in={parseInt(activeItem) === index && hasExited} timeout={1000} onExited={() => (setHasExited(true)) } mountOnEnter unmountOnExit>
                            <Stack direction="column" justifyContent='space-around' height='100%' sx={{padding: '2%'} }>
                                <Typography align='center' variant='h6' sx={{ fontWeight: 'bold', fontSynthesisWeight: 'auto', letterSpacing: '1px' }}>{data.title}</Typography>
                                <Typography align='center' variant='subtitle' gutterBottom>{data.dates[0]}{data.dates[1] ? ` - ${data.dates[1]}` : ''}</Typography>
                                <Typography align='center' variant='body1'>{data.details}</Typography>
                            </Stack>
                        </Fade>
                    ))}
                </Box>
        </Stack>
    );
}

export default VerticalTimeline;