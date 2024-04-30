import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { faCircle as fasCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { styled } from '@mui/system';
import FontAwesomeSvgIcon from '../utils/FontAwesomeSvgIcon';

const SkillItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
})
const SkillDetails = styled(Box)({
    display: 'flex',
    flexDirection: 'column'
})

const SkillIcon = styled(FontAwesomeSvgIcon)({
    fontSize: '24px',
    marginRight: '10px',
    color: '#333'
})

const SkillLevelIcon = styled(FontAwesomeSvgIcon)({
    marginRight: '2px',
    color: '#4CAF50'
})

const SkillName = styled(Typography)({
    fontSize: '16px',
    color: '#444', /* Adjust the color as needed */
    margin: 0
})

const SkillProficiency = styled(Box)({
    display: 'flex'
})

const SkillDescription = styled(Typography)({
    fontSize: '12px',
    color: '#666', /* Adjust the color as needed */
    marginTop: '5px'
})

function CalculateExperience(date) {
    const now = new Date();
    const past = new Date(date);
    const months = (now.getFullYear() - past.getFullYear()) * 12 + now.getMonth() - past.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return { years, months: remainingMonths };
}

const SkillMatrixItem = ({ skill }) => {
    const { name, level, icon, description, startDate } = skill;

    const { years, months } = CalculateExperience(startDate);
    return (
        <SkillItem>
            {icon && <SkillIcon icon={icon}/>}
            <SkillDetails>
                <SkillName variant='h4'>{name}</SkillName>
                <SkillProficiency>
                    <Rating name="read-only" value={level} readOnly max={5} />
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
