import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust the path as necessary
import AboutMePage from './pages/AboutMePage'; // Adjust the path as necessary
import ProjectPage from './pages/ProjectPage'; // Adjust the path as necessary
import './App.css';
import CustomAppBar from './components/Shared/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                common: {
                    black: '#2C302E',
                    white: '#fff',
                },
                primary: {
                    // Using #537A5A as the main primary color, giving a natural green vibe
                    main: '#537A5A',
                    light: '#909590', // A muted green/grey for lightened areas
                    dark: '#2C302E', // Almost black for darker areas
                    contrastText: '#fff', // White text for contrast on primary color
                },
                secondary: {
                    // #9AE19D as the vibrant green for secondary actions
                    main: '#9AE19D',
                    light: '#c4fcb6', // Lightened version of #9AE19D for variation
                    dark: '#68ae6c', // Darkened version of #9AE19D for contrast
                    contrastText: '#2C302E', // Using the darkest color for contrast
                },
                error: {
                    // Defaults for error (can adjust based on preference)
                    main: '#d32f2f',
                    light: '#ef5350',
                    dark: '#c62828',
                    contrastText: '#fff',
                },
                warning: {
                    // Defaults for warning (can adjust based on preference)
                    main: '#ed6c02',
                    light: '#ff9800',
                    dark: '#e65100',
                    contrastText: '#fff',
                },
                info: {
                    // Using #474A48 as a muted info color
                    main: '#474A48',
                    light: '#6e7271',
                    dark: '#1e2120',
                    contrastText: '#fff',
                },
                success: {
                    // Using a variation of #9AE19D for success
                    main: '#9AE19D',
                    light: '#c4fcb6',
                    dark: '#68ae6c',
                    contrastText: '#2C302E',
                },
                grey: {
                    50: '#f5f5f5', // Light grey scale
                    100: '#eeeeee',
                    200: '#e0e0e0',
                    300: '#bdbdbd',
                    400: '#9e9e9e',
                    500: '#909590', // Mid-range grey from provided colors
                    600: '#474A48', // Another mid-range grey, slightly darker
                    700: '#2C302E', // Near-black grey for strong emphasis
                    800: '#424242',
                    900: '#212121',
                    A100: '#f5f5f5',
                    A200: '#eeeeee',
                    A400: '#bdbdbd',
                    A700: '#616161',
                },
                text: {
                    primary: '#2C302E', // Dark color for primary text
                    secondary: '#474A48', // Slightly lighter for secondary text
                    disabled: 'rgba(0, 0, 0, 0.38)', // Standard disabled text color
                    divider: 'rgba(0, 0, 0, 0.12)', // Standard divider color
                },
                background: {
                    paper: '#fff', // Background for components, such as cards
                    default: '#fff', // Default page background
                },
                action: {
                    active: 'rgba(0, 0, 0, 0.54)',
                    hover: 'rgba(0, 0, 0, 0.04)',
                    hoverOpacity: 0.04,
                    selected: 'rgba(0, 0, 0, 0.08)',
                    selectedOpacity: 0.08,
                    disabled: 'rgba(0, 0, 0, 0.26)',
                    disabledBackground: 'rgba(0, 0, 0, 0.12)',
                    disabledOpacity: 0.38,
                    focus: 'rgba(0, 0, 0, 0.12)',
                    focusOpacity: 0.12,
                    activatedOpacity: 0.12,
                },
            }
            : {
                common: {
                    black: '#fff', // Inverted for dark mode
                    white: '#2C302E', // Using the dark color as white equivalent for contrast
                },
                primary: {
                    // Keeping the primary color, ensuring good visibility in dark mode
                    main: '#537A5A',
                    light: '#74a78e', // Lightened to stand out in dark mode
                    dark: '#3b5744', // Adjusted for depth in dark backgrounds
                    contrastText: '#fff', // Keeping contrast text white for readability
                },
                secondary: {
                    // Secondary color adjusted to stand out in dark mode
                    main: '#9AE19D',
                    light: '#befcb8', // Lightened for vibrancy
                    dark: '#6cbf7b', // Darkened for contrast
                    contrastText: '#2C302E', // Dark color for contrast
                },
                error: {
                    // Defaults for error, slightly adjusted for dark mode visibility
                    main: '#f44336',
                    light: '#e57373',
                    dark: '#d32f2f',
                    contrastText: '#fff',
                },
                warning: {
                    // Defaults for warning, adjusted for dark mode
                    main: '#ffa726',
                    light: '#ffb74d',
                    dark: '#f57c00',
                    contrastText: '#fff',
                },
                info: {
                    // Adjusting info color to be more visible in dark mode
                    main: '#64b5f6',
                    light: '#90caf9',
                    dark: '#42a5f5',
                    contrastText: '#fff',
                },
                success: {
                    // Adjusting success colors for better visibility in dark mode
                    main: '#81c784',
                    light: '#a5d6a7',
                    dark: '#4caf50',
                    contrastText: '#2C302E',
                },
                grey: {
                    50: '#424242', // Darker greys moved to lighter positions
                    100: '#616161',
                    200: '#757575',
                    300: '#9e9e9e',
                    400: '#bdbdbd',
                    500: '#e0e0e0', // Inverting the greyscale for dark mode
                    600: '#eeeeee',
                    700: '#f5f5f5',
                    800: '#fafafa',
                    900: '#fff',
                    A100: '#a4a4a4',
                    A200: '#8d8d8d',
                    A400: '#737373',
                    A700: '#616161',
                },
                text: {
                    primary: '#fff', // White text for primary
                    secondary: '#e0e0e0', // Lighter grey for secondary
                    disabled: 'rgba(255, 255, 255, 0.5)', // Light color for disabled text
                    divider: 'rgba(255, 255, 255, 0.12)', // Divider adjusted for dark mode
                },
                background: {
                    paper: '#424242', // Dark grey for components background
                    default: '#303030', // Slightly lighter grey for default background
                },
                action: {
                    active: 'rgba(255, 255, 255, 0.7)',
                    hover: 'rgba(255, 255, 255, 0.08)',
                    hoverOpacity: 0.08,
                    selected: 'rgba(255, 255, 255, 0.16)',
                    selectedOpacity: 0.16,
                    disabled: 'rgba(255, 255, 255, 0.3)',
                    disabledBackground: 'rgba(255, 255, 255, 0.12)',
                    disabledOpacity: 0.38,
                    focus: 'rgba(255, 255, 255, 0.12)',
                    focusOpacity: 0.12,
                    activatedOpacity: 0.24,
                },
            }),
    },
});

function App() {

    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light',);
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <CustomAppBar onThemeToggle={ colorMode.toggleColorMode } />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about-me" element={<AboutMePage />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    {/* Add more routes as needed */}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;