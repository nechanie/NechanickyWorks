import React, { useState, useEffect } from 'react';

function PythonMLWebSocketTest() {
    const [webSocket, setWebSocket] = useState(null);
    const [logMessages, setLogMessages] = useState("");

    const handleStartTraining = () => {
        if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
            const ws = new WebSocket("ws://localhost:8000/ws/train_and_attack");

            ws.onopen = () => {
                console.log("WebSocket connected");
                // Send training and attack parameters through the WebSocket
                ws.send(JSON.stringify({
                    model: "LeNet",
                    dataset: "MNIST",
                    epochs: 1,
                    batchsize: 100,
                    optimizer: "Adam",
                    learningrate: 0.002,
                    dropout: null,
                    rotations: false,
                    flips: false,
                    attack: true, // Adjust based on your needs
                    epsilon: 0.3,
                    alpha: 2 / 255,
                    niter: 40,
                    randomstart: true,
                }));
            };

            ws.onmessage = (event) => {
                // Update log messages as they are received
                setLogMessages((prevMessages) => prevMessages + event.data + "\n");
            };

            ws.onclose = () => {
                console.log("WebSocket disconnected");
                setWebSocket(null); // Reset WebSocket state on disconnection
            };

            ws.onerror = (error) => {
                console.log("WebSocket error: ", error);
                setWebSocket(null); // Consider resetting or handling errors appropriately
            };

            setWebSocket(ws);
        }
    };

    return (
        <div>
            <button onClick={handleStartTraining}>Start Training</button>
            <textarea value={logMessages} readOnly style={{ width: 400, height: 300 }} />
        </div>
    );
}

export default PythonMLWebSocketTest;
