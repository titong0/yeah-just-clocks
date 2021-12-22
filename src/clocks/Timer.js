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
      if (event.composedPath().find((i) => i.nodeName === "BUTTON")) return;
      if (!started || time === "000000") {
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
        <div style={started ? { gridColumn: "1 / -1" } : {}}>
          <div className="time">{formatTimer(time)}</div>
          {started ? (
            <div className="controls">
              <div className="container">
                <button
                  className={`control ${running ? "pause" : "start"}`}
                  onClick={() => toggleRunning(!running)}
                >
                  {running ? <AiOutlinePause /> : <FiPlay />}
                </button>
                <span className="desktop-shortcut">
                  <AiOutlineEnter size="45" />
                </span>
              </div>
              <div className="container">
                <button className="control danger" onClick={reset}>
                  <AiOutlineDelete />
                </button>
                <span className="desktop-shortcut">
                  <FiDelete size="45" />
                </span>
              </div>
            </div>
          ) : null}
        </div>
        {!started ? (
          <>
            <div className="numpad">
              <NumPad {...{ time, setTime, start }} />
            </div>
            <div className="timer-suggestions">
              <span onClick={() => setTime("000010")}>00:00:10</span>
              <span onClick={() => setTime("000030")}>00:00:30</span>
              <span onClick={() => setTime("000130")}>00:01:00</span>
              <span onClick={() => setTime("000500")}>00:05:00</span>
              <span onClick={() => setTime("002500")}>00:25:00</span>
              <span onClick={() => setTime("003000")}>00:30:00</span>
              <span onClick={() => setTime("010000")}>01:00:00</span>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Timer;
