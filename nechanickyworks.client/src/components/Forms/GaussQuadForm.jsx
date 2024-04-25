import React, { useState } from 'react';
import {
    Container, Paper, Typography, Box, TextField, Button, IconButton, FormControl,
    InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, FormGroup
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';


const GaussQuadForm = ({ onSubmit, isDisabled }) => {
    const [functionType, setFunctionType] = useState('polynomial');
    const [polynomialFields, setPolynomialFields] = useState([{ coefficient: '', power: '' }]);
    const [exponential, setExponential] = useState({ a: '', b: '' });
    const [intervalStart, setIntervalStart] = useState('');
    const [intervalStop, setIntervalStop] = useState('');
    const [steps, setSteps] = useState('');

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
        const formData = {
            functionType,
            polynomialFields,
            exponential,
            intervalStart,
            intervalStop,
            steps,
        };
        onSubmit(formData);
    };

    return (
        <Container maxWidth="md" sx={{ m: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>Demo Configuration</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl component="fieldset" disabled={isDisabled}>
                        <RadioGroup row name="functionType" value={functionType} onChange={(e) => setFunctionType(e.target.value)}>
                            <FormControlLabel value="polynomial" control={<Radio />} label="Polynomial" />
                            <FormControlLabel value="exponential" control={<Radio />} label="Exponential" />
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
                                        disabled={isDisabled}
                                    />
                                    <TextField
                                        name="power"
                                        label="Power (b)"
                                        type="number"
                                        value={form.power}
                                        onChange={event => handlePolynomialChange(index, event)}
                                        disabled={isDisabled}
                                    />
                                    <IconButton onClick={() => removeFields(index)} disabled={isDisabled}>
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
                                disabled={isDisabled}
                            />
                            <TextField
                                fullWidth
                                name="b"
                                label="Exponent (b)"
                                type="number"
                                margin="normal"
                                value={exponential.b}
                                onChange={handleExponentialChange}
                                disabled={isDisabled}
                            />
                        </Box>
                    )}

                    {functionType === 'polynomial' && (
                        <Button startIcon={<AddCircleOutlineIcon />} onClick={addFields} disabled={isDisabled}>Add Term</Button>
                    )}

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            fullWidth
                            label="Interval Start"
                            type="number"
                            margin="normal"
                            value={intervalStart}
                            onChange={e => setIntervalStart(e.target.value)}
                            disabled={isDisabled}
                        />
                        <TextField
                            fullWidth
                            label="Interval Stop"
                            type="number"
                            margin="normal"
                            value={intervalStop}
                            onChange={e => setIntervalStop(e.target.value)}
                            disabled={isDisabled}
                        />
                        <FormControl fullWidth margin="normal" disabled={isDisabled}>
                            <InputLabel>Computational Steps</InputLabel>
                            <Select
                                value={steps}
                                onChange={e => setSteps(e.target.value)}
                                label="Computational Steps"
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map(step => (
                                    <MenuItem key={step} value={step}>{step}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>Submit</Button>
                </form>
            </Paper>
        </Container>
    );
};

export default GaussQuadForm;
