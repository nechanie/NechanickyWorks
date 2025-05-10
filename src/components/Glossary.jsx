import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, List, ListItem, ListItemText, Button, useTheme } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const glossaryTerms = [
    { term: "Machine Learning", definition: "A way for computers to learn and make decisions from data without being directly programmed to do so." },
    { term: "Hyperparameter", definition: "Settings or dials that you adjust to control the learning process of a machine learning model." },
    { term: "Epoch", definition: "Each time the computer sees the entire set of data you have." },
    { term: "Batch", definition: "A small group of data points from the entire dataset." },
    { term: "Dropout", definition: "A trick to help the computer not to rely too much on any one piece of information." },
    { term: "Training Accuracy", definition: "A score that tells you how well the computer's model is guessing the answers correctly during training." },
    { term: "Loss", definition: "This number tells you how wrong the model's predictions are." },
    { term: "Robustness", definition: "How well the computer's model can handle new and different kinds of data that it wasn't trained on." }
];

const Glossary = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    return (
        <React.Fragment>
            <Button onClick={handleOpen} startIcon={<HelpOutlineIcon />} sx={{color: theme.palette.info.dark} }>
                Glossary
            </Button>
            <Dialog open={open} onClose={handleClose} scroll="paper">
                <DialogTitle>Glossary of Terms</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color:'inherit'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <List>
                        {glossaryTerms.map((item, index) => (
                            <ListItem key={index} alignItems="flex-start">
                                <ListItemText
                                    primary={<Typography variant="caption" sx={{fontWeight: 'bold', fontSynthesisWeight:'auto', textDecoration: 'underline', letterSpacing:'0.25rem'}} color="textPrimary">
                                        {item.term}
                                    </Typography>} 
                                    secondary={
                                        <Typography variant="body1" color="textPrimary">
                                            {item.definition}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default Glossary;
