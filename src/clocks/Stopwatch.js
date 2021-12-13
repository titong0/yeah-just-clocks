import { useState, useEffect } from "react";
import { formatLaps, formatMs, pad } from "../helpers";

let totalMs = 0;
let intervalID = null;
const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(["0", "0", "0"]);
  const [laps, setLaps] = useState([]);
  const run = () => {
    totalMs += 30;
    setTime(formatMs(totalMs));
  };
  const lap = () => {
    setLaps([...laps, totalMs]);
  };
  const reset = () => {
    totalMs = 0;
    setTime([0, 0, 0]);
    setLaps([]);
    setRunning(false);
  };

  useEffect(() => {
    if (running) {
      intervalID = setInterval(run, 30);
    } else {
      clearInterval(intervalID);
    }
  }, [running]);

  return (
    <div className="container">
      <div className="clock-container">
        <h2>Stopwatch</h2>

        <div className="time">
          {`
        ${pad(time[0], 2)}:${pad(time[1], 2)}.${time[2]}
        `}
        </div>
        <div className="controls">
          <button
            className={`control ${running ? "pause" : "start"}`}
            onClick={
              running
                ? () => setRunning(false)
                : () => {
                    setRunning(true);
                  }
            }
          >
            {`${running ? "Pause" : "Start"}`}
          </button>
          <button className="control lap" onClick={lap}>
            Lap
          </button>
          <button className="control danger" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <div className="laps-container">
        <ol className="laps">
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
