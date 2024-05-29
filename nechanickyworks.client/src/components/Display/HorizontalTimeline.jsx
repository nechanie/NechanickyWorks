import React, { useState } from 'react';
import { Typography, Box, ListItem, Radio, Stack, Collapse, Fade, Grid, Container } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { styled } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';

// Custom styled components for horizontal layout
const HorizontalTimeline = styled(Timeline)({
    flexDirection: 'row',
    alignItems: 'center',
    overflowX: 'auto', // Enables horizontal scrolling
    paddingInline: '20px',
    overflow: 'hidden'
});

const HorizontalTimelineItem = styled(TimelineItem)({
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-end',
    '& .MuiTimelineItem-missingOppositeContent': {
        padding:0
    },
    '&::before': {
        display:'none'
    }
});

const HorizontalTimelineConnector = styled(TimelineConnector)({
    height: '2px',
});
const HorizontalTimelineDot = styled(Radio)({
    flexDirection: 'row',
    alignSelf: 'center',
})
const HorizontalTimelineContentContainer = styled(Box)({
    height: '100%',
    minHeight: '70px',
    alignContent: 'center',
    marginInline: '10px',
    transition: 'box-shadow 0.3s ease',
    cursor: 'pointer', /* Changes the cursor to indicate it's interactive */
    borderRadius: '50%', /* Makes the border-radius fully round */
    '&:hover .MuiTimelineDot-root': {
        transform: 'scale(1.08)',
        backgroundColor: 'red',
        boxShadow: '0 0 8px 4px rgba(0, 0, 0, 0.2)'
    }
})

function CustomHorizontalTimeline({ timelineEvents=[], spacingTop = '2%', spacingBottom = '2%', minDistance = { xs: '70px', sm: '100px', md: '120px', lg: '150px', xl: '180px' }, labelRotation = '-45deg', labelShiftX='-5%', labelShiftY='0' }) {
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

    const HorizontalTimelineContent = styled(TimelineContent)({
        textAlign: 'center',
        position: 'absolute',
        paddingInline: 0,
        top: -10,
        left:0,
        width: 'fit-content',
        textWrap: 'nowrap',
        transformOrigin: 'top left'
    });

    return (
        <React.Fragment>
            <Stack direction='column' align='center'>
                    <HorizontalTimeline position="left" sx={{ paddingTop: spacingTop, paddingBottom: spacingBottom }}>
                        {timelineEvents.map((data, index) => (
                            <>
                            <HorizontalTimelineItem key={index}>
                                <HorizontalTimelineContentContainer>
                                        <HorizontalTimelineContent>{data.dates[0]}</HorizontalTimelineContent>
                                        <HorizontalTimelineDot value={index} checkedIcon={<CircleIcon color="success" />} icon={<CircleIcon sx={{ color: 'black' }} />} color="secondary" size="small" checked={parseInt(activeItem) === index} onChange={handleChange} />
                                </HorizontalTimelineContentContainer>
                            </HorizontalTimelineItem>
                                {index !== timelineEvents.length - 1 && <HorizontalTimelineConnector sx={{ minWidth: minDistance, flexGrow: index !== timelineEvents.length - 1 ? 1 : 0 }} />}
                            </>
                        ))}
                    </HorizontalTimeline>
                    <Container maxWidth='sm'>
                        {timelineEvents.map((data, index) => (
                            <Fade key={index} in={parseInt(activeItem) === index && hasExited} timeout={1000} onExited={() => (setHasExited(true))} mountOnEnter unmountOnExit>
                                <Stack direction="column" justifyContent='space-around' height='100%'>
                                    <Typography align='center' variant='h6' sx={{ fontWeight: 'bold', fontSynthesisWeight: 'auto', letterSpacing: '1px'} }>{data.title}</Typography>
                                    <Typography align='center' variant='subtitle' gutterBottom>{data.dates[0]}{data.dates[1] ? ` - ${data.dates[1]}` : ''}</Typography>
                                    <Typography align='center' variant='body1'>{data.details}</Typography>
                                </Stack>
                            </Fade>
                        ))}
                    </Container>
            </Stack>
        </React.Fragment>
    );
}

export default CustomHorizontalTimeline;