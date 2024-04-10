import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import { useLocation } from 'react-router-dom';
import OSUCapstoneForm from '../components/Forms/OSUCapstoneForm';
import ComingSoonOverlay from '../components/Display/ComingSoonOverlay';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const OSUCapstoneProjectPage = () => {
    const currentPath = useLocation();
    const socketPageRef = PageRef.TML;
    const [accuracy, setAccuracy] = useState(null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [logMessages, setLogMessages] = useState("");
    const [showLog, setShowLog] = useState(false);

    // Use the `useWebSocket` hook to use shared websocket connection
    const { webSocketManager, queue } = useWebSocket();

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
            console.log("< Received: ", message);
            setLogMessages(prev => prev + message + "\n");

            if (message.startsWith("Accuracy")) {
                const accuracyValue = message.slice(-10);
                setAccuracy(accuracyValue);
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
    }, [webSocketManager, socketPageRef]);

    const handleFormSubmit = useCallback((formData) => {
        setIsFormDisabled(true);
        setShowLog(true);
        const newTask = new WebSocketTask("wss://access.nechanickyworks.com/ws/capstoneV1", "Trustworthy ML", new TaskPage("Trustworthy ML", PageRef.TML, window.location.origin + currentPath.pathname));

        newTask.taskInitData = {
            model: formData.model,
            dataset: formData.dataset,
            epochs: formData.epochs,
            batchsize: formData.batchsize,
            optimizer: "Adam",
            learningrate: formData.learningRate,
            dropout: formData.dropoutRate,
            rotations: formData.randomRotations,
            flips: formData.randomFlips,
            attack: formData.attackEvaluation,
            epsilon: formData.epsilonValue,
            alpha: formData.alphaValue,
            niter: formData.numberOfIterations,
            randomstart: formData.randomInitializer
        };
        newTask.taskStatus = "waiting";
        webSocketManager.newTask(newTask);
        console.log("> Request queued");
    }, [webSocketManager, currentPath]);

    return (
        <React.Fragment>
            <Container maxWidth="xl" align='center' sx={{ paddingTop: "2%" }}>
                {/* Title Section */}
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                    Welcome to the OSU Senior Capstone Project Page.
                </Typography>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper square={false} sx={{
                        p: 3
                    }}>
                        {/* Key Features Section */}
                        <Typography variant="h5" align="center" component="h1" gutterBottom>
                            Project Introduction
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ margin: '20px 0' }}>
                            This application harnesses advanced Natural Language Processing (NLP) techniques alongside vector database technology
                            to profile individuals based on their social media data. Employing transformer-based models, it finds users similar
                            to a given profile, expanding profiling capabilities beyond traditional analysis. The integration of Pinecone,
                            a high-performance vector database, enables storing and querying embeddings efficiently, making our profiling system
                            both effective and fast, even with extensive datasets.
                        </Typography>
                        <Typography variant="h5" align="center" component="h1" gutterBottom>
                            How It Works
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ margin: '20px 0' }} component="div">
                            The core of our tool lies in the selection of transformer-based models and their tokenizers, which convert social media
                            data into embeddings. Users can choose among several models based on their requirements and data nature. Following model
                            selection, users specify the number of database rows for embedding, controlling resource utilization and processing time.
                            The application then displays a selectable number of similar profiles, allowing in-depth analysis flexibility. Once the
                            "Embed Data" button is clicked, the embedding process begins, uploading results to Pinecone for efficient querying.
                        </Typography>
                        <Stack direction='row'>
                            <Stack direction='column' sx={{ width: "100%" }}>
                                <Typography variant="h5" align="center" component="h1" gutterBottom>
                                    Demo Description:
                                </Typography>
                                <Typography variant="body1" align="center" sx={{ margin: '20px 0' }} component="div">
                                    This interactive demo invites you to explore the power of NLP and vector database technology in
                                    profiling and finding similar individuals from text information. This demo is designed to showcase the
                                    application's ability to profile and find similar individuals efficiently, leveraging advanced computational techniques.
                                    Dive in and experience the capabilities of our profiling system firsthand.
                                </Typography>
                            </Stack>
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
                        </Stack>
                    </Paper>
                    <ComingSoonOverlay>
                        <OSUCapstoneForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                    </ComingSoonOverlay>
                    {showLog && (
                        <Box sx={{ marginTop: 2 }}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Results
                                </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    variant="outlined"
                                    value={logMessages}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Paper>
                        </Box>
                    )}
                    {/* Optionally, display accuracy value after WebSocket closes */}
                    {accuracy !== null && (
                        <Typography variant="h5" sx={{ marginTop: 2 }}>
                            Final Integral: {accuracy}
                        </Typography>
                    )}
                    <Container maxWidth='sm' sx={{ marginTop: "2%" }}>
                        <Paper sx={{ p: 3 }}>
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
                </Container>
            </Container>
            {/* Footer Section */}
            <StyledFooter sx={{ width: "100%" }}>
                <Typography align="center" variant="h6">Quick Links</Typography>
                {/* Links to sections */}
                <Typography align="center" variant="h6">
                    <Stack direction="column">
                        <Button component={Link} href="#title">Title</Button>
                        <Button component={Link} href="#product1">Product 1</Button>
                    </Stack>
                </Typography>
                {/* Add more as needed */}

                {/* Other common footer content */}
                <Typography align="center">Contact Me | About Me</Typography>
            </StyledFooter>
        </React.Fragment>
    );
}

export default OSUCapstoneProjectPage;