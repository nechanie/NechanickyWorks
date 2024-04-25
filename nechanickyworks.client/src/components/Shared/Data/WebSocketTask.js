import { TaskStatus } from "../WebSocketManager";

export class TaskPage {
    constructor(taskName, ref, url) {
        this.taskName = taskName;
        this.ref = ref;
        this.url = url;
    }
}
class WebSocketTask {
    constructor(taskUrl, taskName, taskPage, taskInitData = null) {
        this.queuePosition = null;
        this.taskUrl = taskUrl;
        this.taskName = taskName;
        this.taskPage = taskPage;
        this.taskInitData = taskInitData;
        this.taskCancel = null;
        this.taskStatus = TaskStatus.QUEUED;
        this.taskProgress = null;
    }

    OnTaskCancel() {
        if (this.taskCancel) this.taskCancel();
    }

    PageRef() {
        return this.taskPage.ref;
    }
}

export default WebSocketTask;