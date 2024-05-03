import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Grid, Typography, Box, Paper, Stack, useTheme, Fade, LinearProgress } from '@mui/material';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import { useLocation } from 'react-router-dom';
import GaussQuadForm from '../components/Forms/GaussQuadForm';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { InlineMath } from 'react-katex';
import SiteFooter from '../components/Shared/Footer';
import GaussianQuadratureBackground from '../assets/imgs/backgrounds/GQ/GaussianQuadratureBackground.webp';
import GaussianQuadratureBackgroundDark from '../assets/imgs/backgrounds/GQ/GaussianQuadratureBackgroundDark.webp';
import Cover from '../components/Display/Cover';
import GraphDescription from '../components/Display/GraphDescription';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import GQLineGraph from '../components/Display/GQLineGraph';

const GaussianQuadraturePage = () => {
    const currentPath = useLocation();
    const socketPageRef = PageRef.GQ;
    const [finalIntegral, setFinalIntegral] = useState(null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [trueIntegral, setTrueIntegral] = useState(null);
    const [nodeGraphData, setNodeGraphData] = useState([]);
    const [legendreData, setLegendreData] = useState([]);
    const [trapezoidalData, setTrapezoidalData] = useState([]);
    const [simpsonsData, setSimpsonsData] = useState([]);
    const [primaryProgress, setPrimaryProgress] = useState(0);
    const [showPrimaryProgress, setShowPrimaryProgress] = useState(false);
    const [showNodeGraph, setShowNodeGraph] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);
    const theme = useTheme();
    const lineColor = cheerfulFiestaPalette(theme.palette.mode);
    // Use the `useWebSocket` hook to use shared websocket connection
    const { webSocketManager, queue } = useWebSocket();
    const demoRunningRef = useRef(null);
    const [bannerOpen, setBannerOpen] = React.useState(true);

    React.useEffect(() => {
        demoRunningRef.current !== null ? demoRunningRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }) : null;
    }, [demoRunningRef.current])

    useEffect(() => {
        setBannerOpen(showPrimaryProgress);
    }, [showPrimaryProgress]);

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
            //console.log(msg);
            if (msg.type === 'process_info') {
                if (msg.data.message === "task_starting") {
                    setStatusMessage("Starting...");
                    setShowPrimaryProgress(true);
                }
                else if (msg.data.message === "task_complete") {
                    setStatusMessage("Finished.");
                    setShowPrimaryProgress(false);
                }
            }
            if (msg.type === 'node_info') {
                if (showNodeGraph === false) {
                    setStatusMessage("Running...");
                    setShowNodeGraph(true);
                    setTrueIntegral((prevState) => {
                        const newIntegral = msg.data.true_itegral;
                        return newIntegral;
                    });
                }
                setPrimaryProgress((prevState) => {
                    let newState = 100 * msg.data.iteration / msg.data.toatl_iterations;
                    return newState;
                });
                setNodes((prevState) => {
                    const copy = [...prevState];
                    copy.push(Math.log(parseInt(msg.data.nodes)));
                    return copy;
                });
                setLegendreData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.legendre_error));
                    return copy;
                });
                setTrapezoidalData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.trapezoidal_error));
                    return copy;
                });
                setSimpsonsData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.simpsons_error));
                    return copy;
                });
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
    }, [webSocketManager, socketPageRef, showNodeGraph]);

    useEffect(() => {

        setNodeGraphData((prevState) => {
            const newData = [
                {
                    label: "Gauss-Legendre",
                    color: lineColor[6],
                    curve: 'catmullRom',
                    type: 'line',
                    showMark: true,
                    data: legendreData
                },
                {
                    label: "Trapezoidal",
                    color: lineColor[7],
                    curve: 'catmullRom',
                    type: 'line',
                    showMark: true,
                    data: trapezoidalData
                },
                {
                    label: "Simpsons",
                    color: lineColor[8],
                    curve: 'catmullRom',
                    type: 'line',
                    showMark: true,
                    data: simpsonsData
                }
            ];
            return newData;
        });
    }, [legendreData, trapezoidalData, simpsonsData, lineColor]);

    const handleFormSubmit = useCallback((formData) => {
        setTrueIntegral(null);
        setFinalIntegral(null);
        setNodeGraphData([]);
        setSimpsonsData([]);
        setTrapezoidalData([]);
        setNodes([]);
        setLegendreData([]);
        setIsFormDisabled(true);
        setPrimaryProgress(0);
        setShowPrimaryProgress(false);
        setStatusMessage(null);
        setShowNodeGraph(false);
        setIsFormDisabled(true);
        const newTask = new WebSocketTask("wss://access.nechanickyworks.com/ws/GaussianQuadratureV1", "Gaussian Quadrature", new TaskPage("Gaussian Quadrature", socketPageRef, window.location.origin + currentPath.pathname));

        newTask.taskInitData = formData;
        newTask.taskStatus = "waiting";
        webSocketManager.newTask(newTask);
    }, [webSocketManager, currentPath, socketPageRef]);

    return (
        <React.Fragment>
            <Cover light={GaussianQuadratureBackground} dark={GaussianQuadratureBackgroundDark}>
                <Container maxWidth='md' align='center' sx={{ py: "2%"}} >
                    <Stack direction='column' sx={{ height: '100%', justifyContent: 'space-around' }}>
                        <Typography variant='h4' gutterBottom sx={{ fontSynthesisWeight: 'auto', fontWeight: 600, color:'common.white' }}>Welcome to the Gaussian Quadrature Project Page.</Typography>
                        <Paper sx={{ backgroundColor: theme.palette.background.paperOpaque, p: '2%' }}>
                            {/* Key Features Section */}
                            <Typography variant="h5" align="center" component="h1" color='inherit' gutterBottom>
                                Introduction
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
                                Background:
                            </Typography>
                            <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                Gaussian Quadrature, named after Carl Friedrich Gauss, is a numerical method for
                                approximating integrals of functions over a specific interval. It excels by using optimally chosen
                                points (nodes) and corresponding weights to approximate integrals, especially with polynomial
                                functions, more accurately than conventional methods such as the Trapezoidal or Simpson's rule.
                                This efficiency is partly due to the method's ability to exactly integrate polynomials of degree up
                                to <InlineMath math="2n-1" /> with only <InlineMath math="n" /> points. Focusing on Gauss-Legendre Quadrature, this method leverages Legendre
                                polynomials to achieve optimal node selection and weighting over fixed intervals, significantly enhancing
                                computational precision and efficiency. If you would like learn more about this topic, I have written a detailed
                                paper which can be found in my public github repository for <a href="https://github.com/nechanie/GaussianQuadratureDemo" target="_blank" rel="noopener noreferrer">this project</a>. 
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
                                        The following interactive demo will allow you to engage directly with the Gauss-Legendre Quadrature method.
                                        You will be able to specify a polynomial function and an interval to compute its integral over. The demo will
                                        not only estimate the integral using Gauss-Legendre Quadrature but also compare it against results from the
                                        Trapezoidal Rule, Simpson's Rule, and near-true values calculated through python's scipy library. A graphical
                                        representation will display the error margins between these methods over a range of iterations, offering
                                        insightful visual feedback on the precision and efficiency of Gauss-Legendre Quadrature in numerical integration.
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
                                            <li>Notice how fast each integration method approaches 0 in the graph, faster is better.</li>
                                            <li>Try various functions and consider the differences you see in the graphs.</li>
                                            <li>The bottom axis can be considered the number of computational steps, consider what this means based on what you see.</li>
                                            <li>Notice the differences in the final estimation of each integral and consider how the magnitude of the difference can impact the usability of each method in the real world.</li>
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
                                            <li>Start by Choosing whether you would like to integrate an exponential function or a standard polynomial function.</li>
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
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6}>
                            <GaussQuadForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                        </Grid>
                    </Grid>

                    {showNodeGraph && (<Paper elevation={3} sx={{ marginTop: 2, py: '3%' }}>
                        <Box sx={{ height: { xs: '26vh', sm: '40vh', md: '50vh' }, p: "3%" }} ref={demoRunningRef}>
                            <GQLineGraph dataRefs={nodes} dataVals={nodeGraphData} xLabel="Nodes" />
                        </Box>
                        <Box>
                            <GraphDescription
                                title="Absolute Error of Estimation"
                                description="This graph displays the absolute error of each method of integration for node counts up to the 'Max Nodes' value. The graph will give you an idea of how many nodes are needed by each method in order to accurately estimate the true value of the integral. This graph also provides a reference to how each of these methods perform relative to each other."
                                note="If the graphs appear abnormal, you likely need to define a more complex function to integrate. If the function is too simple, these methods will often determine the exact integral immediately. Since the errors tend to be very small numbers, they are graphed on a logarithmic scale, which will produce inconsistencies when the errors are exactly 0."
                            />
                        </Box>
                        <Container maxWidth='md'>
                            {finalIntegral !== null && (
                                <Stack direction='column'>
                                    <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                                        Final Integral Estimation using Gauss-Legendre Quadrature: {finalIntegral.toFixed(5)}
                                    </Typography>
                                    <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                                        True Integral: {trueIntegral.toFixed(5)}
                                    </Typography>
                                </Stack>
                            )}
                        </Container>
                    </Paper>)}
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
                    {showPrimaryProgress && (<Container maxWidth='lg'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <Typography variant="body2" >{statusMessage}</Typography>
                            </Box>
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

export default GaussianQuadraturePage;