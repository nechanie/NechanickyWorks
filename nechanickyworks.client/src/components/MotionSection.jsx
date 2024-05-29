import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';


const sectionVariants = {
    visible: {
        transformPerspective: 800,
        rotateY: 0,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: {
            blur: 0
        },
        opacity: 1
    },
    hidden: {
        transformPerspective: 800,
        rotateY: 25,
        scale: 0.5,
        rotateX: 10,
        filter: {
            blur: 2
        },
        opacity: 0.5
    }
};

const itemVariants = {
    visible: {
        y: 0,
        opacity: 1
    },
    hidden: {
        y: -200,
        opacity: 0
    }
}

const MotionSectionTitle = ({ ...props }) => {
    return (
        <Typography component={motion.div} variants={itemVariants} transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 0.5 }} variant='h2' {...props}>
            {props.children}
        </Typography>
    );
}

const MotionSection = ({ id, title, children, titleProps = {}, ...props }) => (
    <Box component={motion.div} initial="hidden" whileInView="visible" viewPort={{ amount: 0.2 }} transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 0.3 }}>
        <MotionSectionTitle {...titleProps}>{title}</MotionSectionTitle>
        <Box id={id} component={motion.div} variants={ sectionVariants } transition={{ ease: [0.17, 0.67, 0.83, 0.67], duration: 0.3 }}  {...props}>
            {children}
        </Box>
    </Box>
);

export default MotionSection;