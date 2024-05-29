import * as React from 'react';
import { Button, useTheme } from '@mui/material';
import { styled } from '@mui/system';

// Define the styled component using a function to handle custom styling
const createCoverButton = (startingColor, rippleColor, hoverColor, backgroundColor) => styled(Button)({
    position: 'relative',
    width: 'fit-content',
    overflow: 'hidden', // Ensure the ripple effect is contained within the button boundaries
    transition: 'background-color 0.3s',
    backgroundColor: backgroundColor,
    zIndex: 1,
    '&:hover': {
        color: `${hoverColor} !important`,
        borderColor: hoverColor,
        backgroundColor: backgroundColor,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundPosition: 'var(--backgroundPos)',
            backgroundImage: `radial-gradient(circle at var(--backgroundPos), ${rippleColor} 10%, transparent 20%)`,
            backgroundSize: '0 0',
            animation: 'ripple 1s forwards',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
        }
    },
    '@keyframes ripple': {
        from: {
            backgroundSize: '0 0',
        },
        to: {
            backgroundSize: '1000% 1000%', // Adjust scale to ensure coverage
        },
    }
});

const DoubleRippleButton = ({ rippleColor, startingColor, hoverColor = 'unset', addBackground = null, ...props }) => {
    const [backgroundPos, setBackgroundPos] = React.useState('50% 50%');
    // Create a styled button dynamically based on the colors
    const theme = useTheme();
    const backgroundColor = addBackground ? addBackground : startingColor;
    const CoverButton = React.useMemo(() => createCoverButton(startingColor, rippleColor, hoverColor, backgroundColor), [startingColor, rippleColor, hoverColor, backgroundColor]);
    const handleMouseEnter = React.useCallback((event) => {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setBackgroundPos(`${Math.abs(x)}% ${Math.abs(y)}%`);
    }, []);

    return (
        <CoverButton
            style={{ '--backgroundPos': backgroundPos }}
            onMouseEnter={handleMouseEnter}
            {...props}
        >
            {props.children}
        </CoverButton>
    );
}

export default DoubleRippleButton;