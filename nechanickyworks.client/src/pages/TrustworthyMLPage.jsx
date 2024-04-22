import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack, useTheme, CircularProgress, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import TrustworthyMLForm from '../components/Forms/TrustworthyMLForm';
import { useWebSocket } from '../components/Shared/WebsocketContext';
import PageRef from '../components/Shared/Data/PageRefs';
import WebSocketTask, { TaskPage } from '../components/Shared/Data/WebSocketTask';
import { useLocation } from 'react-router-dom';
import LineGraph from '../components/Display/LineGraph';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import BarGraph from '../components/Display/BarGraph';
import TMLBackground from '../assets/imgs/backgrounds/TML/TMLBackground.webp';
import TMLBackgroundDark from '../assets/imgs/backgrounds/TML/TMLBackgroundDark.webp';
import Cover from '../components/Display/Cover';

// Customized components for styling
const StyledFooter = styled('footer')(({ theme }) => ({
    padding: theme.spacing(3),
    marginTop: '2%',
    background: theme.palette.background.paper,
}));

const TrustWorthyMLProjectPage = () => {
    const currentPath = useLocation();
    const socketPageRef = PageRef.TML;
    const [accuracy, setAccuracy] = useState(null);
    const [finalAccuracy, setFinalAccuracy] = useState(null);
    const [batches, setBatches] = useState([]);
    const [lossData, setLossData] = useState([]);
    const [accuracyData, setAccuracyData] = useState([]);
    const [epochs, setEpochs] = useState([]);
    const [epochLossData, setEpochLossData] = useState([]);
    const [epochAccuracyData, setEpochAccuracyData] = useState([]);
    const [batchGraphData, setBatchGraphData] = useState([]);
    const [epochGraphData, setEpochGraphData] = useState([]);
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [showPoints, setShowPoints] = useState(false);
    const [logMessages, setLogMessages] = useState("");
    const [primaryProgress, setPrimaryProgress] = useState(0);
    const [secondaryProgress, setSecondaryProgress] = useState(0);
    const [showPrimaryProgress, setShowPrimaryProgress] = useState(false);
    const [showSecondaryProgress, setShowSecondaryProgress] = useState(false);
    const [isCircular, setIsCircular] = useState(true);
    const [statusMessage, setStatusMessage] = useState(null);
    const [lastBatchNum, setLastBatchNum] = useState(0);
    const [willAttack, setWillAttack] = useState(false);
    const [showBatchGraph, setShowBatchGraph] = useState(false);
    const [showEpochGraph, setShowEpochGraph] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryPercentages, setCategoryPercentages] = useState([]);
    const [showBarGraph, setShowBarGraph] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const theme = useTheme();
    const lineColor = cheerfulFiestaPalette(theme.palette.mode);
    // Use the `useWebSocket` hook to use shared websocket connection
    const { webSocketManager, queue } = useWebSocket();

    React.useEffect(() => {
        setBackgroundImage((prevState) => {
            const background = theme.palette.mode === 'light' ? TMLBackground : TMLBackgroundDark;
            return background;
        });
    }, [theme.palette.mode]);

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
            const msg = JSON.parse(message);
            console.log("< Received: ", msg);
            setLogMessages(prev => prev + message + "\n");
            if (msg.type === 'process_info') {
                if (msg.data.message === "setup_start") {
                    setShowSecondaryProgress(true);
                    setStatusMessage("Setup Started.");
                }
                else if (msg.data.message === "setup_complete") {
                    setShowSecondaryProgress(false);
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
            if (msg.type === 'batch_info') {
                if (showBatchGraph === false) {

                    setStatusMessage("Training Model...");
                    setShowBatchGraph(true);
                }
                setSecondaryProgress((prevState) => {
                    const result = 100 * msg.data.batch_num / msg.data.total_batches;
                    return result;
                });
                setPrimaryProgress((prevState) => {
                    let multiplier = null;
                    if (willAttack) {
                        multiplier = 40;
                    }
                    else {
                        multiplier = 80;
                    }
                    let addition = multiplier * ((msg.data.batch_num - lastBatchNum) / msg.data.total_batches) / msg.data.total_epochs;
                    return prevState + addition;
                });
                setBatches((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseInt(msg.data.batch_num));
                    return copy;
                });
                setAccuracyData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.train_accuracy));
                    return copy;
                });
                setLossData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.train_loss));
                    return copy;
                });
                if (msg.data.batch_num !== msg.data.total_batches) {
                    setLastBatchNum(msg.data.batch_num);
                }
                else {
                    setLastBatchNum(0);
                }
            }
            if (msg.type === "epoch_info") { //if for epoch
                if (msg.data.epoch_num === msg.data.total_epochs) { // if is now finished
                    setShowPoints(true); //show points
                    setIsCircular(true); //set circular secondar progress to prep for eval
                    setStatusMessage("Evaluating."); // set message to evaluating
                    setSecondaryProgress(0);
                }
                else {
                    setAccuracyData([]);
                    setLossData([]);
                    setBatches([]);
                    setSecondaryProgress(0);
                }
                if (showEpochGraph === false) {
                    setShowEpochGraph(true);
                }
                setEpochs((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseInt(msg.data.epoch_num));
                    return copy;
                });
                setEpochAccuracyData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.train_accuracy));
                    return copy;
                });
                setEpochLossData((prevState) => {
                    const copy = [...prevState];
                    copy.push(parseFloat(msg.data.train_loss));
                    return copy;
                });
            }
            if (msg.type === 'attack_batch_info') {
                if (statusMessage !== "Generating Attacks..."){
                    setStatusMessage("Generating Attacks...");
                }
                setSecondaryProgress((prevState) => {
                    const result = msg.data.batch_num / msg.data.total_batches;
                    return result;
                });
                setPrimaryProgress((prevState) => {
                    let batch_diff = msg.data.batch_num - lastBatchNum;
                    const result = prevState + (40 * batch_diff / msg.data.total_batches);
                    return result;
                });
                setLastBatchNum(msg.data.batch_num);
            }
            if (msg.type === 'evaluation_info') {
                setPrimaryProgress((prevState) => {
                    let addition = null;
                    if (willAttack === true) {
                        addition = 10;
                    }
                    else {
                        addition = 20;
                    }
                    const result = prevState + addition;
                    return result;
                });
                setAccuracy(msg.data.accuracy);
            }
            if (msg.type === 'attack_evaluation_info') {
                setPrimaryProgress((prevState) => {
                    const result = prevState + 10;
                    return result;
                });
                setCategories(msg.data.categories);
                setCategoryPercentages(msg.data.breakdown);
                setFinalAccuracy(msg.data.accuracy);
                setShowBarGraph(true);
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
    }, [webSocketManager, socketPageRef, showEpochGraph, showBatchGraph, showPoints, willAttack, lastBatchNum]);

    useEffect(() => {
        
        setBatchGraphData((prevState) => {
            console.log(prevState);
            const newData = [
                {
                    label: "Training Accuracy",
                    yAxisKey: 'leftAxisId',
                    color: lineColor[6],
                    curve: 'catmullRom',
                    type: 'line',
                    showMark: false,
                    data: accuracyData
                },
                {
                    label: "Training Loss",
                    yAxisKey: 'rightAxisId',
                    color: lineColor[7],
                    curve: 'catmullRom',
                    type: 'line',
                    showMark: false,
                    data: lossData
                }
            ];
            return newData;
        });
    }, [accuracyData, lossData, lineColor]);

    useEffect(() => {

        setEpochGraphData((prevState) => {
            const newData = [
                {
                    label: "Training Accuracy",
                    yAxisKey: 'leftAxisId',
                    color: lineColor[6],
                    curve: 'monotoneX',
                    type: 'line',
                    data: epochAccuracyData
                },
                {
                    label: "Training Loss",
                    yAxisKey: 'rightAxisId',
                    color: lineColor[7],
                    curve: 'catmullRom',
                    type: 'line',
                    data: epochLossData
                }
            ];
            return newData;
        });
    }, [epochAccuracyData, epochLossData, lineColor]);

    const handleFormSubmit = useCallback((formData) => {
        setAccuracy(null);
        setFinalAccuracy(null);
        setAccuracyData([]);
        setBatches([]);
        setBatchGraphData([]);
        setEpochAccuracyData([]);
        setEpochGraphData([]);
        setEpochLossData([]);
        setEpochs([]);
        setLossData([]);
        setShowBatchGraph(false);
        setShowPoints(false);
        setShowEpochGraph(false);
        setWillAttack(false);
        setIsFormDisabled(true);
        setPrimaryProgress(0);
        setSecondaryProgress(0);
        setShowPrimaryProgress(false);
        setShowSecondaryProgress(false);
        setIsCircular(true);
        setStatusMessage(null);
        setLastBatchNum(0);
        setShowBatchGraph(false);
        setShowEpochGraph(false);
        setCategories([]);
        setCategoryPercentages([]);
        setShowBarGraph(false);
        const newTask = new WebSocketTask("wss://access.nechanickyworks.com/ws/trustworthyMLV1", "Trustworthy ML", new TaskPage("Trustworthy ML", PageRef.TML, window.location.origin + currentPath.pathname));

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
        if (newTask.taskInitData.attack === true) {
            setWillAttack(true);
        }
        newTask.taskStatus = "waiting";
        webSocketManager.newTask(newTask);
        console.log("> Request queued");
    }, [webSocketManager, currentPath]);

    return (
        <React.Fragment>
            <Cover image={backgroundImage} />
            <Container maxWidth="xl" align='center' sx={{ paddingTop: "2%" }}>
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
                      
                    {showBatchGraph && (<Paper sx={{ marginTop: 2 }}>
                        <Box sx={{ height: "50vh", p: "3%" }}>
                            <LineGraph dataRefs={batches} dataVals={batchGraphData} xLabel="Batches" showPoints={showPoints} />

                        </Box>
                        <Container maxWidth='md'>
                            {showSecondaryProgress && (<Container maxWidth='sm'>
                                {isCircular ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <Typography variant="body2" color="text.secondary">{statusMessage}</Typography>
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <CircularProgress />
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <Typography variant="body2" color="text.secondary">{statusMessage}</Typography>
                                        </Box>
                                        <Box sx={{ width: '100%', mr: 1 }}>
                                            <LinearProgress variant="determinate" value={secondaryProgress} />
                                        </Box>
                                        <Box sx={{ minWidth: 35 }}>
                                            <Typography variant="body2" color="text.secondary">{`${Math.round(secondaryProgress)}%`}</Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Container>)}
                            {showPrimaryProgress && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%', mr: 1 }}>
                                        <LinearProgress variant="determinate" value={primaryProgress} />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" color="text.secondary">{`${Math.round(primaryProgress)}%`}</Typography>
                                    </Box>
                                </Box>
                            ) }
                            {accuracy !== null && (
                                <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                                    Final Accuracy: {accuracy}%
                                </Typography>
                            )}
                            {finalAccuracy !== null && (
                                <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                                    Final Accuracy After Attack: {finalAccuracy}%
                                </Typography>
                            )}
                        </Container>
                        {showEpochGraph && (<Box sx={{ height: "50vh", p: "3%" }}>
                            <LineGraph dataRefs={epochs} dataVals={epochGraphData} xLabel="Epochs" showPoints={showPoints} />
                        </Box>)}
                        {showBarGraph && (
                            <Box sx={{ height: "50vh", p: "3%" }}>
                                <BarGraph dataRefs={categories} dataVals={[{
                                    type: 'bar',
                                    data: categoryPercentages
                                }]}/>
                            </Box>)
                         }
                    </Paper>)}
                    
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
