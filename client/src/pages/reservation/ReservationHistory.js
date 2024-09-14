import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './reservationHistory.css';
import jsPDF from 'jspdf';
import Navbar from "../../components/navbar/Navbar";

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUserID = localStorage.getItem("user");
    if (storedUserID) {
      const userData = JSON.parse(storedUserID);
      const userID = userData._id;
      
      fetch(`http://localhost:8800/api/reservation?userID=${userID}`)
        .then(response => response.json())
        .then(data => setReservations(data))
        .catch(error => console.error('Error fetching reservations:', error));
    }
  }, []);

  // Function to format date
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  // Function to format package price
  const formatPackagePrice = (price) => {
    return `Rs. ${price}`;
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter reservations based on search query
  const filteredReservations = reservations?.filter(reservation =>
    reservation.parkName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  // Function to generate and download the PDF report
  const generatePDFReport = () => {
    const pdf = new jsPDF();

    pdf.text('Reservation History', 10, 10);

    let startY = 20;
    const rowHeight = 10;

    pdf.setFont('helvetica');
    pdf.setFontSize(10);

    pdf.text('Park Name', 10, startY); // Change column name to Park Name

    // Add other column names as needed

    startY += rowHeight;

    filteredReservations.forEach(reservation => {
      pdf.text(reservation.parkName, 10, startY); // Change column to parkName
      // Add other column values as needed

      startY += rowHeight;
    });

    pdf.save('reservation-history.pdf');
  };

  return (
    <div>
      <Navbar />
      <div className="reservation-history-container">
        <h2 className="reservation-history-heading">Reservation History</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Park Name" // Change placeholder text
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        <table className="reservation-history-table">
          <thead>
            <tr>
              <th>Park Name</th> {/* Change column name */}
              <th>Parking Slot ID</th>
              <th>Reservation Date</th>
              <th>Estimated Arrival Time</th>
              <th>Departure Time</th>
              <th>Package Type</th>
              <th>Package Price</th>
              <th>Valet Service</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{reservation.parkName}</td> {/* Change column to parkName */}
                <td>{reservation.parkingSlotId}</td>
                <td>{formatDate(reservation.reservationDate)}</td>
                <td>{reservation.estimatedArrivalTime}</td>
                <td>{reservation.departureTime}</td>
                <td>{reservation.packageType}</td>
                <td>{formatPackagePrice(reservation.packagePrice)}</td>
                <td>{reservation.valetService ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={generatePDFReport}>Download PDF Report</button>
        <div>
          <Link to="/packages">Go back to Reservation Details page</Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationHistory;
