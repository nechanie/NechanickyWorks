import React, { useState, useEffect } from 'react';
import {Paper, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, Checkbox, Box, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import UnavailableServiceOverlay from '../Display/UnavailableServiceOverlay';
import DoubleRippleButton from '../Custom/DoubleRippleButton';
import FormQueueDisplay from '../Shared/FormQueueDisplay';

const TrustworthyMLForm = ({ onSubmit, isDisabled, queuePosition, timeStart, isActive }) => {
    const [isBackendHealthy, setIsBackendHealthy] = useState(false);
    const [isAltDisabled, setIsAltDisabled] = useState(true);
    const theme = useTheme();
    const [formData, setFormData] = useState({
        model: 'LeNet',
        dataset: 'MNIST',
        epochs: 1,
        learningRate: 0.002,
        batchSize: 100,
        includeDropout: false,
        dropoutRate: 0,
        randomRotations: false,
        randomFlips: false,
        attackEvaluation: false,
        epsilonValue: 0.3,
        alphaValue: 0.007843,
        numberOfIterations: 40,
        randomInitializer: true,
    });

    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await axios.get(`https://${import.meta.env.VITE_API_ENDPOINT_HOST}/healthcheck/health`);
                if (response.status === 200 && response.data.status === 'healthy') {
                    setIsBackendHealthy(true);
                    setIsAltDisabled(false);
                } else {
                    setIsBackendHealthy(false);
                    setIsAltDisabled(true);
                }
            } catch (error) {
                setIsBackendHealthy(false);
                setIsAltDisabled(true);
            }
        };

        checkBackendHealth();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
        // Here you might send the form data to a server or process it further
    };

    return (
        <Container maxWidth="md" align='center' sx={{ my: '3%' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                {isBackendHealthy && (
                    <Box sx={{ position: 'relative', display: 'flex', width:"100%", height:'fit-content', justifyContent: 'end' }}> {/* Positioning the icon */}
                        <CheckCircleOutlineIcon color='success'/>
                    </Box>
                )}
                <Typography variant="h4" gutterBottom>
                    Demo Configuration
                </Typography>
                <UnavailableServiceOverlay isServiceAvailable={isBackendHealthy}>
                    <FormQueueDisplay timeStart={timeStart} isActive={isActive} queuePosition={ queuePosition }>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6">Model Choice</Typography>
                                    <FormControl fullWidth margin="normal" disabled={isDisabled || isAltDisabled}>
                                    <InputLabel >Model</InputLabel>
                                    <Select
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        label="Model"
                                    
                                    >
                                        <MenuItem value="LeNet">LeNet</MenuItem>
                                        <MenuItem value="VGG">VGG</MenuItem>
                                        <MenuItem value="ResNet">ResNet</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl component="fieldset" margin="normal" disabled={isDisabled || isAltDisabled}>
                                    <RadioGroup
                                        row
                                        name="dataset"
                                        value={formData.dataset}
                                        onChange={handleInputChange}
                                    >
                                        <FormControlLabel value="MNIST" control={<Radio  />} label="MNIST" />
                                        <FormControlLabel value="CIFAR10" control={<Radio  />} label="CIFAR10" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                <Typography variant="h6">Hyperparameters</Typography>
                                <TextField
                                    fullWidth
                                    name="learningRate"
                                    label="Learning Rate"
                                    type="number"
                                    margin="normal"
                                    value={formData.learningRate}
                                    onChange={handleInputChange}
                                        inputProps={{ step: 0.001, min: 0, maxLength: 6 }}
                                    disabled={isDisabled || isAltDisabled}
                                    />
                                    <TextField
                                        fullWidth
                                        name="epochs"
                                        label="Epochs"
                                        type="number"
                                        margin="normal"
                                        value={formData.epochs}
                                        onChange={handleInputChange}
                                        inputProps={{ step: 1, min: 1, max: 20 }}
                                    disabled={isDisabled || isAltDisabled}
                                    />
                                <TextField
                                    fullWidth
                                    name="batchSize"
                                    label="Batch Size"
                                    type="number"
                                    margin="normal"
                                    value={formData.batchSize}
                                    onChange={handleInputChange}
                                        inputProps={{ min: 1, max: 1000 }}
                                    disabled={isDisabled || isAltDisabled}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="includeDropout" 
                                            checked={formData.includeDropout}
                                                onChange={handleInputChange}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                    }
                                    label="Include Dropout"
                                />
                                {formData.includeDropout && (
                                    <TextField
                                        fullWidth
                                        name="dropoutRate"
                                        label="Dropout Rate"
                                        type="number"
                                        margin="normal"
                                        value={formData.dropoutRate}
                                        onChange={handleInputChange}
                                            inputProps={{ step: 0.1, min: 0, max: 20, maxLength: 4 }}
                                        disabled={isDisabled || isAltDisabled}
                                    />
                                )}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="randomRotations" 
                                            checked={formData.randomRotations}
                                                onChange={handleInputChange}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                    }
                                    label="Random Rotations"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="randomFlips" 
                                            checked={formData.randomFlips}
                                                onChange={handleInputChange}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                    }
                                    label="Random Flips"
                                />
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="attackEvaluation"
                                            checked={formData.attackEvaluation}
                                                onChange={handleInputChange}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                    }
                                    label="Attack Evaluation"
                                />
                                {formData.attackEvaluation && (
                                    <Box>
                                        <TextField
                                            fullWidth
                                            name="epsilonValue"
                                            label="Epsilon Value"
                                            type="number"
                                            margin="normal"
                                            value={formData.epsilonValue}
                                            onChange={handleInputChange}
                                                inputProps={{ step: 0.1, min: 0, max: 5, maxLength: 10 }}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                        <TextField
                                            fullWidth
                                            name="alphaValue"
                                            label="Alpha Value"
                                            type="number"
                                            margin="normal"
                                            value={formData.alphaValue}
                                            onChange={handleInputChange}
                                                inputProps={{ step: 0.000001, min: 0, max: 3, maxLength: 10 }}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                        <TextField
                                            fullWidth
                                            name="numberOfIterations"
                                            label="Number of Iterations"
                                            type="number"
                                            margin="normal"
                                            value={formData.numberOfIterations}
                                            onChange={handleInputChange}
                                                inputProps={{ min: 1, max: 100 }}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="randomInitializer"
                                                    checked={formData.randomInitializer}
                                                        onChange={handleInputChange}
                                                    disabled={isDisabled || isAltDisabled}
                                                />
                                            }
                                            label="Random Initializer"
                                        />
                                    </Box>
                                )}
                            </Box>
                            <DoubleRippleButton hoverColor={theme.palette.common.white} rippleColor={theme.palette.primary.dark} startingColor={ theme.palette.primary.main } type="submit" variant="contained"  disabled={isDisabled || isAltDisabled}>
                                Submit
                            </DoubleRippleButton>
                        </form>
                    </FormQueueDisplay>
                </UnavailableServiceOverlay>
            </Paper>
        </Container>
    );
};

export default TrustworthyMLForm;
