import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservation.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Reservation = () => {
  const navigate = useNavigate();
  const [parkName, setParkName] = useState("");
  const [userID, setUserID] = useState("");
  const [reservationDate, setReservationDate] = useState(new Date());
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [packageType, setPackageType] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [valetService, setValetService] = useState(false);
  const [vehicle, setVehicle] = useState(""); // State variable for vehicle field
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const parkName = localStorage.getItem("parkName");
    const storedUserID = localStorage.getItem("user");
    if (parkName) {
      setParkName(parkName);
    }
    if (storedUserID) {
      const userData = JSON.parse(storedUserID);
      setUserID(userData._id);
    }
  }, []);

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    let price = "";
    switch (selectedOption) {
      case "basic":
        price = "200";
        break;
      case "unlimited":
        price = "400";
        break;
      case "multilocation":
        price = "500";
        break;
      default:
        price = "";
    }
    setPackageType(selectedOption);
    setPackagePrice(price);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!parkName || !userID || !reservationDate || !estimatedArrivalTime || !departureTime || !packageType || !vehicle) {
      setNotification("Please fill in all required fields");
      return;
    }

    const selectedSlotName = localStorage.getItem("selectedSlotName");

    const reservationData = {
      userID,
      parkName,
      parkingSlotId: selectedSlotName,
      reservationDate,
      estimatedArrivalTime,
      departureTime,
      packageType,
      packagePrice,
      valetService,
      vehicleName: vehicle, // Include vehicle field in reservation data
    };

    try {
      const response = await fetch("http://localhost:8800/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit reservation");
      }
      console.log("Reservation submitted successfully");
      setReservationDate(new Date());
      setEstimatedArrivalTime("");
      setDepartureTime("");
      setPackageType("");
      setPackagePrice("");
      setValetService(false);
      setVehicle(""); // Reset vehicle field after submission
      navigate("/packages");
    } catch (error) {
      console.error("Error submitting reservation:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="reservation-page">
        <h1>{parkName}</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
         
    <div className="row-container">
  <label>
    Reservation Date:
    <DatePicker
      selected={reservationDate}
      onChange={(date) => setReservationDate(date)}
      minDate={new Date()} // Set the minimum selectable date to the current date
    />
  </label>
  <div className="vehicle-input">
    <label>
      Vehicle:
      <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
        <option value="">Select</option>
        <option value="van">Van</option>
        <option value="car">Car</option>
        <option value="motor bicycle">Motor Bicycle</option>
      </select>
    </label>
  </div>
</div>

            <div className="time-inputs">
              <label>
                Estimated Arrival Time:
                <input
                  type="time"
                  value={estimatedArrivalTime}
                  onChange={(e) => setEstimatedArrivalTime(e.target.value)}
                />
              </label>
              <label>
                Departure Time:
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </label>
            </div>
            <div className="package-inputs">
              <label>
                Package Type:
                <select value={packageType} onChange={handleOptionChange}>
                  <option value="">Select</option>
                  <option value="basic">Basic</option>
                  <option value="unlimited">Unlimited</option>
                  <option value="multilocation">Multilocation</option>
                </select>
              </label>
              <label>
                Package Price:
                <input
                  type="text"
                  value={packagePrice}
                  onChange={() => {}}
                  disabled
                />
              </label>
            </div>
            <label>
              Parking Slot ID:
              <input
                type="text"
                value={localStorage.getItem("selectedSlotName") || ""}
                onChange={() => {}}
                disabled
              />
            </label>


            <label>
              Valet Service:
              <input
                type="checkbox"
                checked={valetService}
                onChange={(e) => setValetService(e.target.checked)}
              />
            </label>
            {notification && <p className="notification">{notification}</p>}
            <button type="submit">Continue</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Reservation;
