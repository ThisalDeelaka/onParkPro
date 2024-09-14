import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, parkId }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSlotName, setSelectedSlotName] = useState('');
  const { data, loading, error } = useFetch(`/parks/slot/${parkId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = dates[0] ? getDatesInRange(dates[0].startDate, dates[0].endDate) : [];

  useEffect(() => {
    localStorage.setItem('selectedSlotName', selectedSlotName);
  }, [selectedSlotName]);

  const isAvailable = (slotNumber) => {
    const isFound = slotNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound && selectedSlot !== slotNumber._id;
  };

  const handleSelect = (e, slotNumber) => {
    const checked = e.target.checked;
    const value = slotNumber._id;
    if (checked) {
      setSelectedSlot(value);
      setSelectedSlotName(slotNumber.number);
    } else {
      setSelectedSlot(null);
      setSelectedSlotName('');
    }
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (selectedSlot) {
        const res = await axios.put(`/slots/availability/${selectedSlot}`, {
          dates: alldates,
        });
        setOpen(false);
        navigate("/reservation");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="rTitle">Select Your Slot:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rSlotTitle">{item.title}</div>
              <div className="rPrice">Price per slot: ${item.price}</div>
            </div>
            <div className="rSelectSlots">
              {item.slotNumbers.map((slotNumber) => (
                <div className="slot" key={slotNumber._id}>
                  <label>{slotNumber.number}</label>
                  <input
                    type="checkbox"
                    value={slotNumber._id}
                    onChange={(e) => handleSelect(e, slotNumber)}
                    checked={selectedSlot === slotNumber._id}
                    disabled={!isAvailable(slotNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton" disabled={!selectedSlot}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
