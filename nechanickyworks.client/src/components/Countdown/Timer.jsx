import React, { useState, useEffect } from 'react';
import './Timer.css';

function CountDown() {
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        time_up: ""
    });

    useEffect(() => {
        const deadline = new Date("Apr 01, 2024 12:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const t = deadline - now;
            const dd = Math.floor(t / (1000 * 60 * 60 * 24));
            const hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            const ss = Math.floor((t % (1000 * 60)) / 1000);

            const days = dd < 10 ? "0" + dd : dd;
            const hours = hh < 10 ? "0" + hh : hh;
            const minutes = mm < 10 ? "0" + mm : mm;
            const seconds = ss < 10 ? "0" + ss : ss;

            if (t < 0) {
                clearInterval(interval);
                setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0, time_up: "TIME IS UP" });
            } else {
                setTimer({ days, hours, minutes, seconds });
            }
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="countdown">
            <div className="col-4">
                <div className="box">
                    <p id="day">{timer.days}</p>
                    <span className="text">Days</span>
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                    <p id="hour">{timer.hours}</p>
                    <span className="text">Hours</span>
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                    <p id="minute">{timer.minutes}</p>
                    <span className="text">Minutes</span>
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                    <p id="second">{timer.seconds}</p>
                    <span className="text">Seconds</span>
                </div>
            </div>
            {timer.time_up && <div id="time-up">{timer.time_up}</div>}
        </div>
    );
}

export default CountDown;
