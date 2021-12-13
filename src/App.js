import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Stopwatch from "./clocks/Stopwatch";
import Timer from "./clocks/Timer";
import Home from "./Home";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="timer" element={<Timer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
