import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextField, Container, Grid, Typography, Box, Button, Link, Paper, Stack, useTheme, CircularProgress, LinearProgress, Fade } from '@mui/material';
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
import SiteFooter from '../components/Shared/Footer';
import GraphDescription from '../components/Display/GraphDescription';
import Glossary from '../components/Glossary';


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
                    const result = 100 * msg.data.batch_num / msg.data.total_batches;
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
    }, [webSocketManager, currentPath]);

    return (
        <React.Fragment>
            <Cover light={TMLBackground} dark={TMLBackgroundDark }>
                <Container maxWidth='md' align='center' sx={{ py: "2%", height: '100%' }} >
                    <Stack direction='column' sx={{ height: '100%', justifyContent: 'space-around'}}>
                        <Typography variant='h4' gutterBottom sx={{fontSynthesisWeight: 'auto', fontWeight:600}}>Welcome to the Trustworthy Machine Learning Project Page.</Typography>
                        <Paper sx={{ backgroundColor: theme.palette.background.paperOpaque, p:'2%' }}>
                            {/* Key Features Section */}
                            <Typography variant="h5" align="center" component="h1" color='inherit' gutterBottom>
                                Introduction
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ margin: '20px 0' }}>
                                In this demo, you'll have the power to train your choice from three different types of neural networks: LeNet, VGG, and ResNet,
                                using one of two classic datasets: MNIST and CIFAR-10. You will train this model to categorize each images in the dataset into one of 10 categories.
                                Experiment with various hyperparameters, like batch size and learning rate, and observe the effects of data augmentation techniques
                                on your model's performance. After training, see how a PGD attack impacts the accuracy
                                of your model on perturbed data.
                            </Typography>
                        </Paper>
                    </Stack>
                </Container>
            </Cover>
            <Container maxWidth="xl" align='center' sx={{ paddingTop: "2%" }}>
                <Container maxWidth='lg' align="center" sx={{ margin: '20px 0' }}>
                    <Paper square={false} elevation={3} sx={{
                        my:'3%',
                        p: 3
                    }}>
                        <Stack direction='column' sx={{ width: "100%" }}>
                            <Typography variant="h5" align="center" component="h1" gutterBottom>
                                Background:
                            </Typography>
                            <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                Machine learning is a practice increasingly integrated into modern technology. For instance, AI
                                chatbots like ChatGPT rely on machine learning's various layers to understand and generate human-like
                                text. One of the earliest and most prevalent applications of machine learning is in computer vision,
                                which aims to enable computers to process and interpret visual information from the world around us.
                                Unlike humans, computers do not have eyes, so they use algorithms to analyze images and learn from them.
                                This involves training models on large datasets to recognize patterns, objects, or even faces within images.

                                The interactive demo on this page offers a hands-on experience with machine learning in computer vision. You'll
                                have the opportunity to train a model using image data, seeing firsthand how these systems learn to understand
                                and categorize visual inputs based on their content. Try it out to see how advances in machine learning continue
                                to transform our interaction with technology.
                            </Typography>
                        </Stack>
                    </Paper>
                    <Paper square={false} elevation={3} sx={{
                        p:3
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Stack direction='column' sx={{ width: "100%" }}>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        What does it do?
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        The demo below enables you to train a computer vision model using one of three base model architectures: LeNet, VGG, and ResNet.
                                        You will train your model on one of two datasets: MNIST, which includes 70,000 black and white images of handwritten digits from
                                        0 to 9, or CIFAR-10, which consists of 60,000 colored images of ten different types of objects. The training process involves teaching
                                        the model to recognize and categorize images from these datasets into their respective categories. For instance, if you train your
                                        model on MNIST and then provide it with an image of a handwritten '3', it will identify and categorize the image as a '3'. Similarly,
                                        a model trained on CIFAR-10 will classify an image of an airplane into the 'airplane' category among the ten different categories
                                        available in the dataset. This hands-on demo will not only help you understand the mechanics of model training but also how it applies
                                        learned concepts to new, unseen data.
                                    </Typography>
                                    <Typography variant="h5" align="center" component="h1" gutterBottom>
                                        Then what?
                                    </Typography>
                                    <Typography variant="body1" align="left" sx={{ margin: '20px 0' }} component="div">
                                        Once your model is trained, you can choose to test its security by performing what is known as an adversarial attack.
                                        As machine learning becomes integrated into a wide array of technologies, it is crucial to ensure these models are not
                                        vulnerable to malicious inputs designed to deceive them. This testing is part of a broader field of computer science
                                        dedicated to studying these vulnerabilities. However, this project will not provide an exhaustive explanation of the entire
                                        field. For instance, a common adversarial attack on computer vision models involves subtly altering images-such as adding a
                                        small amount of noise or distorting features-before they are processed by the model, with the aim of tricking the model into
                                        misclassifying the image into the wrong category.
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
                                            <li>Train different neural network models (LeNet, VGG, ResNet).</li>
                                            <li>Experiment with various hyperparameters like batch size and learning rate.</li>
                                            <li>Observe model performance against PGD adversarial attacks.</li>
                                            <li>Understand the effects of data augmentation on model robustness.</li>
                                        </ul>
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
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
                                            <li>I recommend checking out the <Glossary/>, which includes some helpful definitions for the concepts you may be unfamiliar with.</li>
                                            <li>Start by accessing the demo configuration form.</li>
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
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6}>
                            <TrustworthyMLForm onSubmit={handleFormSubmit} isDisabled={isFormDisabled} />
                        </Grid>
                    </Grid>
                      
                    {showBatchGraph && (<Paper elevation={3} sx={{ marginTop: 2, py:'3%' }}>
                        <Box sx={{height: { xs: '26vh', sm: '40vh', md:'50vh' }, p: "3%" }} ref={demoRunningRef}>
                            <LineGraph dataRefs={batches} dataVals={batchGraphData} xLabel="Batches" showPoints={showPoints} />
                        </Box>
                        <Box>
                            <GraphDescription
                                title="Batch Training Progress"
                                description="This graph displays the training accuracy and loss over each batch. The X-axis represents each batch processed, while the Y-axis shows the accuracy percentage and loss value. Higher accuracy and lower loss values indicate better model performance. Look for trends of increasing accuracy and decreasing loss as more batches are processed, which suggest the model is learning effectively."
                            />
                        </Box>
                        <Container maxWidth='md'>
                            {accuracy !== null && (
                                <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
                                    Accuracy of your trained model: {accuracy}%
                                </Typography>
                            )}
                            
                        </Container>
                        {showEpochGraph && (<React.Fragment><Box sx={{ height: { xs: '26vh', sm: '40vh', md: '50vh' }, p: "3%" }} ref={demoRunningRef}>
                            <LineGraph dataRefs={epochs} dataVals={epochGraphData} xLabel="Epochs" showPoints={showPoints} />
                        </Box>
                        <Box>
                            <GraphDescription
                                    title="Epoch Training Progress"
                                    description="This graph shows the progression of training over each epoch. Each epoch represents a full cycle through the training dataset. The graph tracks the accuracy and loss at the end of each epoch. Stable or increasing accuracy combined with decreasing loss across epochs generally indicates a successful training session."
                                />
                            </Box>
                        </React.Fragment>
                        )}

                        {finalAccuracy !== null && (
                            <React.Fragment>
                                <Typography variant="h5" align="center" sx={{ mt: '4%' }}>
                                    Final Accuracy After Attack: {finalAccuracy}%
                                </Typography>
                                <Typography variant="h5" align="center" sx={{ mt: '4%' }}>
                                    Change in accuracy due to attack: {(finalAccuracy - accuracy).toFixed(2)}%
                                </Typography>
                            </React.Fragment>
                        )}
                        {showBarGraph && (
                            <React.Fragment>
                                <Box sx={{ height: { xs: '26vh', sm: '40vh', md: '50vh' }, p: "3%" }} ref={demoRunningRef}>
                                <BarGraph dataRefs={categories} dataVals={[{
                                    type: 'bar',
                                    data: categoryPercentages
                                }]}/>
                            </Box>
                            <Box>
                            <GraphDescription
                                title="Category Breakdown Performance"
                                description="This bar graph represents the attack's performance on your model across each of the different categories. It helps visualize the robustness (strength against attacks) of the model against adversarial examples. Each bar will show you what percentage of the images in each class were misclasified. Low bars will signify categories that are difficult to attack, while high bars will signify categories that are easy to attack, which can help reveal weaknesses in your model."
                            />
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>)}
                </Container>
            </Container>
                <Fade appear={false} in={bannerOpen}>
                    <Paper
                        role="dialog"
                        aria-modal="false"
                        aria-label="Cookie banner"
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
                        }}
                    >
                    {showSecondaryProgress && (<Container maxWidth='sm'>
                        {isCircular ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <Typography variant="body2" color="text.secondary">{statusMessage}</Typography>
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <CircularProgress color="info" />
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <Typography variant="body2" color="text.secondary">{statusMessage}</Typography>
                                </Box>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress variant="determinate" color="info" value={secondaryProgress} />
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" color="text.secondary">{`${Math.round(secondaryProgress)}%`}</Typography>
                                </Box>
                            </Box>
                        )}
                    </Container>)}
                    {showPrimaryProgress && (<Container maxWidth='lg'>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" color="success" value={primaryProgress} />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${Math.round(primaryProgress)}%`}</Typography>
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
};

export default TrustWorthyMLProjectPage;
