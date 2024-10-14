import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import WebSocketManager, { TaskStatus } from './WebSocketManager';


const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const webSocketManager = WebSocketManager.getInstance();

    // Use a state to track updates to the queue, e.g., a version number or timestamp.
    const [queueVersion, setQueueVersion] = useState(0);
    const [isWebSocketRunning, setIsWebSocketRunning] = useState(false); 

    useEffect(() => {
        webSocketManager.onQueueUpdate = () => {
            // Instead of just toggling a boolean, increment a version number
            // or update a timestamp every time the queue updates.
            setQueueVersion(prevVersion => prevVersion + 1);

            // Check if the current task is running and set the flag to the corresponding value.
            setIsWebSocketRunning(!!webSocketManager.currentTask && webSocketManager.currentTask.taskStatus === TaskStatus.RUNNING);
        };

        return () => {
            webSocketManager.onQueueUpdate = null;
        };
    }, [webSocketManager]);

    // Memoize the queue getter function
    const queue = useMemo(() => {
        // This function now returns a stable reference as long as the queueVersion doesn't change.
        return () => webSocketManager.queue.queue;
    }, [webSocketManager.queue.queue, queueVersion]); // Dependency on queueVersion to trigger recalculation

    return (
        <WebSocketContext.Provider value={{ webSocketManager, queue, isWebSocketRunning }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
