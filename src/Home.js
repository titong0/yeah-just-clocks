import { IoMdTimer, IoMdStopwatch } from "react-icons/io";

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container">
      <header>
        <h1>Clocks!</h1>
      </header>
      <div className="clocks-showcase">
        <Link to="/timer">
          <div className="showcase">
            <h2>Timer</h2>
            <IoMdTimer size="75" />
            <h4>Timer to, you know, time things</h4>
            <p>
              Making toasts, exercising, preventing too much chess, they all
              need a timer
            </p>
          </div>
        </Link>
        <Link to="/stopwatch">
          <div className="showcase">
            <h2>Stopwatch</h2>
            <IoMdStopwatch size="75" />
            <h3>A functional Stopwatch with laps.</h3>
            <p>
              Running, Swimming, Anything that requires you to record your time,
              this is the tool
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
