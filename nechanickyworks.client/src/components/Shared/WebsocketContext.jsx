import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocketManager from './WebSocketManager';


const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const webSocketManager = WebSocketManager.getInstance();

    const [queue, setQueue] = useState(webSocketManager.queue);

    useEffect(() => {
        webSocketManager.onQueueUpdate = (updatedQueue) => {
            setQueue([...updatedQueue]);
        };

        return () => {
            webSocketManager.onQueueUpdate = null;
        };
    }, [webSocketManager]);

    return (
        <WebSocketContext.Provider value={{ webSocketManager, queue }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
