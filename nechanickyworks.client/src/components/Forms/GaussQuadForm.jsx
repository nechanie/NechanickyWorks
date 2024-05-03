import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, TextField, Button, IconButton, FormControl,
    InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormGroup, useTheme
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import UnavailableServiceOverlay from '../Display/UnavailableServiceOverlay';
import DoubleRippleButton from '../Custom/DoubleRippleButton';


const GaussQuadForm = ({ onSubmit, isDisabled }) => {
    const [isBackendHealthy, setIsBackendHealthy] = useState(false);
    const [isAltDisabled, setIsAltDisabled] = useState(true);
    const [functionType, setFunctionType] = useState('polynomial');
    const [polynomialFields, setPolynomialFields] = useState([{ coefficient: '', power: '' }]);
    const [exponential, setExponential] = useState({ a: '', b: '' });
    const [intervalStart, setIntervalStart] = useState('');
    const [intervalStop, setIntervalStop] = useState('');
    const [nodes, setNodes] = useState('');
    const [formError, setFormError] = useState('');
    const theme = useTheme();

    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await axios.get('https://access.nechanickyworks.com/healthcheck/health');
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

    const validateForm = () => {
        console.log(polynomialFields);
        if (parseInt(intervalStart) >= parseInt(intervalStop)) {
            setFormError('Interval start must be less than interval stop.');
            return false;
        }
        if (functionType === 'exponential' && (!exponential.a || !exponential.b)) {
            setFormError('Coefficients a and b must not be empty.');
            return false;
        }
        if (functionType === 'polynomial' && polynomialFields.some(field => !field.coefficient || !field.power)) {
            setFormError('All polynomial terms must have a coefficient and a power.');
            return false;
        }
        if (functionType === 'polynomial' && polynomialFields.length === 0) {
            setFormError('At least one polynomial terms must be specified.');
            return false;
        }
        if (!nodes) {
            setFormError('Please select the maximum nodes.');
            return false;
        }
        setFormError('');
        return true;
    };

    const handlePolynomialChange = (index, event) => {
        let data = [...polynomialFields];
        data[index][event.target.name] = event.target.value;
        setPolynomialFields(data);
    };

    const handleExponentialChange = (event) => {
        setExponential({ ...exponential, [event.target.name]: event.target.value });
    };

    const addFields = () => {
        let object = { coefficient: '', power: '' };
        setPolynomialFields([...polynomialFields, object]);
    };

    const removeFields = (index) => {
        let data = [...polynomialFields];
        data.splice(index, 1);
        setPolynomialFields(data);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                functionType,
                polynomialFields,
                exponential,
                intervalStart,
                intervalStop,
                nodes,
            };
            onSubmit(formData);
        }
    };

    return (
        <Container maxWidth="md" sx={{ my: '3%' }}>
            <Paper sx={{ p: 3 }} elevation={3}>
                {isBackendHealthy && (
                    <Box sx={{ position: 'relative', display: 'flex', width: "100%", height: 'fit-content', justifyContent: 'end' }}> {/* Positioning the icon */}
                        <CheckCircleOutlineIcon color="success" />
                    </Box>
                )}
                <Typography variant="h4" gutterBottom>Demo Configuration</Typography>
                <UnavailableServiceOverlay isServiceAvailable={isBackendHealthy}>
                    <form onSubmit={handleSubmit}>
                        {formError && (
                            <Typography >{formError}</Typography>
                        )}
                        <FormControl component="fieldset" disabled={isDisabled || isAltDisabled}>
                            <RadioGroup row name="functionType" value={functionType} onChange={(e) => setFunctionType(e.target.value)}>
                                <FormControlLabel value="polynomial" control={<Radio  />} label="Polynomial" />
                                <FormControlLabel value="exponential" control={<Radio  />} label="Exponential" />
                            </RadioGroup>
                        </FormControl>

                        {functionType === 'polynomial' ? (
                            polynomialFields.map((form, index) => (
                                <Box key={index} sx={{ marginBottom: 2 }}>
                                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            name="coefficient"
                                            label="Coefficient (A)"
                                            type="number"
                                            value={form.coefficient}
                                            onChange={event => handlePolynomialChange(index, event)}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                        <TextField
                                            name="power"
                                            label="Power (b)"
                                            type="number"
                                            value={form.power}
                                            onChange={event => handlePolynomialChange(index, event)}
                                            disabled={isDisabled || isAltDisabled}
                                            inputProps={{ min: "1" }}
                                        />
                                        <IconButton color='error' onClick={() => removeFields(index)} disabled={isDisabled || isAltDisabled}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </FormGroup>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ marginBottom: 2 }}>
                                <TextField
                                    fullWidth
                                    name="a"
                                    label="Coefficient (a)"
                                        type="number"
                                    margin="normal"
                                    value={exponential.a}
                                    onChange={handleExponentialChange}
                                        disabled={isDisabled || isAltDisabled}
                                />
                                <TextField
                                    fullWidth
                                    name="b"
                                    label="Exponent (b)"
                                    type="number"
                                    margin="normal"
                                    value={exponential.b}
                                    inputProps={{ min: "1" }}
                                    onChange={handleExponentialChange}
                                        disabled={isDisabled || isAltDisabled}
                                />
                            </Box>
                        )}

                        {functionType === 'polynomial' && (
                            <Button startIcon={<AddCircleOutlineIcon />} onClick={addFields} disabled={isDisabled || isAltDisabled}>Add Term</Button>
                        )}

                        <Box sx={{ marginBottom: 2 }}>
                            <TextField
                                fullWidth
                                label="Interval Start"
                                type="number"
                                margin="normal"
                                value={intervalStart}
                                onChange={e => setIntervalStart(e.target.value)}
                                disabled={isDisabled || isAltDisabled}
                            />
                            <TextField
                                fullWidth
                                label="Interval Stop"
                                type="number"
                                margin="normal"
                                value={intervalStop}
                                onChange={e => setIntervalStop(e.target.value)}
                                disabled={isDisabled || isAltDisabled}
                            />
                            <FormControl fullWidth margin="normal" disabled={isDisabled || isAltDisabled}>
                                <InputLabel >Max Nodes</InputLabel>
                                <Select
                                    value={nodes}
                                    onChange={e => setNodes(e.target.value)}
                                    label="Max Nodes"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7].map(node => (
                                        <MenuItem key={node} value={node}>{node}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <DoubleRippleButton rippleColor={theme.palette.primary.dark} startingColor={theme.palette.primary.main} type="submit" variant="contained" disabled={isDisabled || isAltDisabled}>Submit</DoubleRippleButton>
                    </form>
                </UnavailableServiceOverlay>
            </Paper>
        </Container>
    );
};

export default GaussQuadForm;
