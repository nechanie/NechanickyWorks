import React, { useState } from 'react';
import { useTheme, Zoom, Box, SpeedDial, SpeedDialAction, } from '@mui/material';
import { Toc } from '@mui/icons-material';


function CustomFabContent({ icon, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
            <span style={{ marginLeft: 8 }}>{text}</span>
        </div>
    );
}

const TocSpeedDial = ({ showStickyToc, actions }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNavigation = (e, link) => {
        e.preventDefault();
        setOpen(false);
        const targetElement = document.getElementById(link);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Zoom
            in={showStickyToc}
            style={{
                transformOrigin: 'top left',
            }}
        >
            <Box sx={{ position: 'fixed', top: 0, left: 0, transform: 'translateZ(0px)', width: '100vw', height: '100vh', zIndex: 10 }}>
                

                <SpeedDial
                    ariaLabel="Table of Contents Speed Dial"
                    sx={{ position: 'absolute', top: theme.spacing(2), left: theme.spacing(2)}}
                    FabProps={{ sx: { position: 'relative', maxWidth: '56px', alignSelf: 'start' }, color: 'secondary' }}
                    icon={<Toc />}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    open={open}
                    direction='down'
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            onClick={(e) => handleNavigation(e, action.link)}
                            icon={<CustomFabContent icon={action.icon} text={action.name} />}
                            FabProps={{ variant: 'extended'}}
                        />
                    ))}
                </SpeedDial>

            </Box>
        </Zoom>
    );
};
export default TocSpeedDial;