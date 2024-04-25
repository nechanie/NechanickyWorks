import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import TrustworthyMLForm from '../components/Forms/TrustworthyMLForm';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import { useLocation } from 'react-router-dom';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const MyFridgeAndroidAppPage = () => {
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
                    Welcome to the MyFridge Android App Project Page.
                </Typography>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper square={false} sx={{
                        p: 3
                    }}>
                        {/* Key Features Section */}
                        <Typography variant="h5" align="center" component="h1" gutterBottom>
                            Introduction
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ margin: '20px 0' }}>
                            In this demo, you'll have the power to train your choice from three different types of neural networks: LeNet, VGG, and ResNet,
                            using one of two classic datasets: MNIST and CIFAR-10. Experiment with various hyperparameters,
                            like batch size and learning rate, and observe the effects of data augmentation techniques
                            on your model's performance. After training, see how a PGD attack impacts the accuracy
                            of your model on perturbed data.
                        </Typography>
                        <Stack direction='row'>
                            <Stack direction='column' sx={{ width: "100%" }}>
                                <Typography variant="h5" align="center" component="h1" gutterBottom>
                                    Key Features:
                                </Typography>
                                <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                    <ul>
                                        <li>Train different neural network models (LeNet, VGG, ResNet).</li>
                                        <li>Experiment with various hyperparameters like batch size and learning rate.</li>
                                        <li>Observe model performance against PGD adversarial attacks.</li>
                                        <li>Understand the effects of data augmentation on model robustness.</li>
                                    </ul>
                                </Typography>
                            </Stack>
                            <Stack direction='column' sx={{ width: "100%" }}>
                                <Typography variant="h5" align="center" component="h1" gutterBottom>
                                    What to Look For:
                                </Typography>
                                <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                    <ul>
                                        <li>Notice how changes in hyperparameters can significantly affect your model's training outcome and its ability to withstand adversarial attacks.</li>
                                        <li>Use this demo as a learning tool to experiment with different configurations and understand deep learning concepts in a hands-on manner.</li>
                                        <li>Observe model performance against PGD adversarial attacks.</li>
                                        <li>Understand the effects of data augmentation on model robustness.</li>
                                    </ul>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                    <TrustworthyMLForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                    {showLog && (
                        <Box sx={{ marginTop: 2 }}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Training Log
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
                            Final Accuracy: {accuracy}
                        </Typography>
                    )}
                    <Container maxWidth='sm' sx={{ marginTop: "2%" }}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" align="center" component="h1" gutterBottom>
                                Demo How To:
                            </Typography>
                            <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                <ul>
                                    <li>Start by accessing the form provided above.</li>
                                    <li>Review the pre-filled hyperparameters. These defaults are a good starting point for your experimentation.</li>
                                    <li>Customize your training session. You have the flexibility to adjust any of the hyperparameters according to your interests or needs.</li>
                                    <li>(Optional) Select the option to evaluate against PGD attacks if you wish to test the model's performance under adversarial conditions.</li>
                                    <li>(Optional) Review and adjust the PGD attack hyperparameters, if necessary. These fields become visible only when you opt to evaluate the model against PGD attacks and are pre-filled with recommended default values.</li>
                                    <li>Once you've configured your settings, submit the form. This action initiates the model's training and evaluation process.</li>
                                    <li>Watch the live display that appears, showing real-time updates of the model's training progress and performance evaluation.</li>
                                    <li>After the demo completes, the final evaluation metrics of the model will be displayed. This includes its accuracy and, if selected, its robustness against PGD attacks.</li>
                                    <li>Analyze the outcomes. Use this information to understand how different hyperparameters and adversarial attacks affect the model's performance.</li>
                                    <li>The form will allow new submissions once the current demo run completes. Feel free to experiment with different configurations to see how they impact model performance.</li>
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

export default MyFridgeAndroidAppPage;