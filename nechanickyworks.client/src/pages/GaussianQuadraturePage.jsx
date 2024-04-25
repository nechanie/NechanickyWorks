import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import { useLocation } from 'react-router-dom';
import GaussQuadForm from '../components/Forms/GaussQuadForm';
import ComingSoonOverlay from '../components/Display/ComingSoonOverlay';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath } from 'react-katex';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const GaussianQuadraturePage = () => {
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
                    Welcome to the Gaussian Quadrature Project Page.
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
                            This project delves into the exploration of numerical integration methods,
                            focusing on the comparison between Gaussian Quadrature, specifically Gauss-Legendre Quadrature,
                            and traditional methods such as the Trapezoidal Rule and Simpson's Rule.
                            The aim is to demonstrate the effectiveness and efficiency of Gaussian Quadrature in achieving precise integral
                            approximations with fewer computational steps. Through a combination of theoretical analysis and practical demonstrations,
                            including an interactive demo, this project showcases the advantages of Gauss-Legendre Quadrature over other methods
                            by comparisoning the estimated integrals to near-true values.
                        </Typography>
                        <Typography variant="h5" align="center" component="h1" gutterBottom>
                            Background Information
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ margin: '20px 0' }} component="div">
                            Gaussian Quadrature, named after Carl Friedrich Gauss, is a numerical method for
                            approximating integrals of functions over a specific interval. It excels by using optimally chosen
                            points (nodes) and corresponding weights to approximate integrals, especially with polynomial
                            functions, more accurately than conventional methods such as the Trapezoidal or Simpson's rule.
                            This efficiency is partly due to the method's ability to exactly integrate polynomials of degree up
                            to <InlineMath math="2n-1" /> with only <InlineMath math="n"/> points. Focusing on Gauss-Legendre Quadrature, this method leverages Legendre
                            polynomials to achieve optimal node selection and weighting over fixed intervals, significantly enhancing
                            computational precision and efficiency. If you would like learn more about this topic, I have written a detailed
                            paper which can be found in my public github repository for <a href="https://github.com/nechanie/GaussianQuadrature" target="_blank" rel="noopener noreferrer">this project</a>. 
                        </Typography>
                        <Stack direction='row'>
                            <Stack direction='column' sx={{ width: "100%" }}>
                                <Typography variant="h5" align="center" component="h1" gutterBottom>
                                    Demo Description:
                                </Typography>
                                <Typography variant="body1" align="Center" sx={{ margin: '20px 0' }} component="div">
                                    The following interactive demo will allow you to engage directly with the Gauss-Legendre Quadrature method.
                                    You will be able to specify a polynomial function and an interval to compute its integral over. The demo will
                                    not only estimate the integral using Gauss-Legendre Quadrature but also compare it against results from the
                                    Trapezoidal Rule, Simpson's Rule, and near-true values calculated through python's scipy library. A graphical
                                    representation will display the error margins between these methods over a range of iterations, offering
                                    insightful visual feedback on the precision and efficiency of Gauss-Legendre Quadrature in numerical integration.
                                </Typography>
                            </Stack>
                            <Stack direction='column' sx={{ width: "100%" }}>
                                <Typography variant="h5" align="center" component="h1" gutterBottom>
                                    What to Look For:
                                </Typography>
                                <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                    <ul>
                                        <li>Notice how fast each integration method approaches 0 in the graph, faster is better.</li>
                                        <li>Try various functions and consider the differences you see in the graphs.</li>
                                        <li>The bottom axis can be considered the number of computational steps, consider what this means based on what you see.</li>
                                        <li>Notice the differences in the final estimation of each integral and consider how the magnitude of the difference can impact the usability of each method in the real world.</li>
                                    </ul>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                    <ComingSoonOverlay>
                        <GaussQuadForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
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
                                    <li>Start by accessing the form provided above.</li>
                                    <li>Choose whether you would like to integrate an exponential function or a standard polynomial function.</li>
                                    <li>Customize your function by choosing the constants. For polynomial functions, you can add as many terms as you want.</li>
                                    <li>Specify the integral over which to integrate your function using the start and stop inputs.</li>
                                    <li>Once you have configured your settings, submit the form. This will submit your job to the server and provide you with updates as it works.</li>
                                    <li>Watch the live display that appears, providing progress information for your job.</li>
                                    <li>After the job completes, the final evaluation metrics and graphs will be displayed.</li>
                                    <li>Analyze the outcomes. Use this information to understand how different functions and methods perform.</li>
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

export default GaussianQuadraturePage;