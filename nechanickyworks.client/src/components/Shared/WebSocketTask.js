
class WebSocketTask {
    constructor(taskUrl, taskName, taskPage, taskInitData = null) {
        this.queuePosition = null;
        this.taskUrl = taskUrl;
        this.taskName = taskName;
        this.taskPage = taskPage;
        this.taskInitData = taskInitData;
        this.taskCancel = null;
        this.taskStatus = null;
        this.taskMessageLog = [];
        this.taskProgress = null;
    }

    OnTaskCancel() {
        if (this.taskCancel) this.taskCancel();
    }
}

export default WebSocketTask;