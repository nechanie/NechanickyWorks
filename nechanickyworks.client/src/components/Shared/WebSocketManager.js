export class WebSocketQueue {
    constructor() {
        this.queue = [];
    }

    push(item) {
        item.queuePosition = this.queue.length;
        this.queue.push(item);
    }

    shift() {
        const item = this.queue.shift();
        this.updateQueuePositions();
        return item;
    }

    updateQueuePositions() {
        this.queue.forEach((item, index) => {
            item.queuePosition = index;
        });
    }
}

class WebSocketManager {
    constructor() {
        this.queue = new WebSocketQueue();
        this.currentWebSocket = null;
        this.onQueueUpdate = null;
        this.onLogMessage = null;
        this.onClose = null;
    }

    static instance = null;

    static getInstance() {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager();
        }
        return WebSocketManager.instance;
    }

    newTask(task) {
        if (this.queue.queue.length >= 5) {
            console.log("Queue full, cannot add more requests.");
            return;
        }
        let position = this.queue.push(task);
        task.queuePosition = position;
        this.updateQueueSubscribers();

        if (this.queue.queue.length === 1 && !this.currentWebSocket) {
            this.processNextRequest();
        }
    }

    processNextRequest() {
        if (!this.queue.queue.length || this.currentWebSocket) return;

        const requestDetails = this.queue.queue[0]; // Take the first request from the queue
        this.currentWebSocket = new WebSocket(requestDetails.url);

        this.currentWebSocket.onopen = () => {
            this.currentWebSocket.send(JSON.stringify(requestDetails.data)); // Send data if needed
        };

        this.currentWebSocket.onmessage = (event) => {
            if (this.onLogMessage) this.onLogMessage(event.data);
        };

        this.currentWebSocket.onclose = () => {
            if (this.onClose) this.onClose();
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
        if (index < 0 || index >= this.queue.queue.length) return;

        if (index === 0) { // Currently running request
            this.currentWebSocket.close();
        } else { // Waiting in the queue
            this.queue.queue.splice(index, 1);
            this.updateQueueSubscribers();
        }
    }

    updateQueueSubscribers() {
        if (this.onQueueUpdate) this.onQueueUpdate(this.queue);
    }
}

export default WebSocketManager;