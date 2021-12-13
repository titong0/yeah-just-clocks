import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/stopwatch">Stopwatch </Link>
        <Link to="/timer">Timer</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
