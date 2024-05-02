import * as React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const DoubleRippleButton = ({ rippleColor, startingColor, ...props }) => {
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
        &:hover {
            background-color: ${startingColor};
            background-repeat: no-repeat;
            background-image: radial-gradient(circle at ${backgroundPos}, ${rippleColor} 10%, transparent 10%);
            background-position: ${backgroundPos};
            animation: ripple 0.5s forwards;
        }
        @keyframes ripple{
            from {
                background-size: 0 0;
            }
            to {
                background-size: 1000% 1000%;
            }
        }
    `;

    return (
        <CoverButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            >
            {props.children}
        </CoverButton>
    );
}

export default DoubleRippleButton;