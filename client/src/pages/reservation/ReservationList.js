import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './reservationList.css';
import Navbar from "../../components/navbar/Navbar";
import Footer from '../../components/footer/Footer';

const ReservationList = ({ reservations, onDelete }) => {
  const keysToExclude = ['_id', 'createdAt', 'updatedAt', '__v', 'userID', 'parkID', 'parkingSlotId'];

  const [userName, setUserName] = useState("");
  const [parkName, setParkName] = useState("");

  useEffect(() => {
    // Get userName from local storage
    const storedUserID = localStorage.getItem("user");
    if (storedUserID) {
      const userData = JSON.parse(storedUserID);
      setUserName(userData.username);
    }

    // Get parkName from local storage
    const storedParkName = localStorage.getItem("parkName");
    if (storedParkName) {
      setParkName(storedParkName);
    }
  }, []);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  const formatPackagePrice = (price) => {
    return `Rs. ${price}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8800/api/reservation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        onDelete(id);
      } else {
        console.error("Failed to delete reservation:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div>
      <Navbar/>
      <div className="reservation-details-container">
        <div className="reservation-content">
          <div className="reservation-table-container">
            <h2>Reservation Details</h2>
            <table className="reservation-table">
              <tbody>
                <tr>
                  <td className="table-header">Name</td>
                  <td>{userName}</td>
                </tr>
                
                {Object.entries(reservations[0] || {}).map(([key, value]) => (
                  !keysToExclude.includes(key) && (
                    <tr key={key}>
                      <td className="table-header">{key}</td>
                      <td>{key === 'valetService' ? (value ? 'Yes' : 'No') : key === 'reservationDate' ? formatDate(value) : key === 'packagePrice' ? formatPackagePrice(value) : value}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            <div className="actions">
              <Link to={`/UpdateReservation/${reservations[0]?._id}`}>
                <button className="update-button">Edit Details</button>
              </Link>
              <button onClick={() => handleDelete(reservations[0]?._id)} className="cancel-button">Cancel Reservation</button>
              <Link to="/ReservationHistory">
                <button className="reservation-history-button">Reservation History</button>
              </Link>
            </div>
          </div>
          <div className="parking-packages-container">
            <h2>Parking Packages Details</h2>
            <div className="parking-package">
              <h3>Basic Pass</h3>
              <p>The basic pass provides standard parking services.</p>
            </div>
            <div className="parking-package">
              <h3>Unlimited Pass</h3>
              <p>Unlimited pass offers unlimited parking for a specified duration.</p>
            </div>
            <div className="parking-package">
              <h3>Multilocation Pass</h3>
              <p>The multilocation pass allows users to park at multiple locations within a specified period.</p>
            </div>
            {/* Navigate to "/service" on button click */}
            <button onClick={() => navigate("/service")} className="proceed-to-pay-button">Proceed to Pay</button>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

ReservationList.propTypes = {
  reservations: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReservationList;
