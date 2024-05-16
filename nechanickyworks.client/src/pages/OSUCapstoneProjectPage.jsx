import { Box, Container, Paper, Stack, TextField, Typography, useTheme, Grid, LinearProgress, CircularProgress, Fade } from '@mui/material';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import OSUCapstoneForm from '../components/Forms/OSUCapstoneForm';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import PageTitle from '../components/Shared/PageTitle';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import SiteFooter from '../components/Shared/Footer';
import Cover from '../components/Display/Cover';
import OSUCapstoneBackgroundImage from "../assets/imgs/backgrounds/OSUCapstone/OSUCapstoneBackground.webp";
import OSUCapstoneBackgroundImageDark from "../assets/imgs/backgrounds/OSUCapstone/OSUCapstoneBackgroundDark.webp";
import CapstoneResTable from '../components/Display/data/CapstoneResTable';


const OSUCapstoneProjectPage = () => {
    const currentPath = useLocation();
    const socketPageRef = PageRef.CAPSTONE;
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [logMessages, setLogMessages] = useState("");
    const [showLog, setShowLog] = useState(false);
    const [showPrimaryProgress, setShowPrimaryProgress] = useState(false);
    const [primaryProgress, setPrimaryProgress] = useState(0);
    const [showSecondaryProgress, setShowSecondaryProgress] = useState(false);
    const [secondaryProgress, setSecondaryProgress] = useState(0);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [isCircular, setIsCircular] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    const [lastEmbedNum, setLastEmbedNum] = useState(0);
    const [lastChunkNum, setLastChunkNum] = useState(0);
    const [setupTime, setSetupTime] = useState(null);
    const [modelTime, setModelTime] = useState(null);
    const [upsertTime, setUpsertTime] = useState(null);
    const [queryTime, setQueryTime] = useState(null);
    const [systemTime, setSystemTime] = useState(null);
    const [kMin, setKMin] = useState(null);
    const [kMax, setKMax] = useState(null);
    const [kAvg, setKAvg] = useState(null);
    const [results, setResults] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const theme = useTheme();

    // Use the `useWebSocket` hook to use shared websocket connection
    const { webSocketManager, queue } = useWebSocket();
    const webSocketRef = useRef(null);

    useEffect(() => {
        if (webSocketManager.currentTask &&
            webSocketManager.currentTask.PageRef() === socketPageRef &&
            Array.isArray(webSocketManager.webSocketLogs[socketPageRef])) {

            webSocketManager.webSocketLogs[socketPageRef].forEach((message) => {
                setLogMessages(prev => `${prev}${message}\n`);
            });
        }
    }, [webSocketManager, socketPageRef]);

    useEffect(() => {
        setBannerOpen((showSecondaryProgress || showPrimaryProgress));
    }, [showSecondaryProgress, showPrimaryProgress]);

    useEffect(() => {
        const checkRefAndDisableForm = () => {
            const isDisabled = webSocketManager.queue.CrossCheckRef(socketPageRef);
            setIsFormDisabled(isDisabled);
        };

        checkRefAndDisableForm();

        const intervalId = setInterval(checkRefAndDisableForm, 1000);

        return () => clearInterval(intervalId);
    }, [webSocketManager.queue, socketPageRef]);

    // Effect to handle received messages
    useEffect(() => {
        const handleMessage = (message) => {
            const msg = JSON.parse(message);
            console.log(msg);
            setLogMessages(prev => prev + message + "\n");
            if (msg.type === 'logging_info') {
                switch (msg.data.type) {
                    case "setup_time":
                        setSetupTime(msg.data.setup_time);
                        break;
                    case "model_time":
                        setModelTime(msg.data.model_time);
                        break;
                    case "upsert_time":
                        setUpsertTime(msg.data.upsert_time);
                        break;
                    case "query_time":
                        setQueryTime(msg.data.query_time);
                        break;
                    case "final":
                        setSystemTime(msg.data.system_time);
                        setKMin(msg.data.kmin);
                        setKMax(msg.data.kmax);
                        setKAvg(msg.data.kavg);
                        setResults(msg.data.results);
                        setSelectedProfile(msg.data.base_profile);
                        break;
                }
            }
            if (msg.type === 'process_info') {
                if (msg.data.message === "setup_start") {
                    setIsCircular(true);
                    setShowSecondaryProgress(true);
                    setStatusMessage("Setup Started.");
                }
                else if (msg.data.message === "setup_complete") {
                    setStatusMessage("Waiting for turn in queue.");
                }
                else if (msg.data.message === "task_starting") {
                    setStatusMessage("Starting...");
                    setIsCircular(false);
                    setShowSecondaryProgress(true);
                    setShowPrimaryProgress(true);
                }
                else if (msg.data.message === "task_complete") {
                    setStatusMessage("Finished.");
                    setShowPrimaryProgress(false);
                    setShowSecondaryProgress(false);
                }
            }
            if (msg.type === 'embedding_info') {
                if (statusMessage !== "Creating Embeddings...") {
                    setStatusMessage("Creating Embeddings...");
                }
                setSecondaryProgress((prevState) => {
                    const result = 100 * msg.data.embedding_num / msg.data.embedding_total;
                    return result;
                });
                setPrimaryProgress((prevState) => {
                    let multiplier = 75;
                    let result = multiplier * ((msg.data.embedding_num) / msg.data.embedding_total);
                    console.log(prevState);
                    return result;
                });
                if (msg.data.batch_num !== msg.data.total_batches) {
                    setLastEmbedNum(msg.data.embedding_num);
                }
                else {
                    setLastEmbedNum(0);
                }
            }
            if (msg.type === 'upsert_info') {
                if (statusMessage !== "Uploading Embeddings...") {
                    setSecondaryProgress(0);
                    setStatusMessage("Uploading Embeddings...");
                }
                setSecondaryProgress((prevState) => {
                    const result = prevState + (100 * msg.data.current / msg.data.total);
                    return result;
                });
                setPrimaryProgress((prevState) => {
                    let chunk_diff = msg.data.current;
                    const result = prevState + (25 * chunk_diff / msg.data.total);
                    return result;
                });
                setLastChunkNum(msg.data.current);
            }
        };

        const originalOnLogMessage = webSocketManager.onLogMessage;

        webSocketManager.onLogMessage = (message) => {
            if (webSocketManager.currentTask && webSocketManager.currentTask.PageRef() === socketPageRef) {
                handleMessage(message);
                webSocketManager.webSocketLogs[socketPageRef].push(message);
            }
        }
        return () => {
            webSocketManager.onLogMessage = originalOnLogMessage;
        };
    }, [webSocketManager, socketPageRef, lastEmbedNum, statusMessage, lastChunkNum]);

    const handleFormSubmit = useCallback((formData) => {
        setIsFormDisabled(true);
        setShowLog(true);
        setLogMessages("");
        setShowPrimaryProgress(false);
        setPrimaryProgress(0);
        setShowSecondaryProgress(false);
        setSecondaryProgress(0);
        setIsCircular(false);
        setStatusMessage(null);
        setLastEmbedNum(0);
        setLastChunkNum(0);
        setSetupTime(null);
        setModelTime(null);
        setUpsertTime(null);
        setQueryTime(null);
        setSystemTime(null);
        setKMin(null);
        setKMax(null);
        setKAvg(null);
        setResults([]);
        setSelectedProfile(null);
        const newTask = new WebSocketTask("wss://access.nechanickyworks.com/ws/CapstoneV1", "Capstone", new TaskPage("Capstone", PageRef.CAPSTONE, window.location.origin + currentPath.pathname));

        newTask.taskInitData = {
            profile: formData.selectedProfile,
            embeddingCount: formData.numProfilesToGenerate,
            resultsCount: formData.numSimilarResults
        };
        newTask.taskStatus = "waiting";
        webSocketManager.newTask(newTask);
        console.log("> Request queued");
    }, [webSocketManager, currentPath]);

    return (
        <React.Fragment>
            <PageTitle pageTitle="OSU Capstone" />
            <Cover light={OSUCapstoneBackgroundImage} dark={OSUCapstoneBackgroundImageDark}>
                <Container maxWidth='md' align='center' sx={{ py: "2%" }} >
                    <Stack direction='column' sx={{ height: '100%', justifyContent: 'space-around' }}>
                        <Typography variant='h4' gutterBottom sx={{ fontSynthesisWeight: 'auto', fontWeight: 600, color: 'common.white' }}>Welcome to the OSU Senior Capstone Project Page.</Typography>
                        <Paper sx={{ backgroundColor: theme.palette.background.paperOpaque, p: '2%' }}>
                            {/* Key Features Section */}
                            <Typography variant="h5" align="center" component="h1" color='inherit' gutterBottom>
                                Introduction
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ margin: '20px 0' }}>
                                This project harnesses advanced Natural Language Processing (NLP) techniques alongside vector database technology
                                to profile individuals based on their social media data. Employing transformer-based models, it finds users similar
                                to a given profile, expanding profiling capabilities beyond traditional analysis. The integration of Pinecone,
                                a high-performance vector database, enables storing and querying embeddings efficiently, making our profiling system
                                both effective and fast, even with extensive datasets.
                            </Typography>
                        </Paper>
                    </Stack>
                </Container>
            </Cover>
            <Container maxWidth="xl" align='center' sx={{ paddingTop: "2%" }}>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper square={false} elevation={3} sx={{
                        my: '3%',
                        p: 3
                    }}>
                        <Stack direction='column' sx={{ width: "100%" }}>
                            <Typography variant="h5" align="center" component="h1" gutterBottom>
                                How It Works
                            </Typography>
                            <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                The core of this tool lies in the use of transformer-based models and their tokenizers, which convert text data into embeddings.
                                Following model selection, users specify the number of database rows for embedding, controlling resource utilization and processing time.
                                The application then displays a selectable number of similar profiles, allowing in-depth analysis flexibility. Once the
                                "Embed Data" button is clicked, the embedding process begins, uploading results to Pinecone for efficient querying.
                            </Typography>
                        </Stack>
                    </Paper>
                    <Paper square={false} elevation={3} sx={{
                        p: 3
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction='column' sx={{ width: "100%" }}>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        What does it do?
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        This interactive demo invites you to explore the power of NLP and vector database technology in
                                        profiling and finding similar individuals from text information. This demo is designed to showcase the
                                        application's ability to profile and find similar individuals efficiently, leveraging advanced computational techniques.
                                        Dive in and experience the capabilities of our profiling system firsthand.
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Stack direction='column' sx={{ width: "100%" }}>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        Key Features:
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        <ul>
                                            <li>Integrate polynomial and exponential functions using several programmatic methods.</li>
                                            <li>Create your own polynomial and exponential functions to integrate.</li>
                                            <li>Observe the difference in performance between Gaussian Quadrature and other more naive approaches to integration.</li>
                                            <li>Understand the implications of efficiency and margin of error in numerical integration.</li>
                                        </ul>
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <Stack direction='column' sx={{ width: "100%" }}>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        What to Look For:
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        <ul>
                                            <li><strong>Similarity Ranking:</strong> Pay attention to the similarity rankings of the profiles presented. Higher rankings indicate a closer match to the chosen profile. Reflect on how these rankings align with your perceptions of similarity.</li>
                                            <li><strong>Profile Descriptions:</strong> Review the descriptions of the original and similar profiles. Identifying commonalities or differences in these descriptions can provide insights into the accuracy and relevance of the similarity results.</li>
                                            <li><strong>Analytics:</strong> Analyze the provided analytics, including runtime metrics and similarity compilations. These metrics offer a behind-the-scenes look at the efficiency of the profiling process and the computational demands of various configurations.</li>
                                            <li><strong>Configuration Effects:</strong> Experiment with different numbers of profiles to generate embeddings for and vary the number of similar results to display. Observing how these configurations impact the results can give you a deeper understanding of the system's scalability and responsiveness.</li>
                                            <li><strong>Accuracy Evaluation:</strong> Evaluate the accuracy of the similarity results based on your own perspective. Considering the chosen profile, do the similar profiles presented seem like accurate matches? Your subjective assessment can provide valuable feedback on the system's effectiveness.</li>
                                        </ul>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container>
                        <Grid item xs={12} lg={6} xl={6}>
                            <Container maxWidth='sm' sx={{ my: '3%' }}>
                                <Paper elevation={3} sx={{ p: 3 }}>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        Demo How To:
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        <ul>
                                            <li>Choose a profile by specifying a number between 1 and 50,000. This number corresponds to a profile's index in our database, which will be used as the basis for finding similar profiles.</li>
                                            <li>The description of the chosen profile will be displayed to give you clarity on the data being analyzed.</li>
                                            <li>Next, you'll specify how many profiles to generate embeddings for — a crucial step in processing and analyzing the data.</li>
                                            <li>Decide on the number of similar results you wish to generate and display. This allows you to control the depth of your analysis.</li>
                                            <li>The demo will then present you with a list of similar profiles, including the original profile for comparison. Each similar result will feature a ranking value, indicating the degree of similarity to the chosen profile.</li>
                                            <li>In addition to the similar profiles, various analytics will be provided, such as runtime for embedding, database transactions, and overall processing time. Compiled metrics for the similarity results offer further insights into the analysis.</li>
                                            <li>The form will allow new submissions once the current job completes. Feel free to experiment with, and compare, different configurations.</li>
                                        </ul>
                                    </Typography>
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6}>
                            <OSUCapstoneForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <CapstoneResTable setupTime={setupTime} modelTime={modelTime} upsertTime={upsertTime} queryTime={queryTime} systemTime={systemTime} kMin={kMin} kMax={kMax} kAvg={kAvg} rows={ results } />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
            <Fade appear={false} in={bannerOpen}>
                <Paper
                    role="dialog"
                    aria-modal="false"
                    square
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        m: 0,
                        p: 2,
                        borderWidth: 0,
                        borderTopWidth: 1,
                        zIndex: 20,
                    }}
                >
                    {showSecondaryProgress && (<Container maxWidth='sm'>
                        {isCircular ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <Typography variant="body2">{statusMessage}</Typography>
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <CircularProgress color='secondary' />
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <Typography variant="body2" >{statusMessage}</Typography>
                                </Box>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress variant="determinate" color='secondary' value={secondaryProgress} />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" >{`${Math.round(secondaryProgress)}%`}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Container>)}
                    {showPrimaryProgress && (<Container maxWidth='lg'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={primaryProgress} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" >{`${Math.round(primaryProgress)}%`}</Typography>
                            </Box>
                        </Box>
                    </Container>
                    )}
                </Paper>
            </Fade>
            
            {/* Footer Section */}
            <SiteFooter/>
        </React.Fragment>
    );
}

export default OSUCapstoneProjectPage;