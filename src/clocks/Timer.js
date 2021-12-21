import React, { useState, useEffect, useRef } from "react";
import NumPad from "./NumPad";
import { decreaseSec, formatTimer, correctTimer } from "../helpers";
import {
  AiOutlinePause,
  AiOutlineEnter,
  AiOutlineDelete,
} from "react-icons/ai";
import { FiPlay, FiDelete } from "react-icons/fi";

const Timer = () => {
  const intervalId = useRef("");
  const timeLeft = useRef("000000");
  const [running, toggleRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(`000000`);

  const loop = () => {
    const joined = decreaseSec(timeLeft);
    timeLeft.current = joined;
    setTime(joined);

    document.title = formatTimer(joined);

    if (parseInt(joined) === 0) {
      setStarted(false);
      toggleRunning(false);
      document.title = "finished!";
      alert("finished");
      document.title = "Timer";
    }
  };

  const start = () => {
    setStarted(true);
    toggleRunning(true);
    setTime(correctTimer(time));
    timeLeft.current = correctTimer(time);
  };

  const reset = () => {
    setStarted(false);
    toggleRunning(false);
    setTime("000000");
    timeLeft.current = "000000";
    document.title = "Timer";
  };
  useEffect(() => {
    if (!running) {
      return clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(loop, 1000);
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!started) {
        return;
      }
      if (["Delete", "Backspace"].includes(event.code)) {
        reset();
      }
      if (["Enter", "Space"].includes(event.code)) {
        toggleRunning(!running);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="container">
      <h1>Timer</h1>
      <div className="clock-container timer">
        <div className="time">{formatTimer(time)}</div>
        <div className={`${!started ? "numpad" : "hide"}`}>
          <NumPad {...{ time, setTime, start }} />
        </div>

        <div className={`${!started ? "hide" : "controls"}`}>
          <div className="container">
            <button
              className={`control ${running ? "pause" : "start"}`}
              onClick={() => toggleRunning(!running)}
            >
              {running ? <AiOutlinePause /> : <FiPlay />}
            </button>
            <AiOutlineEnter size="45"/>
          </div>
          <div className="container">
            <button className="control danger" onClick={reset}>
              <AiOutlineDelete />
            </button>
            <FiDelete size="45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
