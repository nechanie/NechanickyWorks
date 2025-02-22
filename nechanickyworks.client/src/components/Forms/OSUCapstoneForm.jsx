import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, TextField, Button, FormControlLabel,
    Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
    IconButton, InputAdornment, useTheme, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import DoubleRippleButton from '../Custom/DoubleRippleButton';
import UnavailableServiceOverlay from '../Display/UnavailableServiceOverlay';
import FormQueueDisplay from '../Shared/FormQueueDisplay';

const OSUCapstoneForm = ({ onSubmit, isDisabled, queuePosition, timeStart, isActive }) => {
    const [numProfilesToGenerate, setNumProfilesToGenerate] = useState('');
    const [isBackendHealthy, setIsBackendHealthy] = useState(false);
    const [isAltDisabled, setIsAltDisabled] = useState(true);
    const [numSimilarResults, setNumSimilarResults] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [embedEntireDatabase, setEmbedEntireDatabase] = useState(false);
    const [selectedModel, setSelectedModel] = useState("");
    const [embeddingDim, setEmbeddingDim] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('person_id');
    const [selectedMetric, setSelectedMetric] = useState("");
    const [errors, setErrors] = useState({});
    const theme = useTheme();
    useEffect(() => {
        const checkBackendHealth = async () => {
            try {
                const response = await axios.get(`http://${import.meta.env.VITE_API_ENDPOINT_HOST}/healthcheck/health`);
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

    const fetchProfiles = async () => {
        try {
            const response = await fetch('https://access.nechanickyworks.com/api/profilesrandom');
            const data = await response.json();
            setProfiles(data.data); // Update to match the response structure
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleRefresh = () => {
        fetchProfiles();
    };

    const validate = () => {
        const newErrors = {};
        if (!selectedProfile) newErrors.selectedProfile = 'Profile is required';
        if (!selectedModel) newErrors.selectedModel = 'Model is required';
        if (!selectedMetric) newErrors.selectedMetric = 'Metric is required';
        if (!embedEntireDatabase && !numProfilesToGenerate) newErrors.numProfilesToGenerate = 'Number of profiles is required';
        if (!numSimilarResults) newErrors.numSimilarResults = 'Number of similar results is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const formData = {
                selectedProfile,
                selectedModel,
                selectedMetric,
                embeddingDim,
                numProfilesToGenerate: embedEntireDatabase ? 'ALL' : numProfilesToGenerate,
                numSimilarResults
            };
            onSubmit(formData);
        }
    };

    const onSelectedModelChanged = (event) => {
        event.preventDefault();
        setSelectedModel(event.target.value);
        if (event.target.value === "MiniLM") {
            setEmbeddingDim(384);
        }
        else if (event.target.value === "Ember") {
            setEmbeddingDim(1024);
        }
        else if (event.target.value === "UAE") {
            setEmbeddingDim(1024);
        }
        else if (event.target.value === "Roberta") {
            setEmbeddingDim(768);
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filteredProfiles = profiles.filter((profile) =>
        profile.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProfiles = filteredProfiles.sort((a, b) => {
        if (orderBy === 'person_id') {
            return order === 'asc' ? a.person_id - b.person_id : b.person_id - a.person_id;
        }
        return 0;
    });

    return (
        <Container maxWidth="md" sx={{ my: 3 }}>
            <Paper sx={{ p: 3 }}>
                {isBackendHealthy && (
                    <Box sx={{ position: 'relative', display: 'flex', width: '100%', height: 'fit-content', justifyContent: 'end' }}>
                        <CheckCircleOutlineIcon color='success' />
                    </Box>
                )}
                <Typography variant="h4" gutterBottom>
                    Demo Configuration
                </Typography>

                <UnavailableServiceOverlay isServiceAvailable={isBackendHealthy}>
                    <FormQueueDisplay timeStart={timeStart} isActive={isActive} queuePosition={queuePosition}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ marginBottom: 2 }}>
                                <Button variant="outlined" onClick={handleOpen} disabled={isDisabled || isAltDisabled}>
                                    Choose a Profile to Compare Against
                                </Button>
                                {selectedProfile && (
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        Selected Profile: {selectedProfile}
                                    </Typography>
                                )}
                                {errors.selectedProfile && <Typography color="error">{errors.selectedProfile}</Typography>}
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <FormControl fullWidth error={!!errors.selectedModel}>
                                    <InputLabel id="model-select-label">Choose Model</InputLabel>
                                    <Select
                                        labelId="model-select-label"
                                        id="model-select"
                                        value={selectedModel}
                                        label="Choose Model"
                                        onChange={onSelectedModelChanged}
                                        disabled={isDisabled || isAltDisabled}
                                    >
                                        <MenuItem value="MiniLM">MiniLM</MenuItem>
                                        <MenuItem value="Ember">Ember</MenuItem>
                                        <MenuItem value="UAE">UAE</MenuItem>
                                        <MenuItem value="Roberta">Roberta</MenuItem>
                                    </Select>
                                    {errors.selectedModel && <Typography color="error">{errors.selectedModel}</Typography>}
                                </FormControl>
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <FormControl fullWidth error={!!errors.selectedMetric}>
                                    <InputLabel id="metric-select-label">Similarity Metric</InputLabel>
                                    <Select
                                        labelId="metric-select-label"
                                        id="metric-select"
                                        value={selectedMetric}
                                        label="Choose a Similarity Metric"
                                        onChange={e => {
                                            setSelectedMetric(e.target.value);
                                            setErrors((prevErrors) => ({ ...prevErrors, selectedMetric: '' }));
                                        }}
                                        disabled={isDisabled || isAltDisabled}
                                    >
                                        <MenuItem value="cosine">Cosine</MenuItem>
                                        <MenuItem value="euclidean">Euclidean</MenuItem>
                                        <MenuItem value="dotproduct">Dot Product</MenuItem>
                                    </Select>
                                    {errors.selectedMetric && <Typography color="error">{errors.selectedMetric}</Typography>}
                                </FormControl>
                            </Box>
                            <Box sx={{ marginBottom: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={embedEntireDatabase}
                                            onChange={e => {
                                                setEmbedEntireDatabase(e.target.checked);
                                                setErrors((prevErrors) => ({ ...prevErrors, numProfilesToGenerate: '' }));
                                            }}
                                            disabled={isDisabled || isAltDisabled}
                                        />
                                    }
                                    label="Embed entire database"
                                />
                                {!embedEntireDatabase && (
                                    <TextField
                                        fullWidth
                                        label="Number of Profiles to Generate Embeddings For"
                                        type="number"
                                        value={numProfilesToGenerate}
                                        onChange={e => {
                                            setNumProfilesToGenerate(e.target.value);
                                            setErrors((prevErrors) => ({ ...prevErrors, numProfilesToGenerate: '' }));
                                        }}
                                        disabled={isDisabled || isAltDisabled}
                                        inputProps={{ min: 1000, max: 50000 }}
                                        error={!!errors.numProfilesToGenerate}
                                        helperText={errors.numProfilesToGenerate}
                                        sx={{ marginTop: 2 }}
                                    />
                                )}
                            </Box>

                            <Box sx={{ marginBottom: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Number of Similar Profiles to Return (1-100)"
                                    type="number"
                                    value={numSimilarResults}
                                    onChange={e => {
                                        setNumSimilarResults(e.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, numSimilarResults: '' }));
                                    }}
                                    disabled={isDisabled || isAltDisabled}
                                    inputProps={{ min: 1, max: 100 }}
                                    error={!!errors.numSimilarResults}
                                    helperText={errors.numSimilarResults}
                                />
                            </Box>

                            <DoubleRippleButton rippleColor={theme.palette.primary.dark} startingColor={theme.palette.primary.main} type="submit" variant="contained" disabled={isDisabled || isAltDisabled}>
                                Find Similar Profiles
                            </DoubleRippleButton>
                        </form>
                    </FormQueueDisplay>
                </UnavailableServiceOverlay>
            </Paper>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    Choose a Profile
                    <IconButton onClick={handleRefresh} disabled={isDisabled || isAltDisabled}>
                        <RefreshIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Search profiles"
                        value={searchQuery}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sortDirection={orderBy === 'person_id' ? order : false}>
                                        <TableSortLabel
                                            active={orderBy === 'person_id'}
                                            direction={orderBy === 'person_id' ? order : 'asc'}
                                            onClick={() => handleSort('person_id')}
                                        >
                                            Person ID
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedProfiles.map((profile) => (
                                    <TableRow
                                        key={profile.person_id}
                                        hover
                                        onClick={() => {
                                            setSelectedProfile(profile.person_id);
                                            setErrors((prevErrors) => ({ ...prevErrors, selectedProfile: '' }));
                                            handleClose();
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{profile.person_id}</TableCell>
                                        <TableCell>{profile.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OSUCapstoneForm;
