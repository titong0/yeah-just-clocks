import React, { useState, useEffect, useRef } from "react";
import NumPad from "./NumPad";
import { pad, formatTimer } from "../helpers";
import { AiOutlinePause, AiOutlineClose } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";

const Timer = () => {
  const intervalId = useRef("");
  const timeLeft = useRef("000000");
  const [running, toggleRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(`000000`);

  const loop = () => {
    let [hours, minutes, seconds] = timeLeft.current.match(/.{1,2}/g);

    if (seconds - 1 >= 0) {
      seconds--;
    } else if (minutes - 1 >= 0) {
      minutes--;
      seconds = 59;
    } else {
      hours--;
      minutes = 59;
      seconds = 59;
    }
    seconds = pad(seconds, 2);
    minutes = pad(minutes, 2);
    hours = pad(hours, 2);

    const joined = [hours, minutes, seconds].join("");
    timeLeft.current = joined;
    setTime(joined);
    document.title = formatTimer(joined);
    if (+hours + +minutes + +seconds === 0) {
      toggleRunning(false);
      alert("finished");
      document.title = "finished!";
      setStarted(false);
    }
  };
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
    timeLeft.current = [hours, minutes, seconds].join("");
  };
  const reset = () => {
    setStarted(false);
    timeLeft.current = "000000";
    setTime("000000");
    toggleRunning(false);
  };
  useEffect(() => {
    if (!running) {
      return clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(loop, 1000);
  }, [running]);
  useEffect(() => {
    setInterval(() => console.log(intervalId.current), 1000);
  }, []);

  return (
    <div className="container">
      <div className="clock-container">
        <h1>Timer</h1>
        <div className="time">{formatTimer(time)}</div>

        <div className={`${!started ? "numpad" : "hide"}`}>
          <NumPad {...{ time, setTime, start }} />
        </div>

        <div className={`${!started ? "hide" : "controls"}`}>
          {running ? (
            <button
              className="control pause"
              onClick={() => toggleRunning(false)}
            >
              <AiOutlinePause />
            </button>
          ) : (
            <button
              className="control start"
              onClick={() => toggleRunning(true)}
            >
              <FiPlay />
            </button>
          )}
          <button className="control danger" onClick={reset}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
