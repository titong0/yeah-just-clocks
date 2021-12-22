import { Link } from "react-router-dom";
import { BsClockFill, BsGithub } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <Link to="/">
          <BsClockFill size="30" />
        </Link>
        <Link to="/stopwatch">Stopwatch </Link>
        <Link to="/timer">Timer</Link>
        <a href="https://github.com/titong0/yeah-just-clocks">
          <BsGithub size="30" />
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;
