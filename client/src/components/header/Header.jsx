import {
  faBed,
  faCalendarDays,
  faCar,
  faMotorcycle,
  faVan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    car: 0,
    van: 0,
    motorcycle: 0,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/parks", { state: { destination, dates, options } }); // Changed from "/hotels" to "/parks"
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="hero-content">
              <h1 className="hero-title">ALWAYS ARRIVE ON TIME</h1>
              <h2 className="hero-subtitle">Book car park now.</h2>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCar} className="headerIcon" />
                <input
                  type="text"
                  placeholder="city"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCar} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.car} car · ${options.van} van · ${options.motorcycle} motorcycle`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Car</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.car <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("car", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.car}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("car", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Van</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.van <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("van", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.van}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("van", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Motorcycle</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.motorcycle <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("motorcycle", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{options.motorcycle}</span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("motorcycle", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
