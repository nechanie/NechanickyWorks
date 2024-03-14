import React from 'react';
import PageTitle from '../components/Shared/PageTitle';
import PythonMLWebSocketTest from '../components/Demos/PythonMLWebsocketTest';

const ProjectPage = () => {
    return (
        <div>
            <PageTitle pageTitle="Nechanicky Works" />
            <h1>Welcome to the Home Page</h1>
            <PythonMLWebSocketTest/>
        </div>
    );
}

export default ProjectPage;
