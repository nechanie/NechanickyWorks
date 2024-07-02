import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, styled, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePageReImagined from './pages/HomePageReImagined'; // Adjust the path as necessary
import HomePage from './pages/HomePage'; // Adjust the path as necessary
import AboutMePage from './pages/AboutMePage'; // Adjust the path as necessary
import ProjectPage from './pages/ProjectPage'; // Adjust the path as necessary
import './App.css';
import CustomAppBar from './components/Shared/AppBar';
import { Box, useMediaQuery } from '@mui/material';
import GaussianQuadratureProjectPage from './pages/GaussianQuadraturePage';
import OSUCapstoneProjectPage from './pages/OSUCapstoneProjectPage';
import DiffusionDenoisedRobustificationProjectPage from './pages/DiffusionDenoisedRobustificationPage';
import WarehouseRequestFormProjectPage from './pages/WarehouseRequestFormPage';
import RecruitmentRequestFormProjectPage from './pages/RecruitmentRequestFormPage';
import MyFridgeAndroidAppProjectPage from './pages/MyFridgeAndroidAppPage';
import ContactPage from './pages/ContactPage';
import AboutThisSitePage from './pages/AboutThisSitePage';
import TrustWorthyMLProjectPage from './pages/TrustworthyMLPage';
import { WebSocketProvider } from './components/Shared/WebsocketContext';
import TaskWindow from './components/Display/TaskWindow';
import { GlobalStyles } from '@mui/material';
import ScrollToTop from './components/utils/useScrollToTop';
import Klotee from './assets/fonts/Klotee.otf';
import Artega from './assets/fonts/Artega.otf';
import Easy from './assets/fonts/Easy.otf';
import ScrollToTopButton from './components/utils/ScrollToTopButton';
import ConsultingPricePage from './pages/ConsultingPricePage';
import BransenNechanickyPage from './pages/BransenNechanickyPage';

const getDesignTokens = (mode) => ({
    "palette": {
        mode, // Toggle this to switch themes
        ...(mode === 'light' ? {
            "primary": {
                "main": "#5B93D3"
            },
            "secondary": {
                "main": "#d39b5b",
            },
            "error": {
                "main": "#DC3545",
            },
            "warning": {
                "main": "#FFC107",
            },
            "info": {
                "main": "#17A2B8",
            },
            "success": {
                "main": "#28A745",
            },
            "accent": {
                "primary": "#FFC107", // A bright, warm color that complements #5B93D3
                "secondary": "#17A589", // A teal shade that pairs well with #d39b5b
                "tertiary": "#27AE60", // A vibrant green that adds a refreshing touch
                "alternate": "#C0392B" // A deep red to create strong visual interest
            },
            "surfaceSecondary": {
                "main": "#E0E0E0"
            },
            "text": {
                "primary": "#333333",
                "secondary": "#757575",
                "disabled": "rgba(51, 51, 51, 0.38)",
                "divider": "rgba(51, 51, 51, 0.12)",
                "footer": "#FFFFFF"
            },
            "background": {
                "main": "linear-gradient(#FCFCFC, #ECEFF1)",
                "paper": "#F8F9FA",
                "paperOpaque": "rgba(255, 255, 255, 0.5)",
                "paperOpaqueContrast": "rgba(51, 51, 51, 0.5)",
                "footer": "#29434E"
            }
        } : {
            "primary": {
                "main": "#457B9D"
            },
            "secondary": {
                "main": "#9d6745"
            },
            "error": {
                "main": "#E74C3C"
            },
            "warning": {
                "main": "#FFCA28"
            },
            "info": {
                "main": "#1ABC9C"
            },
            "success": {
                "main": "#2ECC71"
                },
            "accent": {
                "primary": "#FFCA28",
                "secondary": "#1ABC9C",
                "tertiary": "#2ECC71",
                "alternate": "#E74C3C",
            },
            "text": {
                "primary": "#FCFCFC",
                "secondary": "#E0E0E0",
                "disabled": "rgba(252, 252, 252, 0.5)",
                "divider": "rgba(252, 252, 252, 0.12)",
                "footer": "#FCFCFC"
            },
            "background": {
                "paper": "#121212",
                "paperOpaque": "rgba(192, 192, 192, 0.5)",
                "paperOpaqueContrast": "rgba(64, 64, 64, 0.5)",
                "footer": "#3E2723",
                "main": "linear-gradient(#303030, #263238)"
                },
            "surfaceSecondary": {
                "main": "#2E2E2E"
            }
        })
    },
    typography: {
        fontFamily: 'acumin-pro, sans-serif',
        h1: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            textTransform: 'uppercase',
            fontWeight: 900
        },
        h2: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            textTransform: 'uppercase',
            fontWeight: 900
        },
        h3: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            textTransform: 'uppercase',
            fontWeight: 900
        },
        h4: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            fontWeight: 900
        },
        h5: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            fontWeight: 900
        },
        h6: {
            fontFamily: 'frank-ruhl-libre-variable, serif',
            fontWeight: 900
        },
        body1: {
            fontFamily: 'acumin-pro, sans-serif',
        },
        body2: {
            fontFamily: 'acumin-pro, sans-serif',
        },
    },
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: 'acumin-pro',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'frank-ruhl-libre-variable, serif',
                    textTransform: 'uppercase',
                    fontWeight: 900
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'frank-ruhl-libre-variable, serif',
                    textTransform: 'uppercase',
                }
            }
        }
    }
});

const GradientBox = styled(Box)(({ theme }) => ({
    background: theme.palette.background.main,
    color: theme.palette.primary.contrastText,
}));

function App() {
    const modePref = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    const [mode, setMode] = React.useState(() => {
        // Try to fetch the theme from localStorage, default to 'light' if not found
        const savedTheme = localStorage.getItem('themeMode');
        return savedTheme || modePref;
    });

    React.useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('themeMode', newMode); // Save the new theme mode to localStorage
                    return newMode;
                });
            },
        }),
        [],
    );

    const theme = React.useMemo(() => responsiveFontSizes(createTheme(getDesignTokens(mode))), [mode]);

    const globalThemeStyles = (
        <GlobalStyles
            styles={{
                '*::-webkit-scrollbar': {
                    width: '8px',
                },
                '*::-webkit-scrollbar-track': {
                    borderRadius: '10px',
                    WebkitBoxShadow: `inset 0 0 6px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[300]}`,
                },
                '*::-webkit-scrollbar-thumb': {
                    borderRadius: '10px',
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[500],
                    outline: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400]}`,
                },
            }}
        />
    );


    return (
        <ThemeProvider theme={theme}>
            {globalThemeStyles}
            <CssBaseline />
                <WebSocketProvider>
                    <GradientBox>
                        <BrowserRouter>
                            <ScrollToTop/>
                            <CustomAppBar onThemeToggle={colorMode.toggleColorMode} />
                            <Routes>
                                <Route path="/" element={<HomePageReImagined />} />
                                <Route path="/projects" element={ <ProjectPage/> }/>
                                <Route path="/about-me" element={<AboutMePage />} />
                                <Route path="/about-this-site" element={<AboutThisSitePage />} />
                                <Route path="/Contact" element={<ContactPage />} />
                                <Route path="/projects/TrustworthyMachineLearning" element={<TrustWorthyMLProjectPage />} />
                                <Route path="/projects/GaussianQuadrature" element={<GaussianQuadratureProjectPage />} />
                                <Route path="/projects/OSUCapstoneProject" element={<OSUCapstoneProjectPage />} />
                                <Route path="/projects/DiffusionDenoisedRobustification" element={<DiffusionDenoisedRobustificationProjectPage />} />
                                <Route path="/projects/WarehouseRequestForm" element={<WarehouseRequestFormProjectPage />} />
                                <Route path="/projects/RecruitmentRequestForm" element={<RecruitmentRequestFormProjectPage />} />
                                <Route path="/projects/MyFridgeApp" element={<MyFridgeAndroidAppProjectPage />} />
                                <Route path="/Pricing" element={<ConsultingPricePage />} />
                                <Route path='/NechanickyWorks-Dedication' element={<BransenNechanickyPage />} />
                            </Routes>
                            {/*<TaskWindow/>*/}
                            <ScrollToTopButton/>
                        </BrowserRouter>
                    </GradientBox>
                </WebSocketProvider>
        </ThemeProvider>
    );
}

export default App;