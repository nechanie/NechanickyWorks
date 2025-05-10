import React, { useState } from 'react';
import { Card, Typography, CardContent, IconButton, CardHeader, CardActionArea } from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ExpandingCard = ({ title, custom, initial, animate, variants, children, ...props }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(true);
    };

    const handleCloseClick = () => {
        setExpanded(false);
    };

    return (
        <Card
            component={motion.div}
            custom={custom}
            initial={initial}
            animate={expanded ? 'expanded' : 'initial'}
            variants={variants}
            { ...props }
        >
            {expanded ? (
                <>
                    <CardHeader
                        action={
                            <IconButton size="small" onClick={handleCloseClick}>
                                <Close />
                            </IconButton>
                        }
                    />
                    <CardContent sx={{height: '100%', p:'3%'} }>
                        {children.props.children}
                    </CardContent>
                </>
            ) : (
                <CardActionArea onClick={!expanded ? handleExpandClick : undefined}>
                    <CardContent
                        sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption">{title}</Typography>
                    </CardContent>
                </CardActionArea>)}
            
        </Card>
    );
};

export default ExpandingCard;
