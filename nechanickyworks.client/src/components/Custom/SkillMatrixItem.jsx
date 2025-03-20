import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { styled } from '@mui/system';
import FontAwesomeSvgIcon from '../utils/FontAwesomeSvgIcon';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

const SkillItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    transition: 'background-color 0.3s', // Smooth background transition on hover
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.04)' // Highlight on hover for focus
    }
});
const SkillDetails = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
})

const SkillIcon = styled(FontAwesomeSvgIcon)({
    fontSize: '24px',
    marginRight: '15px', // Space between icon and text
    color: 'primary.main' // Use primary color from theme
});

const SkillName = styled(Typography)({
    fontSize: '16px',
    fontWeight: 'bold', // More emphasis on skill names
    color: 'text.primary'
});

const SkillProficiency = styled(Box)({
    display: 'flex',
    marginTop: '5px'
});

const SkillDescription = styled(Typography)({
    fontSize: '14px',
    color: 'text.secondary'
});

function CalculateExperience(date) {
    const now = new Date();
    const past = new Date(date);
    const months = (now.getFullYear() - past.getFullYear()) * 12 + now.getMonth() - past.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return { years, months: remainingMonths };
}


const getColorForLevel = (value) => {
    switch (value) {
        case 1:
            return 'rgb(255, 0, 0)';  // Red
        case 2:
            return 'rgb(255, 165, 0)';  // Orange
        case 3:
            return 'rgb(255, 215, 0)';  // Gold
        case 4:
            return 'rgb(154, 205, 50)';  // Yellow Green
        case 5:
            return 'rgb(0, 128, 0)';  // Green
        default:
            return 'rgb(211, 211, 211)';  // Light Grey for undefined levels
    }
};

const ColoredCircleIcon = styled(CircleIcon)(({ theme, value }) => ({
    color: getColorForLevel(value), // Dynamic coloring based on skill level
    fontSize: 'inherit'
}));

const RatingStyled = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'primary.main', // Ensure filled icons use the primary color
    },
    '& .MuiRating-iconHover': {
        color: 'primary.light', // Lighter color on hover
    }
});

const SkillMatrixItem = ({ skill }) => {
    const { name, level, icon, description, years, months } = skill;

    return (
        <SkillItem>
            {icon && <SkillIcon icon={icon}/>}
            <SkillDetails>
                <SkillName variant='h4'>{name}</SkillName>
                <SkillProficiency>
                    <RatingStyled
                        name="read-only"
                        value={level}
                        max={5}
                        readOnly
                        icon={<ColoredCircleIcon value={level} max={5} />}
                        emptyIcon={<CircleOutlinedIcon fontSize='inherit' />}
                    />
                </SkillProficiency>
                <SkillDescription variant='body1'>{description}</SkillDescription>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1">
                        <strong>Years:</strong> {years},
                    </Typography>
                    <Typography variant="body1">
                        <strong>Months:</strong> {months}
                    </Typography>
                </Box>
            </SkillDetails>
        </SkillItem>
    );
};

export default SkillMatrixItem;
