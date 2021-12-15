import { FiPlay } from "react-icons/fi";
import { AiOutlinePause, AiOutlineDelete } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
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

  return (
    <div className="container">
      <div className="clock-container">
        <h2>Stopwatch</h2>

        <div className="time">
          {`
        ${pad(time[0], 2)}:${pad(time[1], 2)}.${pad(time[2], 2)}
        `}
        </div>
        <div className="controls">
          <button
            className={`control start`}
            onClick={
              running
                ? () => setRunning(false)
                : () => {
                    setRunning(true);
                  }
            }
          >
            {running ? <AiOutlinePause /> : <FiPlay />}
          </button>
          <button className="control lap" onClick={lap}>
            <HiOutlineClock />
          </button>
          <button className="control danger" onClick={reset}>
            <AiOutlineDelete />
          </button>
        </div>
      </div>
      <div className="laps-container">
        <ol className={`${laps.length ? "laps" : "hide"}`}>
          {laps.map((currLap, idx) => {
            const { diff, total } = formatLaps(currLap, laps[idx - 1]);
            return (
              <li>
                <span style={{ marginRight: "1.7em" }}>{diff}</span>
                {total}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Stopwatch;
