import React, { useState, useEffect } from 'react';
import {
    Container, Paper, Typography, Box, TextField, Button, FormControlLabel,
    Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel,
    IconButton, InputAdornment, useTheme
} from '@mui/material';
import axios from 'axios';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import DoubleRippleButton from '../Custom/DoubleRippleButton';
import UnavailableServiceOverlay from '../Display/UnavailableServiceOverlay';

const OSUCapstoneForm = ({ onSubmit, isDisabled }) => {
    const [numProfilesToGenerate, setNumProfilesToGenerate] = useState('');
    const [isBackendHealthy, setIsBackendHealthy] = useState(false);
    const [isAltDisabled, setIsAltDisabled] = useState(true);
    const [numSimilarResults, setNumSimilarResults] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [embedEntireDatabase, setEmbedEntireDatabase] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('person_id');
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

    const fetchProfiles = async () => {
        try {
            const response = await fetch('https://access.nechanickyworks.com/api/profilesrandom');
            const data = await response.json();
            console.log(data);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            selectedProfile,
            numProfilesToGenerate: embedEntireDatabase ? 'ALL' : numProfilesToGenerate,
            numSimilarResults,
        };
        onSubmit(formData);
    };

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
        <Container maxWidth="md" sx={{ m: 3 }}>
            <Paper sx={{ p: 3 }}>
                {isBackendHealthy && (
                    <Box sx={{ position: 'relative', display: 'flex', width: "100%", height: 'fit-content', justifyContent: 'end' }}> {/* Positioning the icon */}
                        <CheckCircleOutlineIcon color='success' />
                    </Box>
                )}
                <Typography variant="h4" gutterBottom>
                    Demo Configuration
                </Typography>

                <UnavailableServiceOverlay isServiceAvailable={isBackendHealthy}>
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
                        </Box>

                        <Box sx={{ marginBottom: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={embedEntireDatabase}
                                        onChange={e => setEmbedEntireDatabase(e.target.checked)}
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
                                    onChange={e => setNumProfilesToGenerate(e.target.value)}
                                    disabled={isDisabled || isAltDisabled}
                                    inputProps={{ min: 1000, max: 50000 }}
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
                                onChange={e => setNumSimilarResults(e.target.value)}
                                disabled={isDisabled || isAltDisabled}
                                inputProps={{ min: 1, max: 100 }}
                            />
                        </Box>

                        <DoubleRippleButton rippleColor={theme.palette.primary.dark} startingColor={theme.palette.primary.main} type="submit" variant="contained" disabled={isDisabled || isAltDisabled}>
                            Find Similar Profiles
                        </DoubleRippleButton>
                    </form>
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
                                    <TableCell>
                                        Description
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedProfiles.map((profile) => (
                                    <TableRow
                                        key={profile.person_id}
                                        hover
                                        onClick={() => {
                                            setSelectedProfile(profile.person_id);
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
