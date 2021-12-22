import { FiPlay, FiDelete } from "react-icons/fi";
import {
  AiOutlinePause,
  AiOutlineDelete,
  AiOutlineEnter,
} from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineSpaceBar } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { formatLaps, formatMs, formatStopwatchTime } from "../helpers";

document.title = "Stopwatch";

const Stopwatch = () => {
  const start = useRef(null);
  const totalMs = useRef(0);
  // this variable keeps the miliseconds before a pause
  // because the start variable needs to be a date
  // timeline looks something like *PausedMs -> (pause) -> Start*
  //                               ______totalMs_________
  const pausedMs = useRef(0);
  const intervalID = useRef(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(["0", "0", "0"]);
  const [laps, setLaps] = useState([]);

  const run = () => {
    totalMs.current = new Date().getTime() - start.current + pausedMs.current;
    setTime(formatMs(totalMs.current));
  };
  const lap = () => {
    setLaps([...laps, totalMs.current]);
  };
  const reset = () => {
    totalMs.current = 0;
    setTime([0, 0, 0]);
    setLaps([]);
    setRunning(false);
  };

  useEffect(() => {
    if (running) {
      if (start.current === null) {
        start.current = new Date().getTime();
      }
      intervalID.current = setInterval(run, 30);
    } else {
      clearInterval(intervalID.current);
      pausedMs.current = totalMs.current;
      start.current = null;
    }
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.composedPath().find((i) => i.nodeName === "BUTTON")) return;
      if (event.code === "Enter") {
        setRunning(!running);
      }
      if (event.code === "Space") {
        lap();
      }
      if (event.code === "Backspace") {
        reset();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });
  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <div className="clock-container stopwatch ">
        <div>
          <div className="time pointer" onClick={() => setRunning(!running)}>
            {formatStopwatchTime(time)}
          </div>
          <div className="controls">
            <div className="container">
              <button
                className="control start"
                onClick={() => setRunning(!running)}
              >
                {running ? <AiOutlinePause /> : <FiPlay />}
              </button>
              <span className="desktop-shortcut">
                <AiOutlineEnter size="45" />
              </span>
            </div>
            <div className="container">
              <button className="control lap" onClick={lap}>
                <HiOutlineClock />
              </button>
              <span className="desktop-shortcut">
                <MdOutlineSpaceBar size="45" />
              </span>
            </div>
            {totalMs.current !== 0 ? (
              <div className="container">
                <button className="control danger" onClick={reset}>
                  <AiOutlineDelete />
                </button>
                <span className="desktop-shortcut">
                  <FiDelete size="45" />
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {laps.length ? (
          <div className="laps-container">
            <ol className="laps">
              {laps.map((currLap, idx) => {
                const { diff, total } = formatLaps(currLap, laps[idx - 1]);
                return (
                  <li key={idx}>
                    <span style={{ marginRight: "1.7em" }}>{diff}</span>
                    {total}
                  </li>
                );
              })}
            </ol>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
