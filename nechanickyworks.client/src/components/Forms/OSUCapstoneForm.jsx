import React, { useState } from 'react';
import {
    Container, Paper, Typography, Box, TextField, Button, FormControl,
    InputLabel, Select, MenuItem
} from '@mui/material';

const OSUCapstoneForm = ({ onSubmit, isDisabled }) => {
    const [profileNumber, setProfileNumber] = useState('');
    const [numProfilesToGenerate, setNumProfilesToGenerate] = useState('');
    const [numSimilarResults, setNumSimilarResults] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            profileNumber,
            numProfilesToGenerate,
            numSimilarResults,
        };
        onSubmit(formData);
    };

    return (
        <Container maxWidth="md" sx={{ m: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Demo Configuration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Profile Number (1-50,000)"
                            type="number"
                            value={profileNumber}
                            onChange={e => setProfileNumber(e.target.value)}
                            disabled={isDisabled}
                            inputProps={{ min: 1, max: 50000 }}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Number of Profiles to Generate Embeddings For"
                            type="number"
                            value={numProfilesToGenerate}
                            onChange={e => setNumProfilesToGenerate(e.target.value)}
                            disabled={isDisabled}
                            inputProps={{ min: 1, max: 50000 }}
                        />
                    </Box>

                    <Box sx={{ marginBottom: 2 }}>
                        <FormControl fullWidth margin="normal" disabled={isDisabled}>
                            <InputLabel>Number of Similar Results to Display</InputLabel>
                            <Select
                                value={numSimilarResults}
                                onChange={e => setNumSimilarResults(e.target.value)}
                                label="Number of Similar Results to Display"
                            >
                                {[1, 5, 10, 15, 20, 25, 30].map((number) => (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>
                        Find Similar Profiles
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default OSUCapstoneForm;
