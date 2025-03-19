import * as React from 'react';
import { Button, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const ContrastButton = ({ addBackground = false, ...props }) => {
    const theme = useTheme();
    const color = theme.palette.common.white;
    const [backgroundPos, setBackgroundPos] = React.useState(null);
    const [isMouseOver, setIsMouseOver] = React.useState(false);


    const handleMouseEnter = (event) => {
        if (!isMouseOver) {
            setIsMouseOver(true); // Set the flag to true when mouse enters
            const rect = event.target.getBoundingClientRect();
            // Calculate the x and y positions as a percentage of the element's width and height
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setBackgroundPos(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
        }
    };

    const handleMouseLeave = () => {
        setIsMouseOver(false); // Reset the flag when mouse leaves
    };

    const CoverButton = styled(Button)`
        color: ${color};
        border-color: ${color};
        width: fit-content;
        marginLeft: auto;
        marginRight: auto;
        &:hover {
            color: ${theme.palette.secondary.main};
            background-repeat: no-repeat;
            background-image: radial-gradient(circle at ${backgroundPos}, ${theme.palette.primary.main} 10%, transparent 10%);
            background-position: ${backgroundPos};
            animation: ripple 0.5s forwards;
        }
        @keyframes ripple{
            from {
                background-size: 0 0;
                border-color:${color}
            }
            to {
                background-size: 1000% 1000%;
                border-color:${theme.palette.secondary.main}
            }
        }
    `;

    return (
        <CoverButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            sx={{
                ...props.sx,
                backgroundColor: (addBackground ? 'rgba(0,0,0,0.4)': 'transparent'),
            }}
            component={Link}>
            {props.children}
        </CoverButton>
    );
}

export default ContrastButton;