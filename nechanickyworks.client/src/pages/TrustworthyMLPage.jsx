import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import useWebSocket from 'react-use-websocket';
import TrustworthyMLForm from '../components/Forms/TrustworthyMLForm';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const TrustWorthyMLProjectPage = () => {

    const [accuracy, setAccuracy] = useState(null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [logMessages, setLogMessages] = useState("");
    const [showLog, setShowLog] = useState(false);

    // Use the `useWebSocket` hook to create the WebSocket connection
    const { sendMessage, lastMessage, readyState } = useWebSocket('wss://access.nechanickyworks.com/ws/train_and_attack', {
        onOpen: () => console.log("> WebSocket Connected"),
        onClose: () => console.log("WebSocket Disconnected"),
        shouldReconnect: (closeEvent) => true, // Could use a more sophisticated reconnect strategy here
        reconnectAttempts: 10,
        reconnectInterval: 3000,
    });

    // Effect to handle received messages
    useEffect(() => {
        if (lastMessage !== null) {
            const messageData = lastMessage.data;
            console.log("< Received:", messageData);
            setLogMessages(prev => prev + messageData + '\n');

            if (messageData.startsWith("Accuracy")) {
                const accuracyValue = messageData.slice(-5);
                setAccuracy(accuracyValue);
            }
        }
    }, [lastMessage]);

    const handleFormSubmit = useCallback((formData) => {
        setIsFormDisabled(true);
        setShowLog(true);
        setLogMessages("");

        if (readyState === WebSocket.OPEN) {
            const trainAndAttackRequest = {
                model: "LeNet",
                dataset: "MNIST",
                epochs: "1",
                batchsize: "200",
                optimizer: "Adam",
                learningrate: "0.002",
                dropout: "0.25",
                rotations: "False",
                flips: "False",
                attack: "False",
                epsilon: "0.3",
                alpha: "0.007843",
                niter: "40",
                randomstart: "True"
            };

            sendMessage(JSON.stringify(trainAndAttackRequest));
            console.log("> Request sent");
        } else {
            console.error("WebSocket is not open. ReadyState:", readyState);
            setIsFormDisabled(false);
            setShowLog(false);
        }
    }, [readyState, sendMessage]);

    return (
        <React.Fragment>
            <Container maxWidth="xl" align='center' sx={{ marginTop: "2%" }}>
                {/* Title Section */}
                <Typography variant="h3" align="center" component="h1" gutterBottom>
                    Welcome to the Trustworthy Machine Learning Project Page.
                </Typography>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper square={false} sx={{
                        p:3
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
                        <Stack direction='column' sx={{width: "100%"}}>
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
                        <Paper sx={{p:3}}>
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
};

export default TrustWorthyMLProjectPage;
