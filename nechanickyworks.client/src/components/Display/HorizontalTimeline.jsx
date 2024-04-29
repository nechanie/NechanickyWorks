import React, { useState } from 'react';
import { Typography, Box, ListItem, Radio, Stack, Collapse, Fade } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';
import { styled } from '@mui/system';
import CircleIcon from '@mui/icons-material/Circle';

// Custom styled components for horizontal layout
const HorizontalTimeline = styled(Timeline)({
    flexDirection: 'row',
    alignItems: 'center',
    overflowX: 'auto', // Enables horizontal scrolling
    paddingInline: '20px',
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

function CustomHorizontalTimeline({ spacingTop = '10%', spacingBottom = '20px', minDistance = { xs: '70px', sm: '100px', md: '120px', lg: '150px', xl: '180px' }, labelRotation = '-45deg', labelShiftX='-5%', labelShiftY='0' }) {
    const [activeItem, setActiveItem] = useState(0);
    const [wrappable, setWrappable] = useState(true);
    const handleChange = (event) => {
        setActiveItem(event.target.value);
    };
    const itemList = ['This is some long text', 'This is some long text', 'This is some long text', 'This is some long text', 'This is some long text']
    const HorizontalTimelineContent = styled(TimelineContent)({
        textAlign: 'center',
        position: 'absolute',
        paddingInline: 0,
        top: 0,
        left: '15px',
        width: 'fit-content',
        textWrap: 'nowrap',
        transformOrigin: 'top left',
        transform: `rotate(${labelRotation}) translateX(${labelShiftX}) translateY(${labelShiftY})`
    });

    const onEnterFormat = () => {
        setWrappable(false);
    }
    const onEnteredFormat = () => {
        setWrappable(true);
    }
    return (
        <React.Fragment>
            <HorizontalTimeline position="left" sx={{ paddingTop: spacingTop, paddingBottom: spacingBottom }}>
                {itemList.map((text, index) => (
                    <HorizontalTimelineItem key={index} sx={{ minWidth: minDistance }}>
                        {index !== itemList.length - 1 && <HorizontalTimelineConnector />}
                        <HorizontalTimelineContentContainer>
                            <HorizontalTimelineContent>{text}</HorizontalTimelineContent>
                            <HorizontalTimelineDot value={index} checkedIcon={<CircleIcon color="success" />} icon={<CircleIcon sx={{ color: 'black' }} />} color="secondary" size="small" checked={parseInt(activeItem) === index} onChange={handleChange} />
                        </HorizontalTimelineContentContainer>
                    </HorizontalTimelineItem>
                ))}
            </HorizontalTimeline>
            
        </React.Fragment>
    );
}

export default CustomHorizontalTimeline;