import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import WebSocketManager from './WebSocketManager';


const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const webSocketManager = WebSocketManager.getInstance();

    // Use a state to track updates to the queue, e.g., a version number or timestamp.
    const [queueVersion, setQueueVersion] = useState(0);

    useEffect(() => {
        webSocketManager.onQueueUpdate = () => {
            // Instead of just toggling a boolean, increment a version number
            // or update a timestamp every time the queue updates.
            setQueueVersion(prevVersion => prevVersion + 1);
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
        <WebSocketContext.Provider value={{ webSocketManager, queue }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
