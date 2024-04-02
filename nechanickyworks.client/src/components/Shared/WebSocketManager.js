class WebSocketManager {
    constructor() {
        this.queue = [];
        this.currentWebSocket = null;
        this.onQueueUpdate = null;
        this.onLogMessage = null;
    }

    static instance = null;

    static getInstance() {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager();
        }
        return WebSocketManager.instance;
    }

    connect(requestDetails) {
        if (this.queue.length >= 5) {
            console.log("Queue full, cannot add more requests.");
            return;
        }
        this.queue.push(requestDetails);
        this.updateQueueSubscribers();

        if (this.queue.length === 1 && !this.currentWebSocket) {
            this.processNextRequest();
        }
    }

    processNextRequest() {
        if (!this.queue.length || this.currentWebSocket) return;

        const requestDetails = this.queue[0]; // Take the first request from the queue
        this.currentWebSocket = new WebSocket(requestDetails.url);

        this.currentWebSocket.onopen = () => {
            this.currentWebSocket.send(JSON.stringify(requestDetails.data)); // Send data if needed
        };

        this.currentWebSocket.onmessage = (event) => {
            if (this.onLogMessage) this.onLogMessage(event.data);
        };

        this.currentWebSocket.onclose = () => {
            this.currentWebSocket = null;
            this.queue.shift(); // Remove the completed request from the queue
            this.updateQueueSubscribers();
            this.processNextRequest(); // Proceed with the next request if any
        };

        this.currentWebSocket.onerror = (error) => {
            console.log("WebSocket error: ", error);
            this.currentWebSocket = null;
            this.processNextRequest(); // Attempt to continue with the next request
        };

        requestDetails.status = 'running';
        this.updateQueueSubscribers();
    }

    cancelRequest(index) {
        if (index < 0 || index >= this.queue.length) return;

        if (index === 0) { // Currently running request
            this.currentWebSocket.close();
        } else { // Waiting in the queue
            this.queue.splice(index, 1);
            this.updateQueueSubscribers();
        }
    }

    updateQueueSubscribers() {
        if (this.onQueueUpdate) this.onQueueUpdate(this.queue);
    }
}

export default WebSocketManager;