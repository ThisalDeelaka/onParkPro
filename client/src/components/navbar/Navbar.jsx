import "./navbar.css";
import { Link } from "react-router-dom"; // Import Link component
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="headerWrapper">
      <div className="topBar">
        <img
          className="logo"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/75399fcd9bcd367b2f39ae68786d8a62b2b2453341dc6fec3158ae383531b884?apiKey=104eb047a02e4c0c91f9caee82b0eb43&"
          alt="Company Logo"
        />
      
        <div className="headerList">
          <div className="headerListItem active">
            <span>Home</span>
          </div>
          <div className="headerListItem">
            <span>Our services</span>
          </div>
          <div className="headerListItem">
            <span>Add vehicle</span>
          </div>
          <div className="headerListItem">
            <span>Own a Park</span>
          </div>
          <div className="headerListItem">
            <span>Customer Care</span>
          </div>
        </div>
      </div>
      <div className="bottomBar">
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <Link to="/register" className="navButton">Register</Link>
            <Link to="/login" className="navButton">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
