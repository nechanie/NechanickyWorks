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
const VerticalTimeline = () => {
    const [firstRender, setFirstRender] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const [hasExited, setHasExited] = useState(true);

    const handleChange = (event) => {
        if (!firstRender) {
            setHasExited(false);
        }
        else {
            setFirstRender(false);
        }
        setActiveItem(event.target.value);
    };
    const itemList = [['This is some long text', 'date: Mar. 2020'], ['This is some long text', 'date: Mar. 2020'], ['This is some long text', 'date: Mar. 2020'], ['This is some long text', 'date: Mar. 2020']]

    return (
        <Grid container spacing={1}>
            <Grid item xs={5}>
                <Timeline position='left'>
                    {itemList.map((data, index) => (
                        <VerticalTimelineItem key={index}>
                            <TimelineSeparator>
                                <VerticalTimelineDot value={index} checkedIcon={<CircleIcon color="success" />} icon={<CircleIcon sx={{ color: 'black' }} />} color="secondary" size="small" checked={parseInt(activeItem) === index} onChange={handleChange} />
                                {index !== itemList.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                {data[0]}
                                <br />
                                {data[1]}
                            </TimelineContent>
                        </VerticalTimelineItem>
                    ))}
                </Timeline>
            </Grid>
            <Grid item xs={7}>
                <Box sx={{height:'100%', padding:'2%'} }>
                    {itemList.map((data, index) => (
                        <Fade key={index} in={parseInt(activeItem) === index && hasExited} timeout={1000} onExited={() => (setHasExited(true)) } mountOnEnter unmountOnExit>
                            <Stack direction="column" justifyContent='space-around' height='100%'>
                                <Typography align='center' variant='h4'><u>This is the header</u></Typography>
                                <Typography align='center' variant='body1'>This is the body content of the content section for fade item {index}</Typography>
                            </Stack>
                        </Fade>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

export default VerticalTimeline;