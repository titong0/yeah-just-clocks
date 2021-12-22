import { FiPlay, FiDelete } from "react-icons/fi";
import {
  AiOutlinePause,
  AiOutlineDelete,
  AiOutlineEnter,
} from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineSpaceBar } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { formatLaps, formatMs, pad } from "../helpers";

const Stopwatch = () => {
  const totalMs = useRef(0);
  const intervalID = useRef(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(["0", "0", "0"]);
  const [laps, setLaps] = useState([]);

  const run = () => {
    totalMs.current += 30;
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
      intervalID.current = setInterval(run, 30);
    } else {
      clearInterval(intervalID.current);
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
      <h2>Stopwatch</h2>
      <div className="clock-container stopwatch ">
        <div>
          <div className="time pointer" onClick={() => setRunning(!running)}>
            {`
        ${pad(time[0], 2)}:${pad(time[1], 2)}.${pad(time[2], 2)}
        `}
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
            {running ? (
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
