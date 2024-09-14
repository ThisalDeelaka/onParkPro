import { Link } from "react-router-dom";
import "./park.css"; 
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCar, faSquareParking, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { useEffect } from "react";

const Park = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    localStorage.setItem("parkId", id);
  }, [id]);

  const photos = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbec979b677285feed3e532c68b83133293dc9f9e432492f6d582c75a52c9aee?apiKey=104eb047a02e4c0c91f9caee82b0eb43",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbec979b677285feed3e532c68b83133293dc9f9e432492f6d582c75a52c9aee?apiKey=104eb047a02e4c0c91f9caee82b0eb43",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cbec979b677285feed3e532c68b83133293dc9f9e432492f6d582c75a52c9aee?apiKey=104eb047a02e4c0c91f9caee82b0eb43",
    },
  ];

  const { data, loading } = useFetch(`/parks/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dates[0] ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (data && data.name) {
      localStorage.setItem("parkName", data.name);
    }
  }, [data]);

  return (
    <div>
      <Navbar />

      {loading ? (
        "Loading..."
      ) : (
        
        
        <div className="singlePage">
          <div className="details">
            <div className="wrapper">
              <img src={photos[0].src} alt="" className="parkImg" />
              <div className="info">
                <div className="top">
                  <div className="post">
                    <h1>{data.name}</h1>
                    <div className="address">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{data.address}</span>
                    </div>
                    <div className="price">LKR {data.cheapestPrice}</div>
                  </div>
                  <div className="user">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Thisal Deelaka</span>
                  </div>
                </div>
                <p className="parkDesc">{data.desc}</p>
              </div>
            </div>
          </div>
          <div className="features">
            <div className="wrapper">
              <div className="title">General</div>
              <div className="listVertical">
                <div className="feature">
                  <FontAwesomeIcon icon={faCar} />
                  <div className="featureText">
                    <span>Utilities</span>
                    <p>User is responsible</p>
                  </div>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faSquareParking} />
                  <div className="featureText">
                    <span>Parking Policy</span>
                    <p>Pets not Allowed</p>
                  </div>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faCar} />
                  <div className="featureText">
                    <span>Vehicle Policy</span>
                    <p>bello</p>
                  </div>
                </div>
              </div>

              <div className="title">Slot Sizes</div>
              <div className="sizes">
                <div className="size">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <span>10 sqft</span>
                </div>
                <div className="size">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <span> slots</span>
                </div>
                <div className="size">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <span> bathroom</span>
                </div>
              </div>

              <div className="title">Nearby Places</div>
              <div className="listHorizontal">
                <div className="feature">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <div className="featureText">
                    <span>School</span>
                    <p>500m away</p>
                  </div>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <div className="featureText">
                    <span>Bus Stop</span>
                    <p>200m away</p>
                  </div>
                </div>
                <div className="feature">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  <div className="featureText">
                    <span>Hostipal</span>
                    <p>250m away</p>
                  </div>
                </div>
              </div>

              <div className="title">For Reservation</div>
              
            </div>
            <div className="buttons">
              <button>Contact the Owner</button>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} parkId={id} />}
      </div>
    
  );
};

export default Park;