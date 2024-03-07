import React from 'react';
import Timer from './components/Countdown/Timer';
import './App.css';
import PageTitle from './components/Shared/PageTitle';

function App() {
    return (
        <div className="App">
            <PageTitle pageTitle="Nechanicky Works"/>
            <div className="container">
                <h1>
                    Website
                    <br />
                    Coming Soon
                </h1>
                <Timer />
            </div>
        </div>
    );
}

export default App;