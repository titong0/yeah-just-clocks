import React, { useState, useEffect } from "react";
import NumPad from "./NumPad";
import { pad, formatTimer } from "../helpers";

let timeLeft = "000000";

const Timer = () => {
  const [intervalID, setIntervalID] = useState(null);
  const [running, toggleRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(`000000`);

  const loop = () => {
    let [hours, minutes, seconds] = timeLeft.match(/.{1,2}/g);

    if (seconds - 1 >= 0) {
      seconds--;
    } else if (minutes - 1 >= 0) {
      minutes--;
      seconds = 59;
    } else {
      hours--;
      minutes = 59;
    }
    seconds = pad(seconds, 2);
    minutes = pad(minutes, 2);
    hours = pad(hours, 2);
    timeLeft = [hours, minutes, seconds].join("");
    setTime([hours, minutes, seconds].join(""));

    if (+hours + +minutes + +seconds === 0) {
      toggleRunning(false);
      return alert("finish");
    }
  };
  useEffect(() => {
    if (!running) {
      return clearInterval(intervalID);
    }
    const Id = setInterval(loop, 1000);
    setIntervalID(Id);
  }, [running]);

  const start = () => {
    setStarted(true);
    toggleRunning(true);
    let [hours, minutes, seconds] = time.match(/.{1,2}/g);

    if (seconds > 60) {
      seconds -= 60;
      minutes++;
    }
    if (minutes > 60) {
      minutes -= 60;
      hours++;
    }

    setTime([hours, minutes, seconds].join(""));
    timeLeft = [hours, minutes, seconds].join("");
  };
  return (
    <div className="container">
      <div className="clock-container">
        <h1>Timer</h1>
        <div className="time">{formatTimer(time)}</div>

        <div className="numpad">
          {!started ? (
            <NumPad {...{ time, setTime, start }} />
          ) : (
            <div>
              {running ? (
                <button
                  className="control danger"
                  onClick={() => toggleRunning(false)}
                >
                  Pause
                </button>
              ) : (
                <button
                  className="control start"
                  onClick={() => toggleRunning(true)}
                >
                  Play
                </button>
              )}
              <button onClick={() => console.log({ time })}>log time</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer;
