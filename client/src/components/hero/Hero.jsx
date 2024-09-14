import "./hero.css";
import { useNavigate } from "react-router-dom";

const parkData = [
  { count: "8", label: "Parks" },
  { count: "5", label: "Cities" },
  { count: "45", label: "Users" },
];

const Hero = () => {
  const navigate = useNavigate();

  const handleFindParks = () => {
    navigate("/home");
  };

  const handleListParks = () => {
    // Define your logic here for listing parks
    console.log("Listing parks...");
  };

  return (
    <div className="header">
      <div className="hero-section">
        <img
          className="hero-background"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/16db777d4e7fed9807383a3900fd16b74c90d06c8baefdfc704ee3e593c0191c?apiKey=104eb047a02e4c0c91f9caee82b0eb43&"
          alt="Hero Background"
        />
        <div className="hero-content">
          <h1 className="hero-title">ALWAYS ARRIVE ON TIME</h1>
          <h2 className="hero-subtitle">Book car park now.</h2>
          <div className="hero-actions">
            <button className="find-parks-button" onClick={handleFindParks}>
              Find Parks
            </button>
            <button className="list-parks-button" onClick={handleListParks}>
              List Parks
            </button>
          </div>
        </div>
        <div className="park-stats">
          {parkData.map((park, index) => (
            <div className="park-stat" key={index}>
              <span className="park-stat-count">{park.count}</span>
              <span className="park-stat-label">{park.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
