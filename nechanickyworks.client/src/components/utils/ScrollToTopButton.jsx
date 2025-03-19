import React from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const ScrollToTopButton = () => {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100, // Trigger the button to appear after scrolling down 100px
    });

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {trigger && (
                <Fab
                    color="secondary"
                    size="small"
                    onClick={handleClick}
                    sx={{
                        position: 'fixed',
                        bottom: theme.spacing(2),
                        right: theme.spacing(2)
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </div>
    );
};

export default ScrollToTopButton;
