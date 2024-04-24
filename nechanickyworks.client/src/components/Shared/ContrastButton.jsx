import * as React from 'react';
import { Button, Link } from '@mui/material';

const ContrastButton = ({ addBackground = false, ...props }) => {

    return (
        <Button
            {...props}
            sx={{
                ...props.sx,
                width: 'fit-content',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: (addBackground ? 'rgba(0,0,0,0.4)': 'transparent'),
            }}
            component={Link}>
            {props.children}
        </Button>
    );
}

export default ContrastButton;