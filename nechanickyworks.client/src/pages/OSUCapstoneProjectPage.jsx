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
    const [showTable, setShowTable] = useState(false);
    const theme = useTheme();

    // Use the `useWebSocket` hook to use shared websocket connection
    const { webSocketManager, queue } = useWebSocket();
    const webSocketRef = useRef(null);
    const demoRunningRef = useRef(null);

    React.useEffect(() => {
        demoRunningRef.current !== null ? demoRunningRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) : null;
    }, [demoRunningRef.current])

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
                        setSelectedProfile(msg.data.base_profile[0]);
                        break;
                }
            }
            if (msg.type === 'process_info') {
                if (msg.data.message === "setup_start") {
                    setIsCircular(true);
                    setShowSecondaryProgress(true);
                    setShowTable(true);
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
        setShowTable(false);
        const newTask = new WebSocketTask("wss://access.nechanickyworks.com/ws/CapstoneV1", "Capstone", new TaskPage("Capstone", PageRef.CAPSTONE, window.location.origin + currentPath.pathname));

        newTask.taskInitData = {
            profile: formData.selectedProfile,
            model: formData.selectedModel,
            dim: formData.embeddingDim,
            metric: formData.selectedMetric,
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
                        <Typography variant='h3' gutterBottom>Welcome to the OSU Senior Capstone Project Page.</Typography>
                        <Paper sx={{ backgroundColor: theme.palette.background.paperOpaque, p: '2%' }}>
                            {/* Key Features Section */}
                            <Typography variant="h4" align="center" component="h1" color='inherit' gutterBottom>
                                Introduction
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ margin: '20px 0', fontWeight:'bold' }}>
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
                                            <li>Advanced NLP Techniques:
                                                <ul>
                                                    <li>Leverage state-of-the-art transformer-based models for high-accuracy text embeddings.</li>
                                                    <li>Models include MiniLM, Ember, UAE, and Roberta, each with unique strengths for different use cases.</li>
                                                </ul>
                                            </li>
                                            <li>Efficient Vector Database Integration:
                                                <ul>
                                                    <li>Seamless integration with Pinecone, a high-performance vector database, for efficient storage and querying of embeddings.</li>
                                                    <li>Supports large-scale data handling, making it suitable for extensive datasets.</li>
                                                </ul>
                                            </li>
                                            <li>Customizable Similarity Search:
                                                <ul>
                                                    <li>Multiple similarity metrics available, including cosine, euclidean, and dot product.</li>
                                                    <li>Users can specify the number of similar profiles to generate and display, allowing for flexible analysis depth.</li>
                                                </ul>
                                            </li>
                                            <li>Dynamic Embedding Options:
                                                <ul>
                                                    <li>Option to embed the entire database or a specified subset of profiles.</li>
                                                    <li>Control over the number of profiles to generate embeddings for, balancing between resource utilization and processing time.</li>
                                                </ul>
                                            </li>
                                            <li>Real-time Analytics and Feedback:
                                                <ul>
                                                    <li>Detailed runtime metrics for embedding, database transactions, and overall processing time.</li>
                                                    <li>Provides insights into the efficiency of the profiling process and the computational demands of various configurations.</li>
                                                </ul>
                                            </li>
                                            <li>Interactive User Interface:
                                                <ul>
                                                    <li>User-friendly interface for selecting profiles, models, and similarity metrics.</li>
                                                    <li>Real-time progress updates and status messages during the embedding and querying processes.</li>
                                                </ul>
                                            </li>
                                            <li>Scalable and Responsive System:
                                                <ul>
                                                    <li>Designed to handle varying loads and configurations, ensuring scalability and responsiveness.</li>
                                                    <li>Efficient query handling even with extensive datasets, providing fast and accurate results.</li>
                                                </ul>
                                            </li>
                                            <li>Insightful Similarity Analysis:
                                                <ul>
                                                    <li>Presents a list of similar profiles with ranking values, indicating the degree of similarity.</li>
                                                    <li>Allows review of profile descriptions and analytics for deeper insights into the similarity results.</li>
                                                </ul>
                                            </li>
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
                                            <li><strong>Similarity Ranking:</strong> Pay attention to the similarity rankings of the profiles presented. The k value rankings indicate how close of a match a profile is to the chosen profile. Reflect on how these rankings align with your perceptions of similarity.</li>
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
                                            <li>Choose a profile using the tool provided in the form. The tool randomly selects several profiles from the database to choose from. If you would like different options, you can use the provided refresh button to get a new random set of profiles. Some profiles may be blank.</li>
                                            <li>The profile number of the chosen profile will be displayed on the form.</li>
                                            <li>Next, select a model from the available options. Different models have different capabilities, and this choice will influence the embedding process.</li>
                                            <li>Specify the similarity metric you want to use for comparing profiles. This will determine how the similarity is calculated.</li>
                                            <li>Decide whether to embed the entire database or only a subset. If you choose a subset, specify the number of profiles to generate embeddings for. This step is crucial for processing and analyzing the data efficiently. Profiles in subsets will be chosen randomly, this means that each time you submit the form, you will likely get a variety of results.</li>
                                            <li>Determine the number of similar results you wish to generate and display. This number determines the maximum number of top most similar profiles to show.</li>
                                            <li>Click the "Find Similar Profiles" button to start the embedding process.</li>
                                            <li>The demo will present you with a list of similar profiles, including the original profile for comparison. Each similar result will feature a ranking value (K value), indicating the degree of similarity to the chosen profile. Note that the K values take different forms depending on your choice of similarity metric, however, the displayed results will always be ordered from most similar to least similar.</li>
                                            <li>Review the analytics provided, such as runtime for embedding, database transactions, and overall processing time. Compiled metrics for the similarity results offer further insights into the analysis.</li>
                                            <li>Once the current job completes, the form will allow new submissions. Feel free to experiment with different configurations to explore the system's capabilities.</li>
                                        </ul>
                                    </Typography>
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6}>
                            <OSUCapstoneForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                        </Grid>
                    </Grid>
                    {showTable && (
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper elevation={3} sx={{ p: 3 }} ref={demoRunningRef}>
                                    <CapstoneResTable setupTime={setupTime} modelTime={modelTime} upsertTime={upsertTime} queryTime={queryTime} systemTime={systemTime} kMin={kMin} kMax={kMax} kAvg={kAvg} rows={results} selectedProfile={selectedProfile} />
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
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